import Image from 'next/image';

export default function ProjectCard({ project, priority = false, size = 'default' }) {
  const ratio = size === 'wide' ? 'aspect-[16/10]' : size === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group block"
    >
      <div className={`card-media ${ratio}`}>
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.72rem] font-bold text-ink backdrop-blur">
          {project.tag}
        </span>
        <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-lime text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
            <path
              d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="px-1 pt-5">
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-muted">
          {project.client}
        </p>
        <h3 className="d3 mt-2.5 max-w-[26ch]">{project.title}</h3>
        <p className="mt-3 text-[0.85rem] font-medium text-faint">
          {project.place} — {project.year}
        </p>
      </div>
    </a>
  );
}
