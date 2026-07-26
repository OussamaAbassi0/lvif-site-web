'use client';

/**
 * Pré-diagnostic du SAV.
 *
 * Le visiteur choisit son symptôme, obtient immédiatement la cause la plus
 * fréquente, ce qu'il peut vérifier lui-même et le délai qui s'applique — puis
 * seulement le formulaire, déjà rempli du symptôme retenu.
 *
 * L'ordre compte : donner la réponse avant de demander les coordonnées est ce
 * qui distingue un support d'un formulaire de contact déguisé.
 */

import { useState } from 'react';
import Reveal from './reveal';
import { symptoms, levels } from '@/lib/support';

const TONES = {
  alert: 'bg-[#ff5a3c] text-white',
  warn: 'bg-lime text-ink',
  calm: 'bg-white text-ink ring-1 ring-ink/10',
};

export default function SavTriage() {
  const [key, setKey] = useState(null);
  const [sent, setSent] = useState(false);
  const current = symptoms.find((item) => item.key === key);
  const level = current ? levels[current.level] : null;

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-5">
        <Reveal>
          <div className="rounded-[26px] bg-tile p-7 md:p-9">
            <p className="text-sm font-semibold text-ink">Que constatez-vous sur l’écran ?</p>
            <ul className="mt-5 space-y-2">
              {symptoms.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setKey(item.key);
                      setSent(false);
                    }}
                    aria-pressed={key === item.key}
                    className={`w-full rounded-2xl px-5 py-4 text-left text-[0.9rem] font-bold leading-snug transition-colors duration-300 ${
                      key === item.key
                        ? 'bg-ink text-paper'
                        : 'bg-white text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[0.82rem] leading-relaxed text-muted">
              Vous ne reconnaissez pas votre situation ? Décrivez-la directement dans le
              formulaire : la hotline reste jointe à chaque demande.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="min-w-0 lg:col-span-7">
        {!current && (
          <div className="flex h-full min-h-[22rem] flex-col justify-center rounded-[26px] border border-dashed border-ink/15 p-9 text-center">
            <p className="d3 max-w-[24ch] mx-auto text-muted">
              Sélectionnez un symptôme pour obtenir un premier diagnostic
            </p>
            <p className="mx-auto mt-4 max-w-[46ch] text-[0.9rem] leading-relaxed text-muted">
              Une panne d’écran LED sur trois se règle sans intervention. Autant le savoir avant
              d’attendre un rappel.
            </p>
          </div>
        )}

        {current && !sent && (
          <div className="rounded-[26px] bg-ink p-7 text-white md:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] ${
                  TONES[level.tone]
                }`}
              >
                {level.label}
              </span>
              <span className="text-[0.82rem] font-semibold text-lime">{level.sla}</span>
            </div>

            <h3 className="d3 mt-6 text-white">{current.label}</h3>
            <p className="mt-4 leading-relaxed text-white/65">{current.cause}</p>

            <p className="mt-8 text-[0.78rem] uppercase tracking-[0.14em] text-white/45">
              À vérifier avant de nous appeler
            </p>
            <ol className="mt-4 space-y-3">
              {current.checks.map((check, index) => (
                <li key={check} className="flex gap-4 text-[0.92rem] leading-relaxed text-white/80">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-[0.72rem] font-extrabold text-ink">
                    {index + 1}
                  </span>
                  {check}
                </li>
              ))}
            </ol>

            <p className="mt-6 rounded-2xl bg-white/[0.06] px-5 py-4 text-[0.85rem] leading-relaxed text-white/60">
              {level.note}
            </p>

            <form onSubmit={submit} className="mt-9 border-t border-white/10 pt-8">
              <p className="text-[0.78rem] uppercase tracking-[0.14em] text-white/45">
                Ouvrir un ticket
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { id: 'sav-nom', label: 'Nom et prénom', type: 'text', autoComplete: 'name' },
                  { id: 'sav-societe', label: 'Société', type: 'text', autoComplete: 'organization' },
                  { id: 'sav-email', label: 'Adresse e-mail', type: 'email', autoComplete: 'email' },
                  { id: 'sav-tel', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-[0.8rem] font-semibold text-white/70"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required
                      className="mt-2 w-full rounded-2xl bg-white/[0.08] px-5 py-3.5 text-[0.92rem] text-white outline-none ring-1 ring-white/10 transition focus:ring-lime"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sav-site"
                    className="block text-[0.8rem] font-semibold text-white/70"
                  >
                    Site d’installation
                  </label>
                  <input
                    id="sav-site"
                    type="text"
                    placeholder="Ville, enseigne ou adresse"
                    className="mt-2 w-full rounded-2xl bg-white/[0.08] px-5 py-3.5 text-[0.92rem] text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 transition focus:ring-lime"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sav-serie"
                    className="block text-[0.8rem] font-semibold text-white/70"
                  >
                    Numéro de série
                    <span className="ml-2 font-normal text-white/35">si disponible</span>
                  </label>
                  <input
                    id="sav-serie"
                    type="text"
                    placeholder="Étiquette au dos du premier caisson"
                    className="mt-2 w-full rounded-2xl bg-white/[0.08] px-5 py-3.5 text-[0.92rem] text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 transition focus:ring-lime"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="sav-detail"
                  className="block text-[0.8rem] font-semibold text-white/70"
                >
                  Précisions
                </label>
                <textarea
                  id="sav-detail"
                  rows={4}
                  defaultValue={`Symptôme : ${current.label}.\nDepuis le : \nVérifications déjà faites : `}
                  className="mt-2 w-full rounded-2xl bg-white/[0.08] px-5 py-3.5 text-[0.92rem] leading-relaxed text-white outline-none ring-1 ring-white/10 transition focus:ring-lime"
                />
              </div>

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-between gap-4 rounded-full bg-lime px-6 py-4 text-[0.92rem] font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Envoyer au support technique
                <span aria-hidden="true" className="text-[1.1rem]">
                  ↗
                </span>
              </button>
            </form>
          </div>
        )}

        {current && sent && (
          <div className="flex h-full flex-col justify-center rounded-[26px] bg-ink p-9 text-white md:p-12">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-[1.4rem] text-ink">
              ✓
            </span>
            <h3 className="d2 mt-7 max-w-[18ch] text-white">Ticket transmis au support</h3>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-white/65">
              Symptôme retenu : <strong className="text-white">{current.label}</strong>. Le délai
              qui s’applique est « {level.sla.toLowerCase()} ». Vous recevez une copie du ticket
              par e-mail avec le récapitulatif de vos vérifications.
            </p>
            <p className="mt-6 text-[0.82rem] text-white/40">
              Démonstration : aucune donnée n’est transmise depuis cette maquette.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
