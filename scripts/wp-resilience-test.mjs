/**
 * Contrat de la couche WordPress : elle ne lève jamais.
 *
 * C'est le test qui compte commercialement. Si le serveur du client tombe —
 * mutualisé, mise à jour de plugin, quota dépassé — le site doit continuer à
 * se compiler et à s'afficher. On vérifie donc les deux chemins : hôte
 * inexistant, et hôte joignable qui répond autre chose que du JSON.
 */

const cases = [
  ['hôte inexistant', 'https://wordpress-injoignable.invalid/wp-json/wp/v2'],
  ['hôte valide, mauvaise route', 'https://led-visual-innovation.fr/wp-json/route-absente'],
  ['réponse non JSON', 'https://led-visual-innovation.fr/mentions-legales'],
];

let failures = 0;

for (const [label, base] of cases) {
  process.env.WP_API_BASE = base;
  /* Import frais pour que le module relise la variable d'environnement. */
  const wp = await import(`../lib/wordpress.js?case=${encodeURIComponent(base)}`);

  try {
    const posts = await wp.getPosts({ perPage: 3 });
    const realisations = await wp.getRealisations({ perPage: 3 });
    const post = await wp.getPost('article-inexistant');

    const ok = posts === null && realisations === null && post === null;
    console.log(`${ok ? 'OK  ' : 'ÉCHEC'} ${label} → ${ok ? 'repli propre' : 'valeurs inattendues'}`);
    if (!ok) failures += 1;
  } catch (error) {
    console.log(`ÉCHEC ${label} → exception : ${error.message}`);
    failures += 1;
  }
}

/* Le nettoyage doit neutraliser tout ce qui est exécutable. */
const wp = await import('../lib/wordpress.js?sanitize=1');
const hostile =
  '<p onclick="voler()">Texte</p><script>alert(1)</script>' +
  '<a href="javascript:alert(2)">lien</a><iframe src="//pub"></iframe>' +
  '<img src="x.jpg" width="1600" height="900">';
const clean = wp.sanitize(hostile);

const checks = [
  ['<script> retiré', !clean.includes('<script')],
  ['iframe retiré', !clean.includes('<iframe')],
  ['gestionnaire onclick retiré', !/\son\w+=/i.test(clean)],
  ['protocole javascript neutralisé', !clean.includes('javascript:')],
  ['dimensions en dur retirées', !/\swidth="/.test(clean)],
  ['texte préservé', clean.includes('Texte')],
];

checks.forEach(([label, passed]) => {
  console.log(`${passed ? 'OK  ' : 'ÉCHEC'} ${label}`);
  if (!passed) failures += 1;
});

console.log(failures === 0 ? '\nTous les contrôles passent.' : `\n${failures} échec(s).`);
process.exit(failures === 0 ? 0 : 1);
