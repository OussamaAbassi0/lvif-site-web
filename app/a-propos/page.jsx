import Image from 'next/image';
import ScrollSequence from '@/components/scroll-sequence';
import AboutHeroOverlay from '@/components/about-hero-overlay';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import TabShowcase from '@/components/tab-showcase';
import TrustMarquee from '@/components/trust-marquee';
import Reviews from '@/components/reviews';
import CoverageMap from '@/components/coverage-map';
import Counter from '@/components/counter';
import { about } from '@/lib/pages';
import { keyFigures } from '@/lib/content';

export const metadata = {
  title: 'Qui sommes-nous ?',
  description:
    'LED Visual Innovation, fabricant français d’écrans géants LED : assemblage en France, garantie 5 ans, logiciel SmartView développé en interne, équipe technique intégrée.',
};

export default function AboutPage() {
  return (
    <>
      {/* Second clip du tournage : il ouvre cette page plutôt que d'allonger
          le hero d'accueil, où le visiteur ne l'atteignait qu'après trois
          écrans de défilement. */}
      <ScrollSequence name="apropos" poster="/frames/hero-a.jpg">
        <AboutHeroOverlay />
      </ScrollSequence>

      <section className="shell pb-20 pt-20 md:pb-28 md:pt-28">
        <Reveal>
          <p className="lead max-w-[70ch]">{about.intro}</p>
        </Reveal>
      </section>

      {/* — Notre expertise ————————————————————————————————— */}
      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="d2 max-w-[12ch]">{about.expertise.title}</h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="mt-7 text-[1.05rem] font-semibold leading-relaxed text-ink">
                {about.expertise.strong}
              </p>
            </Reveal>
            {about.expertise.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 30)} delay={130 + index * 50}>
                <p className="mt-5 leading-relaxed text-body">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ArrowPill href="/realisations" variant="lime">
                  Nos réalisations
                </ArrowPill>
                <ArrowPill href="/devis" variant="outline">
                  Nous contacter
                </ArrowPill>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={90}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl2)] bg-tile lg:sticky lg:top-32">
                <Image
                  src={about.expertise.image}
                  alt={about.expertise.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Chiffres ————————————————————————————————————— */}
      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {keyFigures.map((figure, index) => (
            <Reveal
              key={figure.label}
              delay={index * 80}
              className="rounded-[26px] bg-tile p-8 md:p-9"
            >
              <p className="stat text-[clamp(2.2rem,4vw,3rem)] text-ink">
                <Counter
                  value={figure.value}
                  decimals={figure.decimals || 0}
                  prefix={figure.prefix || ''}
                  suffix={figure.suffix || ''}
                />
              </p>
              <p className="mt-5 max-w-[20ch] font-semibold leading-snug text-ink">
                {figure.label}
              </p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{figure.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <TabShowcase
        eyebrow="En savoir plus"
        title="Ce qui distingue LED Visual Innovation"
        items={about.more}
      />

      {/* — L'équipe ————————————————————————————————————— */}
      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <figure className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-tile">
            <Image
              src={about.team.image}
              alt={about.team.alt}
              width={1440}
              height={960}
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="h-auto w-full object-cover"
            />
            <figcaption className="absolute bottom-4 right-4 max-w-[22rem] rounded-[22px] bg-white p-5 shadow-[0_18px_40px_rgba(13,13,13,0.18)] md:bottom-6 md:right-6 md:p-6">
              <p className="font-[family-name:var(--font-display)] text-[1.1rem] font-extrabold leading-tight tracking-tight text-ink">
                {about.team.caption}
              </p>
              <p className="mt-2 text-[0.85rem] text-muted">{about.team.note}</p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="d2 max-w-[14ch]">{about.references.title}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={90}>
              <p className="lead">{about.references.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <TrustMarquee />

      <TabShowcase
        eyebrow="Usages"
        title="Des solutions adaptées à chaque usage"
        lead="Chaque contexte exige une configuration spécifique. Nous analysons la luminosité ambiante, la distance de vision, la fréquence d’utilisation, l’environnement climatique et les contraintes techniques du site."
        items={about.usages}
      />

      <Reviews />

      <CoverageMap />

      {/* — IA et presse ————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="h-full rounded-[var(--radius-xl2)] bg-tile p-8 md:p-12">
              <Reveal>
                <p className="eyebrow">Perspective</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="d2 mt-4 max-w-[16ch]">{about.future.title}</h2>
              </Reveal>
              {about.future.body.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 30)} delay={130 + index * 50}>
                  <p className="mt-5 leading-relaxed text-body">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="presse" className="scroll-mt-32 lg:col-span-5">
            <div className="flex h-full flex-col rounded-[var(--radius-xl2)] bg-ink p-8 text-white md:p-12">
              <Reveal>
                <p className="eyebrow text-lime">Presse</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="d2 mt-4 max-w-[12ch] text-white">{about.press.title}</h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-6 leading-relaxed text-white/65">{about.press.body}</p>
              </Reveal>
              <Reveal delay={190}>
                <div className="mt-auto pt-10">
                  <span className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-[0.85rem] font-bold">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-[0.7rem] text-ink">
                      M6
                    </span>
                    66 minutes
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-24 text-center md:pb-32">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[16ch]">
            Parlons de votre projet avec un technicien, pas un commercial
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPill href="/devis" variant="lime">
              Demander un devis
            </ArrowPill>
            <ArrowPill href="/catalogue" variant="outline">
              Voir le catalogue
            </ArrowPill>
          </div>
        </Reveal>
      </section>
    </>
  );
}
