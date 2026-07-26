import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import ArticleCard from '@/components/article-card';
import { getPost, getPosts } from '@/lib/wordpress';

/* Littéral obligatoire : Next lit cette valeur statiquement. */
export const revalidate = 900;
/* Un article publié après le déploiement est rendu à la première visite
   plutôt que d'être introuvable. */
export const dynamicParams = true;

/** Les douze derniers articles sont préparés au build ; les autres à la demande. */
export async function generateStaticParams() {
  const posts = await getPosts({ perPage: 12 });
  return (posts || []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Article introuvable' };

  return {
    title: post.title,
    description: post.excerpt.slice(0, 155),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 155),
      images: post.image ? [post.image.src] : undefined,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const others = (await getPosts({ perPage: 4 }))?.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="shell pb-20 pt-36 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link href="/blog" className="sweep text-[0.82rem] font-bold text-muted">
              ← Tous les articles
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <p className="eyebrow mt-8">
              {post.categories[0]?.name || 'Ressources'} · {post.dateLabel}
            </p>
          </Reveal>

          <Reveal delay={110}>
            <h1 className="d1 mt-5 text-[clamp(2rem,4.4vw,3.1rem)]">{post.title}</h1>
          </Reveal>

          {post.excerpt && (
            <Reveal delay={160}>
              <p className="lead mt-7">{post.excerpt}</p>
            </Reveal>
          )}
        </div>

        {post.image && (
          <Reveal delay={210}>
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl2)] bg-tile">
              <Image
                src={post.image.src}
                alt={post.image.alt || post.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Contenu rédigé dans WordPress. Il a été débarrassé de tout ce qui
            est exécutable ; la mise en forme vient de la feuille `.prose`,
            pas du thème d'origine. */}
        <div className="mx-auto mt-14 max-w-3xl">
          {/* eslint-disable-next-line react/no-danger */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[26px] bg-ink p-8 text-white md:p-10">
          <h2 className="d3 max-w-[22ch] text-white">
            Un projet en tête après cette lecture ?
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-white/65">
            Le configurateur donne une fourchette en trente secondes, et un technicien reprend le
            dossier si vous le souhaitez.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowPill href="/devis" variant="lime">
              Demander un devis
            </ArrowPill>
            <ArrowPill href="/devis#rendez-vous" variant="ghost-dark">
              Prendre rendez-vous
            </ArrowPill>
          </div>
        </div>
      </article>

      {others && others.length > 0 && (
        <section className="shell pb-24 md:pb-32">
          <Reveal>
            <h2 className="d2 max-w-[16ch]">À lire ensuite</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {others.map((item, index) => (
              <ArticleCard key={item.id} post={item} delay={(index % 3) * 80} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
