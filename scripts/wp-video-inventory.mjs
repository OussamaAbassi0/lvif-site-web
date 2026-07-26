/**
 * Inventaire des vidéos du site actuel.
 *
 * Deux sources croisées, parce qu'aucune ne suffit seule :
 *   - la médiathèque WordPress donne les fichiers réellement téléversés,
 *     avec leur poids et leur date ;
 *   - le HTML des pages publiées dit lesquelles sont effectivement posées,
 *     et à quel endroit. Un fichier présent dans la médiathèque mais absent
 *     des pages ne doit pas être repris.
 */

const API = 'https://led-visual-innovation.fr/wp-json/wp/v2';
const SITE = 'https://led-visual-innovation.fr';

const PAGES = [
  '/',
  '/catalogue/ecrans-geants-led/',
  '/catalogue/ecran-exterieur-led/',
  '/catalogue/ecran-geant-led-interieur/',
  '/catalogue/mur-images-led-interieur-sur-mesure/',
  '/catalogue/ecran-led-transparent/',
  '/catalogue/ecran-publicitaire-led/',
  '/catalogue/ecran-pour-vitrine/',
  '/catalogue/borne-exterieure/',
  '/location-ecrans-geants-led/',
  '/catalogue/creation-stand-paris/',
  '/catalogue/realisation-evenementielle/',
  '/catalogue/mur-decrans-salle-de-controle/',
  '/catalogue/ecran-salle-de-conference/',
  '/catalogue/studios-et-tournage-tv/',
  '/catalogue/ecran-pharmacie/',
  '/qui-sommes-nous/',
  '/actualite/',
];

const mb = (bytes) => (bytes ? `${(bytes / 1048576).toFixed(1)} Mo` : '—');

/* --- 1. Médiathèque --------------------------------------------------- */
const library = new Map();
for (let page = 1; page <= 3; page += 1) {
  const response = await fetch(`${API}/media?media_type=video&per_page=100&page=${page}`);
  if (!response.ok) break;
  const items = await response.json();
  if (!items.length) break;
  items.forEach((item) => {
    library.set(item.source_url, {
      title: item.title?.rendered?.replace(/<[^>]*>/g, '') || '',
      date: (item.date || '').slice(0, 10),
      size: item.media_details?.filesize,
      length: item.media_details?.length_formatted,
      width: item.media_details?.width,
      height: item.media_details?.height,
    });
  });
  if (items.length < 100) break;
}

console.log(`=== Médiathèque : ${library.size} fichiers vidéo\n`);
for (const [url, meta] of library) {
  console.log(
    `  ${url.split('/').pop()}\n      ${meta.width}×${meta.height} · ${meta.length || '?'} · ${mb(
      meta.size,
    )} · ${meta.date}`,
  );
}

/* --- 2. Vidéos réellement posées sur les pages ------------------------ */
console.log('\n=== Vidéos posées, page par page\n');

const used = new Set();

for (const path of PAGES) {
  try {
    const response = await fetch(SITE + path, { headers: { 'User-Agent': 'LVIF-inventory' } });
    if (!response.ok) {
      console.log(`  ${path} → HTTP ${response.status}`);
      continue;
    }
    /* Elementor range ses réglages dans des attributs JSON, où les barres
       obliques sont échappées : sans cette normalisation, les vidéos de fond
       et les lecteurs différés passent inaperçus. C'est le cas de la page
       écran extérieur. */
    const html = (await response.text()).replace(/\\\//g, '/');

    const mp4 = [
      ...new Set([...html.matchAll(/https:\/\/[^"'\s\\)]+\.(?:mp4|webm)/g)].map((m) => m[0])),
    ];
    const youtube = [
      ...new Set(
        [...html.matchAll(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/g)].map(
          (m) => m[1],
        ),
      ),
    ];
    const vimeo = [...new Set([...html.matchAll(/player\.vimeo\.com\/video\/(\d+)/g)].map((m) => m[1]))];

    if (!mp4.length && !youtube.length && !vimeo.length) continue;

    console.log(`  ${path}`);
    mp4.forEach((url) => {
      used.add(url);
      const meta = library.get(url);
      console.log(`      mp4      ${url.split('/').pop()}  ${meta ? mb(meta.size) : ''}`);
    });
    youtube.forEach((id) => console.log(`      youtube  ${id}`));
    vimeo.forEach((id) => console.log(`      vimeo    ${id}`));
  } catch (error) {
    console.log(`  ${path} → ${error.message}`);
  }
}

const orphans = [...library.keys()].filter((url) => !used.has(url));
console.log(`\n=== Dans la médiathèque mais non posées : ${orphans.length}`);
orphans.forEach((url) => console.log(`  ${url.split('/').pop()}`));
