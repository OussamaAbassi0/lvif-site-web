import Image from 'next/image';
import Link from 'next/link';
import Reveal from './reveal';

/**
 * Vignette d'article. Les données viennent du WordPress du client : titre,
 * extrait, image à la une et catégorie sont ceux qu'il a saisis.
 */
export default function ArticleCard({ post, delay = 0, priority = false }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="card-media aspect-[16/10]">
          {post.image ? (
            <Image
              src={post.image.src}
              alt={post.image.alt || post.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-tile" />
          )}
        </div>

        <div className="flex flex-1 flex-col px-1 pt-5">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
            {post.categories[0]?.name || 'Ressources'} · {post.dateLabel}
          </p>
          <h3 className="d3 mt-2.5 text-[1.15rem] leading-snug">{post.title}</h3>
          <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
            {post.excerpt.slice(0, 150)}
            {post.excerpt.length > 150 ? '…' : ''}
          </p>
          <span className="sweep mt-5 inline-block text-[0.85rem] font-bold text-ink">
            Lire l’article
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
