import Reveal from './reveal';

export default function PageHero({ index, label, title, lede, meta }) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="pixelfield pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-signal-wash/30 to-transparent" />
      <div className="shell relative pb-20 pt-36 md:pb-28 md:pt-48">
        <Reveal>
          <p className="slug flex items-center gap-4">
            <span className="slug-signal">{index}</span>
            <span className="inline-block h-px w-10 bg-hairline" />
            {label}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display-xl mt-8 max-w-[15ch]">{title}</h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="lede mt-9">{lede}</p>
        </Reveal>
        {meta && (
          <Reveal delay={210}>
            <dl className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label} className="bg-ink p-6">
                  <dt className="slug">{item.label}</dt>
                  <dd className="numeral mt-3 text-[2rem] text-bone">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
