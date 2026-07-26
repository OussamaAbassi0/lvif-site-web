import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import Reviews from '@/components/reviews';
import TrustMarquee from '@/components/trust-marquee';
import VideoPlayer from '@/components/video-player';
import { solutions } from '@/lib/pages';
import { videos } from '@/lib/videos';

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = solutions.find((entry) => entry.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.lead };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const item = solutions.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const others = solutions.filter((entry) => entry.slug !== slug);
  const video = videos[slug];

  return (
    <>
      <PageHero eyebrow="Solutions métiers" title={item.title} lead={item.lead} />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl2)] bg-tile">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[var(--radius-xl2)] bg-tile p-8 md:p-10">
              {item.body.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 30)} delay={index * 70}>
                  <p className={`leading-relaxed text-body ${index ? 'mt-5' : ''}`}>{paragraph}</p>
                </Reveal>
              ))}

              <Reveal delay={160}>
                <ul className="mt-8 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[0.92rem] leading-relaxed text-body">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-lime ring-1 ring-ink/15"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={220} className="mt-auto pt-9">
                <ArrowPill href="/devis" variant="lime">
                  Calculer mon tarif
                </ArrowPill>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Le plan tourné sur ce type d'installation, quand il existe. */}
      {video && (
        <section className="shell pb-20 md:pb-28">
          <VideoPlayer
            src={video.src}
            poster={video.poster}
            title={video.title}
            caption={video.caption}
            mode={video.mode}
            ratio={video.ratio}
          />
        </section>
      )}

      <TrustMarquee />

      <Reviews />

      <section className="shell pb-24 md:pb-32">
        <Reveal>
          <h2 className="d2 max-w-[16ch]">Les autres solutions métiers</h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {others.map((entry, index) => (
            <Reveal as="li" key={entry.slug} delay={(index % 5) * 60}>
              <Link
                href={`/solutions/${entry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-tile"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={entry.image}
                    alt={entry.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="block p-5 text-[0.92rem] font-bold leading-snug text-ink">
                  {entry.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
