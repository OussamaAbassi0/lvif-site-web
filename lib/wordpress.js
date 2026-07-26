/**
 * Couche de lecture du WordPress de LED Visual Innovation.
 *
 * Le principe du découplé : le WordPress du client reste son back-office —
 * mêmes menus, même médiathèque, même bouton « Mettre à jour » — et ce site
 * vient y lire les contenus au moment de la compilation, puis les régénère
 * périodiquement. Le visiteur ne touche jamais WordPress ; il reçoit des
 * pages statiques servies depuis le CDN.
 *
 * Trois exigences non négociables, parce qu'un site vitrine ne peut pas
 * dépendre de la disponibilité d'un serveur mutualisé :
 *
 *   1. Toute requête a un délai maximal. Sans lui, un WordPress lent fait
 *      traîner le build jusqu'à l'expiration du déploiement.
 *   2. Toute erreur est absorbée. Une API injoignable renvoie `null`, jamais
 *      une exception : les pages basculent alors sur le contenu de secours.
 *   3. Rien de ce qui vient de WordPress n'est injecté tel quel. Les titres
 *      sont réduits à du texte, le contenu des articles est débarrassé de
 *      tout ce qui est exécutable.
 *
 * L'API REST est publique en lecture ; aucun identifiant n'est nécessaire ni
 * stocké ici. L'écriture, elle, reste dans l'interface WordPress.
 */

const BASE = process.env.WP_API_BASE || 'https://led-visual-innovation.fr/wp-json/wp/v2';

/* Délai de régénération : le client publie, la page se refait au plus tard
   dans le quart d'heure. Un déclencheur de déploiement branché sur WordPress
   rendrait la publication immédiate ; ce délai est le filet de sécurité. */
export const REVALIDATE = 900;

const TIMEOUT_MS = 8000;

/** Entités HTML les plus fréquentes dans un WordPress francophone. */
const ENTITIES = {
  '&#8217;': '’',
  '&#8216;': '‘',
  '&#8211;': '–',
  '&#8212;': '—',
  '&#8230;': '…',
  '&#039;': '’',
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&laquo;': '«',
  '&raquo;': '»',
  '&nbsp;': ' ',
  '&amp;': '&',
  '&quot;': '"',
  '&lt;': '<',
  '&gt;': '>',
  '&eacute;': 'é',
  '&egrave;': 'è',
  '&agrave;': 'à',
  '&ccedil;': 'ç',
};

export function decode(value = '') {
  let out = String(value);
  for (const [entity, character] of Object.entries(ENTITIES)) {
    out = out.split(entity).join(character);
  }
  /* Entités numériques restantes. */
  return out.replace(/&#(\d+);/g, (match, code) => String.fromCharCode(Number(code)));
}

/** Titre ou extrait : on ne garde que du texte. */
export function toText(html = '') {
  return decode(String(html).replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Nettoyage du corps d'article.
 *
 * Les articles sont rédigés avec l'éditeur de blocs — du HTML sémantique
 * propre, sans balisage de constructeur de pages. On retire malgré tout tout
 * ce qui peut exécuter du code ou casser la mise en page : un contenu tiers
 * inséré dans une page ne doit jamais pouvoir en prendre le contrôle.
 */
export function sanitize(html = '') {
  return String(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '')
    /* Les largeurs et hauteurs en dur des images WordPress débordent sur
       mobile ; la feuille de style du site s'en charge mieux. */
    .replace(/\s(width|height)="\d+"/gi, '');
}

/**
 * Requête unique vers l'API. Ne lève jamais : renvoie `null` en cas d'échec,
 * et l'appelant décide du repli.
 */
async function wpFetch(path, { revalidate = REVALIDATE } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      next: { revalidate },
    });
    if (!response.ok) {
      console.warn(`[wp] ${path} → HTTP ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    /* Coupure réseau, DNS, délai dépassé, JSON invalide : même traitement.
       Le build continue, les pages affichent leur contenu de secours. */
    console.warn(`[wp] ${path} → ${error.name === 'AbortError' ? 'délai dépassé' : error.message}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Image à la une, extraite de la réponse `_embed` — évite une requête par article. */
function featured(item) {
  const media = item?._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;

  const sizes = media.media_details?.sizes || {};
  const best = sizes.medium_large || sizes.large || sizes.full;

  return {
    src: best?.source_url || media.source_url,
    width: best?.width || media.media_details?.width || 1200,
    height: best?.height || media.media_details?.height || 800,
    alt: toText(media.alt_text || media.title?.rendered || ''),
  };
}

function terms(item) {
  const groups = item?._embedded?.['wp:term'] || [];
  return groups
    .flat()
    .filter((term) => term?.taxonomy === 'category' && term.slug !== 'non-classe')
    .map((term) => ({ name: toText(term.name), slug: term.slug }));
}

const FR_DATE = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function normalize(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: toText(item.title?.rendered),
    excerpt: toText(item.excerpt?.rendered).replace(/\s*\[…\]$/, '…'),
    date: item.date,
    dateLabel: item.date ? FR_DATE.format(new Date(item.date)) : '',
    image: featured(item),
    categories: terms(item),
    source: item.link,
  };
}

/** Liste d'articles de blog. Renvoie `null` si WordPress ne répond pas. */
export async function getPosts({ perPage = 12, category } = {}) {
  const query = new URLSearchParams({
    per_page: String(perPage),
    orderby: 'date',
    order: 'desc',
    _embed: 'wp:featuredmedia,wp:term',
  });
  if (category) query.set('categories', String(category));

  const data = await wpFetch(`/posts?${query}`);
  return Array.isArray(data) ? data.map(normalize) : null;
}

/** Un article complet, contenu nettoyé compris. */
export async function getPost(slug) {
  const data = await wpFetch(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,wp:term`,
  );
  if (!Array.isArray(data) || !data.length) return null;

  const post = data[0];
  return { ...normalize(post), content: sanitize(post.content?.rendered || '') };
}

/**
 * Réalisations : type de contenu sur mesure du WordPress du client, 118
 * entrées au dernier relevé. On ne remonte pas leur corps de page — il est
 * construit avec Elementor et n'a pas de sens hors de son thème. Titre,
 * image et catégorie suffisent à alimenter une grille.
 */
export async function getRealisations({ perPage = 24 } = {}) {
  const query = new URLSearchParams({
    per_page: String(perPage),
    orderby: 'date',
    order: 'desc',
    _embed: 'wp:featuredmedia,wp:term',
  });

  const data = await wpFetch(`/realisations?${query}`);
  if (!Array.isArray(data)) return null;

  return data
    .map(normalize)
    .filter((item) => item.image)
    .map((item) => ({
      ...item,
      /* Les titres du client suivent la forme « Location d'écran géant LED
         pour X à Y » : on isole le client pour l'afficher en surtitre. */
      client: item.title.split(/\bpour\b/i).slice(1).join('pour').trim() || item.title,
    }));
}
