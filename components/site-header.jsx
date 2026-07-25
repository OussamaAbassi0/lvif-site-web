'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BrandMark from './brand-mark';
import ArrowPill from './arrow-pill';
import { navigation, company } from '@/lib/content';

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  /* Au défilement, le bandeau de contact se replie : l'en-tête gagne
     36 px et laisse davantage de contenu visible. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* Bandeau de contact, comme sur le site actuel */}
      <div
        className={`hidden overflow-hidden bg-lime transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          scrolled ? 'h-0' : 'h-9'
        }`}
      >
        <div className="shell flex h-9 items-center justify-end gap-8 text-[0.8rem] font-semibold text-ink">
          <a href={`mailto:${company.email}`} className="sweep">
            {company.email}
          </a>
          <a href={company.phoneHref} className="sweep">
            {company.phone}
          </a>
        </div>
      </div>

      <div className="shell pt-3 lg:pt-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="LED Visual Innovation — accueil"
            className="grid h-[64px] shrink-0 place-items-center rounded-full bg-white px-6 shadow-[0_10px_30px_rgba(13,13,13,0.08)]"
          >
            <BrandMark width={78} />
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0_10px_30px_rgba(13,13,13,0.08)] lg:flex"
            aria-label="Navigation principale"
          >
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                    active ? 'bg-ink text-paper' : 'text-ink hover:bg-tile'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ArrowPill href="/devis" variant="lime" className="hidden sm:inline-flex">
              Devis gratuit
            </ArrowPill>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="grid h-[52px] w-[52px] place-items-center rounded-full bg-ink text-paper lg:hidden"
            >
              <span className="relative block h-[10px] w-[18px]" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded bg-current transition-transform duration-300 ${
                    open ? 'top-[4px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded bg-current transition-transform duration-300 ${
                    open ? 'top-[4px] -rotate-45' : 'top-[8px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div id="menu-mobile" hidden={!open} className="shell mt-3 lg:hidden">
        <div className="rounded-[28px] bg-white p-4 shadow-[0_24px_60px_rgba(13,13,13,0.14)]">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-line px-2 py-4 last:border-b-0"
            >
              <span className="d3">{item.label}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-tile text-ink">
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
                  <path
                    d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
          <ArrowPill href="/devis" variant="lime" className="mt-4 w-full justify-between">
            Devis gratuit
          </ArrowPill>
          <a
            href={company.phoneHref}
            className="mt-3 block text-center text-sm font-semibold text-muted"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
