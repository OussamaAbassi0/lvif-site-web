'use client';

/**
 * Simulateur de surface et de budget.
 *
 * Le site actuel n'offre aucun repère de prix : le visiteur doit téléphoner
 * pour savoir s'il est dans le bon ordre de grandeur, et beaucoup ne le font
 * pas. Ce module donne une fourchette en quelques secondes, calcule la
 * définition réelle de la dalle, et envoie vers le devis avec les paramètres
 * déjà choisis.
 *
 * Tout est calculé côté client : aucune requête, aucune donnée transmise.
 * Les coefficients ci-dessous sont des ordres de grandeur de marché ; ils
 * sont à recaler sur la grille tarifaire réelle de LVIF avant mise en ligne.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Reveal from './reveal';

const MODES = [
  { key: 'achat', label: 'Achat', note: 'Installation fixe' },
  { key: 'location', label: 'Location', note: 'Événementiel' },
];

const PITCHES = [
  {
    key: 'p1_9',
    label: 'P1.9',
    pitch: 1.9,
    usage: 'interieur',
    per: [2100, 3200],
    hint: 'Salle de contrôle, studio, hall d’accueil — lecture à moins de 2 m.',
  },
  {
    key: 'p2_9',
    label: 'P2.9',
    pitch: 2.9,
    usage: 'interieur',
    per: [1300, 2000],
    hint: 'Mur d’images de salon, scène, showroom — lecture à 3 m et plus.',
  },
  {
    key: 'p4',
    label: 'P4',
    pitch: 4,
    usage: 'exterieur',
    per: [1100, 1700],
    hint: 'Façade de commerce, enseigne urbaine — lecture à 5 m et plus.',
  },
  {
    key: 'p6',
    label: 'P6',
    pitch: 6,
    usage: 'exterieur',
    per: [850, 1350],
    hint: 'Écran publicitaire, stade, remorque — lecture à 8 m et plus.',
  },
  {
    key: 'p10',
    label: 'P10',
    pitch: 10,
    usage: 'exterieur',
    per: [600, 950],
    hint: 'Très grand format, bord de route — lecture à 15 m et plus.',
  },
];

/* Location : part du prix d'achat facturée par jour, dégressive avec la durée. */
const RENTAL_BASE = 0.035;

const euro = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

function Slider({ id, label, value, min, max, step, onChange, unit }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-extrabold tracking-tight text-ink">
          {value.toFixed(1).replace('.', ',')} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-[var(--color-ink)]"
      />
    </div>
  );
}

export default function Simulator() {
  const [mode, setMode] = useState('achat');
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(3.5);
  const [pitchKey, setPitchKey] = useState('p4');
  const [days, setDays] = useState(2);

  const pitch = PITCHES.find((item) => item.key === pitchKey);

  const result = useMemo(() => {
    const surface = width * height;
    const px = Math.round((width * 1000) / pitch.pitch);
    const py = Math.round((height * 1000) / pitch.pitch);
    const purchase = pitch.per.map((rate) => rate * surface);

    if (mode === 'achat') {
      return { surface, px, py, low: purchase[0], high: purchase[1] };
    }

    /* Au-delà de deux jours le tarif journalier décroît : le transport et le
       montage sont amortis sur la durée. */
    const decay = 1 / (1 + 0.16 * Math.max(0, days - 1));
    const daily = purchase.map((value) => value * RENTAL_BASE * decay);
    return {
      surface,
      px,
      py,
      low: daily[0] * days,
      high: daily[1] * days,
    };
  }, [mode, width, height, pitch, days]);

  const query = new URLSearchParams({
    mode,
    usage: pitch.usage,
    surface: result.surface.toFixed(1),
  }).toString();

  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Estimation</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="d2 mt-4 max-w-[16ch]">Dimensionnez votre écran en 30 secondes</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="lead mt-6 max-w-[52ch]">
              Réglez les dimensions et la finesse de dalle : la surface, la définition et une
              fourchette budgétaire se recalculent en direct. Aucune donnée n’est transmise.
            </p>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-10 rounded-[26px] bg-tile p-7 md:p-9">
              <div className="grid grid-cols-2 gap-3">
                {MODES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMode(item.key)}
                    aria-pressed={mode === item.key}
                    className={`rounded-2xl px-4 py-4 text-left transition-colors duration-300 ${
                      mode === item.key
                        ? 'bg-ink text-paper'
                        : 'bg-white text-muted hover:text-ink'
                    }`}
                  >
                    <span className="block text-[0.95rem] font-bold">{item.label}</span>
                    <span className="mt-1 block text-[0.76rem] opacity-70">{item.note}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <Slider
                  id="sim-width"
                  label="Largeur"
                  value={width}
                  min={1}
                  max={30}
                  step={0.5}
                  unit="m"
                  onChange={setWidth}
                />
                <Slider
                  id="sim-height"
                  label="Hauteur"
                  value={height}
                  min={0.5}
                  max={12}
                  step={0.5}
                  unit="m"
                  onChange={setHeight}
                />
              </div>

              {mode === 'location' && (
                <div className="mt-7">
                  <Slider
                    id="sim-days"
                    label="Durée de location"
                    value={days}
                    min={1}
                    max={30}
                    step={1}
                    unit={days > 1 ? 'jours' : 'jour'}
                    onChange={setDays}
                  />
                </div>
              )}

              <p className="mt-9 text-sm font-semibold text-ink">Finesse de dalle</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PITCHES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPitchKey(item.key)}
                    aria-pressed={pitchKey === item.key}
                    className={`rounded-full px-5 py-2.5 text-[0.85rem] font-bold transition-colors duration-300 ${
                      pitchKey === item.key
                        ? 'bg-lime text-ink'
                        : 'bg-white text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[0.85rem] leading-relaxed text-muted">{pitch.hint}</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={250} className="h-full">
            <div className="flex h-full flex-col rounded-[26px] bg-ink p-7 text-white md:p-9">
              <p className="eyebrow text-lime">Votre configuration</p>

              <p className="stat mt-7 text-[clamp(2.6rem,5vw,3.6rem)] text-white">
                {result.surface.toFixed(1).replace('.', ',')}
                <span className="text-[1.5rem]"> m²</span>
              </p>
              <p className="mt-3 text-[0.9rem] text-white/60">
                {result.px.toLocaleString('fr-FR')} × {result.py.toLocaleString('fr-FR')} pixels ·
                dalle {pitch.label} · {pitch.usage === 'interieur' ? 'intérieur' : 'extérieur'}
              </p>

              <div className="mt-9 border-t border-white/10 pt-8">
                <p className="text-[0.82rem] uppercase tracking-[0.14em] text-white/45">
                  {mode === 'achat'
                    ? 'Fourchette indicative'
                    : `Fourchette pour ${days} ${days > 1 ? 'jours' : 'jour'}`}
                </p>
                <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.2vw,2.1rem)] font-extrabold leading-tight tracking-tight text-lime">
                  {euro(result.low)} — {euro(result.high)}
                </p>
                <p className="mt-4 text-[0.82rem] leading-relaxed text-white/50">
                  Hors structure, transport, montage et maintenance. Un technicien affine ce
                  chiffrage sous 24 h ouvrées à partir de votre contexte d’installation.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    [
                      mode === 'achat' ? 'Au mètre carré' : 'Par jour',
                      mode === 'achat'
                        ? `${euro(result.low / result.surface)} – ${euro(result.high / result.surface)}`
                        : `${euro(result.low / days)} – ${euro(result.high / days)}`,
                    ],
                    ['Définition totale', `${((result.px * result.py) / 1e6).toFixed(1).replace('.', ',')} Mpx`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white/[0.06] px-5 py-4">
                      <dt className="text-[0.7rem] uppercase tracking-[0.12em] text-white/40">
                        {label}
                      </dt>
                      <dd className="mt-2 text-[0.95rem] font-bold text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Link
                href={`/devis?${query}`}
                className="mt-auto flex items-center justify-between gap-4 rounded-full bg-lime px-6 py-4 text-[0.92rem] font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Recevoir un chiffrage précis
                <span aria-hidden="true" className="text-[1.1rem]">
                  ↗
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
