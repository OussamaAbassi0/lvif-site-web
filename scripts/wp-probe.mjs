/**
 * Sonde l'API WordPress du client.
 *
 * Sert deux fois : à la conception, pour savoir quels champs existent
 * réellement plutôt que de les supposer ; et à la recette, pour vérifier que
 * l'installation répond toujours avant une mise en production.
 *
 * Lecture seule, quelques requêtes : rien qui pèse sur le serveur du client.
 */

const BASE = process.env.WP_BASE || 'https://led-visual-innovation.fr/wp-json/wp/v2';

const strip = (html = '') =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#8217;/g, '’')
    .replace(/&#8211;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

async function get(path) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { 'User-Agent': 'LVIF-headless-probe' },
  });
  if (!response.ok) throw new Error(`${path} → HTTP ${response.status}`);
  return {
    total: response.headers.get('x-wp-total'),
    pages: response.headers.get('x-wp-totalpages'),
    body: await response.json(),
  };
}

async function survey(label, path) {
  try {
    const { total, body } = await get(`${path}?per_page=3&orderby=date&order=desc`);
    console.log(`\n=== ${label} — ${total ?? body.length} entrées`);
    body.forEach((item) => {
      console.log(
        `  · ${strip(item.title?.rendered).slice(0, 62)}` +
          `\n      slug: ${item.slug}` +
          `\n      date: ${(item.date || '').slice(0, 10)}` +
          `   média: ${item.featured_media || '—'}` +
          `   extrait: ${strip(item.excerpt?.rendered).slice(0, 70) || '—'}`,
      );
    });
    if (body[0]) {
      console.log(`  champs disponibles : ${Object.keys(body[0]).join(', ')}`);
    }
  } catch (error) {
    console.log(`\n=== ${label} — indisponible : ${error.message}`);
  }
}

await survey('Articles de blog', '/posts');
await survey('Réalisations', '/realisations');
await survey('Cards réalisations', '/cards-realisations');
await survey('Produits', '/produits');

/** Les champs ACF portent les métadonnées métier : client, ville, année… */
async function acf(label, path) {
  try {
    const { body } = await get(`${path}?per_page=2&orderby=date&order=desc`);
    console.log(`\n--- ACF ${label}`);
    body.forEach((item) => {
      console.log(`  ${strip(item.title?.rendered).slice(0, 40)} :`);
      Object.entries(item.acf || {}).forEach(([key, value]) => {
        const shown =
          value && typeof value === 'object'
            ? `{${Object.keys(value).slice(0, 6).join(', ')}}`
            : strip(String(value ?? '')).slice(0, 70);
        console.log(`      ${key} = ${shown}`);
      });
    });
  } catch (error) {
    console.log(`\n--- ACF ${label} — ${error.message}`);
  }
}

await acf('Réalisations', '/realisations');
await acf('Cards', '/cards-realisations');
await acf('Produits', '/produits');

try {
  const { body } = await get('/categories?per_page=30&_fields=id,name,slug,count');
  console.log('\n=== Catégories');
  body.forEach((item) => console.log(`  · ${item.name} (${item.slug}) — ${item.count}`));
} catch (error) {
  console.log(`\n=== Catégories — indisponible : ${error.message}`);
}
