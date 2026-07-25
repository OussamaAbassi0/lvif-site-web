'use client';

/**
 * Séquence d'images pilotée par le scroll.
 *
 * ScrollTrigger (scrub) fait avancer un index de frame ; le rendu se limite à
 * un drawImage dans un canvas. Aucune recherche de position dans un flux
 * vidéo, donc aucun à-coup, y compris au scroll rapide ou en sens inverse.
 * Le premier tiers des images est préchargé avant l'affichage, le reste
 * continue en arrière-plan.
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manifest from '@/lib/sequence-manifest.json';

const src = (i) => `/sequence/${String(i).padStart(4, '0')}.jpg`;

export default function ScrollSequence({ children, onProgress }) {
  const root = useRef(null);
  const stage = useRef(null);
  const canvas = useRef(null);
  const frames = useRef([]);
  const [ready, setReady] = useState(false);
  const count = manifest.count || 0;

  useEffect(() => {
    if (!count) return undefined;

    const node = canvas.current;
    const context = node.getContext('2d', { alpha: false });
    let cancelled = false;
    let current = -1;

    /* Sur petit écran on ne charge qu'une image sur deux : moitié moins de
       données pour une fluidité identique à cette taille d'affichage. */
    const stride = window.matchMedia('(max-width: 768px)').matches ? 2 : 1;
    const indexes = [];
    for (let i = 0; i < count; i += stride) indexes.push(i);
    const total = indexes.length;

    const load = (i) =>
      new Promise((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src(i);
      });

    const fit = () => {
      const rect = stage.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.round(rect.width * dpr);
      node.height = Math.round(rect.height * dpr);
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      draw(current < 0 ? 0 : current, true);
    };

    /* Rendu « object-fit: cover » manuel */
    const draw = (index, force = false) => {
      if (!force && index === current) return;
      const image = frames.current[index];
      if (!image) return;
      current = index;

      const cw = node.width;
      const ch = node.height;
      const scale = Math.max(cw / image.width, ch / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      context.drawImage(image, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const boot = async () => {
      const priority = Math.min(total, Math.ceil(total / 3));
      const first = await Promise.all(
        indexes.slice(0, priority).map((frameIndex) => load(frameIndex)),
      );
      if (cancelled) return;
      first.forEach((image, i) => {
        frames.current[i] = image;
      });

      fit();
      setReady(true);

      // Le reste sans bloquer l'affichage
      for (let i = priority; i < total; i += 1) {
        if (cancelled) return;
        frames.current[i] = await load(indexes[i]);
      }
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
          draw(index);
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

  return (
    <section ref={root} className="relative" aria-label="Présentation">
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
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {children}
      </div>
    </section>
  );
}
