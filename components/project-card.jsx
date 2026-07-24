import Image from 'next/image';

export default function ProjectCard({ project, priority = false, size = 'default' }) {
  const tall = size === 'tall';
  const wide = size === 'wide';

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group relative block overflow-hidden border border-hairline bg-ink-raised transition-colors duration-500 hover:border-signal/60"
    >
      <div
        className={`relative overflow-hidden ${
          tall ? 'aspect-[3/4]' : wide ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover grayscale-[0.35] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
        <span className="absolute left-4 top-4 border border-hairline bg-ink/70 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.16em] text-bone-dim backdrop-blur-sm">
          {project.tag}
        </span>
      </div>

      <div className="relative p-6 md:p-7">
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-signal">
          {project.client}
        </p>
        <h3 className="display-md mt-3 text-balance">{project.title}</h3>
        <p className="mt-4 flex items-center gap-3 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-bone-faint">
          <span>{project.place}</span>
          <span className="inline-block h-px w-5 bg-hairline" />
          <span>{project.year}</span>
        </p>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
    </a>
  );
}
