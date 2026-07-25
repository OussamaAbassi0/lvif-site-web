'use client';

/**
 * Carte d'implantation.
 *
 * Rendu vectoriel plutôt qu'un embed Google Maps : pas de clé d'API, pas de
 * tuile externe, pas de bandeau de consentement, et un rendu qui suit la
 * charte au lieu de l'imposer. Le tracé vient du découpage administratif
 * français (voir scripts/build-map.mjs), donc littoral et Corse compris.
 *
 * Les marqueurs reprennent le caméléon du logo, comme sur la carte du site
 * actuel : c'est le signe le plus reconnaissable de la marque.
 */

import { useEffect, useState } from 'react';
import Reveal from './reveal';
import ArrowPill from './arrow-pill';
import ChameleonMark from './chameleon-mark';
import map from '@/lib/map-paths.json';

const SITES = [
  {
    name: 'Paris',
    lat: 48.8566,
    lon: 2.3522,
    hub: 'Siège social',
    address: '49 rue de Ponthieu, 75008 Paris',
  },
  {
    name: 'Saint-Rémy-sur-Avre',
    lat: 48.7673,
    lon: 1.2451,
    hub: 'Centre logistique',
    address: '15 rue de l’Ancienne, 28380 Saint-Rémy-sur-Avre',
    side: 'left',
  },
  { name: 'Lille', lat: 50.6292, lon: 3.0573 },
  { name: 'Reims', lat: 49.2583, lon: 4.0317 },
  { name: 'Strasbourg', lat: 48.5734, lon: 7.7521 },
  { name: 'Rennes', lat: 48.1173, lon: -1.6778, side: 'left' },
  { name: 'Nantes', lat: 47.2184, lon: -1.5536, side: 'left' },
  { name: 'Dijon', lat: 47.322, lon: 5.0415 },
  { name: 'Genève', lat: 46.2044, lon: 6.1432 },
  { name: 'Lyon', lat: 45.764, lon: 4.8357 },
  { name: 'Bordeaux', lat: 44.8378, lon: -0.5792, side: 'left' },
  { name: 'Toulouse', lat: 43.6047, lon: 1.4442, side: 'left' },
  { name: 'Marseille', lat: 43.2965, lon: 5.3698 },
  { name: 'Nice', lat: 43.7102, lon: 7.262 },
  { name: 'Luxembourg', lat: 49.6116, lon: 6.1319 },
];

const { width: W, height: H, bounds: B } = map;

/* Même projection Mercator que le script de génération des tracés. */
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const Y0 = merc(B.maxLat);
const SCALE = W / (B.maxLon - B.minLon);

const project = ({ lat, lon }) => ({
  x: (lon - B.minLon) * SCALE,
  y: (Y0 - merc(lat)) * (180 / Math.PI) * SCALE,
});

/* Goutte d'épingle, pointe en bas à l'origine (0, 0). */
const PIN =
  'M0,0 C-7.4,-11.2 -17,-17.8 -17,-28.4 A17,17 0 1 1 17,-28.4 C17,-17.8 7.4,-11.2 0,0 Z';

function Pin({ site, active, onSelect, zoom = 1 }) {
  const { x, y } = project(site);
  const scale = (site.hub ? 1 : 0.62) * zoom;

  return (
    <g
      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
      className="cursor-pointer"
      onMouseEnter={() => onSelect(site.name)}
      onFocus={() => onSelect(site.name)}
      onClick={() => onSelect(site.name)}
      tabIndex={0}
      role="button"
      aria-label={site.name}
    >
      {active && (
        <circle r="34" fill="var(--color-lime)" opacity="0.16">
          <animate
            attributeName="r"
            values="20;42;20"
            dur="2.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.22;0;0.22"
            dur="2.6s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <g transform={`scale(${active ? scale * 1.14 : scale})`}>
        <ellipse cy="2" rx="9" ry="3" fill="#000" opacity="0.35" />
        <path
          d={PIN}
          fill="var(--color-lime)"
          stroke="#0d0d0d"
          strokeWidth={site.hub ? 2 : 2.6}
        />
        <ChameleonMark
          x="-13"
          y="-38"
          width="26"
          height="19"
          className="text-ink"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      <circle r="26" fill="transparent" />
    </g>
  );
}

export default function CoverageMap() {
  const [active, setActive] = useState('Paris');
  const [zoom, setZoom] = useState(1);
  const current = SITES.find((site) => site.name === active) || SITES[0];
  const hubs = SITES.filter((site) => site.hub);

  /* Sur un écran de 390 px, la carte fait la moitié de sa taille de bureau :
     les marqueurs deviendraient illisibles. On les agrandit dans le repère
     du SVG — au-delà de 1,5 ils se chevauchent autour de Paris. La liste de
     villes en dessous reste de toute façon la commande la plus sûre au doigt. */
  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const apply = () => setZoom(media.matches ? 1.45 : 1);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return (
    <section className="shell py-20 md:py-28">
      <div className="overflow-hidden rounded-[var(--radius-xl2)] bg-ink text-white">
        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
          {/* `min-w-0` : sans lui, la liste de villes à défilement horizontal
              impose sa largeur totale à la colonne — la carte et le texte
              débordaient alors du cadre sur mobile. */}
          <div className="min-w-0 lg:col-span-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[26px] bg-[#111110]">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  /* Safari ne déduit pas toujours la hauteur d'un SVG en
                     `height: auto` à partir de son viewBox : sur iPhone la
                     carte se retrouvait agrandie et rognée. On impose donc
                     le rapport hauteur/largeur, et le cadrage explicitement. */
                  className="block w-full"
                  style={{ aspectRatio: `${W} / ${H}` }}
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label={`Carte des zones d'intervention : ${SITES.map((s) => s.name).join(', ')}`}
                >
                  <defs>
                    <pattern
                      id="lvif-grid"
                      width="32"
                      height="32"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M32 0H0V32"
                        fill="none"
                        stroke="#ffffff"
                        strokeOpacity="0.045"
                        strokeWidth="1"
                      />
                    </pattern>
                    <linearGradient id="lvif-land" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2c2c29" />
                      <stop offset="100%" stopColor="#1c1c1a" />
                    </linearGradient>
                  </defs>

                  <rect width={W} height={H} fill="#0f0f0e" />
                  <rect width={W} height={H} fill="url(#lvif-grid)" />

                  {/* Pays voisins : présents pour situer, volontairement effacés. */}
                  <path d={map.context} fill="#1a1a18" stroke="#242422" strokeWidth="1" />

                  {/* France, région par région : le découpage donne de la
                      matière sans qu'on ait à charger un fond de carte.
                      Chaque région est bordée d'un filet lime discret ; on
                      n'ajoute pas de contour national par-dessus, les deux
                      jeux de données n'ayant pas la même finesse. */}
                  <g
                    stroke="var(--color-lime)"
                    strokeOpacity="0.28"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                  >
                    {map.regions.map((region) => (
                      <path key={region.name} d={region.d} fill="url(#lvif-land)" />
                    ))}
                  </g>

                  {SITES.filter((site) => !site.hub).map((site) => (
                    <Pin
                      key={site.name}
                      site={site}
                      zoom={zoom}
                      active={site.name === active}
                      onSelect={setActive}
                    />
                  ))}
                  {hubs.map((site) => (
                    <Pin
                      key={site.name}
                      site={site}
                      zoom={zoom}
                      active={site.name === active}
                      onSelect={setActive}
                    />
                  ))}
                </svg>

                <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-[0.72rem] font-semibold text-white/80 backdrop-blur-sm">
                  {current.name}
                  {current.hub ? ` · ${current.hub}` : ' · zone d’intervention'}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {/* Sur mobile la liste occupait cinq lignes : elle défile
                  désormais horizontalement, sur une seule. */}
              <ul
                className="no-scrollbar mt-5 flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible"
                aria-label="Sélection d'une ville"
              >
                {SITES.map((site) => (
                  <li key={site.name} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActive(site.name)}
                      aria-pressed={site.name === active}
                      className={`min-h-[38px] rounded-full px-3.5 py-2 text-[0.75rem] font-semibold transition-colors ${
                        site.name === active
                          ? 'bg-lime text-ink'
                          : 'bg-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {site.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-lime">Implantation</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="d2 mt-4 max-w-[13ch] text-white">
                Une implantation nationale et internationale
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-white/65">
                LED Visual Innovation intervient dans toute la France, notamment à Paris, Lyon,
                Lille, Marseille, Nantes, Toulouse et Bordeaux, pour accompagner les entreprises,
                collectivités et organisateurs d’événements dans leurs projets d’affichage LED.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-white/65">
                Nous réalisons également des installations à l’étranger, notamment en Suisse, au
                Luxembourg et en Allemagne, sur des événements nécessitant une logistique
                maîtrisée et un haut niveau d’exigence technique.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <dl className="mt-9 grid gap-4 sm:grid-cols-2">
                {hubs.map((site) => (
                  <div
                    key={site.name}
                    onMouseEnter={() => setActive(site.name)}
                    className={`rounded-[22px] border p-6 transition-colors duration-300 ${
                      site.name === active
                        ? 'border-lime/60 bg-white/[0.08]'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}
                  >
                    <dt className="eyebrow text-lime">{site.hub}</dt>
                    <dd className="mt-3 leading-relaxed text-white/80">{site.address}</dd>
                  </div>
                ))}
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
