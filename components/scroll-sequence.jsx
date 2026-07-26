'use client';

/**
 * Séquence d'images pilotée par le scroll.
 *
 * Pourquoi pas une balise vidéo : piloter `video.currentTime` oblige le
 * décodeur à chercher une image-clé à chaque frame, ce qui saccade sur tous
 * les navigateurs. On dessine donc des bitmaps déjà décodés dans un canvas.
 *
 * Trois règles de performance tiennent tout le composant :
 *
 *   1. Le callback de scroll n'écrit qu'un nombre. Aucun dessin, aucune
 *      lecture de géométrie — le thread principal reste libre pendant le
 *      geste, ce qui est la condition d'un défilement à 60 fps.
 *   2. Le rendu vit dans une boucle requestAnimationFrame qui interpole vers
 *      la valeur cible (lerp). Le mouvement reste continu même quand les
 *      événements de scroll arrivent par paquets irréguliers, et la boucle
 *      s'arrête d'elle-même dès que la cible est atteinte ou que la section
 *      sort de l'écran.
 *   3. Le décodage passe par createImageBitmap, donc hors du thread
 *      principal. Une image décodée en synchrone au milieu d'un geste est
 *      précisément ce qui produit la sensation d'accroche.
 *
 * Le démarrage suit le même principe qu'avant : une séquence proxy (~360 px)
 * arrive d'abord pour que le scroll produise du mouvement tout de suite, la
 * pleine résolution se substitue image par image ensuite.
 */

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import manifest from '@/lib/sequence-manifest.json';

const pad = (i) => String(i).padStart(4, '0');

/* Longueur de défilement de l'animation, en hauteurs d'écran, en plus de
   l'écran épinglé. Le hero mesure donc 170 vh sur mobile et 200 vh sur
   desktop : l'animation se termine en un geste de pouce, deux au plus.
   Au-delà le visiteur croit la page bloquée. */
const SPAN_MOBILE = 0.7;
const SPAN_DESKTOP = 1;

/* Fraction du chemin restant parcourue à chaque frame. Plus haut = plus
   collé au doigt, plus bas = plus feutré. 0,18 lisse les paquets
   d'événements sans donner l'impression de traîner. */
const EASE = 0.18;

export default function ScrollSequence({
  children,
  onProgress,
  name = 'accueil',
  poster = `/sequence/${name}/poster.webp`,
}) {
  const root = useRef(null);
  const stage = useRef(null);
  const canvas = useRef(null);
  const [ready, setReady] = useState(false);
  const count = manifest[name] || 0;

  const hiSrc = (i) => `/sequence/${name}/${pad(i)}.jpg`;
  const loSrc = (i) => `/sequence/${name}/proxy/${pad(i)}.jpg`;

  useEffect(() => {
    if (!count) return undefined;

    const node = canvas.current;
    /* `desynchronized` autorise le navigateur à sortir ce canvas du chemin de
       composition habituel : moins de synchronisation avec le reste de la
       page à chaque image. */
    const context = node.getContext('2d', { alpha: false, desynchronized: true });

    let cancelled = false;

    /* Sur petit écran une image sur deux suffit : moitié moins de requêtes
       pour une fluidité identique à cette taille d'affichage. */
    const small = window.matchMedia('(max-width: 768px)').matches;
    const stride = small ? 2 : 1;
    const indexes = [];
    for (let i = 0; i < count; i += stride) indexes.push(i);
    const total = indexes.length;

    /* Deux tableaux parallèles : la proxy sert de secours tant que la version
       nette n'est pas arrivée. */
    const lo = new Array(total);
    const hi = new Array(total);

    /* Tout l'état de l'animation dans un objet muté : aucun rendu React
       pendant le scroll. */
    const state = { target: 0, current: 0, painted: -1, raf: 0, live: true };

    /** Décodage hors thread principal quand le navigateur le permet. */
    const load = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const blob = await response.blob();
        if (typeof createImageBitmap === 'function') return await createImageBitmap(blob);

        /* Repli Safari ancien : `decode()` évite au moins le décodage
           synchrone au premier drawImage. */
        const image = new window.Image();
        image.src = URL.createObjectURL(blob);
        await image.decode();
        return image;
      } catch {
        return null;
      }
    };

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

    /* Rendu « object-fit: cover » manuel. */
    const paint = (index) => {
      const image = pick(index);
      if (!image) return;
      const cw = node.width;
      const ch = node.height;
      const scale = Math.max(cw / image.width, ch / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      context.drawImage(image, (cw - w) / 2, (ch - h) / 2, w, h);
      state.painted = index;
    };

    const frameAt = (progress) => Math.min(total - 1, Math.round(progress * (total - 1)));

    /* Boucle de rendu. Elle ne tourne que tant qu'il reste du chemin à
       parcourir : à l'arrêt, zéro travail par frame. */
    const tick = () => {
      const gap = state.target - state.current;
      state.current += Math.abs(gap) < 0.001 ? gap : gap * EASE;

      const index = frameAt(state.current);
      if (index !== state.painted) paint(index);

      state.raf =
        Math.abs(state.target - state.current) > 0.001 ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!state.raf && state.live) state.raf = requestAnimationFrame(tick);
    };

    const fit = () => {
      const rect = stage.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.round(rect.width * dpr);
      node.height = Math.round(rect.height * dpr);
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      paint(state.painted < 0 ? 0 : state.painted);
    };

    /** Charge la séquence par lots, en repeignant au fil de l'eau. */
    const stream = async (store, url, size) => {
      for (let i = 0; i < total; i += size) {
        if (cancelled) return;
        const slice = [];
        for (let k = i; k < Math.min(i + size, total); k += 1) slice.push(k);
        const images = await Promise.all(slice.map((k) => load(url(indexes[k]))));
        if (cancelled) {
          images.forEach((image) => image?.close?.());
          return;
        }
        images.forEach((image, k) => {
          store[slice[k]] = image;
        });
        /* La frame courante vient peut-être d'arriver ou de gagner en
           netteté : on redessine sans attendre le prochain geste. */
        if (state.painted >= 0) paint(state.painted);
      }
    };

    const boot = async () => {
      /* Deux images suffisent pour que le canvas ait quelque chose à montrer
         et que le scroll produise du mouvement. */
      const seed = await Promise.all([load(loSrc(indexes[0])), load(loSrc(indexes[1] ?? 0))]);
      if (cancelled) {
        seed.forEach((image) => image?.close?.());
        return;
      }
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
    let trigger;

    if (!prefersReduced) {
      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        /* Recalculé à chaque refresh : la barre d'adresse mobile change la
           hauteur d'écran en cours de route. */
        end: () =>
          `+=${Math.round(
            window.innerHeight *
              (window.matchMedia('(max-width: 768px)').matches ? SPAN_MOBILE : SPAN_DESKTOP),
          )}`,
        pin: stage.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        /* Le seul travail fait pendant le geste : deux écritures et, au plus,
           la relance de la boucle. */
        onUpdate: (self) => {
          state.target = self.progress;
          kick();
          if (onProgress) onProgress(self.progress);
        },
        onToggle: (self) => {
          state.live = self.isActive;
          if (self.isActive) {
            kick();
            return;
          }
          /* En sortie de section, on cale l'image sur la position réelle
             plutôt que de laisser l'interpolation figée en chemin. */
          if (state.raf) cancelAnimationFrame(state.raf);
          state.raf = 0;
          state.current = state.target;
          const index = frameAt(state.current);
          if (index !== state.painted) paint(index);
        },
      });
    }

    window.addEventListener('resize', fit);

    return () => {
      cancelled = true;
      if (state.raf) cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', fit);
      trigger?.kill();
      /* Les ImageBitmap gardent de la mémoire graphique tant qu'on ne les
         ferme pas : le passage d'une page à l'autre en libère jusqu'à
         plusieurs dizaines de mégaoctets. */
      lo.forEach((image) => image?.close?.());
      hi.forEach((image) => image?.close?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, name, onProgress]);

  /* Ces balises partent dans le HTML initial : le navigateur télécharge les
     premières images de la proxy pendant qu'il évalue le JavaScript, au lieu
     d'attendre l'hydratation puis de faire la queue derrière les logos et les
     photos de la page. C'est ce qui supprime les secondes d'immobilité. */
  const preload = Array.from({ length: Math.min(count, 24) }, (unused, i) => (
    <link
      key={`${name}-${i}`}
      rel="preload"
      as="image"
      href={loSrc(i)}
      fetchPriority={i < 4 ? 'high' : 'low'}
    />
  ));

  return (
    <section ref={root} className="relative" aria-label="Présentation">
      {preload}
      <div
        ref={stage}
        className="relative h-[100svh] w-full overflow-hidden bg-ink"
        /* La scène est déplacée par transform pendant tout l'épinglage :
           on l'annonce au compositeur pour qu'il lui réserve sa couche. */
        style={{ willChange: 'transform' }}
      >
        {/* Image fixe : visible pendant le préchargement, et seul rendu si la
            séquence n'a pas pu être générée au build. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
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
