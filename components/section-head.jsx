import Reveal from './reveal';

/**
 * En-tête de section.
 *
 * `dark` inverse les couleurs pour les sections posées sur fond encre : sans
 * lui, le titre hériterait du noir et deviendrait illisible.
 */
export default function SectionHead({ eyebrow, title, lead, aside, center = false, dark = false }) {
  const eyebrowClass = dark ? 'eyebrow text-lime' : 'eyebrow';
  const titleClass = dark ? 'd2 text-white' : 'd2';
  const leadClass = dark ? 'lead text-white/70' : 'lead';

  if (center) {
    return (
      <div className="text-center">
        {eyebrow && (
          <Reveal>
            <p className={eyebrowClass}>{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={70}>
          <h2 className={`${titleClass} mx-auto mt-4 max-w-[20ch]`}>{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={130}>
            <p className={`${leadClass} mx-auto mt-6`}>{lead}</p>
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
            <p className={eyebrowClass}>{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={70}>
          <h2 className={`${titleClass} mt-4 max-w-[17ch]`}>{title}</h2>
        </Reveal>
      </div>
      <div className="lg:col-span-5">
        {lead && (
          <Reveal delay={130}>
            <p className={leadClass}>{lead}</p>
          </Reveal>
        )}
        {aside && <Reveal delay={190}>{aside}</Reveal>}
      </div>
    </div>
  );
}
