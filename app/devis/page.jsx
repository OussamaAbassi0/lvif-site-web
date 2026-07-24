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
        index="C"
        label="Devis"
        title="Une estimation, pas un tarif au hasard."
        lede="Quelques champs suffisent pour cadrer un projet. Un technicien reprend ensuite le dossier et vous rappelle avec une configuration chiffrée."
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <QuoteForm />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-px border border-hairline bg-hairline">
              <div className="bg-ink-raised p-8">
                <p className="slug slug-signal">Contact direct</p>
                <a
                  href={company.phoneHref}
                  className="display-md mt-5 block transition-colors hover:text-signal"
                >
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="sweep mt-4 inline-block break-all text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {company.email}
                </a>
                <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-bone-faint">
                  Hotline technique gratuite · 5 j/7
                </p>
              </div>

              {pillars.map((pillar) => (
                <div key={pillar.index} className="bg-ink-raised p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="slug slug-signal">{pillar.index}</span>
                    <h2 className="display-md text-[1.2rem]">{pillar.title}</h2>
                  </div>
                  <p className="mt-3 pl-[2.6rem] text-[0.88rem] leading-relaxed text-bone-dim">
                    {pillar.body}
                  </p>
                </div>
              ))}

              <div className="bg-ink-raised p-8">
                <p className="slug">Adresses</p>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                  <span className="text-bone-faint">Siège social</span>
                  <br />
                  {company.headquarters}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                  <span className="text-bone-faint">Centre logistique</span>
                  <br />
                  {company.logistics}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-raised">
        <div className="shell py-20 md:py-24">
          <Reveal>
            <h2 className="display-lg max-w-[20ch]">Ce qui se passe après l’envoi.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
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
              <Reveal key={item.step} as="li" delay={index * 90} className="bg-ink-raised p-8 md:p-10">
                <p className="numeral text-[2.25rem] text-signal">{item.step}</p>
                <h3 className="display-md mt-5 text-[1.35rem]">{item.title}</h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-bone-dim">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
