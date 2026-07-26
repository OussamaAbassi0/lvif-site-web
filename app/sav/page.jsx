import PageHero from '@/components/page-hero';
import SavTriage from '@/components/sav-triage';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import { commitments } from '@/lib/support';
import { company } from '@/lib/content';

export const metadata = {
  title: 'SAV et support technique',
  description:
    'Un dysfonctionnement sur votre écran LED ? Obtenez un premier diagnostic immédiat, les vérifications à faire en deux minutes et le délai d’intervention qui s’applique.',
};

export default function SavPage() {
  return (
    <>
      <PageHero
        eyebrow="Support technique"
        title="Un dysfonctionnement ? Commençons par le diagnostic"
        lead="Avant d’attendre un rappel, identifiez ce qui se passe. Une panne d’écran LED sur trois vient d’une alimentation, d’un planning expiré ou d’un réglage — et se règle sans intervention."
      />

      <section className="shell pb-20 md:pb-28">
        <SavTriage />
      </section>

      {/* — Engagements ————————————————————————————————— */}
      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="d2 max-w-[12ch]">Ce sur quoi vous pouvez compter</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-6 leading-relaxed text-body">
                Une garantie ne vaut que par les conditions qui l’accompagnent. Les nôtres sont
                écrites ici plutôt que renvoyées à un contrat de maintenance annuel.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-8 rounded-[26px] bg-ink p-7 text-white">
                <p className="eyebrow text-lime">Urgence</p>
                <a
                  href={company.phoneHref}
                  className="d2 mt-4 block text-[1.7rem] text-white transition-colors hover:text-lime"
                >
                  {company.phone}
                </a>
                <p className="mt-4 text-[0.82rem] text-white/50">
                  Hotline technique gratuite · 5 j/7
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {commitments.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 80}
                  className="rounded-[26px] bg-tile p-7 md:p-8"
                >
                  <h3 className="d3 text-[1.05rem]">{item.title}</h3>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-24 text-center md:pb-32">
        <Reveal>
          <h2 className="d2 mx-auto max-w-[20ch]">
            Votre demande ne concerne pas une panne ?
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPill href="/devis" variant="lime">
              Demander un devis
            </ArrowPill>
            <ArrowPill href="/devis#rendez-vous" variant="outline">
              Prendre rendez-vous
            </ArrowPill>
          </div>
        </Reveal>
      </section>
    </>
  );
}
