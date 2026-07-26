'use client';

/**
 * « Nos plus belles réalisations en vidéo » — la rubrique existe sur la page
 * d'accueil actuelle, en quatre onglets. On garde le principe et les quatre
 * mêmes chantiers ; ce qui change, c'est qu'une seule vidéo est chargée à la
 * fois, et seulement après un clic.
 *
 * Le site actuel place les quatre balises `<video>` dans le HTML dès le
 * premier rendu : le navigateur va chercher les métadonnées des quatre
 * fichiers, soit une soixantaine de mégaoctets sollicités pour une seule
 * vidéo regardée.
 */

import { useState } from 'react';
import VideoPlayer from './video-player';
import SectionHead from './section-head';
import Reveal from './reveal';
import { showcase } from '@/lib/videos';

export default function VideoShowcase() {
  const [active, setActive] = useState(showcase[0].key);
  const current = showcase.find((item) => item.key === active);

  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="shell">
        <SectionHead
          dark
          eyebrow="En vidéo"
          title="Nos plus belles réalisations"
          lead="Quatre chantiers filmés sur site. Les images viennent de nos équipes, pas d’une banque d’images."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-3">
            <div
              role="tablist"
              aria-orientation="vertical"
              className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
            >
              {showcase.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={item.key === active}
                  onClick={() => setActive(item.key)}
                  className={`shrink-0 rounded-2xl px-5 py-4 text-left text-[0.9rem] font-bold leading-snug transition-colors duration-300 lg:w-full ${
                    item.key === active
                      ? 'bg-lime text-ink'
                      : 'bg-white/[0.07] text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`mt-1 block text-[0.72rem] font-semibold ${
                      item.key === active ? 'text-ink/60' : 'text-white/35'
                    }`}
                  >
                    {item.city} · {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-9">
            <Reveal>
              {/* La clé force le remontage : changer d'onglet remet le
                  lecteur à zéro plutôt que de recycler la balise précédente,
                  qui garderait son ancienne source en mémoire. */}
              <VideoPlayer
                key={current.key}
                src={current.src}
                poster={current.poster}
                title={current.title}
                mode="film"
                ratio="16 / 9"
              />
            </Reveal>
            <Reveal delay={90}>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="d3 max-w-[30ch] text-white">{current.title}</h3>
                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-lime">
                  {current.client} · {current.city} · {current.year}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
