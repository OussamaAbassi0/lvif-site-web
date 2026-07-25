import Link from 'next/link';
import BrandMark from './brand-mark';
import ArrowPill from './arrow-pill';
import { company, ranges, cities } from '@/lib/content';

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
            <div className="mt-4 flex gap-5 text-sm">
              {[
                ['LinkedIn', company.linkedin],
                ['YouTube', company.youtube],
                ['Instagram', company.instagram],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="sweep text-white/65 transition-colors hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="eyebrow text-white/40">Zones d’intervention</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/50">
            {cities.join(' · ')}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-[0.78rem] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            {company.name} — {company.legal} · Capital {company.capital} · {company.rcs} · TVA{' '}
            {company.tva}
          </p>
          <p className="text-lime/70">Prototype de refonte · usage interne · non indexé</p>
        </div>
      </div>
    </footer>
  );
}
