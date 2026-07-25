import Link from 'next/link';
import BrandMark from './brand-mark';
import ArrowPill from './arrow-pill';
import { SOCIALS, REVIEW_SOURCES } from './social-icons';
import { company, ranges, cities, reviews } from '@/lib/content';

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
              {ranges.map((range) => (
                <li key={range.slug}>
                  <Link
                    href={`/catalogue#${range.slug}`}
                    className="sweep text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {range.title}
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
