'use client';

/**
 * Récapitulatif de configuration, imprimable.
 *
 * Le manque du site actuel : aucun parcours ne produit de document. Le
 * visiteur repart sans trace, et l'acheteur qui doit convaincre sa direction
 * n'a rien à faire circuler. Ce récapitulatif est daté, nominatif, et tient
 * sur une page A4.
 *
 * Aucune bibliothèque PDF : la feuille de style d'impression suffit, et
 * l'impression navigateur produit un PDF propre sur toutes les plateformes.
 * Un composant client, parce qu'il lit les paramètres d'URL et déclenche
 * l'impression.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { company } from '@/lib/content';

const euro = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

export default function QuoteSummary() {
  const params = useSearchParams();
  const [issued, setIssued] = useState('');
  const [reference, setReference] = useState('');

  const config = useMemo(() => {
    const number = (key) => Number(params.get(key) || 0);
    return {
      mode: params.get('mode') === 'location' ? 'location' : 'achat',
      usage: params.get('usage') === 'interieur' ? 'Intérieur' : 'Extérieur',
      pitch: params.get('pitch') || 'P4',
      width: number('largeur'),
      height: number('hauteur'),
      surface: number('surface'),
      low: number('bas'),
      high: number('haut'),
      pixels: params.get('px') || '',
      days: number('jours'),
      monthly: number('mensuel'),
      payback: number('amortissement'),
    };
  }, [params]);

  /* Date et référence calculées après montage : au rendu serveur elles
     changeraient à chaque requête et casseraient l'hydratation. */
  useEffect(() => {
    const now = new Date();
    setIssued(
      now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    );
    setReference(
      `LVIF-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        Math.abs(Math.round(config.surface * 10) + config.high) % 10000,
      ).padStart(4, '0')}`,
    );
  }, [config.surface, config.high]);

  /* Virgule décimale : un document destiné à circuler chez le client ne peut
     pas afficher « 3.5 m ». */
  const fr = (value) => String(value).replace('.', ',');

  const rows = [
    ['Nature', config.mode === 'achat' ? 'Achat — installation fixe' : 'Location — événementiel'],
    ['Implantation', config.usage],
    ['Dimensions', `${fr(config.width)} m × ${fr(config.height)} m`],
    ['Surface', `${fr(config.surface.toFixed(1))} m²`],
    ['Finesse de dalle', `${config.pitch} — pas de ${fr(config.pitch.replace('P', ''))} mm`],
    ['Définition', config.pixels ? `${config.pixels.replace('x', ' × ')} pixels` : '—'],
    ...(config.mode === 'location' && config.days
      ? [['Durée de location', `${config.days} ${config.days > 1 ? 'jours' : 'jour'}`]]
      : []),
  ];

  return (
    <div className="shell pb-24 pt-36 md:pt-44 print:pt-0">
      {/* Barre d'action, absente du document imprimé */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <p className="eyebrow">Récapitulatif</p>
          <h1 className="d2 mt-3 max-w-[20ch]">Votre configuration, en une page</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-lime px-6 py-3.5 text-[0.9rem] font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Télécharger en PDF
          </button>
          <Link
            href="/devis"
            className="rounded-full bg-tile px-6 py-3.5 text-[0.9rem] font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Faire valider par un technicien
          </Link>
        </div>
      </div>

      {/* Document */}
      <article className="mx-auto max-w-3xl rounded-[var(--radius-xl2)] border border-ink/10 bg-white p-9 md:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/10 pb-8">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[1.3rem] font-extrabold tracking-tight text-ink">
              LED Visual Innovation
            </p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
              SAS LVIF · 49 rue de Ponthieu, 75008 Paris
              <br />
              {company.phone} · {company.email}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted">Référence</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-[1rem] font-extrabold text-ink">
              {reference || '—'}
            </p>
            <p className="mt-3 text-[0.78rem] text-muted">Établi le {issued || '—'}</p>
          </div>
        </header>

        <h2 className="d3 mt-9">Configuration retenue</h2>
        <dl className="mt-6 divide-y divide-ink/8">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="text-[0.88rem] text-muted">{label}</dt>
              <dd className="text-right text-[0.92rem] font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 rounded-[22px] bg-tile p-7 print:border print:border-ink/15 print:bg-white">
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            {config.mode === 'achat'
              ? 'Fourchette indicative — achat'
              : `Fourchette indicative — location ${config.days} ${config.days > 1 ? 'jours' : 'jour'}`}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,2.2rem)] font-extrabold tracking-tight text-ink">
            {euro(config.low)} — {euro(config.high)}
          </p>
          <p className="mt-4 text-[0.82rem] leading-relaxed text-muted">
            Hors structure, transport, montage et maintenance. Ce document est une estimation
            indicative issue du configurateur ; il ne constitue pas une offre commerciale.
          </p>
        </div>

        {config.payback > 0 && (
          <div className="mt-4 rounded-[22px] bg-ink p-7 text-white print:border print:border-ink print:bg-white print:text-ink">
            <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/45 print:text-muted">
              Retour sur investissement
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[1.6rem] font-extrabold tracking-tight text-lime print:text-ink">
              Amorti en {config.payback} mois
            </p>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-white/60 print:text-muted">
              Sur la base de {euro(config.monthly)} de recettes ou d’économies mensuelles, et du
              haut de la fourchette. La garantie couvre 5 ans, dont 3 ans pièces et main-d’œuvre.
            </p>
          </div>
        )}

        <h2 className="d3 mt-10">Ce qui reste à préciser</h2>
        <ul className="mt-5 space-y-2.5">
          {[
            'Nature du support : façade, mât acier, structure autoportée ou accroche événementielle.',
            'Alimentation disponible sur site et distance au tableau électrique.',
            'Contraintes locales d’affichage : luminosité nocturne, autorisation d’enseigne, règlement de publicité.',
            'Sources vidéo à raccorder et mode de diffusion souhaité.',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-[0.88rem] leading-relaxed text-body">
              <span
                aria-hidden="true"
                className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-ink"
              />
              {item}
            </li>
          ))}
        </ul>

        <footer className="mt-10 border-t border-ink/10 pt-6 text-[0.76rem] leading-relaxed text-muted">
          SAS LVIF au capital de 55 550 € · RCS Paris 839544764 · TVA FR10 839544764. Estimation
          valable 30 jours à compter de la date d’édition, sous réserve de validation technique.
        </footer>
      </article>
    </div>
  );
}
