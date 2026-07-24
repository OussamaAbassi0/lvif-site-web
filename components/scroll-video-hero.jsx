'use client';

/**
 * Hero cinématique piloté par le scroll.
 *
 * La lecture n'est pas un autoplay : ScrollTrigger (scrub) fait avancer une valeur
 * de progression, et cette progression pilote directement `video.currentTime`.
 * Deux clips sont chaînés — le premier occupe la première moitié de la course de
 * scroll, le second la seconde, avec un fondu enchaîné à la bascule.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manifest from '@/lib/media-manifest.json';

const CHAPTERS = [
  {
    at: 0,
    index: '01',
    kicker: 'Le module',
    line: 'Chaque pixel est assemblé, testé et garanti en France.',
  },
  {
    at: 0.34,
    index: '02',
    kicker: 'Le mur',
    line: 'Des cabinets alignés au millimètre, sans bord apparent.',
  },
  {
    at: 0.68,
    index: '03',
    kicker: 'Le chantier',
    line: 'Des équipes salariées, sur site, partout en Europe.',
  },
];

export default function ScrollVideoHero() {
  const root = useRef(null);
  const stage = useRef(null);
  const videoA = useRef(null);
  const videoB = useRef(null);
  const progressBar = useRef(null);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return undefined;

    let cancelled = false;

    /* Amorçage : sur iOS et Safari, une vidéo doit avoir été « jouée » au moins
       une fois pour que les seeks soient fluides. Muet, donc autorisé sans geste. */
    const prime = async (video) => {
      try {
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch {
        /* lecture refusée : le scrub fonctionne quand même sur desktop */
      }
    };

    const whenMetadata = (video) =>
      new Promise((resolve) => {
        if (video.readyState >= 1 && Number.isFinite(video.duration)) return resolve();
        video.addEventListener('loadedmetadata', () => resolve(), { once: true });
        video.load();
      });

    const setup = async () => {
      await Promise.all([whenMetadata(a), whenMetadata(b)]);
      if (cancelled) return;
      await Promise.all([prime(a), prime(b)]);
      if (cancelled) return;

      setReady(true);

      if (prefersReduced) {
        // Sans animation : on fige une image représentative de chaque clip.
        a.currentTime = Math.min(1.2, a.duration || 1);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const proxy = { p: 0 };
      const HANDOVER = 0.5;
      const FADE = 0.06;

      const apply = () => {
        const p = proxy.p;

        // Clip A : de 0 à HANDOVER + marge de fondu
        const localA = gsap.utils.clamp(0, 1, p / HANDOVER);
        const durA = a.duration || 1;
        const targetA = localA * (durA - 0.05);
        if (Math.abs(a.currentTime - targetA) > 0.012) a.currentTime = targetA;

        // Clip B : de HANDOVER à 1
        const localB = gsap.utils.clamp(0, 1, (p - HANDOVER) / (1 - HANDOVER));
        const durB = b.duration || 1;
        const targetB = localB * (durB - 0.05);
        if (Math.abs(b.currentTime - targetB) > 0.012) b.currentTime = targetB;

        // Fondu enchaîné centré sur la bascule
        const mix = gsap.utils.clamp(
          0,
          1,
          (p - (HANDOVER - FADE)) / (FADE * 2),
        );
        a.style.opacity = String(1 - mix);
        b.style.opacity = String(mix);

        if (progressBar.current) {
          progressBar.current.style.transform = `scaleX(${p})`;
        }

        let next = 0;
        for (let i = 0; i < CHAPTERS.length; i += 1) {
          if (p >= CHAPTERS[i].at) next = i;
        }
        setChapter((current) => (current === next ? current : next));
      };

      const tween = gsap.to(proxy, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=340%',
          scrub: 0.55,
          pin: stage.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: apply,
      });

      apply();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    let teardown;
    setup().then((fn) => {
      teardown = fn;
    });

    return () => {
      cancelled = true;
      if (teardown) teardown();
    };
  }, []);

  const active = CHAPTERS[chapter];

  return (
    <section ref={root} className="relative bg-ink" aria-label="Présentation">
      <div ref={stage} className="relative h-[100svh] w-full overflow-hidden">
        {/* Piste vidéo pilotée par le scroll */}
        <div className="absolute inset-0">
          <video
            ref={videoA}
            src={manifest.ignition}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 1 }}
          />
          <video
            ref={videoB}
            src={manifest.assembly}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Étalonnage : assombrissement, vignette, trame de pixels */}
        <div className="pointer-events-none absolute inset-0 bg-ink/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/70" />
        <div className="pixelfield pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-screen" />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* Contenu */}
        <div className="shell relative flex h-full flex-col justify-end pb-14 pt-28 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="slug slug-signal mb-6 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-signal" />
                Fabricant français · depuis 2018
              </p>

              <h1 className="display-xl max-w-[16ch]">
                L’écran géant,
                <br />
                <span className="text-signal">à la française.</span>
              </h1>

              <p className="lede mt-8 max-w-xl">
                Conception, assemblage, installation et maintenance d’écrans LED grand format —
                à l’achat comme à la location. Plus de 1 400 installations livrées.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/devis" className="btn btn-signal">
                  Calculer mon projet
                </Link>
                <Link href="/realisations" className="btn btn-ghost">
                  Voir les réalisations
                </Link>
              </div>
            </div>

            {/* Chapitrage synchronisé avec la progression du scroll */}
            <div className="hidden lg:col-span-4 lg:block">
              <div className="border-l border-hairline pl-7">
                <p className="numeral text-[3.5rem] text-signal">{active.index}</p>
                <p className="slug mt-3">{active.kicker}</p>
                <p className="mt-3 text-[0.95rem] leading-snug text-bone-dim">{active.line}</p>
              </div>
            </div>
          </div>

          {/* Barre de progression du scroll */}
          <div className="mt-12 flex items-center gap-5">
            <span className="slug shrink-0">
              {ready ? 'Faites défiler' : 'Chargement'}
            </span>
            <span className="relative h-px flex-1 bg-hairline">
              <span
                ref={progressBar}
                className="absolute inset-y-0 left-0 block w-full origin-left scale-x-0 bg-signal"
              />
            </span>
            <span className="slug hidden shrink-0 md:block">Lecture pilotée par le scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
