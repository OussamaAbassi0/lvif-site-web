import Reveal from './reveal';
import { reviews } from '@/lib/content';

function Stars({ score = 5, className = '' }) {
  return (
    <span className={`inline-flex gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (unused, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4">
          <path
            d="M10 1.6l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"
            fill={i < score ? 'var(--color-ink)' : '#d8d8d2'}
          />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">Satisfaction</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="d2 mt-4 max-w-[12ch]">Nos avis clients vérifiés</h2>
          </Reveal>
          <Reveal delay={130}>
            <div className="mt-8 rounded-[26px] bg-lime p-7">
              <p className="stat text-[3.4rem] text-ink">
                {reviews.score}
                <span className="text-[1.6rem]">/5</span>
              </p>
              <Stars score={reviews.score} className="mt-4" />
              <p className="mt-4 text-[0.92rem] font-semibold leading-snug text-ink">
                Basé sur {reviews.count} avis
              </p>
              <p className="mt-1 text-[0.82rem] text-ink/65">{reviews.source}</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {reviews.items.map((review, index) => (
              <Reveal
                as="li"
                key={`${review.author}-${review.date}`}
                delay={(index % 2) * 80}
                className="flex flex-col rounded-[26px] bg-tile p-7"
              >
                <Stars score={5} />
                <blockquote className="mt-5 flex-1 text-[1rem] leading-relaxed text-ink">
                  « {review.text} »
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[0.82rem]">
                  <span className="font-bold text-ink">{review.author}</span>
                  <span className="text-faint">{review.date}</span>
                </figcaption>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
