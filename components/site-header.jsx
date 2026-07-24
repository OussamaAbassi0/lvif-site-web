'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Wordmark from './wordmark';
import { navigation, company } from '@/lib/content';

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? 'border-hairline bg-ink/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6 md:h-[80px]">
        <Link href="/" className="group shrink-0" aria-label="LED Visual Innovation — accueil">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`sweep font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                  active ? 'text-signal' : 'text-bone-dim hover:text-bone'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.14em] text-bone-dim transition-colors hover:text-signal md:block"
          >
            {company.phone}
          </a>
          <Link href="/devis" className="btn btn-signal hidden sm:inline-flex">
            Devis gratuit
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex h-12 w-12 items-center justify-center border border-hairline text-bone transition-colors hover:border-signal hover:text-signal lg:hidden"
          >
            <span className="relative block h-[10px] w-[18px]" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  open ? 'top-[5px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  open ? 'top-[5px] -rotate-45' : 'top-[9px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-hairline bg-ink lg:hidden"
      >
        <div className="shell flex flex-col py-6">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline gap-4 border-b border-hairline-soft py-5 last:border-b-0"
            >
              <span className="slug slug-signal">{String(index + 1).padStart(2, '0')}</span>
              <span className="display-md">{item.label}</span>
            </Link>
          ))}
          <Link href="/devis" className="btn btn-signal mt-6 justify-center">
            Demander un devis
          </Link>
          <a
            href={company.phoneHref}
            className="mt-3 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-bone-dim"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
