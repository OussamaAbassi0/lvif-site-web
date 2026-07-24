'use client';

import { useMemo, useState } from 'react';
import ProjectCard from './project-card';

export default function ProjectFilter({ projects }) {
  const tags = useMemo(
    () => ['Tout', ...Array.from(new Set(projects.map((project) => project.tag)))],
    [projects],
  );
  const [active, setActive] = useState('Tout');

  const visible =
    active === 'Tout' ? projects : projects.filter((project) => project.tag === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-6">
        <span className="slug mr-3">Filtrer</span>
        {tags.map((tag) => {
          const selected = active === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={selected}
              className={`min-h-[40px] border px-4 py-2 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-200 ${
                selected
                  ? 'border-signal bg-signal text-black'
                  : 'border-hairline text-bone-dim hover:border-bone-faint hover:text-bone'
              }`}
            >
              {tag}
            </button>
          );
        })}
        <span
          className="ml-auto font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-bone-faint"
          aria-live="polite"
        >
          {visible.length} projet{visible.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard
            key={`${project.client}-${project.year}`}
            project={project}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
