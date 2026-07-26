'use client';

/**
 * Deux entrées vers le même objectif, comme sur le site actuel : décrire son
 * projet, ou réserver un créneau. Le site officiel bascule entre un formulaire
 * et un Calendly ; ici les deux vues partagent la charte et le même contenant.
 *
 * L'ancre #rendez-vous ouvre directement le calendrier : les liens envoyés
 * depuis la page SAV ou une signature d'e-mail tombent sur la bonne vue.
 */

import { useEffect, useState } from 'react';
import QuoteForm from './quote-form';
import Booking from './booking';

const TABS = [
  { key: 'projet', label: 'Décrire mon projet' },
  { key: 'rendez-vous', label: 'Prendre rendez-vous' },
];

export default function DevisTabs() {
  const [tab, setTab] = useState('projet');

  /* `includes` plutôt qu'une égalité stricte : une ancre peut arriver suivie
     de paramètres. Et l'écoute de `hashchange` est nécessaire — un lien vers
     #rendez-vous cliqué depuis la page elle-même ne remonte pas le composant,
     l'onglet resterait alors sur le formulaire. */
  useEffect(() => {
    const sync = () => {
      if (window.location.hash.includes('rendez-vous')) setTab('rendez-vous');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <div id="rendez-vous" className="scroll-mt-32">
      <div
        role="tablist"
        aria-label="Mode de contact"
        className="mx-auto flex w-fit gap-1 rounded-full bg-tile p-1.5"
      >
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
            className={`rounded-full px-6 py-3 text-[0.88rem] font-bold transition-colors duration-300 ${
              tab === item.key ? 'bg-lime text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === 'projet' ? (
          <div className="rounded-[var(--radius-xl2)] bg-tile p-6 md:p-10">
            <QuoteForm />
          </div>
        ) : (
          <Booking />
        )}
      </div>
    </div>
  );
}
