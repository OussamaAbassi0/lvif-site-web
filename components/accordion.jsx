'use client';

/**
 * Accordéon de questions-réponses.
 * Un seul panneau ouvert à la fois : sur mobile, deux réponses dépliées
 * repoussent déjà la suivante hors de l'écran.
 */

import { useId, useState } from 'react';

export default function Accordion({ items, initial = 0 }) {
  const [open, setOpen] = useState(initial);
  const id = useId();

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-[22px] transition-colors duration-300 ${
              expanded ? 'bg-tile' : 'bg-tile/60 hover:bg-tile'
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : index)}
                aria-expanded={expanded}
                aria-controls={`${id}-panel-${index}`}
                id={`${id}-trigger-${index}`}
                className="flex w-full items-center gap-5 px-6 py-6 text-left md:px-8"
              >
                <span className="d3 flex-1 text-[1.05rem] md:text-[1.2rem]">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    expanded ? 'bg-lime text-ink' : 'bg-white text-ink'
                  }`}
                >
                  <span className="relative block h-3 w-3">
                    <span className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded bg-current" />
                    <span
                      className={`absolute left-1/2 top-0 block h-full w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-300 ${
                        expanded ? 'scale-y-0' : 'scale-y-100'
                      }`}
                    />
                  </span>
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel-${index}`}
              role="region"
              aria-labelledby={`${id}-trigger-${index}`}
              hidden={!expanded}
              className="px-6 pb-7 md:px-8"
            >
              <p className="max-w-3xl leading-relaxed text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
