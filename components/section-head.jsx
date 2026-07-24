import Reveal from './reveal';

export default function SectionHead({ index, label, title, lede, aside }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <Reveal>
          <p className="slug flex items-center gap-4">
            <span className="slug-signal">{index}</span>
            <span className="inline-block h-px w-10 bg-hairline" />
            {label}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-lg mt-7 max-w-[18ch]">{title}</h2>
        </Reveal>
      </div>
      {(lede || aside) && (
        <div className="lg:col-span-5 lg:pt-14">
          {lede && (
            <Reveal delay={140}>
              <p className="lede">{lede}</p>
            </Reveal>
          )}
          {aside && <Reveal delay={200}>{aside}</Reveal>}
        </div>
      )}
    </div>
  );
}
