import Reveal from './reveal';

/**
 * Bandeau de confiance.
 * Reprend le motif du site actuel : tuiles arrondies claires, deux rangées
 * défilant en sens opposés, dégradés de fondu sur les bords.
 */

const ROW_A = [
  { name: 'Airbus', w: 'w-[13rem]' },
  { name: 'Thales', w: 'w-[10rem]' },
  { name: 'Lefebvre Dalloz', w: 'w-[12rem]' },
  { name: 'Vinci', w: 'w-[13rem]' },
  { name: 'Orpi', w: 'w-[9rem]' },
  { name: 'Ville de Besançon', w: 'w-[12rem]' },
  { name: 'Crédit Agricole', w: 'w-[12rem]' },
  { name: 'Borealis', w: 'w-[10rem]' },
  { name: 'Leroy Merlin', w: 'w-[12rem]' },
  { name: 'Saint-Gobain', w: 'w-[11rem]' },
];

const ROW_B = [
  { name: 'Disney', w: 'w-[11rem]' },
  { name: 'SNCF', w: 'w-[9rem]' },
  { name: 'Dell', w: 'w-[9rem]' },
  { name: 'Burger King', w: 'w-[12rem]' },
  { name: 'Decathlon', w: 'w-[12rem]' },
  { name: 'BoConcept', w: 'w-[11rem]' },
  { name: 'Le Département du Var', w: 'w-[13rem]' },
  { name: 'Total Énergies', w: 'w-[12rem]' },
  { name: 'Autopolis', w: 'w-[11rem]' },
  { name: 'Moose', w: 'w-[9rem]' },
  { name: 'Mercedes-Benz', w: 'w-[12rem]' },
  { name: 'Air Liquide', w: 'w-[11rem]' },
];

function Tile({ name, w }) {
  return (
    <li
      className={`${w} grid h-[6.5rem] shrink-0 place-items-center rounded-[22px] bg-tile px-6 transition-colors duration-500 hover:bg-lime-wash`}
    >
      <span className="text-center font-[family-name:var(--font-display)] text-[0.95rem] font-bold leading-tight tracking-tight text-ink">
        {name}
      </span>
    </li>
  );
}

function Row({ items, direction }) {
  const sequence = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <ul
        className={`flex w-max gap-4 ${direction === 'left' ? 'row-left' : 'row-right'}`}
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
          <h2 className="d2 mx-auto max-w-[22ch] text-center">
            Plus de 200 entreprises nationales et internationales nous font confiance
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mt-12 space-y-4"
        role="img"
        aria-label={`Références clients : ${all.join(', ')}`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-32" />
        <Row items={ROW_A} direction="left" />
        <Row items={ROW_B} direction="right" />
      </div>
    </section>
  );
}
