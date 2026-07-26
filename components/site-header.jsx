'use client';

/**
 * En-tête du site.
 *
 * Reprend l'ossature du site actuel — bandeau presse, bandeau de contact,
 * pilule de navigation flottante, menus déroulants illustrés, recherche —
 * avec deux différences de fond :
 *   le menu s'ouvre au survol comme au clavier, et se referme à l'Échap ;
 *   il n'y a qu'un seul niveau de profondeur, alors que le site actuel
 *   demande deux survols successifs pour atteindre une page produit.
 */

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import BrandMark from './brand-mark';
import ArrowPill from './arrow-pill';
import SearchDialog from './search-dialog';
import { navigation, pressNews } from '@/lib/navigation';
import { company } from '@/lib/content';

function MegaMenu({ item, onNavigate }) {
  return (
    <div className="grid gap-8 p-8 md:grid-cols-2 md:gap-10">
      {item.columns.map((column) => (
        <div key={column.title}>
          <p className="eyebrow">{column.title}</p>
          <ul className="mt-5 space-y-1">
            {column.items.map((entry) => (
              <li key={entry.label + entry.href}>
                <Link
                  href={entry.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-4 rounded-2xl p-2 transition-colors duration-300 hover:bg-tile"
                >
                  <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-tile">
                    <Image
                      src={entry.image}
                      alt=""
                      fill
                      sizes="80px"
                      /* Chargées avec la page : le menu s'ouvre au survol, on
                         ne peut pas attendre le premier affichage pour lancer
                         la requête sans montrer des cases vides. */
                      loading="eager"
                      fetchPriority="low"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="text-[0.95rem] font-semibold leading-snug text-ink">
                    {entry.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="md:col-span-2">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="sweep inline-flex text-[0.9rem] font-bold text-ink"
        >
          Tout voir : {item.label}
        </Link>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null);
  const [search, setSearch] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const timer = useRef(null);
  const shell = useRef(null);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setExpanded(null);
  }, [pathname]);

  /* Au défilement, les bandeaux du haut se replient : l'en-tête gagne
     une soixantaine de pixels et laisse voir davantage de contenu. */
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

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenu(null);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Petit délai à la sortie : sans lui, traverser l'espace entre l'onglet
     et son panneau referme le menu sous le curseur. */
  const hoverOpen = (label) => {
    window.clearTimeout(timer.current);
    setMenu(label);
  };
  const hoverClose = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(null), 160);
  };

  /**
   * Fermeture sur la position réelle du pointeur.
   *
   * `onMouseLeave` seul ne suffisait pas : quand le curseur sort par un bord
   * où un enfant vient d'être masqué, ou passe d'un panneau à l'autre, React
   * n'émet pas toujours l'événement et le menu restait ouvert. On regarde
   * donc si le pointeur est encore dans la boîte de l'en-tête ; c'est la
   * seule information qui ne peut pas être ratée.
   */
  useEffect(() => {
    if (!menu) return undefined;
    const node = shell.current;
    if (!node) return undefined;

    const check = (event) => {
      const box = node.getBoundingClientRect();
      const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      if (!inside) {
        window.clearTimeout(timer.current);
        setMenu(null);
      }
    };

    window.addEventListener('pointermove', check, { passive: true });
    window.addEventListener('scroll', () => setMenu(null), { passive: true, once: true });
    return () => window.removeEventListener('pointermove', check);
  }, [menu]);

  const active = (href) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]" onMouseLeave={hoverClose}>
        <div
          className={`overflow-hidden transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? 'h-0' : 'h-7 lg:h-16'
          }`}
        >
          {/* Actualité presse : la mention M6 est l'argument de confiance le
              plus fort de la page, elle reste au-dessus de tout. */}
          <Link
            href={pressNews.href}
            className="flex h-7 items-center justify-center bg-ink px-4 text-[0.72rem] font-semibold text-white transition-colors hover:text-lime"
          >
            <span className="truncate">{pressNews.text}</span>
          </Link>
          <div className="hidden h-9 bg-lime lg:block">
            <div className="shell flex h-9 items-center justify-end gap-8 text-[0.8rem] font-semibold text-ink">
              <a href={`mailto:${company.email}`} className="sweep">
                {company.email}
              </a>
              <a href={company.phoneHref} className="sweep">
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        <div ref={shell} className="shell pt-3 lg:pt-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="LED Visual Innovation — accueil"
              className="grid h-[64px] shrink-0 place-items-center rounded-full bg-white px-6 shadow-[0_10px_30px_rgba(13,13,13,0.08)]"
            >
              <BrandMark width={78} />
            </Link>

            {/* L'arrivée du Blog a porté la barre à six entrées : les libellés
                les plus longs passaient à la ligne. Le texte est resserré et
                le retour à la ligne interdit — une entrée de menu sur deux
                lignes fait amateur. La taille remonte à partir de 1280 px,
                où la place ne manque plus. */}
            <nav
              className="relative hidden min-w-0 items-center gap-0.5 rounded-full bg-white px-2.5 py-2 shadow-[0_10px_30px_rgba(13,13,13,0.08)] lg:flex xl:gap-1 xl:px-3"
              aria-label="Navigation principale"
            >
              {navigation.map((item) => (
                <div
                  key={item.href}
                  onMouseEnter={() => (item.columns ? hoverOpen(item.label) : hoverClose())}
                >
                  <Link
                    href={item.href}
                    aria-current={active(item.href) ? 'page' : undefined}
                    aria-expanded={item.columns ? menu === item.label : undefined}
                    onFocus={() => item.columns && hoverOpen(item.label)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2.5 text-[0.8rem] font-semibold transition-colors xl:gap-2 xl:px-4 xl:text-[0.88rem] ${
                      active(item.href) ? 'bg-ink text-paper' : 'text-ink hover:bg-tile'
                    }`}
                  >
                    {item.label}
                    {item.columns && (
                      <svg
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        className={`h-[6px] w-[10px] transition-transform duration-300 ${
                          menu === item.label ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ArrowPill href="/devis" variant="lime" className="hidden sm:inline-flex">
                Devis gratuit
              </ArrowPill>

              <button
                type="button"
                onClick={() => setSearch(true)}
                aria-label="Rechercher sur le site"
                className="hidden h-[52px] w-[52px] place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-ink-2 sm:grid"
              >
                <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden="true" fill="none">
                  <circle cx="8.6" cy="8.6" r="5.6" stroke="currentColor" strokeWidth="1.9" />
                  <path
                    d="M12.8 12.8 17 17"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

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

          {/* Panneau déroulant, aligné sur la largeur de la page. */}
          {navigation
            .filter((item) => item.columns)
            .map((item) => (
              <div
                key={`panel-${item.href}`}
                hidden={menu !== item.label}
                onMouseEnter={() => hoverOpen(item.label)}
                className="mt-3 hidden lg:block"
              >
                <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(13,13,13,0.16)]">
                  <MegaMenu item={item} onNavigate={() => setMenu(null)} />
                </div>
              </div>
            ))}
        </div>

        {/* Menu mobile : accordéon, pour éviter le double survol du site actuel. */}
        <div id="menu-mobile" hidden={!open} className="shell mt-3 max-h-[78svh] overflow-y-auto lg:hidden">
          <div className="rounded-[28px] bg-white p-4 shadow-[0_24px_60px_rgba(13,13,13,0.14)]">
            {navigation.map((item) => (
              <div key={item.href} className="border-b border-line last:border-b-0">
                {item.columns ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((value) => (value === item.label ? null : item.label))
                      }
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between px-2 py-4 text-left"
                    >
                      <span className="d3">{item.label}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-tile text-ink">
                        <svg viewBox="0 0 10 6" className="h-[7px] w-[11px]" aria-hidden="true">
                          <path
                            d="M1 1l4 4 4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            className={expanded === item.label ? 'origin-center' : ''}
                          />
                        </svg>
                      </span>
                    </button>
                    {expanded === item.label && (
                      <ul className="pb-4">
                        {item.columns.flatMap((column) => column.items).map((entry) => (
                          <li key={entry.label + entry.href}>
                            <Link
                              href={entry.href}
                              className="flex items-center gap-3 rounded-2xl p-2 hover:bg-tile"
                            >
                              <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-tile">
                                <Image src={entry.image} alt="" fill sizes="64px" className="object-cover" />
                              </span>
                              <span className="text-[0.9rem] font-semibold text-ink">
                                {entry.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                        <li className="mt-2 px-2">
                          <Link href={item.href} className="sweep text-[0.85rem] font-bold text-muted">
                            Tout voir
                          </Link>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="flex items-center justify-between px-2 py-4">
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
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearch(true);
              }}
              className="mt-4 flex w-full items-center gap-3 rounded-full bg-tile px-5 py-3.5 text-[0.9rem] font-semibold text-muted"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none">
                <circle cx="8.6" cy="8.6" r="5.6" stroke="currentColor" strokeWidth="1.9" />
                <path d="M12.8 12.8 17 17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
              Rechercher sur le site
            </button>

            <ArrowPill href="/devis" variant="lime" className="mt-3 w-full justify-between">
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

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
