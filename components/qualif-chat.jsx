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
  { from: 'bot', text: stepPrompts.mode.question },
];

export default function QualifChat() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INTRO);
  const [step, setStep] = useState('mode');
  const [profile, setProfile] = useState({});
  const [draft, setDraft] = useState('');

  const logRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

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
          },
        ]);
        try {
          window.sessionStorage.setItem(
            'lvif:qualification',
            JSON.stringify({ ...nextProfile, summary }),
          );
        } catch {
          /* stockage indisponible */
        }
        return;
      }
      push([{ from: 'bot', text: stepPrompts[nextStep].question }]);
    },
    [push],
  );

  const currentQuestion = () => (step === 'done' ? '' : stepPrompts[step].question);

  const currentOptions = () => {
    if (step === 'done') return [];
    if (step === 'type') return typeOptions(profile);
    return stepPrompts[step].options;
  };

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
          text: 'Je ne suis pas certain de bien comprendre. Je peux répondre sur les prix, la garantie, le logiciel SmartView, la maintenance, le pitch, les zones d’intervention ou nos références.',
        },
      ]);
    }, 320);
  };

  const reset = () => {
    setMessages(INTRO);
    setStep('mode');
    setProfile({});
    setDraft('');
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="lvif-chat"
        className="pill pill-lime fixed bottom-5 right-5 z-[130] shadow-[0_16px_40px_rgba(13,13,13,0.18)] md:bottom-7 md:right-7"
      >
        <span>{open ? 'Fermer' : 'Qualifier mon projet'}</span>
        <span className="pill__badge">
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
            {open ? (
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2.5 8c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5-2.5 5-5.5 5c-.7 0-1.4-.1-2-.3L3 14l.6-2.1A4.8 4.8 0 0 1 2.5 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </span>
      </button>

      <div
        id="lvif-chat"
        role="dialog"
        aria-label="Assistant de qualification LED Visual Innovation"
        hidden={!open}
        className="fixed inset-x-3 bottom-[5.5rem] z-[130] flex max-h-[min(34rem,70svh)] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_30px_80px_rgba(13,13,13,0.22)] sm:inset-x-auto sm:right-7 sm:w-[24rem] md:bottom-[6.5rem]"
      >
        <header className="flex items-start justify-between gap-4 bg-ink px-5 py-4 text-white">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-lime">
              Assistant commercial
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-display)] text-base font-bold">
              Qualification de projet
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 text-[0.7rem] font-semibold text-white/60 transition-colors hover:text-lime"
          >
            Recommencer
          </button>
        </header>

        <div
          ref={logRef}
          className="no-scrollbar flex-1 space-y-2.5 overflow-y-auto bg-paper-2 p-4"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-[18px] px-4 py-3 text-[0.86rem] leading-relaxed ${
                  message.from === 'user'
                    ? 'rounded-br-[6px] bg-lime text-ink'
                    : 'rounded-bl-[6px] bg-white text-body'
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
                    className="mt-4 w-full rounded-full bg-ink px-4 py-3 text-[0.8rem] font-bold text-paper"
                  >
                    Ouvrir le devis pré-rempli
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {step !== 'done' && (
          <div className="flex flex-wrap gap-2 border-t border-line bg-white px-4 py-3">
            {currentOptions().map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => advance(option.value, option.label)}
                className="min-h-[38px] rounded-full border border-line-strong px-3.5 py-2 text-[0.75rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-lime"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex gap-2 border-t border-line bg-white p-3">
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
            className="field min-h-[44px] flex-1 rounded-full text-[0.86rem]"
          />
          <button
            type="submit"
            className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-ink text-lime"
            aria-label="Envoyer"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none">
              <path
                d="M3 10h13M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        <p className="border-t border-line bg-white px-5 py-2.5 text-[0.65rem] text-faint">
          Qualification et orientation uniquement · aucun envoi automatique
        </p>
      </div>
    </>
  );
}
