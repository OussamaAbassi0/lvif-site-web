'use client';

/**
 * Séquence d'images pilotée par le scroll.
 *
 * ScrollTrigger (scrub) fait avancer un index de frame ; le rendu se limite à
 * un drawImage dans un canvas. Aucune recherche de position dans un flux
 * vidéo, donc aucun à-coup, y compris au scroll rapide ou en sens inverse.
 *
 * Le point délicat est le démarrage. Attendre les images pleine résolution
 * laissait plusieurs secondes pendant lesquelles le scroll ne produisait
 * rien : le visiteur en conclut que le site est cassé. Deux mesures :
 *
 *   1. une séquence proxy (~360 px, quelques kilo-octets par image) est
 *      chargée en premier ; elle suffit à ce que le mouvement réponde au
 *      scroll presque immédiatement, puis chaque image est remplacée par sa
 *      version nette dès qu'elle arrive ;
 *   2. tant qu'une image manque, on dessine la plus proche déjà chargée.
 *      Le mouvement est donc continu dès la deuxième image reçue, au lieu
 *      de rester figé jusqu'à ce que la bonne image soit disponible.
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manifest from '@/lib/sequence-manifest.json';

const pad = (i) => String(i).padStart(4, '0');
const hiSrc = (i) => `/sequence/${pad(i)}.jpg`;
const loSrc = (i) => `/sequence/proxy/${pad(i)}.jpg`;

export default function ScrollSequence({ children, onProgress }) {
  const root = useRef(null);
  const stage = useRef(null);
  const canvas = useRef(null);
  const [ready, setReady] = useState(false);
  const count = manifest.count || 0;

  useEffect(() => {
    if (!count) return undefined;

    const node = canvas.current;
    const context = node.getContext('2d', { alpha: false });
    let cancelled = false;
    let painted = -1;

    /* Sur petit écran une image sur deux suffit : moitié moins de requêtes
       pour une fluidité identique à cette taille d'affichage. */
    const stride = window.matchMedia('(max-width: 768px)').matches ? 2 : 1;
    const indexes = [];
    for (let i = 0; i < count; i += stride) indexes.push(i);
    const total = indexes.length;

    /* Deux tableaux parallèles : la proxy sert de secours tant que la version
       nette n'est pas arrivée. */
    const lo = new Array(total);
    const hi = new Array(total);

    const load = (url) =>
      new Promise((resolve) => {
        const image = new window.Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = url;
      });

    /** Meilleure image disponible pour cet index, sinon la plus proche. */
    const pick = (index) => {
      if (hi[index]) return hi[index];
      if (lo[index]) return lo[index];
      for (let d = 1; d < total; d += 1) {
        const before = index - d;
        const after = index + d;
        if (before >= 0 && (hi[before] || lo[before])) return hi[before] || lo[before];
        if (after < total && (hi[after] || lo[after])) return hi[after] || lo[after];
      }
      return null;
    };

    /* Rendu « object-fit: cover » manuel */
    const paint = (index) => {
      const image = pick(index);
      if (!image) return;
      const cw = node.width;
      const ch = node.height;
      const scale = Math.max(cw / image.width, ch / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      context.drawImage(image, (cw - w) / 2, (ch - h) / 2, w, h);
      painted = index;
    };

    const fit = () => {
      const rect = stage.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.round(rect.width * dpr);
      node.height = Math.round(rect.height * dpr);
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      paint(painted < 0 ? 0 : painted);
    };

    /** Charge la séquence par lots, en repeignant au fil de l'eau. */
    const stream = async (store, url, size) => {
      for (let i = 0; i < total; i += size) {
        if (cancelled) return;
        const slice = [];
        for (let k = i; k < Math.min(i + size, total); k += 1) slice.push(k);
        const images = await Promise.all(slice.map((k) => load(url(indexes[k]))));
        images.forEach((image, k) => {
          store[slice[k]] = image;
        });
        /* La frame courante vient peut-être d'arriver ou de gagner en
           netteté : on redessine sans attendre le prochain événement scroll. */
        if (painted >= 0) paint(painted);
      }
    };

    const boot = async () => {
      /* Deux images suffisent pour que le canvas ait quelque chose à montrer
         et que le scroll produise du mouvement. */
      const seed = await Promise.all([load(loSrc(indexes[0])), load(loSrc(indexes[1] ?? 0))]);
      if (cancelled) return;
      [lo[0], lo[1]] = seed;

      fit();
      paint(0);
      setReady(true);

      /* Proxy d'abord — l'ensemble pèse moins qu'une seule image nette —
         puis la pleine résolution par-dessus. */
      await stream(lo, loSrc, 12);
      await stream(hi, hiSrc, 4);
    };

    boot();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tween;

    if (!prefersReduced) {
      gsap.registerPlugin(ScrollTrigger);
      const proxy = { p: 0 };

      tween = gsap.to(proxy, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=300%',
          scrub: 0.4,
          pin: stage.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const index = Math.min(total - 1, Math.round(proxy.p * (total - 1)));
          if (index !== painted) paint(index);
          if (onProgress) onProgress(proxy.p);
        },
      });
    }

    window.addEventListener('resize', fit);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', fit);
      if (tween) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
    };
  }, [count, onProgress]);

  /* Ces balises partent dans le HTML initial : le navigateur télécharge les
     premières images de la proxy pendant qu'il évalue le JavaScript, au lieu
     d'attendre l'hydratation puis de faire la queue derrière les logos et les
     photos de la page. C'est ce qui supprime les secondes d'immobilité. */
  const preload = Array.from({ length: Math.min(count, 24) }, (unused, i) => (
    <link
      key={i}
      rel="preload"
      as="image"
      href={loSrc(i)}
      fetchPriority={i < 4 ? 'high' : 'low'}
    />
  ));

  return (
    <section ref={root} className="relative" aria-label="Présentation">
      {preload}
      <div ref={stage} className="relative h-[100svh] w-full overflow-hidden bg-ink">
        {/* Image fixe : visible pendant le préchargement, et seul rendu si la
            séquence n'a pas pu être générée au build. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/frames/hero-b.jpg)' }}
        />
        {count > 0 && (
          <canvas
            ref={canvas}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {children}
      </div>
    </section>
  );
}
