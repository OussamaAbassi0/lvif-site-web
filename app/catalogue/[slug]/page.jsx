import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import TabShowcase from '@/components/tab-showcase';
import TrustMarquee from '@/components/trust-marquee';
import Reviews from '@/components/reviews';
import Simulator from '@/components/simulator';
import Accordion from '@/components/accordion';
import { catalog } from '@/lib/pages';

export function generateStaticParams() {
  return catalog.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sheet = catalog.find((item) => item.slug === slug);
  if (!sheet) return {};
  return { title: sheet.title, description: sheet.lead };
}

export default async function RangePage({ params }) {
  const { slug } = await params;
  const sheet = catalog.find((item) => item.slug === slug);
  if (!sheet) notFound();

  const others = catalog.filter((item) => item.slug !== slug);

  return (
    <>
      <PageHero eyebrow={sheet.kicker} title={sheet.title} lead={sheet.lead} />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl2)] bg-tile">
                <Image
                  src={sheet.image}
                  alt={sheet.alt}
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
              <Reveal>
                <p className="leading-relaxed text-body">{sheet.intro}</p>
              </Reveal>
              <Reveal delay={90}>
                <div className="mt-auto flex flex-wrap gap-3 pt-9">
                  <ArrowPill href="/devis" variant="lime">
                    Calculer mon tarif
                  </ArrowPill>
                  <ArrowPill href="/realisations" variant="outline">
                    Voir des installations
                  </ArrowPill>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* — L'essentiel ————————————————————————————————— */}
      <section className="shell pb-20 md:pb-28">
        <div className="rounded-[var(--radius-xl2)] bg-ink p-8 text-white md:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-lime">Synthèse</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="d2 mt-4 max-w-[12ch] text-white">{sheet.essential.title}</h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-6 leading-relaxed text-white/65">{sheet.essential.body}</p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {sheet.essential.bullets.map((bullet, index) => (
                  <Reveal
                    as="li"
                    key={bullet}
                    delay={(index % 2) * 70}
                    className="flex gap-3 rounded-2xl bg-white/[0.06] p-5 text-[0.9rem] leading-relaxed text-white/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full bg-lime"
                    />
                    {bullet}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TrustMarquee />

      {sheet.variants && (
        <TabShowcase
          eyebrow="Configurations"
          title={sheet.variants.title}
          lead={sheet.variants.lead}
          items={sheet.variants.items}
        />
      )}

      <Simulator />

      <Reviews />

      {sheet.guide && (
        <section className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="d2 mx-auto max-w-[18ch] text-center">{sheet.guide.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sheet.guide.steps.map((step, index) => (
              <Reveal
                key={step.index}
                delay={index * 80}
                className="rounded-[26px] bg-tile p-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lime font-[family-name:var(--font-display)] text-sm font-extrabold text-ink">
                  {step.index}
                </span>
                <h3 className="d3 mt-6">{step.title}</h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {sheet.faq && (
        <section className="shell pb-20 md:pb-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">FAQ</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="d2 mt-4 max-w-[14ch]">En savoir plus sur {sheet.title.toLowerCase()}</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={sheet.faq} />
            </div>
          </div>
        </section>
      )}

      {/* — Autres gammes ————————————————————————————————— */}
      <section className="shell pb-24 md:pb-32">
        <Reveal>
          <h2 className="d2 max-w-[16ch]">Les autres familles d’écrans</h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {others.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={(index % 4) * 70}>
              <Link
                href={`/catalogue/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-tile"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="eyebrow">{item.kicker}</span>
                  <span className="d3 mt-3 block">{item.title}</span>
                  <span className="mt-4 text-[0.88rem] leading-relaxed text-muted">{item.lead}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
