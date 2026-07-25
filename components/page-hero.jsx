import Reveal from './reveal';

export default function PageHero({ eyebrow, title, lead, meta }) {
  return (
    <section className="shell pb-14 pt-36 md:pb-20 md:pt-44">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={70}>
        <h1 className="d1 mt-5 max-w-[14ch]">{title}</h1>
      </Reveal>
      <Reveal delay={130}>
        <p className="lead mt-7">{lead}</p>
      </Reveal>
      {meta && (
        <Reveal delay={190}>
          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label} className="rounded-[22px] bg-tile p-6">
                <dt className="eyebrow">{item.label}</dt>
                <dd className="stat mt-3 text-[2rem] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </section>
  );
}
