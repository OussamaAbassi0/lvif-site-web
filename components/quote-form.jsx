'use client';

import { useEffect, useState } from 'react';

const MODES = [
  { value: 'achat', label: 'Achat · installation fixe' },
  { value: 'location', label: 'Location · événementiel' },
];

const USAGES = [
  { value: 'exterieur', label: 'Extérieur' },
  { value: 'interieur', label: 'Intérieur' },
];

const TYPES = [
  'Écran LED extérieur',
  'Mur d’images intérieur',
  'Écran LED transparent',
  'Écran publicitaire',
  'Écran géant événementiel',
  'Écran sur remorque',
  'Studio TV / salle de contrôle',
  'Je ne sais pas encore',
];

const REQUIRED = ['name', 'company', 'email', 'type'];

export default function QuoteForm() {
  const [values, setValues] = useState({
    mode: 'achat',
    usage: 'exterieur',
    type: '',
    surface: '',
    date: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  /* Pré-remplissage depuis le simulateur (paramètres d'URL) puis depuis le
     chatbot de qualification, qui est plus précis et prime donc. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('mode') || params.has('surface')) {
      setValues((current) => ({
        ...current,
        mode: params.get('mode') || current.mode,
        usage: params.get('usage') || current.usage,
        surface: params.get('surface') || current.surface,
      }));
    }

    try {
      const raw = window.sessionStorage.getItem('lvif:qualification');
      if (!raw) return;
      const data = JSON.parse(raw);
      setValues((current) => ({
        ...current,
        mode: data.mode || current.mode,
        usage: data.usage || current.usage,
        type: TYPES.includes(data.type) ? data.type : current.type,
        surface: data.surface || current.surface,
        date: data.date || current.date,
        message: data.summary ? `${data.summary}\n` : current.message,
      }));
    } catch {
      /* stockage indisponible : formulaire vierge */
    }
  }, []);

  const update = (field) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const found = {};
    REQUIRED.forEach((field) => {
      if (!String(values[field] || '').trim()) {
        found[field] = 'Ce champ est nécessaire pour établir une estimation.';
      }
    });
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      found.email = 'Format d’adresse e-mail invalide.';
    }
    if (!values.consent) {
      found.consent = 'Merci de confirmer pour que nous puissions vous recontacter.';
    }
    return found;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`field-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }
    setSent(true);
    window.setTimeout(() => {
      document.getElementById('devis-confirmation')?.focus();
    }, 60);
  };

  if (sent) {
    return (
      <div
        id="devis-confirmation"
        tabIndex={-1}
        className="bg-tile p-10 md:p-14"
      >
        <p className="eyebrow">Récapitulatif</p>
        <h2 className="d2 mt-6 max-w-[16ch]">Votre demande est prête à être envoyée.</h2>
        <p className="lead mt-7">
          Ce prototype ne transmet aucune donnée : rien n’a été envoyé et rien n’a été enregistré.
          Sur le site en production, cette étape déclencherait la prise en charge par un technicien
          et un rappel sous 24 h ouvrées.
        </p>

        <dl className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            ['Formule', values.mode === 'achat' ? 'Achat' : 'Location'],
            ['Usage', values.usage === 'exterieur' ? 'Extérieur' : 'Intérieur'],
            ['Type d’écran', values.type],
            ['Surface estimée', values.surface ? `${values.surface} m²` : 'Non précisée'],
            ['Date souhaitée', values.date || 'Non précisée'],
            ['Contact', `${values.name} · ${values.company}`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white p-5">
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-2 text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <button type="button" onClick={() => setSent(false)} className="rounded-full border border-line-strong px-7 py-4 text-[0.9rem] font-bold text-ink transition-colors hover:border-ink mt-10">
          Modifier ma demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-12">
      <fieldset>
        <legend className="eyebrow">01 — Nature du projet</legend>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <span className="mb-3 block text-sm text-muted">Formule</span>
            <div className="grid grid-cols-2 gap-3">
              {MODES.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-2xl border border-line-strong bg-white px-4 py-4 text-center text-[0.85rem] font-semibold transition-colors ${
                    values.mode === option.value
                      ? 'bg-ink text-paper'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={option.value}
                    checked={values.mode === option.value}
                    onChange={update('mode')}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-3 block text-sm text-muted">Usage</span>
            <div className="grid grid-cols-2 gap-3">
              {USAGES.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-2xl border border-line-strong bg-white px-4 py-4 text-center text-[0.85rem] font-semibold transition-colors ${
                    values.usage === option.value
                      ? 'bg-ink text-paper'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <input
                    type="radio"
                    name="usage"
                    value={option.value}
                    checked={values.usage === option.value}
                    onChange={update('usage')}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Field
            id="field-type"
            label="Type d’écran"
            required
            error={errors.type}
            helper="Sélection indicative, ajustable après échange."
          >
            <select
              id="field-type"
              value={values.type}
              onChange={update('type')}
              className="field"
              aria-describedby={errors.type ? 'error-type' : 'helper-type'}
            >
              <option value="">Choisir…</option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field id="field-surface" label="Surface estimée (m²)" helper="Une fourchette suffit.">
            <input
              id="field-surface"
              type="number"
              min="1"
              inputMode="numeric"
              value={values.surface}
              onChange={update('surface')}
              placeholder="Ex. 24"
              className="field"
              aria-describedby="helper-surface"
            />
          </Field>

          <Field
            id="field-date"
            label="Date de l’événement ou de pose"
            helper="Laissez vide si non arrêtée."
          >
            <input
              id="field-date"
              type="date"
              value={values.date}
              onChange={update('date')}
              className="field"
              aria-describedby="helper-date"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow">02 — Vos coordonnées</legend>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Field id="field-name" label="Nom et prénom" required error={errors.name}>
            <input
              id="field-name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={update('name')}
              className="field"
              aria-describedby={errors.name ? 'error-name' : undefined}
            />
          </Field>

          <Field id="field-company" label="Société ou organisation" required error={errors.company}>
            <input
              id="field-company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={update('company')}
              className="field"
              aria-describedby={errors.company ? 'error-company' : undefined}
            />
          </Field>

          <Field id="field-email" label="Adresse e-mail" required error={errors.email}>
            <input
              id="field-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update('email')}
              className="field"
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
          </Field>

          <Field id="field-phone" label="Téléphone" helper="Facilite le rappel technique.">
            <input
              id="field-phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={update('phone')}
              className="field"
              aria-describedby="helper-phone"
            />
          </Field>
        </div>

        <div className="mt-6">
          <Field
            id="field-message"
            label="Contexte du projet"
            helper="Lieu, contraintes de fixation, distance de vision, contenus prévus."
          >
            <textarea
              id="field-message"
              rows={5}
              value={values.message}
              onChange={update('message')}
              className="field resize-y"
              aria-describedby="helper-message"
            />
          </Field>
        </div>
      </fieldset>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            id="field-consent"
            type="checkbox"
            checked={values.consent}
            onChange={update('consent')}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-lime)]"
            aria-describedby={errors.consent ? 'error-consent' : undefined}
          />
          <span>
            J’accepte d’être recontacté par LED Visual Innovation au sujet de cette demande.
          </span>
        </label>
        {errors.consent && (
          <p id="error-consent" role="alert" className="mt-2 text-sm text-ink">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-5 border-t border-line pt-8">
        <button type="submit" className="rounded-full bg-ink px-7 py-4 text-[0.9rem] font-bold text-paper transition-colors hover:bg-lime hover:text-ink">
          Générer ma demande
        </button>
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
          Prototype — aucune donnée n’est transmise ni conservée
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, required, error, helper, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-sm text-muted">
        {label}
        {required && (
          <span className="ml-1 text-ink" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`error-${id.replace('field-', '')}`} role="alert" className="mt-2 text-sm text-ink">
          {error}
        </p>
      ) : (
        helper && (
          <p
            id={`helper-${id.replace('field-', '')}`}
            className="mt-2 text-[0.8rem] leading-relaxed text-faint"
          >
            {helper}
          </p>
        )
      )}
    </div>
  );
}
