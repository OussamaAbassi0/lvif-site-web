'use client';

/**
 * Lecteur vidéo.
 *
 * Les fichiers du client pèsent de 2 à 46 Mo. Les poser tels quels dans une
 * page reviendrait à annuler tout le travail fait sur le hero : un visiteur
 * en 4G paierait plusieurs dizaines de mégaoctets sans avoir rien demandé.
 *
 * Deux règles tiennent le composant :
 *
 *   1. `preload="none"` et pas d'attribut `src` sur la balise tant que rien
 *      ne le justifie. Un `<video>` sans `src` ne déclenche aucune requête —
 *      c'est la seule façon fiable d'obtenir zéro octet au chargement.
 *   2. La source n'est posée qu'à l'intention : le clic pour un film, ou
 *      l'entrée dans l'écran pour un plan d'ambiance. Un observateur
 *      d'intersection avec marge démarre le chargement juste avant que le
 *      visiteur n'arrive dessus.
 *
 * En mode ambiance la lecture est muette et bouclée : elle sert de décor. Le
 * son et les commandes n'apparaissent que pour les films.
 */

import { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({
  src,
  poster,
  title,
  caption,
  mode = 'ambiance',
  ratio = '16 / 9',
  className = '',
}) {
  const holder = useRef(null);
  const video = useRef(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  /* Mode ambiance : on arme à l'approche, jamais avant. */
  useEffect(() => {
    if (mode !== 'ambiance' || armed) return undefined;

    const node = holder.current;
    if (!node) return undefined;

    /* Sur connexion mesurée ou en économie de données, on s'abstient : le
       visiteur garde l'affiche et peut lancer la lecture lui-même. */
    const link = navigator.connection;
    if (link?.saveData || /2g/.test(link?.effectiveType || '')) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mode, armed]);

  /* La source n'est posée qu'ici, une fois armé. */
  useEffect(() => {
    const node = video.current;
    if (!armed || !node || node.src) return;

    node.src = src;
    if (mode === 'ambiance') {
      node.play().then(
        () => setPlaying(true),
        () => setPlaying(false) /* lecture automatique refusée : on garde l'affiche */,
      );
    }
  }, [armed, src, mode]);

  const start = () => {
    setArmed(true);
    const node = video.current;
    if (!node) return;
    if (!node.src) node.src = src;
    node.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  };

  const ambient = mode === 'ambiance';

  return (
    <figure className={className}>
      <div
        ref={holder}
        className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-ink"
        style={{ aspectRatio: ratio }}
      >
        {/* Affiche : seul pixel chargé tant que la vidéo n'est pas demandée. */}
        {poster && !playing && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <video
          ref={video}
          /* Aucun `src` ici : la balise reste inerte jusqu'à l'intention. */
          preload="none"
          poster={poster}
          muted={ambient}
          loop={ambient}
          playsInline
          controls={!ambient && playing}
          disablePictureInPicture
          aria-label={title}
          onPlay={() => setPlaying(true)}
          onPause={() => !ambient && setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Bouton de lecture, pour les films et en secours si la lecture
            automatique est refusée par le navigateur. */}
        {!playing && (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 grid place-items-center bg-ink/25 transition-colors duration-500 hover:bg-ink/10"
            aria-label={`Lire la vidéo : ${title}`}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-ink shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 md:h-7 md:w-7" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}

        {/* Repère discret pendant la lecture d'ambiance : le visiteur voit
            qu'il s'agit d'une vidéo et non d'une image animée par erreur. */}
        {ambient && playing && (
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/50 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">
            Sans son
          </span>
        )}
      </div>

      {caption && (
        <figcaption className="mt-4 px-1 text-[0.85rem] leading-relaxed text-muted">
          <span className="font-semibold text-ink">{title}</span>
          <span className="mx-2 text-muted/50">·</span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
