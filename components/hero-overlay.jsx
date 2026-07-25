import Image from 'next/image';
import ArrowPill from './arrow-pill';

/**
 * Contenu posé sur la séquence d'images du hero.
 * Reprend la hiérarchie du site actuel : micro-preuve sociale, titre,
 * deux appels à l'action, et un rappel des chiffres en pied de bloc.
 */
export default function HeroOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-ink/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />

      <div className="shell relative flex h-full flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="flex items-center gap-4">
          <Image
            src="https://led-visual-innovation.fr/wp-content/uploads/2024/10/LOGOS.svg"
            alt=""
            width={84}
            height={24}
            unoptimized
            className="h-7 w-auto"
          />
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/80">
            Les plus grandes entreprises nous font confiance
          </p>
        </div>

        <h1 className="d1 mt-7 max-w-[19ch] text-white">
          Spécialiste de la location et de la vente d’écrans géants LED
        </h1>

        <div className="mt-9 flex flex-wrap gap-3">
          <ArrowPill href="/devis" variant="lime">
            Louer un écran
          </ArrowPill>
          <ArrowPill href="/devis" variant="ghost-dark">
            Nous contacter
          </ArrowPill>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 md:grid-cols-4">
          {[
            ['+1 400', 'installations réalisées'],
            ['2 160 m²', 'déployés en 2025'],
            ['4,5 M€', 'de CA groupe 2024'],
            ['+200', 'entreprises clientes'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="stat text-[clamp(1.6rem,2.6vw,2.4rem)] text-lime">{value}</dt>
              <dd className="mt-2 text-[0.82rem] leading-snug text-white/70">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
