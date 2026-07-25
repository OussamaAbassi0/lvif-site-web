import Image from 'next/image';
import ScrollSequence from '@/components/scroll-sequence';
import HeroOverlay from '@/components/hero-overlay';
import TrustMarquee from '@/components/trust-marquee';
import SectionHead from '@/components/section-head';
import Reveal from '@/components/reveal';
import Counter from '@/components/counter';
import ProjectCard from '@/components/project-card';
import FaqList from '@/components/faq-list';
import CoverageMap from '@/components/coverage-map';
import Reviews from '@/components/reviews';
import Simulator from '@/components/simulator';
import ArrowPill from '@/components/arrow-pill';
import { keyFigures, pillars, ranges, projects, useCases } from '@/lib/content';

export default function HomePage() {
  const featured = projects.slice(0, 6);

  return (
    <>
      <ScrollSequence>
        <HeroOverlay />
      </ScrollSequence>

      {/* — Usages ——————————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Vous souhaitez ?"
          title="Un dispositif pensé pour votre contexte"
          lead="Salons, plateaux TV, fan zones, conférences, façades commerciales : chaque usage impose sa configuration de pitch, de luminosité et de fixation."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 80}>
              <a href={item.href} target="_blank" rel="noreferrer noopener" className="group block">
                <div className="card-media aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <h3 className="d3 max-w-[16ch]">{item.title}</h3>
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
                      <path
                        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* — Notre métier ————————————————————————————————— */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-lime">Notre métier</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="d2 mt-4 max-w-[16ch] text-white">
                  Quatre engagements qui tiennent après la signature
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={130}>
                <p className="lead text-white/70">
                  La plupart des acteurs du secteur revendent des dalles importées sous marque
                  blanche. Nous maîtrisons l’assemblage, le logiciel et le service après-vente —
                  les trois endroits où un projet d’affichage échoue habituellement.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.index}
                delay={index * 80}
                className="rounded-[26px] bg-white/[0.06] p-8 transition-colors duration-500 hover:bg-white/[0.11]"
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

      {/* — Chiffres ————————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {keyFigures.map((figure, index) => (
            <Reveal
              key={figure.label}
              delay={index * 80}
              className="rounded-[26px] bg-tile p-8 md:p-9"
            >
              <p className="stat text-[clamp(2.4rem,4.4vw,3.4rem)] text-ink">
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

      {/* — Gammes ———————————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="Nos écrans"
          title="Tous nos écrans géants LED"
          lead="Six familles couvrant l’achat comme la location, de la vitrine de commerce au dispositif de stade."
          aside={
            <ArrowPill href="/catalogue" variant="outline" className="mt-8">
              Voir le catalogue
            </ArrowPill>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ranges.map((range, index) => (
            <Reveal key={range.slug} delay={(index % 3) * 80}>
              <a href={`/catalogue#${range.slug}`} className="group flex h-full flex-col">
                <div className="card-media aspect-[16/11]">
                  <Image
                    src={range.image}
                    alt={range.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-1 pt-5">
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-muted">
                    {range.kicker}
                  </p>
                  <h3 className="d3 mt-2.5">{range.title}</h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">
                    {range.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {range.specs.map((spec) => (
                      <li
                        key={spec}
                        className="rounded-full bg-tile px-3 py-1.5 text-[0.72rem] font-semibold text-muted"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Simulator />

      <TrustMarquee />

      {/* — Réalisations ——————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="Réalisations"
          title="Nos dernières installations"
          lead="Stades, concessions, enseignes, salons, fan zones, plateaux TV. Une sélection parmi plus de 1 400 installations livrées depuis 2018."
          aside={
            <ArrowPill href="/realisations" variant="outline" className="mt-8">
              Toutes les réalisations
            </ArrowPill>
          }
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={`${project.client}-${project.year}`} delay={(index % 3) * 80}>
              <ProjectCard project={project} priority={index < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      <Reviews />

      <CoverageMap />

      {/* — FAQ ————————————————————————————————————————— */}
      <section className="shell py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Foire aux questions"
          title="Ce qu’un acheteur doit vérifier avant de signer"
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <FaqList />
        </div>
      </section>

      {/* — Appel à l'action ——————————————————————————————— */}
      <section className="shell pb-24 md:pb-32">
        <div className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-ink px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/25 blur-3xl"
          />
          <Reveal>
            <p className="eyebrow text-lime">Une question ? Un besoin ?</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="d2 mx-auto mt-5 max-w-[16ch] text-white">
              Notre équipe vous recontacte sous 24 h
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead mx-auto mt-6 text-white/70">
              Décrivez votre projet en quelques champs. Un technicien vous rappelle avec une
              configuration chiffrée, sans engagement.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ArrowPill href="/devis" variant="lime">
                Demander un devis
              </ArrowPill>
              <ArrowPill href="/realisations" variant="ghost-dark">
                Voir nos installations
              </ArrowPill>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
