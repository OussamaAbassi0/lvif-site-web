import Reveal from './reveal';

/**
 * Bandeau de confiance.
 * Reprend la mosaïque du site actuel : tuiles arrondies claires de tailles
 * variables, deux rangées défilant en sens opposés, fondus sur les bords.
 *
 * Les marques sont composées typographiquement. Pour une parité visuelle
 * exacte, il suffit de déposer les fichiers de logos dans public/logos/
 * et de renseigner `logo` sur chaque entrée.
 */

const ROW_A = [
  { name: 'Airbus', size: 'lg' },
  { name: 'Ville de Besançon', size: 'sm' },
  { name: 'Orpi', size: 'sm' },
  { name: 'Crédit Agricole', size: 'sm' },
  { name: 'Vinci', size: 'lg' },
  { name: 'Borealis', size: 'sm' },
  { name: 'Leroy Merlin', size: 'sm' },
  { name: 'Saint-Gobain', size: 'sm' },
  { name: 'Dassault Aviation', size: 'lg' },
  { name: 'Thales', size: 'sm' },
  { name: 'Lefebvre Dalloz', size: 'sm' },
];

const ROW_B = [
  { name: 'La Foir’Fouille', size: 'sm' },
  { name: 'Aéroport Nice Côte d’Azur', size: 'sm' },
  { name: 'Disney', size: 'lg' },
  { name: 'SNCF', size: 'sm' },
  { name: 'Kopp', size: 'sm' },
  { name: 'Lombard 07', size: 'sm' },
  { name: 'BoConcept', size: 'sm' },
  { name: 'Viva Technology', size: 'lg' },
  { name: 'Decathlon', size: 'md' },
  { name: 'Burger King', size: 'sm' },
  { name: 'Total Énergies', size: 'sm' },
  { name: 'Mercedes-Benz', size: 'md' },
];

const SIZES = {
  sm: 'w-[10.5rem] h-[8.5rem] text-[0.92rem]',
  md: 'w-[13.5rem] h-[8.5rem] text-[1.05rem]',
  lg: 'w-[17rem] h-[11.5rem] text-[1.35rem]',
};

function Tile({ name, size }) {
  return (
    <li
      className={`${SIZES[size]} grid shrink-0 place-items-center rounded-[26px] bg-tile px-6 transition-colors duration-500 hover:bg-lime-wash`}
    >
      <span className="text-center font-[family-name:var(--font-display)] font-extrabold leading-tight tracking-tight text-ink">
        {name}
      </span>
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
          <Tile key={`${item.name}-${index}`} {...item} />
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
