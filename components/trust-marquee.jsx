import Image from 'next/image';
import Reveal from './reveal';
import logos from '@/lib/logos-manifest.json';

/**
 * Bandeau de confiance.
 * Reprend la mosaïque du site actuel : tuiles arrondies claires de tailles
 * variables, deux rangées défilant en sens opposés, fondus sur les bords.
 *
 * Chaque marque affiche son logo lorsqu'il est disponible dans
 * lib/logos-manifest.json (rempli par scripts/fetch-logos.mjs), et retombe
 * sinon sur un traitement typographique.
 */

const ROW_A = [
  { slug: 'airbus', name: 'Airbus', size: 'lg' },
  { slug: 'besancon', name: 'Ville de Besançon', size: 'sm' },
  { slug: 'orpi', name: 'Orpi', size: 'sm' },
  { slug: 'credit-agricole', name: 'Crédit Agricole', size: 'sm' },
  { slug: 'vinci', name: 'Vinci', size: 'lg' },
  { slug: 'borealis', name: 'Borealis', size: 'sm' },
  { slug: 'leroy-merlin', name: 'Leroy Merlin', size: 'sm' },
  { slug: 'saint-gobain', name: 'Saint-Gobain', size: 'sm' },
  { slug: 'dassault-aviation', name: 'Dassault Aviation', size: 'lg' },
  { slug: 'thales', name: 'Thales', size: 'sm' },
  { slug: 'lefebvre-dalloz', name: 'Lefebvre Dalloz', size: 'sm' },
];

const ROW_B = [
  { slug: 'foir-fouille', name: 'La Foir’Fouille', size: 'sm' },
  { slug: 'aeroport-nice', name: 'Aéroport Nice Côte d’Azur', size: 'sm' },
  { slug: 'disney', name: 'Disney', size: 'lg' },
  { slug: 'sncf', name: 'SNCF', size: 'sm' },
  { slug: 'boconcept', name: 'BoConcept', size: 'sm' },
  { slug: 'viva-technology', name: 'Viva Technology', size: 'lg' },
  { slug: 'decathlon', name: 'Decathlon', size: 'md' },
  { slug: 'burger-king', name: 'Burger King', size: 'sm' },
  { slug: 'total-energies', name: 'TotalEnergies', size: 'sm' },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz', size: 'md' },
];

const SIZES = {
  sm: { box: 'w-[11rem] h-[8.5rem]', logo: 'max-h-[3.2rem] max-w-[7rem]', text: 'text-[0.92rem]' },
  md: { box: 'w-[14rem] h-[8.5rem]', logo: 'max-h-[3.4rem] max-w-[9.5rem]', text: 'text-[1.05rem]' },
  lg: {
    box: 'w-[17.5rem] h-[11.5rem]',
    logo: 'max-h-[4.6rem] max-w-[12rem]',
    text: 'text-[1.35rem]',
  },
};

function Tile({ slug, name, size }) {
  const preset = SIZES[size];
  const logo = logos[slug];

  return (
    <li
      className={`${preset.box} grid shrink-0 place-items-center rounded-[26px] bg-tile px-6 transition-colors duration-500 hover:bg-lime-wash`}
    >
      {logo ? (
        <span className={`relative grid place-items-center ${preset.logo} w-full h-full`}>
          <Image
            src={logo.src}
            alt={name}
            width={320}
            height={120}
            unoptimized
            loading="eager"
            className={`${preset.logo} h-auto w-auto object-contain opacity-80 grayscale transition-[filter,opacity] duration-500 hover:opacity-100`}
          />
        </span>
      ) : (
        <span
          className={`text-center font-[family-name:var(--font-display)] font-extrabold leading-tight tracking-tight text-ink ${preset.text}`}
        >
          {name}
        </span>
      )}
    </li>
  );
}

function Row({ items, direction }) {
  const sequence = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <ul
        className={`flex w-max items-center gap-4 ${
          direction === 'left' ? 'row-left' : 'row-right'
        }`}
        aria-hidden="true"
      >
        {sequence.map((item, index) => (
          <Tile key={`${item.slug}-${index}`} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default function TrustMarquee() {
  const all = [...ROW_A, ...ROW_B].map((item) => item.name);

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[20ch] text-center">
            Plus de 200 entreprises nationales et internationales nous font confiance
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mt-14 space-y-4"
        role="img"
        aria-label={`Références clients : ${all.join(', ')}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-40" />
        <Row items={ROW_A} direction="left" />
        <Row items={ROW_B} direction="right" />
      </div>
    </section>
  );
}
