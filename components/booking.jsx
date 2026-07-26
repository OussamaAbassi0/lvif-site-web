'use client';

/**
 * Prise de rendez-vous.
 *
 * Le site actuel intègre un Calendly dans un iframe : police et couleurs
 * étrangères à la charte, un domaine tiers de plus à déclarer au bandeau
 * cookies, et une hauteur fixe qui force un second ascenseur sur mobile —
 * visible sur la capture du site officiel.
 *
 * Ici tout est local : mêmes tokens, aucun tiers, et un fichier .ics généré
 * dans le navigateur pour que le rendez-vous entre dans l'agenda du visiteur
 * sans qu'il ait de compte à créer.
 *
 * Les créneaux occupés sont dérivés de la date par une fonction déterministe :
 * le calendrier reste crédible en démonstration et identique d'une visite à
 * l'autre. Le branchement sur l'agenda réel se fait en remplaçant `taken()`.
 */

import { useEffect, useMemo, useState } from 'react';

const KINDS = [
  {
    key: 'tel',
    label: 'Appel téléphonique',
    duration: 30,
    note: 'Cadrage du besoin et ordre de grandeur budgétaire.',
  },
  {
    key: 'visio',
    label: 'Visioconférence',
    duration: 30,
    note: 'Partage d’écran : plans, photos du site, configurations comparées.',
  },
  {
    key: 'site',
    label: 'Visite technique sur site',
    duration: 90,
    note: 'Relevé des contraintes, alimentation, accès et fixation. Île-de-France et grandes métropoles.',
  },
];

const SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const DAY_NAMES = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];
const MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

const iso = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;

/** Occupation simulée, stable pour une date et un créneau donnés. */
function taken(dateKey, slot) {
  let hash = 0;
  const source = `${dateKey}${slot}`;
  for (let i = 0; i < source.length; i += 1) hash = (hash * 31 + source.charCodeAt(i)) % 9973;
  return hash % 10 < 4;
}

/** Fichier d'agenda, construit et téléchargé sans quitter la page. */
function downloadIcs({ kind, dateKey, slot }) {
  const [hours, minutes] = slot.split(':').map(Number);
  const start = new Date(`${dateKey}T00:00:00`);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + kind.duration * 60000);

  const stamp = (date) =>
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(
      date.getDate(),
    ).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}${String(
      date.getMinutes(),
    ).padStart(2, '0')}00`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LED Visual Innovation//Rendez-vous//FR',
    'BEGIN:VEVENT',
    `UID:${dateKey}-${slot.replace(':', '')}@led-visual-innovation.fr`,
    `DTSTART;TZID=Europe/Paris:${stamp(start)}`,
    `DTEND;TZID=Europe/Paris:${stamp(end)}`,
    `SUMMARY:${kind.label} — LED Visual Innovation`,
    'DESCRIPTION:Échange avec un technicien LED Visual Innovation.',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rendez-vous-lvif.ics';
  link.click();
  URL.revokeObjectURL(url);
}

export default function Booking() {
  const [kindKey, setKindKey] = useState('tel');
  const [cursor, setCursor] = useState(null);
  const [today, setToday] = useState(null);
  const [dateKey, setDateKey] = useState(null);
  const [slot, setSlot] = useState(null);
  const [done, setDone] = useState(false);

  /* La date du jour est lue après montage : calculée au rendu serveur, elle
     produirait un écart d'hydratation au passage de minuit. */
  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
    setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  const kind = KINDS.find((item) => item.key === kindKey);

  /* Grille du mois, alignée sur un début de semaine au lundi. */
  const grid = useMemo(() => {
    if (!cursor) return [];
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells = Array.from({ length: offset }, () => null);
    for (let day = 1; day <= days; day += 1) {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), day));
    }
    return cells;
  }, [cursor]);

  if (!today || !cursor) {
    return <div className="min-h-[30rem] rounded-[26px] bg-tile" aria-hidden="true" />;
  }

  /* Horizon de réservation : deux mois, hors week-ends et hors passé. */
  const horizon = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const openable = (date) =>
    date &&
    date >= today &&
    date <= horizon &&
    date.getDay() !== 0 &&
    date.getDay() !== 6;

  const free = dateKey ? SLOTS.filter((item) => !taken(dateKey, item)) : [];
  const selected = dateKey ? new Date(`${dateKey}T00:00:00`) : null;

  const shift = (delta) => {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1);
    if (next < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    if (next > horizon) return;
    setCursor(next);
  };

  if (done) {
    return (
      <div className="rounded-[26px] bg-ink p-9 text-white md:p-12">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-[1.4rem] text-ink">
          ✓
        </span>
        <h3 className="d2 mt-7 max-w-[20ch] text-white">Rendez-vous enregistré</h3>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-white/65">
          {kind.label}, le{' '}
          <strong className="text-white">
            {selected.getDate()} {MONTHS[selected.getMonth()]} {selected.getFullYear()} à{' '}
            {slot.replace(':', ' h ')}
          </strong>
          . Durée prévue : {kind.duration} minutes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => downloadIcs({ kind, dateKey, slot })}
            className="rounded-full bg-lime px-6 py-3.5 text-[0.9rem] font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Ajouter à mon agenda
          </button>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setSlot(null);
            }}
            className="rounded-full bg-white/10 px-6 py-3.5 text-[0.9rem] font-bold text-white transition-colors hover:bg-white/20"
          >
            Choisir un autre créneau
          </button>
        </div>

        <p className="mt-8 text-[0.82rem] text-white/40">
          Démonstration : aucune donnée n’est transmise depuis cette maquette.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Nature du rendez-vous */}
      <div className="min-w-0 lg:col-span-4">
        <div className="rounded-[26px] bg-tile p-7 md:p-8">
          <p className="text-sm font-semibold text-ink">Nature de l’échange</p>
          <ul className="mt-5 space-y-2">
            {KINDS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => setKindKey(item.key)}
                  aria-pressed={kindKey === item.key}
                  className={`w-full rounded-2xl px-5 py-4 text-left transition-colors duration-300 ${
                    kindKey === item.key ? 'bg-ink text-paper' : 'bg-white text-muted hover:text-ink'
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.92rem] font-bold">{item.label}</span>
                    <span className="shrink-0 text-[0.75rem] opacity-70">{item.duration} min</span>
                  </span>
                  <span className="mt-2 block text-[0.78rem] leading-relaxed opacity-70">
                    {item.note}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.8rem] leading-relaxed text-muted">
            Vous échangez avec un technicien, pas avec un commercial. Fuseau Europe/Paris.
          </p>
        </div>
      </div>

      {/* Calendrier */}
      <div className="min-w-0 lg:col-span-4">
        <div className="rounded-[26px] bg-tile p-7 md:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => shift(-1)}
                aria-label="Mois précédent"
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => shift(1)}
                aria-label="Mois suivant"
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                ›
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1 text-center">
            {DAY_NAMES.map((name) => (
              <span key={name} className="pb-2 text-[0.68rem] font-bold uppercase text-muted">
                {name.slice(0, 1)}
              </span>
            ))}

            {grid.map((date, index) => {
              if (!date) return <span key={`vide-${index}`} />;
              const key = iso(date);
              const available = openable(date);
              const active = key === dateKey;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    setDateKey(key);
                    setSlot(null);
                  }}
                  aria-pressed={active}
                  className={`aspect-square rounded-xl text-[0.82rem] font-bold transition-colors duration-200 ${
                    active
                      ? 'bg-ink text-paper'
                      : available
                        ? 'bg-white text-ink hover:bg-lime'
                        : 'text-muted/35'
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-[0.78rem] leading-relaxed text-muted">
            Créneaux ouvrables, du lundi au vendredi, sur les deux prochains mois.
          </p>
        </div>
      </div>

      {/* Créneaux et confirmation */}
      <div className="min-w-0 lg:col-span-4">
        <div className="flex h-full flex-col rounded-[26px] bg-ink p-7 text-white md:p-8">
          {!dateKey && (
            <div className="flex flex-1 items-center">
              <p className="text-[0.95rem] leading-relaxed text-white/50">
                Choisissez une date pour afficher les créneaux disponibles.
              </p>
            </div>
          )}

          {dateKey && (
            <>
              <p className="eyebrow text-lime">
                {selected.getDate()} {MONTHS[selected.getMonth()]}
              </p>
              <p className="mt-3 text-[0.85rem] text-white/50">
                {free.length} créneau{free.length > 1 ? 'x' : ''} disponible
                {free.length > 1 ? 's' : ''} · {kind.duration} min
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {SLOTS.map((item) => {
                  const busy = taken(dateKey, item);
                  return (
                    <button
                      key={item}
                      type="button"
                      disabled={busy}
                      onClick={() => setSlot(item)}
                      aria-pressed={slot === item}
                      className={`rounded-xl px-2 py-3 text-[0.82rem] font-bold transition-colors duration-200 ${
                        slot === item
                          ? 'bg-lime text-ink'
                          : busy
                            ? 'bg-white/[0.04] text-white/20 line-through'
                            : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              {slot && (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setDone(true);
                  }}
                  className="mt-7 border-t border-white/10 pt-6"
                >
                  {[
                    { id: 'rdv-nom', label: 'Nom et prénom', type: 'text', autoComplete: 'name' },
                    { id: 'rdv-email', label: 'E-mail', type: 'email', autoComplete: 'email' },
                    { id: 'rdv-tel', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
                  ].map((field) => (
                    <div key={field.id} className="mb-3">
                      <label
                        htmlFor={field.id}
                        className="block text-[0.78rem] font-semibold text-white/60"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required
                        className="mt-1.5 w-full rounded-xl bg-white/[0.08] px-4 py-3 text-[0.9rem] text-white outline-none ring-1 ring-white/10 transition focus:ring-lime"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="mt-4 w-full rounded-full bg-lime px-6 py-3.5 text-[0.9rem] font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Confirmer {slot.replace(':', ' h ')}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
