import Reveal from './reveal';

export default function SectionHead({ eyebrow, title, lead, aside, center = false }) {
  if (center) {
    return (
      <div className="text-center">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={70}>
          <h2 className="d2 mx-auto mt-4 max-w-[20ch]">{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={130}>
            <p className="lead mx-auto mt-6">{lead}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-7">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={70}>
          <h2 className="d2 mt-4 max-w-[17ch]">{title}</h2>
        </Reveal>
      </div>
      <div className="lg:col-span-5">
        {lead && (
          <Reveal delay={130}>
            <p className="lead">{lead}</p>
          </Reveal>
        )}
        {aside && <Reveal delay={190}>{aside}</Reveal>}
      </div>
    </div>
  );
}
