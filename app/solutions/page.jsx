import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import TrustMarquee from '@/components/trust-marquee';
import { solutions } from '@/lib/pages';

export const metadata = {
  title: 'Solutions métiers',
  description:
    'Stand de salon, événementiel, studio TV, salle de contrôle, salle de réunion, pharmacie : nos dispositifs LED par métier.',
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions métiers"
        title="Un dispositif pensé pour votre métier"
        lead="Un plateau de tournage, une salle de contrôle et une vitrine d’officine n’ont ni la même distance de lecture, ni la même contrainte de luminosité, ni le même cadre réglementaire. Voici comment nous traitons chacun."
      />

      <section className="shell pb-24 md:pb-32">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={(index % 3) * 80}>
              <Link
                href={`/solutions/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-tile"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-7 md:p-8">
                  <span className="d3 block">{item.title}</span>
                  <span className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-muted">
                    {item.lead}
                  </span>
                  <span className="sweep mt-7 self-start text-[0.88rem] font-bold text-ink">
                    En savoir plus
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <TrustMarquee />

      <section className="shell py-24 text-center md:py-32">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[16ch]">
            Votre contexte n’est pas dans la liste ? Il l’est probablement quand même
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPill href="/devis" variant="lime">
              Décrire mon projet
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
