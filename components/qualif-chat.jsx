'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  findAnswer,
  stepPrompts,
  typeOptions,
  buildSummary,
  recommendation,
} from '@/lib/chatbot-engine';

const INTRO = [
  {
    from: 'bot',
    text: 'Bonjour. Je qualifie les projets d’écran LED : je réponds aux questions techniques et je prépare votre dossier pour l’équipe. Je ne transmets rien automatiquement.',
  },
  {
    from: 'bot',
    text: stepPrompts.mode.question,
  },
];

export default function QualifChat() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INTRO);
  const [step, setStep] = useState('mode');
  const [profile, setProfile] = useState({});
  const [draft, setDraft] = useState('');
  const [nudge, setNudge] = useState(false);

  const logRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  /* Invite discrète après un moment de lecture */
  useEffect(() => {
    const timer = window.setTimeout(() => setNudge(true), 14000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setNudge(false);
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  /* Échappement et piège de focus sommaire */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const push = useCallback((entries) => {
    setMessages((current) => [...current, ...entries]);
  }, []);

  const askNext = useCallback(
    (nextStep, nextProfile) => {
      if (nextStep === 'done') {
        const summary = buildSummary(nextProfile);
        push([
          { from: 'bot', text: recommendation(nextProfile) },
          {
            from: 'bot',
            text: 'J’ai tout ce qu’il faut pour préparer le devis. Le formulaire sera pré-rempli avec ces éléments — vous n’aurez qu’à ajouter vos coordonnées.',
            cta: true,
            summary,
          },
        ]);
        try {
          window.sessionStorage.setItem(
            'lvif:qualification',
            JSON.stringify({ ...nextProfile, summary }),
          );
        } catch {
          /* stockage indisponible : le formulaire restera vierge */
        }
        return;
      }
      push([{ from: 'bot', text: stepPrompts[nextStep].question }]);
    },
    [push],
  );

  const advance = (value, label) => {
    const nextProfile = { ...profile, [step]: value };
    const order = ['mode', 'usage', 'type', 'surface', 'date', 'done'];
    const nextStep = order[order.indexOf(step) + 1] || 'done';

    push([{ from: 'user', text: label }]);
    setProfile(nextProfile);
    setStep(nextStep);
    window.setTimeout(() => askNext(nextStep, nextProfile), 260);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    push([{ from: 'user', text }]);

    window.setTimeout(() => {
      const match = findAnswer(text);
      if (match) {
        push([{ from: 'bot', text: match.answer }]);
        if (step !== 'done') {
          window.setTimeout(
            () => push([{ from: 'bot', text: `Pour reprendre : ${currentQuestion()}` }]),
            300,
          );
        }
        return;
      }
      push([
        {
          from: 'bot',
          text: 'Je ne suis pas certain de bien comprendre. Je peux répondre sur les prix, la garantie, le logiciel SmartView, la maintenance, le pitch, les zones d’intervention ou nos références. Sinon, on continue la qualification.',
        },
      ]);
    }, 320);
  };

  const currentQuestion = () => {
    if (step === 'done') return '';
    return stepPrompts[step].question;
  };

  const currentOptions = () => {
    if (step === 'done') return [];
    if (step === 'type') return typeOptions(profile);
    return stepPrompts[step].options;
  };

  const reset = () => {
    setMessages(INTRO);
    setStep('mode');
    setProfile({});
    setDraft('');
  };

  return (
    <>
      {/* Déclencheur flottant */}
      <div className="fixed bottom-5 right-5 z-[130] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
        {nudge && !open && (
          <p className="max-w-[15rem] border border-hairline bg-ink-panel px-4 py-3 text-[0.82rem] leading-snug text-bone-dim shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
            Besoin d’un ordre de grandeur pour votre projet ?
          </p>
        )}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="lvif-chat"
          className="flex h-14 items-center gap-3 border border-signal bg-signal px-5 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.14em] text-black transition-transform duration-300 hover:scale-[1.03] active:scale-100"
        >
          <span
            aria-hidden="true"
            className="grid h-3.5 w-3.5 grid-cols-2 grid-rows-2 gap-[2px]"
          >
            <span className="bg-black" />
            <span className="bg-black/40" />
            <span className="bg-black/40" />
            <span className="bg-black" />
          </span>
          {open ? 'Fermer' : 'Qualifier mon projet'}
        </button>
      </div>

      {/* Panneau */}
      <div
        id="lvif-chat"
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="Assistant de qualification LED Visual Innovation"
        hidden={!open}
        className="fixed inset-x-3 bottom-24 z-[130] flex max-h-[min(34rem,72svh)] flex-col border border-hairline bg-ink-panel shadow-[0_30px_90px_rgba(0,0,0,0.7)] sm:inset-x-auto sm:right-7 sm:w-[24.5rem] md:bottom-28"
      >
        <header className="flex items-start justify-between gap-4 border-b border-hairline p-5">
          <div>
            <p className="slug slug-signal">Assistant commercial</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold [font-stretch:110%]">
              Qualification de projet
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-bone-faint transition-colors hover:text-signal"
          >
            Recommencer
          </button>
        </header>

        <div
          ref={logRef}
          className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-5"
          aria-live="polite"
          aria-atomic="false"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] px-4 py-3 text-[0.86rem] leading-relaxed ${
                  message.from === 'user'
                    ? 'bg-signal text-black'
                    : 'border border-hairline bg-ink text-bone-dim'
                }`}
              >
                <p>{message.text}</p>
                {message.cta && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push('/devis');
                    }}
                    className="btn btn-signal mt-4 w-full justify-center"
                  >
                    Ouvrir le devis pré-rempli
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {step !== 'done' && (
          <div className="flex flex-wrap gap-2 border-t border-hairline px-5 py-4">
            {currentOptions().map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => advance(option.value, option.label)}
                className="min-h-[38px] border border-hairline px-3 py-2 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.1em] text-bone-dim transition-colors hover:border-signal hover:text-signal"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex gap-2 border-t border-hairline p-4">
          <label htmlFor="lvif-chat-input" className="sr-only">
            Poser une question
          </label>
          <input
            id="lvif-chat-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Une question ? Écrivez ici."
            autoComplete="off"
            className="field min-h-[44px] flex-1 text-[0.86rem]"
          />
          <button
            type="submit"
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-hairline text-signal transition-colors hover:border-signal"
            aria-label="Envoyer"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none">
              <path
                d="M3 10h13M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </form>

        <p className="border-t border-hairline px-5 py-3 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase leading-relaxed tracking-[0.1em] text-bone-faint">
          Qualification et orientation uniquement · aucun envoi automatique
        </p>
      </div>
    </>
  );
}
