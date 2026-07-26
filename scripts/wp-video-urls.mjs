/**
 * Sort les URL exactes des vidéos, et vérifie chacune par une requête HEAD.
 *
 * Une URL recopiée à la main est une URL cassée en production. On contrôle
 * donc le code de réponse et le type MIME avant d'écrire quoi que ce soit
 * dans le catalogue de vidéos.
 */

const API = 'https://led-visual-innovation.fr/wp-json/wp/v2';

const wanted = process.argv.slice(2);

const all = [];
for (let page = 1; page <= 3; page += 1) {
  const response = await fetch(`${API}/media?media_type=video&per_page=100&page=${page}`);
  if (!response.ok) break;
  const items = await response.json();
  if (!items.length) break;
  all.push(...items);
  if (items.length < 100) break;
}

const selected = wanted.length
  ? all.filter((item) => wanted.some((name) => item.source_url.endsWith(name)))
  : all;

for (const item of selected) {
  const url = item.source_url;
  let status = '?';
  let type = '';
  try {
    const head = await fetch(url, { method: 'HEAD' });
    status = head.status;
    type = head.headers.get('content-type') || '';
  } catch (error) {
    status = error.message;
  }
  const d = item.media_details || {};
  console.log(
    `${status} ${type.padEnd(11)} ${d.width}x${d.height} ${String(d.length_formatted).padStart(5)} ${url}`,
  );
}
console.log(`\n${selected.length} fichier(s) contrôlé(s).`);
