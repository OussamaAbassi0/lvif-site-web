/**
 * Inspecte la nature du HTML renvoyé par WordPress.
 *
 * Question à trancher avant d'écrire quoi que ce soit : le contenu des
 * articles est-il du HTML propre issu de l'éditeur, ou de la soupe Elementor ?
 * La réponse décide de la stratégie de rendu — on ne peut pas injecter
 * aveuglément du balisage produit par un constructeur de pages dans une
 * maquette qui a sa propre typographie.
 */

const BASE = 'https://led-visual-innovation.fr/wp-json/wp/v2';

const { 0: post } = await (await fetch(`${BASE}/posts?per_page=1&orderby=date&order=desc`)).json();
const html = post.content.rendered;

const tally = {};
for (const match of html.matchAll(/<([a-z0-9]+)[\s>]/gi)) {
  const tag = match[1].toLowerCase();
  tally[tag] = (tally[tag] || 0) + 1;
}

console.log('article :', post.title.rendered);
console.log('longueur du HTML :', html.length);
console.log('balises :', Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 14));
console.log('classes elementor :', (html.match(/elementor/g) || []).length);
console.log('classes wp-block :', (html.match(/wp-block/g) || []).length);
console.log('\n--- 700 premiers caractères ---\n');
console.log(html.slice(0, 700));

const media = await (await fetch(`${BASE}/media/${post.featured_media}`)).json();
console.log('\n--- image à la une ---');
console.log('source :', media.source_url);
console.log('alt    :', media.alt_text || '(vide)');
console.log(
  'tailles :',
  Object.keys(media.media_details?.sizes || {}).join(', ') || '(aucune)',
);
