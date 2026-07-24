import Link from 'next/link';
import Image from 'next/image';
import ScrollVideoHero from '@/components/scroll-video-hero';
import ClientMarquee from '@/components/client-marquee';
import SectionHead from '@/components/section-head';
import Reveal from '@/components/reveal';
import Counter from '@/components/counter';
import ProjectCard from '@/components/project-card';
import FaqList from '@/components/faq-list';
import { keyFigures, pillars, ranges, projects, sectors } from '@/lib/content';

export default function HomePage() {
  const featured = projects.slice(0, 5);

  return (
    <>
      <ScrollVideoHero />

      <ClientMarquee />

      {/* — Chiffres clés ————————————————————————————————— */}
      <section className="shell py-24 md:py-36">
        <SectionHead
          index="01"
          label="Repères"
          title="Une trajectoire mesurable, pas une promesse."
          lede="Sept ans d’exploitation, un atelier de 11 000 m² à moins d’une heure de Paris, et des installations livrées dans toute l’Europe. Les chiffres qui suivent sont ceux du groupe."
        />

        <div className="mt-16 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {keyFigures.map((figure, index) => (
            <Reveal key={figure.label} delay={index * 90} className="bg-ink p-8 md:p-10">
              <p className="numeral text-[clamp(3rem,6vw,4.75rem)] text-bone">
                <Counter
                  value={figure.value}
                  decimals={figure.decimals || 0}
                  prefix={figure.prefix || ''}
                  suffix={figure.suffix || ''}
                />
              </p>
              <p className="mt-5 max-w-[22ch] text-[0.95rem] leading-snug text-bone">
                {figure.label}
              </p>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-bone-faint">
                {figure.note}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* — Différenciants ——————————————————————————————— */}
      <section className="relative overflow-hidden border-y border-hairline bg-ink-raised">
        <div className="pixelfield pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative py-24 md:py-36">
          <SectionHead
            index="02"
            label="Ce qui nous distingue"
            title="Quatre engagements qui tiennent après la signature."
            lede="La plupart des acteurs du secteur revendent des dalles importées sous marque blanche. Nous maîtrisons l’assemblage, le logiciel et le service après-vente — les trois endroits où un projet d’affichage échoue habituellement."
          />

          <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.index}
                delay={index * 80}
                className="group bg-ink-raised p-9 transition-colors duration-500 hover:bg-ink md:p-12"
              >
                <p className="numeral text-[2.5rem] text-signal transition-transform duration-500 group-hover:translate-x-1">
                  {pillar.index}
                </p>
                <h3 className="display-md mt-6">{pillar.title}</h3>
                <p className="mt-5 max-w-[46ch] leading-relaxed text-bone-dim">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Gammes ———————————————————————————————————————— */}
      <section className="shell py-24 md:py-36">
        <SectionHead
          index="03"
          label="Gammes"
          title="Un écran par usage, jamais un catalogue générique."
          lede="Luminosité ambiante, distance de vision, fréquence d’utilisation, contraintes climatiques : chaque paramètre oriente la configuration. Voici les six familles couvertes."
          aside={
            <Link href="/catalogue" className="btn btn-ghost mt-8">
              Explorer le catalogue
            </Link>
          }
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {ranges.map((range, index) => (
            <Reveal key={range.slug} delay={(index % 3) * 90}>
              <Link
                href={`/catalogue#${range.slug}`}
                className="group flex h-full flex-col border border-hairline bg-ink-raised transition-colors duration-500 hover:border-signal/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={range.image}
                    alt={range.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover grayscale-[0.4] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-raised to-transparent opacity-80" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="slug slug-signal">{range.kicker}</p>
                  <h3 className="display-md mt-4">{range.title}</h3>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-bone-dim">
                    {range.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {range.specs.map((spec) => (
                      <li
                        key={spec}
                        className="border border-hairline px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-bone-faint"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* — Réalisations ——————————————————————————————————— */}
      <section className="relative border-y border-hairline bg-ink-raised">
        <div className="shell py-24 md:py-36">
          <SectionHead
            index="04"
            label="Réalisations"
            title="Les références ne mentent pas."
            lede="Stades, concessions, enseignes, salons, fan zones, plateaux TV. Une sélection parmi plus de 1 400 installations livrées depuis 2018."
            aside={
              <Link href="/realisations" className="btn btn-ghost mt-8">
                Toutes les réalisations
              </Link>
            }
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ProjectCard project={featured[0]} priority size="wide" />
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <ProjectCard project={featured[1]} size="wide" />
            </Reveal>
            {featured.slice(2).map((project, index) => (
              <Reveal key={project.client} delay={index * 90} className="lg:col-span-4">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Secteurs ————————————————————————————————————— */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="slug flex items-center gap-4">
                <span className="slug-signal">05</span>
                <span className="inline-block h-px w-10 bg-hairline" />
                Secteurs
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-7 max-w-[15ch]">
                Huit contextes, une même méthode.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede mt-8">
                Nous analysons la luminosité ambiante, la distance de vision, l’environnement
                climatique et les contraintes du site avant de proposer une configuration. Jamais
                l’inverse.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-hairline">
              {sectors.map((sector, index) => (
                <Reveal
                  as="li"
                  key={sector}
                  delay={index * 55}
                  className="group flex items-baseline gap-6 border-b border-hairline py-6"
                >
                  <span className="slug w-8 shrink-0 transition-colors group-hover:text-signal">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="display-md flex-1 text-bone-dim transition-colors duration-300 group-hover:text-bone">
                    {sector}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* — FAQ ————————————————————————————————————————— */}
      <section className="relative border-t border-hairline bg-ink-raised">
        <div className="shell py-24 md:py-36">
          <SectionHead
            index="06"
            label="Questions fréquentes"
            title="Ce qu’un acheteur doit vérifier avant de signer."
            lede="Le nombre d’années de garantie affiché ne dit rien de ce qu’il couvre réellement. Ces six réponses reprennent les points sur lesquels les offres du marché divergent le plus."
          />
          <div className="mt-14">
            <FaqList />
          </div>
        </div>
      </section>

      {/* — Appel à l'action ——————————————————————————————— */}
      <section className="relative overflow-hidden border-t border-hairline">
        <div className="pixelfield pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-signal-wash/40 to-transparent" />
        <div className="shell relative py-28 text-center md:py-40">
          <Reveal>
            <p className="slug slug-signal">Prochaine étape</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="display-xl mx-auto mt-8 max-w-[14ch]">
              Parlons de votre surface.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mx-auto mt-8 text-center">
              Décrivez votre projet en quelques champs. Un technicien vous rappelle avec une
              estimation chiffrée, sans engagement.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Link href="/devis" className="btn btn-signal">
                Demander un devis
              </Link>
              <Link href="/realisations" className="btn btn-ghost">
                Voir nos installations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
