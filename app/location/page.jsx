import Image from 'next/image';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import TabShowcase from '@/components/tab-showcase';
import TrustMarquee from '@/components/trust-marquee';
import Reviews from '@/components/reviews';
import Simulator from '@/components/simulator';
import { rental } from '@/lib/pages';
import { cities } from '@/lib/content';

export const metadata = {
  title: 'Location d’écran géant',
  description:
    'Location d’écrans géants LED pour festivals, concerts, événements sportifs, salons et fan zones. Livraison, montage, exploitation et démontage par nos équipes.',
};

export default function RentalPage() {
  return (
    <>
      <PageHero
        eyebrow="Location"
        title={rental.title}
        lead={rental.lead}
        meta={[
          { label: 'Durée mini', value: '1 jour' },
          { label: 'Montage', value: 'Inclus' },
          { label: 'Zones', value: 'FR · CH · LU' },
        ]}
      />

      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <div className="relative aspect-[16/7] overflow-hidden rounded-[var(--radius-xl2)] bg-tile">
            <Image
              src={rental.image}
              alt={rental.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={110}>
          <p className="lead mt-10 max-w-[70ch]">{rental.intro}</p>
        </Reveal>
      </section>

      <div id="usages" className="scroll-mt-32">
        <TabShowcase
          eyebrow="Configurations"
          title="Une formule par type d’événement"
          items={rental.usages}
        />
      </div>

      <Simulator />

      {/* — Déroulé ————————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[18ch] text-center">
            Comment se déroule une location
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {rental.steps.map((step, index) => (
            <Reveal key={step.index} delay={index * 80} className="rounded-[26px] bg-tile p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-lime font-[family-name:var(--font-display)] text-sm font-extrabold text-ink">
                {step.index}
              </span>
              <h3 className="d3 mt-6">{step.title}</h3>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <TrustMarquee />

      {/* — Villes ————————————————————————————————————— */}
      <section id="villes" className="shell scroll-mt-32 py-20 md:py-28">
        <div className="rounded-[var(--radius-xl2)] bg-ink p-8 text-white md:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-lime">Villes</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="d2 mt-4 max-w-[14ch] text-white">
                  Nous livrons dans toute la France
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-6 leading-relaxed text-white/65">
                  Le centre logistique se trouve à Saint-Rémy-sur-Avre, à une heure de Paris. Les
                  départs de nuit permettent une mise en place au petit matin, y compris à
                  l’autre bout du pays.
                </p>
              </Reveal>
              <Reveal delay={190}>
                <ArrowPill href="/devis" variant="lime" className="mt-9">
                  Vérifier une date
                </ArrowPill>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="flex flex-wrap gap-2">
                {cities.map((city, index) => (
                  <Reveal
                    as="li"
                    key={city}
                    delay={Math.min(index * 30, 300)}
                    className="rounded-full bg-white/10 px-5 py-3 text-[0.85rem] font-semibold text-white/85"
                  >
                    {city}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      <section className="shell pb-24 text-center md:pb-32">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[16ch]">
            Donnez-nous la date et le lieu, nous vérifions la disponibilité
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPill href="/devis" variant="lime">
              Demander un devis
            </ArrowPill>
            <ArrowPill href="/realisations" variant="outline">
              Voir des événements passés
            </ArrowPill>
          </div>
        </Reveal>
      </section>
    </>
  );
}
