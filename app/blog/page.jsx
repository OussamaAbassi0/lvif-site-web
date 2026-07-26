import PageHero from '@/components/page-hero';
import ArticleCard from '@/components/article-card';
import Reveal from '@/components/reveal';
import ArrowPill from '@/components/arrow-pill';
import { getPosts, REVALIDATE } from '@/lib/wordpress';

/* Régénération périodique : le client publie dans WordPress, la page se
   refait sans intervention ni redéploiement. */
export const revalidate = REVALIDATE;

export const metadata = {
  title: 'Blog et ressources',
  description:
    'Budgets, choix de pitch, réglementation, retours d’expérience : les repères utiles avant d’acheter ou de louer un écran géant LED.',
};

export default async function BlogPage() {
  const posts = await getPosts({ perPage: 24 });

  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Ce qu’il faut savoir avant de choisir un écran"
        lead="Budgets réels, finesse de dalle, contraintes d’installation, réglementation d’affichage. Les articles publiés par l’équipe technique, sans argumentaire commercial."
      />

      <section className="shell pb-24 md:pb-32">
        {!posts && (
          <div className="rounded-[26px] border border-dashed border-ink/15 p-10 text-center">
            <p className="d3 mx-auto max-w-[28ch] text-muted">
              Les articles ne sont pas accessibles pour le moment
            </p>
            <p className="mx-auto mt-4 max-w-[48ch] text-[0.9rem] leading-relaxed text-muted">
              Le reste du site fonctionne normalement : seule cette rubrique dépend de la
              plateforme de publication.
            </p>
            <ArrowPill href="/devis" variant="outline" className="mt-8">
              Nous contacter
            </ArrowPill>
          </div>
        )}

        {posts && posts.length === 0 && (
          <p className="text-center text-muted">Aucun article publié pour l’instant.</p>
        )}

        {posts && posts.length > 0 && (
          <>
            <Reveal>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted">
                {posts.length} article{posts.length > 1 ? 's' : ''}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  delay={(index % 3) * 80}
                  priority={index < 3}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
