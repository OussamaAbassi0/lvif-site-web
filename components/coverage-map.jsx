'use client';

import { useState } from 'react';
import Reveal from './reveal';
import ArrowPill from './arrow-pill';

/**
 * Carte d'implantation.
 * Rendu vectoriel maison plutôt qu'un embed Google Maps : pas de clé d'API,
 * pas de tuile externe, et un rendu conforme à la charte.
 */

const SITES = [
  { name: 'Paris', lat: 48.8566, lon: 2.3522, hub: true, dy: -11 },
  { name: 'Saint-Rémy-sur-Avre', lat: 48.7673, lon: 1.2451, hub: true, side: 'left', dy: 18 },
  { name: 'Lille', lat: 50.6292, lon: 3.0573 },
  { name: 'Reims', lat: 49.2583, lon: 4.0317, dy: 14 },
  { name: 'Strasbourg', lat: 48.5734, lon: 7.7521, side: 'left' },
  { name: 'Rennes', lat: 48.1173, lon: -1.6778 },
  { name: 'Nantes', lat: 47.2184, lon: -1.5536 },
  { name: 'Dijon', lat: 47.322, lon: 5.0415 },
  { name: 'Genève', lat: 46.2044, lon: 6.1432, side: 'left', dy: 15 },
  { name: 'Lyon', lat: 45.764, lon: 4.8357 },
  { name: 'Bordeaux', lat: 44.8378, lon: -0.5792 },
  { name: 'Toulouse', lat: 43.6047, lon: 1.4442, dy: 15 },
  { name: 'Marseille', lat: 43.2965, lon: 5.3698, dy: 16 },
  { name: 'Nice', lat: 43.7102, lon: 7.262, side: 'left', dy: -6 },
  { name: 'Luxembourg', lat: 49.6116, lon: 6.1319, side: 'left', dy: -6 },
];

const BOUNDS = { minLon: -5.6, maxLon: 9.2, minLat: 41.8, maxLat: 51.6 };
const W = 620;
const H = 700;

const project = ({ lat, lon }) => ({
  x: ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * W,
  y: ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H,
});

const OUTLINE = [
  [2.55, 51.09], [3.15, 50.79], [4.23, 50.69], [5.9, 49.5], [6.36, 49.46],
  [8.23, 48.97], [7.59, 47.59], [6.77, 47.29], [6.04, 46.42], [7.05, 45.93],
  [6.75, 45.02], [7.69, 44.17], [7.53, 43.79], [6.24, 43.12], [4.86, 43.42],
  [3.1, 43.07], [3.04, 42.47], [1.72, 42.5], [0.66, 42.69], [-1.38, 43.03],
  [-1.79, 43.36], [-1.24, 45.7], [-1.05, 46.31], [-2.05, 47.03], [-2.55, 47.53],
  [-4.79, 48.09], [-4.28, 48.68], [-2.7, 48.53], [-1.56, 48.63], [-1.26, 49.35],
  [0.18, 49.71], [1.56, 50.13], [1.7, 50.95], [2.55, 51.09],
];

const outlinePath = `${OUTLINE.map(([lon, lat], index) => {
  const { x, y } = project({ lat, lon });
  return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' ')} Z`;

export default function CoverageMap() {
  const [active, setActive] = useState('Paris');
  const current = SITES.find((site) => site.name === active) || SITES[0];

  return (
    <section className="shell py-20 md:py-28">
      <div className="overflow-hidden rounded-[var(--radius-xl2)] bg-tile">
        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="overflow-hidden rounded-[26px] bg-white p-4 md:p-6">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="h-auto w-full"
                  role="img"
                  aria-label={`Carte des zones d'intervention : ${SITES.map((s) => s.name).join(', ')}`}
                >
                  <defs>
                    <pattern id="lvif-grid" width="26" height="26" patternUnits="userSpaceOnUse">
                      <path d="M26 0H0V26" fill="none" stroke="#eeeeea" strokeWidth="1" />
                    </pattern>
                    <radialGradient id="lvif-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--color-lime)" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="var(--color-lime)" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width={W} height={H} fill="url(#lvif-grid)" />

                  <path
                    d={outlinePath}
                    fill="#f4f4f2"
                    stroke="#dcdcd6"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {(() => {
                    const { x, y } = project(current);
                    return <circle cx={x} cy={y} r="88" fill="url(#lvif-glow)" />;
                  })()}

                  {SITES.map((site) => {
                    const { x, y } = project(site);
                    const isActive = site.name === active;
                    const left = site.side === 'left';
                    return (
                      <g key={site.name}>
                        {site.hub && (
                          <circle
                            cx={x}
                            cy={y}
                            r={isActive ? 13 : 10}
                            fill="none"
                            stroke="var(--color-ink)"
                            strokeWidth="1"
                            opacity={isActive ? 0.75 : 0.3}
                          />
                        )}
                        <circle
                          cx={x}
                          cy={y}
                          r={isActive ? 6 : site.hub ? 5 : 3.5}
                          fill={isActive ? 'var(--color-ink)' : site.hub ? '#4a4a4a' : '#9b9895'}
                        />
                        <text
                          x={left ? x - 12 : x + 12}
                          y={y + (site.dy ?? 4)}
                          textAnchor={left ? 'end' : 'start'}
                          fontSize="13"
                          fontWeight={isActive ? 700 : 500}
                          fontFamily="var(--font-sans)"
                          fill={isActive ? 'var(--color-ink)' : '#8b8885'}
                        >
                          {site.name}
                        </text>
                        <circle
                          cx={x}
                          cy={y}
                          r="22"
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setActive(site.name)}
                          onClick={() => setActive(site.name)}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Sélection d'une ville">
                {SITES.map((site) => (
                  <li key={site.name}>
                    <button
                      type="button"
                      onClick={() => setActive(site.name)}
                      aria-pressed={site.name === active}
                      className={`min-h-[38px] rounded-full px-3.5 py-2 text-[0.75rem] font-semibold transition-colors ${
                        site.name === active
                          ? 'bg-ink text-paper'
                          : 'bg-white text-muted hover:text-ink'
                      }`}
                    >
                      {site.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Implantation</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="d2 mt-4 max-w-[13ch]">
                Une implantation nationale et internationale
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lead mt-6">
                LED Visual Innovation intervient dans toute la France, notamment à Paris, Lyon,
                Lille, Marseille, Nantes, Toulouse et Bordeaux, pour accompagner les entreprises,
                collectivités et organisateurs d’événements dans leurs projets d’affichage LED.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <p className="lead mt-4">
                Nous réalisons également des installations à l’étranger, notamment en Suisse, au
                Luxembourg et en Allemagne, sur des événements nécessitant une logistique
                maîtrisée et un haut niveau d’exigence technique.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <dl className="mt-9 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-white p-6">
                  <dt className="eyebrow">Siège social</dt>
                  <dd className="mt-3 leading-relaxed text-ink">
                    49 rue de Ponthieu
                    <br />
                    75008 Paris
                  </dd>
                </div>
                <div className="rounded-[22px] bg-white p-6">
                  <dt className="eyebrow">Centre logistique</dt>
                  <dd className="mt-3 leading-relaxed text-ink">
                    15 rue de l’Ancienne
                    <br />
                    28380 Saint-Rémy-sur-Avre
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={290}>
              <ArrowPill href="/devis" variant="lime" className="mt-8">
                Nous contacter
              </ArrowPill>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
