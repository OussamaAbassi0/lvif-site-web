import Link from 'next/link';
import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ProjectFilter from '@/components/project-filter';
import ClientMarquee from '@/components/client-marquee';
import CoverageMap from '@/components/coverage-map';
import { projects } from '@/lib/content';

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

      <CoverageMap index="C" />

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
