import Link from 'next/link';
import Wordmark from './wordmark';
import { company, ranges, cities } from '@/lib/content';

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent opacity-40" />

      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="text-bone" />
            <p className="lede mt-7 max-w-md text-[1.05rem]">
              Fabricant français d’écrans géants LED. Conception, assemblage, installation,
              location et maintenance de dispositifs d’affichage dynamique grand format.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/devis" className="btn btn-signal">
                Devis gratuit
              </Link>
              <a href={company.phoneHref} className="btn btn-ghost">
                {company.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="slug">Gammes</p>
            <ul className="mt-6 space-y-3">
              {ranges.map((range) => (
                <li key={range.slug}>
                  <Link
                    href={`/catalogue#${range.slug}`}
                    className="sweep text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {range.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="slug">Adresses</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-bone-faint">Siège social</dt>
                <dd className="mt-1 text-bone-dim">{company.headquarters}</dd>
              </div>
              <div>
                <dt className="text-bone-faint">Centre logistique</dt>
                <dd className="mt-1 text-bone-dim">{company.logistics}</dd>
              </div>
              <div>
                <dt className="text-bone-faint">Contact</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${company.email}`}
                    className="sweep text-bone-dim transition-colors hover:text-bone"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
            </dl>

            <p className="slug mt-9">Nous suivre</p>
            <div className="mt-4 flex gap-5 text-sm">
              <a
                href={company.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="sweep text-bone-dim transition-colors hover:text-bone"
              >
                LinkedIn
              </a>
              <a
                href={company.youtube}
                target="_blank"
                rel="noreferrer noopener"
                className="sweep text-bone-dim transition-colors hover:text-bone"
              >
                YouTube
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="sweep text-bone-dim transition-colors hover:text-bone"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-hairline-soft pt-8">
          <p className="slug">Zones d’intervention</p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-bone-faint">
            {cities.join(' · ')}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline-soft pt-8 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-bone-faint md:flex-row md:items-center md:justify-between">
          <p>
            {company.name} — {company.legal} · {company.rcs} · TVA {company.tva}
          </p>
          <p className="text-signal-deep">
            Prototype de refonte · usage interne · non indexé
          </p>
        </div>
      </div>
    </footer>
  );
}
