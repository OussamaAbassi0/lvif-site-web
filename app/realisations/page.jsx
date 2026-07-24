import Link from 'next/link';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ProjectFilter from '@/components/project-filter';
import ClientMarquee from '@/components/client-marquee';
import { projects, cities } from '@/lib/content';

export const metadata = {
  title: 'Réalisations',
  description:
    'Stades, concessions, enseignes, salons, fan zones et plateaux TV : une sélection d’installations LED réalisées par LED Visual Innovation.',
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        index="B"
        label="Réalisations"
        title="La preuve avant le discours."
        lede="Une entreprise d’affichage dynamique se juge sur ses installations, pas sur sa page d’accueil. Voici une sélection vérifiable, avec le client, la ville et l’année."
        meta={[
          { label: 'Installations', value: '+1 400' },
          { label: 'Déployé en 2025', value: '2 160 m²' },
          { label: 'Clients', value: '+200' },
        ]}
      />

      <section className="shell py-20 md:py-28">
        <ProjectFilter projects={projects} />
      </section>

      <ClientMarquee />

      <section className="shell py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="slug flex items-center gap-4">
                <span className="slug-signal">C</span>
                <span className="inline-block h-px w-10 bg-hairline" />
                Implantation
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-7 max-w-[14ch]">
                Nationale, et au-delà des frontières.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="lede">
                Basées en région parisienne, nos équipes interviennent sur l’ensemble du
                territoire français, ainsi qu’en Suisse, au Luxembourg et en Allemagne, sur des
                événements exigeant une logistique maîtrisée.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {cities.map((city) => (
                  <li
                    key={city}
                    className="border border-hairline px-3.5 py-2 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-bone-dim transition-colors hover:border-signal hover:text-signal"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-hairline">
        <div className="pixelfield pointer-events-none absolute inset-0 opacity-40" />
        <div className="shell relative py-24 text-center md:py-32">
          <Reveal>
            <h2 className="display-lg mx-auto max-w-[16ch]">
              Votre installation peut rejoindre cette liste.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link href="/devis" className="btn btn-signal mt-10">
              Décrire mon projet
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
