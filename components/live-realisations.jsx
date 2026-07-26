import Image from 'next/image';
import Reveal from './reveal';
import SectionHead from './section-head';
import ArrowPill from './arrow-pill';
import { getRealisations } from '@/lib/wordpress';

/**
 * Réalisations tirées en direct du WordPress du client.
 *
 * C'est la démonstration la plus parlante du mode découplé : le client publie
 * un chantier dans son interface habituelle, et il apparaît ici sans qu'un
 * développeur intervienne.
 *
 * Si l'API ne répond pas, le composant ne rend rien du tout. La page reste
 * complète grâce à la sélection éditoriale qui la suit — une rubrique
 * silencieuse vaut mieux qu'un message d'erreur devant un prospect.
 */
export default async function LiveRealisations({ limit = 6 }) {
  const items = (await getRealisations({ perPage: limit + 4 }))?.slice(0, limit);
  if (!items || items.length === 0) return null;

  return (
    <section className="shell pb-20 md:pb-28">
      <SectionHead
        eyebrow="Publié récemment"
        title="Les derniers chantiers livrés"
        lead="Cette rubrique se met à jour toute seule : chaque réalisation publiée par l’équipe apparaît ici dans le quart d’heure."
        aside={
          <ArrowPill href="/devis" variant="outline" className="mt-8">
            Décrire mon projet
          </ArrowPill>
        }
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 80}>
            <article className="group flex h-full flex-col">
              <div className="card-media aspect-[16/11]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                {item.categories[0] && (
                  <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1.5 text-[0.7rem] font-bold text-ink">
                    {item.categories[0].name}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-1 pt-5">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                  {item.dateLabel}
                </p>
                <h3 className="d3 mt-2.5 text-[1.05rem] leading-snug">{item.title}</h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
