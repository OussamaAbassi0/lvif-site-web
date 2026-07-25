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
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const selected = active === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={selected}
              className={`min-h-[44px] rounded-full px-5 py-2.5 text-[0.88rem] font-semibold transition-colors duration-200 ${
                selected ? 'bg-ink text-paper' : 'bg-tile text-muted hover:text-ink'
              }`}
            >
              {tag}
            </button>
          );
        })}
        <span className="ml-auto text-[0.82rem] font-semibold text-faint" aria-live="polite">
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
