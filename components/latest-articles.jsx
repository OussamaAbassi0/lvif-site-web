import SectionHead from './section-head';
import ArrowPill from './arrow-pill';
import ArticleCard from './article-card';
import { getPosts } from '@/lib/wordpress';

/**
 * « Pour aller plus loin, consulter notre blog » — la rubrique existe sur la
 * page d'accueil actuelle. Les trois articles viennent du WordPress du
 * client, donc la section suit ses publications sans intervention.
 *
 * Rendu nul si l'API ne répond pas : la page d'accueil ne doit jamais montrer
 * une rubrique vide à un prospect.
 */
export default async function LatestArticles() {
  const posts = await getPosts({ perPage: 3 });
  if (!posts || posts.length === 0) return null;

  return (
    <section className="shell py-20 md:py-28">
      <SectionHead
        eyebrow="Ressources"
        title="Pour aller plus loin"
        lead="Budgets réels, finesse de dalle, réglementation d’affichage : ce que l’équipe technique publie entre deux chantiers."
        aside={
          <ArrowPill href="/blog" variant="outline" className="mt-8">
            Lire nos articles
          </ArrowPill>
        }
      />

      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <ArticleCard key={post.id} post={post} delay={(index % 3) * 80} />
        ))}
      </div>
    </section>
  );
}
