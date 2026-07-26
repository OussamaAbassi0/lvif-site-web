import PageHero from '@/components/page-hero';
import Reveal from '@/components/reveal';
import ProjectFilter from '@/components/project-filter';
import TrustMarquee from '@/components/trust-marquee';
import CoverageMap from '@/components/coverage-map';
import ArrowPill from '@/components/arrow-pill';
import LiveRealisations from '@/components/live-realisations';
import { projects } from '@/lib/content';
import { REVALIDATE } from '@/lib/wordpress';

export const revalidate = REVALIDATE;

export const metadata = {
  title: 'Réalisations',
  description:
    'Stades, concessions, enseignes, salons, fan zones et plateaux TV : une sélection d’installations LED réalisées par LED Visual Innovation.',
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="La preuve avant le discours"
        lead="Une entreprise d’affichage dynamique se juge sur ses installations, pas sur sa page d’accueil. Voici une sélection vérifiable, avec le client, la ville et l’année."
        meta={[
          { label: 'Installations', value: '+1 400' },
          { label: 'Déployé en 2025', value: '2 160 m²' },
          { label: 'Clients', value: '+200' },
        ]}
      />

      {/* Flux WordPress d'abord : c'est le contenu le plus frais. */}
      <LiveRealisations limit={6} />

      <section className="shell pb-20 md:pb-28">
        <ProjectFilter projects={projects} />
      </section>

      <TrustMarquee />

      <CoverageMap />

      <section className="shell pb-24 text-center md:pb-32">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[15ch]">
            Votre installation peut rejoindre cette liste
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-9 flex justify-center">
            <ArrowPill href="/devis" variant="lime">
              Décrire mon projet
            </ArrowPill>
          </div>
        </Reveal>
      </section>
    </>
  );
}
