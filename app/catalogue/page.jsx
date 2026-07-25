import Image from 'next/image';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import TrustMarquee from '@/components/trust-marquee';
import { ranges, pillars } from '@/lib/content';

export const metadata = {
  title: 'Nos écrans géants LED',
  description:
    'Écran LED extérieur, mur d’images, écran transparent, écran publicitaire, location événementielle, studios TV et salles de contrôle.',
};

export default function CataloguePage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Tous nos écrans géants LED"
        lead="Un écran géant n’est pas un produit sur étagère. Le pitch, la luminosité, l’indice de protection et le mode de fixation découlent du site et de l’usage."
        meta={[
          { label: 'Familles', value: '06' },
          { label: 'Garantie', value: '5 ans' },
          { label: 'Intervention', value: '48 h' },
        ]}
      />

      <section className="shell space-y-8 pb-20 md:space-y-10 md:pb-28">
        {ranges.map((range, index) => (
          <article
            key={range.slug}
            id={range.slug}
            className="scroll-mt-32 overflow-hidden rounded-[var(--radius-xl2)] bg-tile"
          >
            <div className="grid lg:grid-cols-12">
              <div
                className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[27rem] ${
                  index % 2 === 1 ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'
                }`}
              >
                <Image
                  src={range.image}
                  alt={range.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div
                className={`flex flex-col justify-center p-8 md:p-12 lg:p-14 ${
                  index % 2 === 1 ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'
                }`}
              >
                <Reveal>
                  <p className="eyebrow">{range.kicker}</p>
                </Reveal>
                <Reveal delay={70}>
                  <h2 className="d2 mt-4">{range.title}</h2>
                </Reveal>
                <Reveal delay={130}>
                  <p className="lead mt-6">{range.summary}</p>
                </Reveal>
                <Reveal delay={180}>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {range.specs.map((spec) => (
                      <li
                        key={spec}
                        className="rounded-full bg-white px-4 py-2 text-[0.78rem] font-semibold text-ink"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={230}>
                  <ArrowPill href="/devis" variant="ink" className="mt-9 self-start">
                    Chiffrer cette gamme
                  </ArrowPill>
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-lime">Inclus dans chaque projet</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="d2 mt-4 max-w-[18ch] text-white">
              Ce qui accompagne chaque écran, quelle que soit la gamme
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.index}
                delay={index * 80}
                className="rounded-[26px] bg-white/[0.06] p-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lime font-[family-name:var(--font-display)] text-sm font-extrabold text-ink">
                  {pillar.index}
                </span>
                <h3 className="d3 mt-6 text-white">{pillar.title}</h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-white/65">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustMarquee />

      <section className="shell pb-24 text-center md:pb-32">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[16ch]">
            Une configuration précise vaut mieux qu’un tarif au mètre carré
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPill href="/devis" variant="lime">
              Demander un devis
            </ArrowPill>
            <ArrowPill href="/realisations" variant="outline">
              Voir des installations comparables
            </ArrowPill>
          </div>
        </Reveal>
      </section>
    </>
  );
}
