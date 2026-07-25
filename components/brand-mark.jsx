import Image from 'next/image';

/**
 * Logo officiel LED Visual Innovation.
 * `light` sert les fonds sombres (bloc de texte en blanc, caméléon inchangé).
 */
export default function BrandMark({ light = false, width = 132, className = '' }) {
  return (
    <Image
      src={light ? '/logo-lvi-light.svg' : '/logo-lvi.svg'}
      alt="LED Visual Innovation"
      width={width}
      height={Math.round((width * 90.6) / 126.6)}
      priority
      className={className}
    />
  );
}
