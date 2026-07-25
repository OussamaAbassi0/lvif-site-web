import PageHero from '@/components/page-hero';
import QuoteForm from '@/components/quote-form';
import Reveal from '@/components/reveal';
import { company, pillars } from '@/lib/content';

export const metadata = {
  title: 'Devis gratuit',
  description:
    'Décrivez votre projet d’écran LED — achat ou location, intérieur ou extérieur — et recevez une estimation chiffrée sans engagement.',
};

export default function DevisPage() {
  return (
    <>
      <PageHero
        eyebrow="Devis"
        title="Une estimation, pas un tarif au hasard"
        lead="Quelques champs suffisent pour cadrer un projet. Un technicien reprend ensuite le dossier et vous rappelle avec une configuration chiffrée."
      />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="rounded-[var(--radius-xl2)] bg-tile p-6 md:p-10">
              <QuoteForm />
            </div>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-32 space-y-4">
              <div className="rounded-[26px] bg-ink p-8 text-white">
                <p className="eyebrow text-lime">Contact direct</p>
                <a
                  href={company.phoneHref}
                  className="d2 mt-4 block text-[1.8rem] text-white transition-colors hover:text-lime"
                >
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="sweep mt-4 inline-block break-all text-sm text-white/70"
                >
                  {company.email}
                </a>
                <p className="mt-6 text-[0.82rem] text-white/50">
                  Hotline technique gratuite · 5 j/7
                </p>
              </div>

              {pillars.map((pillar) => (
                <div key={pillar.index} className="rounded-[26px] bg-tile p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-lime font-[family-name:var(--font-display)] text-[0.8rem] font-extrabold text-ink">
                      {pillar.index}
                    </span>
                    <h2 className="d3 text-[1.05rem]">{pillar.title}</h2>
                  </div>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{pillar.body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="shell pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl2)] bg-ink px-8 py-14 text-white md:px-14 md:py-16">
          <Reveal>
            <h2 className="d2 max-w-[18ch] text-white">Ce qui se passe après l’envoi</h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Qualification',
                body: 'Un technicien reprend le dossier, vérifie la faisabilité et identifie les contraintes du site.',
              },
              {
                step: '02',
                title: 'Configuration chiffrée',
                body: 'Pitch, luminosité, structure, logiciel et maintenance sont proposés sous forme de configuration détaillée.',
              },
              {
                step: '03',
                title: 'Visite ou installation',
                body: 'Selon la complexité, une visite technique précède la pose. Les équipes intervenantes sont salariées.',
              },
            ].map((item, index) => (
              <Reveal
                key={item.step}
                as="li"
                delay={index * 90}
                className="rounded-[26px] bg-white/[0.06] p-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lime font-[family-name:var(--font-display)] text-sm font-extrabold text-ink">
                  {item.step}
                </span>
                <h3 className="d3 mt-6 text-white">{item.title}</h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-white/65">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
