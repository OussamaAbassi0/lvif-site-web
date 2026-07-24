import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import { ranges, pillars } from '@/lib/content';

export const metadata = {
  title: 'Gammes d’écrans LED',
  description:
    'Écran LED extérieur, mur d’images, écran transparent, écran publicitaire, location événementielle, studios TV et salles de contrôle.',
};

export default function CataloguePage() {
  return (
    <>
      <PageHero
        index="A"
        label="Catalogue"
        title="Six familles d’écrans."
        lede="Un écran géant n’est pas un produit sur étagère. Le pitch, la luminosité, l’indice de protection et le mode de fixation découlent du site et de l’usage. Voici comment nous structurons l’offre."
        meta={[
          { label: 'Familles', value: '06' },
          { label: 'Garantie', value: '5 ans' },
          { label: 'Intervention', value: '48 h' },
        ]}
      />

      <section className="shell py-20 md:py-28">
        <div className="space-y-px border border-hairline bg-hairline">
          {ranges.map((range, index) => (
            <article
              key={range.slug}
              id={range.slug}
              className="scroll-mt-28 bg-ink"
            >
              <div className="grid lg:grid-cols-12">
                <div
                  className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[26rem] ${
                    index % 2 === 1 ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'
                  }`}
                >
                  <Image
                    src={range.image}
                    alt={range.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover grayscale-[0.3]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
                </div>

                <div
                  className={`flex flex-col justify-center p-8 md:p-14 ${
                    index % 2 === 1 ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'
                  }`}
                >
                  <Reveal>
                    <p className="slug flex items-center gap-4">
                      <span className="slug-signal">{String(index + 1).padStart(2, '0')}</span>
                      <span className="inline-block h-px w-8 bg-hairline" />
                      {range.kicker}
                    </p>
                  </Reveal>
                  <Reveal delay={70}>
                    <h2 className="display-lg mt-6">{range.title}</h2>
                  </Reveal>
                  <Reveal delay={130}>
                    <p className="lede mt-7 text-[1.05rem]">{range.summary}</p>
                  </Reveal>
                  <Reveal delay={190}>
                    <dl className="mt-9 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
                      {range.specs.map((spec) => (
                        <div key={spec} className="bg-ink px-4 py-4">
                          <dd className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase leading-relaxed tracking-[0.1em] text-bone-dim">
                            {spec}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                  <Reveal delay={240}>
                    <Link href="/devis" className="btn btn-ghost mt-9 self-start">
                      Chiffrer cette gamme
                    </Link>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="display-lg max-w-[18ch]">
              Ce qui accompagne chaque écran, quelle que soit la gamme.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.index}
                delay={index * 80}
                className="bg-ink-raised p-8"
              >
                <p className="numeral text-[2rem] text-signal">{pillar.index}</p>
                <h3 className="display-md mt-5 text-[1.35rem]">{pillar.title}</h3>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-bone-dim">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-24 text-center md:py-32">
        <Reveal>
          <h2 className="display-lg mx-auto max-w-[16ch]">
            Une configuration précise vaut mieux qu’un tarif au mètre carré.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/devis" className="btn btn-signal">
              Demander un devis
            </Link>
            <Link href="/realisations" className="btn btn-ghost">
              Voir des installations comparables
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
