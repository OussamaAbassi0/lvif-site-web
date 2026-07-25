import ArrowPill from './arrow-pill';
import { about } from '@/lib/pages';

/**
 * Contenu posé sur la séquence d'images de la page Qui sommes-nous.
 * Même traitement que le hero d'accueil, mais avec les repères de
 * l'entreprise plutôt que l'argumentaire commercial.
 */
export default function AboutHeroOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-ink/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />

      <div className="shell relative flex h-full flex-col justify-end pb-10 pt-32 md:pb-14">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-lime">
          À propos
        </p>

        <h1 className="d1 mt-6 max-w-[16ch] text-white">{about.title}</h1>

        <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-white/70">
          {about.lead}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ArrowPill href="/realisations" variant="lime">
            Nos réalisations
          </ArrowPill>
          <ArrowPill href="/devis" variant="ghost-dark">
            Nous contacter
          </ArrowPill>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-x-6 border-t border-white/15 pt-8">
          {[
            ['2018', 'année de création'],
            ['4,5 M€', 'de CA groupe 2024'],
            ['11 000 m²', 'd’ateliers et d’entrepôt'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="stat text-[clamp(1.4rem,2.4vw,2.2rem)] text-lime">{value}</dt>
              <dd className="mt-2 text-[0.82rem] leading-snug text-white/70">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
