'use client';

import { useState } from 'react';
import { faq } from '@/lib/content';

export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-hairline">
      {faq.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="border-b border-hairline">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : index)}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                className="group flex w-full items-start gap-5 py-7 text-left transition-colors md:gap-8"
              >
                <span
                  className={`slug mt-1 shrink-0 transition-colors ${
                    expanded ? 'slug-signal' : 'group-hover:text-bone-dim'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`display-md flex-1 transition-colors ${
                    expanded ? 'text-bone' : 'text-bone-dim group-hover:text-bone'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-2 block h-3 w-3 shrink-0 text-signal"
                >
                  <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                      expanded ? 'scale-y-0' : 'scale-y-100'
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              hidden={!expanded}
              className="pb-9 pl-[3.1rem] md:pl-[4.4rem]"
            >
              <p className="max-w-3xl leading-relaxed text-bone-dim">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
