import Reveal from './reveal';
import { reviews } from '@/lib/content';
import { REVIEW_SOURCES } from './social-icons';

/**
 * Preuve sociale condensée.
 *
 * Le site actuel empile un pavé de notation et un carrousel à flèches : deux
 * zones, beaucoup de hauteur, et une interaction que personne ne déclenche.
 * Ici tout tient sur une bande : les deux notations en en-tête, puis un rail
 * d'avis qui défile en continu et se fige au survol pour laisser lire.
 * Les deux sources sont cliquables — un dirigeant vérifie toujours.
 */

function Stars({ className = '' }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (unused, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[13px] w-[13px]">
          <path
            d="M10 1.6l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"
            fill="var(--color-ink)"
          />
        </svg>
      ))}
    </span>
  );
}

function SourceBadge({ source }) {
  const meta = REVIEW_SOURCES.find((item) => item.key === source.key);
  const Icon = meta.Icon;

  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center gap-4 rounded-full border border-line-strong bg-white py-2.5 pl-3 pr-6 transition-colors duration-300 hover:border-ink"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-tile transition-colors duration-300 group-hover:bg-lime">
        <Icon className="h-[17px] w-[17px]" />
      </span>
      <span className="leading-none">
        <span className="flex items-baseline gap-1.5">
          <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-tight text-ink">
            {source.score}
          </span>
          <span className="text-[0.78rem] font-semibold text-faint">/5</span>
          <Stars className="ml-1 translate-y-[-1px]" />
        </span>
        <span className="mt-1.5 block text-[0.74rem] text-muted">
          {source.count} avis · {source.label}
        </span>
      </span>
    </a>
  );
}

function ReviewCard({ review }) {
  const meta = REVIEW_SOURCES.find((item) => item.key === review.origin);
  const Icon = meta.Icon;

  return (
    <li className="flex w-[19rem] shrink-0 flex-col rounded-[24px] bg-tile p-6 md:w-[22rem]">
      <div className="flex items-center justify-between">
        <Stars />
        <Icon className="h-[15px] w-[15px] opacity-45" />
      </div>
      <blockquote className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-body">
        {review.text}
      </blockquote>
      <p className="mt-5 flex items-center gap-2 text-[0.78rem]">
        <span className="font-bold text-ink">{review.author}</span>
        <span className="h-1 w-1 rounded-full bg-line-strong" />
        <span className="text-faint">{review.date}</span>
      </p>
    </li>
  );
}

export default function Reviews() {
  const track = [...reviews.items, ...reviews.items];
  const total = reviews.sources.reduce((sum, source) => sum + source.count, 0);

  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Satisfaction · {total} avis vérifiés</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="d2 mt-4 max-w-[14ch]">Nos avis clients vérifiés</h2>
            </Reveal>
          </div>

          <Reveal delay={130}>
            <div className="flex flex-wrap gap-3">
              {reviews.sources.map((source) => (
                <SourceBadge key={source.key} source={source} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="rail relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-paper to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-paper to-transparent md:w-32" />
        <ul className="rail-track flex w-max items-stretch gap-4">
          {track.map((review, index) => (
            <ReviewCard key={`${review.author}-${index}`} review={review} />
          ))}
        </ul>
      </div>
    </section>
  );
}
