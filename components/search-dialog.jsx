'use client';

/**
 * Recherche interne.
 *
 * Le site actuel a une loupe qui renvoie vers la recherche WordPress : une
 * page de résultats, un rechargement complet, aucun aperçu. Ici l'index tient
 * dans le bundle (une vingtaine de destinations), le filtrage est immédiat,
 * et les flèches du clavier suffisent à naviguer.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchIndex } from '@/lib/navigation';

/** Comparaison insensible aux accents : « evenementiel » doit trouver « événementiel ». */
const fold = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function SearchDialog({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const input = useRef(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    const id = window.setTimeout(() => input.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const results = useMemo(() => {
    const needle = fold(query.trim());
    if (!needle) return searchIndex.slice(0, 6);
    return searchIndex
      .map((entry) => {
        const label = fold(entry.label);
        const keywords = fold(entry.keywords);
        /* Un titre qui commence par la requête passe devant un simple mot-clé. */
        let score = 0;
        if (label.startsWith(needle)) score = 3;
        else if (label.includes(needle)) score = 2;
        else if (keywords.includes(needle)) score = 1;
        return { entry, score };
      })
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((row) => row.entry)
      .slice(0, 8);
  }, [query]);

  const go = (href) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((value) => Math.min(results.length - 1, value + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((value) => Math.max(0, value - 1));
    } else if (event.key === 'Enter' && results[cursor]) {
      event.preventDefault();
      go(results[cursor].href);
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Rechercher sur le site"
    >
      <button
        type="button"
        aria-label="Fermer la recherche"
        onClick={onClose}
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_rgba(13,13,13,0.28)]">
        <div className="flex items-center gap-3 border-b border-line px-6">
          <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-faint" aria-hidden="true" fill="none">
            <circle cx="8.6" cy="8.6" r="5.6" stroke="currentColor" strokeWidth="1.9" />
            <path d="M12.8 12.8 17 17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
          <input
            ref={input}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Écran extérieur, location, salle de contrôle…"
            aria-label="Votre recherche"
            className="w-full bg-transparent py-5 text-[1.05rem] text-ink outline-none placeholder:text-faint"
          />
        </div>

        {results.length === 0 ? (
          <p className="px-6 py-8 text-[0.92rem] text-muted">
            Aucune page ne correspond. Un technicien répond directement au{' '}
            <a href="tel:+33134902111" className="font-semibold text-ink">
              01 34 90 21 11
            </a>
            .
          </p>
        ) : (
          <ul className="max-h-[46vh] overflow-y-auto p-2">
            {results.map((entry, index) => (
              <li key={entry.href}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => go(entry.href)}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                    index === cursor ? 'bg-tile' : ''
                  }`}
                >
                  <span className="font-semibold text-ink">{entry.label}</span>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-faint">
                    {entry.kind}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="border-t border-line px-6 py-3 text-[0.74rem] text-faint">
          Flèches pour parcourir · Entrée pour ouvrir · Échap pour fermer
        </p>
      </div>
    </div>
  );
}
