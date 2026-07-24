import { clientNames } from '@/lib/content';

export default function ClientMarquee() {
  const sequence = [...clientNames, ...clientNames];

  return (
    <div
      className="relative flex overflow-hidden border-y border-hairline py-6"
      role="img"
      aria-label={`Références clients : ${clientNames.join(', ')}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
        {sequence.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="whitespace-nowrap font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-[0.06em] text-bone-faint [font-stretch:108%]"
          >
            {name}
            <span className="ml-12 text-signal-deep">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
