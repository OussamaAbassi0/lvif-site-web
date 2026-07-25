import Link from 'next/link';

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Bouton pilule à badge fléché — la signature d'interaction du site LVIF.
 * Le badge pivote de 45° au survol, la pilule inverse ses couleurs.
 */
export default function ArrowPill({
  href,
  children,
  variant = 'lime',
  className = '',
  ...rest
}) {
  const classes = `pill pill-${variant} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="pill__badge">
        <Arrow />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
