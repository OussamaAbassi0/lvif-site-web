import Link from 'next/link';
import BrandMark from './brand-mark';
import ArrowPill from './arrow-pill';
import { SOCIALS, REVIEW_SOURCES } from './social-icons';
import { company, cities, reviews } from '@/lib/content';
import { catalog, solutions } from '@/lib/pages';

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandMark light width={150} />
            <p className="mt-7 max-w-md leading-relaxed text-white/65">
              Fabricant français d’écrans géants LED. Conception, assemblage, installation,
              location et maintenance de dispositifs d’affichage dynamique grand format.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowPill href="/devis" variant="lime">
                Devis gratuit
              </ArrowPill>
            </div>
            <p className="mt-6 text-sm text-white/50">
              <a href={company.phoneHref} className="sweep font-semibold text-white">
                {company.phone}
              </a>
              <span className="mx-3 text-white/25">·</span>
              <a href={`mailto:${company.email}`} className="sweep">
                {company.email}
              </a>
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-lime">Nos écrans</p>
            <ul className="mt-6 space-y-3">
              {catalog.map((sheet) => (
                <li key={sheet.slug}>
                  <Link
                    href={`/catalogue/${sheet.slug}`}
                    className="sweep text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {sheet.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/location"
                  className="sweep text-sm text-white/65 transition-colors hover:text-white"
                >
                  Location d’écran géant
                </Link>
              </li>
            </ul>

            <p className="eyebrow mt-8 text-lime">Ressources</p>
            <ul className="mt-6 space-y-3">
              {[
                ['Blog et ressources', '/blog'],
                ['Réalisations clients', '/realisations'],
                ['Qui sommes-nous ?', '/a-propos'],
                ['SAV et support', '/sav'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="sweep text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8 text-lime">Solutions métiers</p>
            <ul className="mt-6 space-y-3">
              {solutions.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="sweep text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow text-lime">Nos adresses</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-white/45">Siège social</dt>
                <dd className="mt-1 text-white/75">{company.headquarters}</dd>
              </div>
              <div>
                <dt className="text-white/45">Centre logistique</dt>
                <dd className="mt-1 text-white/75">{company.logistics}</dd>
              </div>
            </dl>

            <p className="eyebrow mt-8 text-lime">Nous suivre</p>
            <div className="mt-4 flex gap-3">
              {[
                ['linkedin', company.linkedin],
                ['youtube', company.youtube],
                ['instagram', company.instagram],
              ].map(([key, href]) => {
                const social = SOCIALS.find((item) => item.key === key);
                const { Icon, label } = social;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-lime hover:text-ink"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>

            <p className="eyebrow mt-8 text-lime">Nos avis</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {reviews.sources.map((source) => {
                const { Icon, label } = REVIEW_SOURCES.find(
                  (item) => item.key === source.key,
                );
                return (
                  <a
                    key={source.key}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label} — ${source.score} sur 5, ${source.count} avis`}
                    className="group flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-4 transition-colors duration-300 hover:bg-lime"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink">
                      <Icon className="h-[13px] w-[13px]" />
                    </span>
                    <span className="text-[0.78rem] leading-none text-white/80 transition-colors duration-300 group-hover:text-ink">
                      <span className="font-bold text-white group-hover:text-ink">
                        {source.score}
                      </span>
                      /5 · {label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Bloc SAV, comme sur le site actuel — mais il mène à un
                pré-diagnostic plutôt qu'à un formulaire de plus. */}
            <Link
              href="/sav"
              className="group mt-8 block rounded-[22px] bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <p className="font-[family-name:var(--font-display)] text-[1.05rem] font-extrabold tracking-tight text-ink">
                SAV LED Visual Innovation
              </p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                Un dysfonctionnement ou une panne à signaler ? Obtenez un premier diagnostic
                immédiat et le délai d’intervention qui s’applique.
              </p>
              <span className="sweep mt-4 inline-block text-[0.82rem] font-bold text-ink">
                Contacter le support
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="eyebrow text-white/40">Zones d’intervention</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/50">
            {cities.join(' · ')}
          </p>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-[0.78rem] text-white/40">
          <p>
            {company.name} — {company.legal} · Capital {company.capital} · {company.rcs} · TVA{' '}
            {company.tva}
          </p>
          <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© Copyright 2026 | SAS LVIF</p>
            <p>
              Design &amp; intégration par{' '}
              <a
                href="https://oussamaabassi.com"
                target="_blank"
                rel="noreferrer noopener"
                className="sweep font-semibold text-white/70 transition-colors hover:text-lime"
              >
                Oussamaabassi.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
