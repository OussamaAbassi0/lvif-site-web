'use client';

/**
 * Onglets verticaux à visuel, motif récurrent du site actuel :
 * « En savoir plus », « Des solutions adaptées à chaque usage »,
 * « Un écran pour chaque type d'usage ».
 *
 * Le site actuel les traite en trois composants distincts, avec des hauteurs
 * de panneau qui sautent au changement d'onglet. Ici un seul composant, une
 * hauteur stable, et la navigation au clavier prévue par le motif ARIA des
 * onglets (flèches, Début, Fin).
 *
 * Chaque entrée : { key, label, title, body, bullets, image, alt, tags, href }
 */

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './reveal';

export default function TabShowcase({ items, media = true, eyebrow, title, lead }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef([]);
  const current = items[active];

  const onKeyDown = (event) => {
    const last = items.length - 1;
    const moves = {
      ArrowDown: Math.min(last, active + 1),
      ArrowRight: Math.min(last, active + 1),
      ArrowUp: Math.max(0, active - 1),
      ArrowLeft: Math.max(0, active - 1),
      Home: 0,
      End: last,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="shell py-20 md:py-28">
      {(eyebrow || title) && (
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
          )}
          {title && (
            <Reveal delay={70}>
              <h2 className="d2 mt-4">{title}</h2>
            </Reveal>
          )}
          {lead && (
            <Reveal delay={130}>
              <p className="lead mt-6">{lead}</p>
            </Reveal>
          )}
        </div>
      )}

      <div className={`grid gap-4 lg:grid-cols-12 ${eyebrow || title ? 'mt-14' : ''}`}>
        <div
          role="tablist"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          /* Sur mobile la colonne d'onglets devient un rail horizontal :
             cinq lignes de boutons repoussaient le contenu hors de l'écran. */
          className="no-scrollbar flex gap-2 overflow-x-auto lg:col-span-3 lg:flex-col lg:overflow-visible"
        >
          {items.map((item, index) => (
            <button
              key={item.key}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-2xl px-5 py-4 text-left text-[0.9rem] font-bold leading-snug transition-colors duration-300 lg:w-full ${
                index === active ? 'bg-lime text-ink' : 'bg-tile text-muted hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel-${active}`}
          aria-labelledby={`${id}-tab-${active}`}
          className="lg:col-span-9"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {media && current.image && (
              <div className="relative overflow-hidden rounded-[26px] bg-tile">
                <Image
                  key={current.image}
                  src={current.image}
                  alt={current.alt || current.title || current.label}
                  width={1100}
                  height={800}
                  className="h-full w-full animate-[fade-in_500ms_ease] object-cover"
                />
                {current.tags && (
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-lime px-3 py-1.5 text-[0.7rem] font-bold text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div
              className={`flex flex-col rounded-[26px] bg-tile p-7 md:p-9 ${
                media && current.image ? '' : 'md:col-span-2'
              }`}
            >
              <h3 className="d3">{current.title || current.label}</h3>
              {current.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}

              {current.bullets && (
                <ul className="mt-6 space-y-3">
                  {current.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[0.92rem] leading-relaxed text-body">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-lime ring-1 ring-ink/15"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {current.cta ? (
                <div className="mt-auto pt-9">
                  <Link
                    href={current.cta.href}
                    className="inline-flex items-center gap-4 rounded-full bg-lime py-2 pl-6 pr-2 text-[0.9rem] font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {current.cta.label}
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 place-items-center rounded-full bg-ink text-lime"
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                        <path
                          d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              ) : (
                current.href && (
                  <Link
                    href={current.href}
                    className="sweep mt-auto pt-8 text-[0.9rem] font-bold text-ink"
                  >
                    En savoir plus
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
