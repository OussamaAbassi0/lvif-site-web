/**
 * Mesure les octets de vidéo réellement téléchargés.
 *
 * Le contrat est simple : à l'ouverture d'une page, aucune vidéo ne doit
 * partir. Elles ne se chargent qu'à l'entrée dans l'écran pour les plans
 * d'ambiance, ou au clic pour les films.
 *
 * On compare donc trois états : au chargement, après défilement complet, et
 * après un clic sur le bouton de lecture.
 */
import puppeteer from 'puppeteer';

const [BASE, SHARE] = [process.argv[2], process.argv[3] || ''];

const PAGES = [
  '/',
  '/catalogue/ecran-exterieur-led',
  '/catalogue/ecran-interieur-led',
  '/catalogue/ecran-transparent',
  '/catalogue/ecran-publicitaire',
  '/catalogue/mur-images',
  '/location',
  '/solutions/stand-paris',
  '/solutions/salle-de-controle',
  '/solutions/salle-de-reunion',
  '/solutions/pharmacie',
  '/solutions/evenementiel',
  '/a-propos',
];

const browser = await puppeteer.launch({
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const rows = [];

for (const path of PAGES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  let bytes = 0;
  const seen = new Set();
  page.on('response', async (response) => {
    const url = response.url();
    if (!/\.(mp4|webm)(\?|$)/i.test(url)) return;
    seen.add(url.split('/').pop());
    try {
      const length = Number(response.headers()['content-length'] || 0);
      bytes += length;
    } catch {
      /* réponse partielle : le compteur reste indicatif */
    }
  });

  /* `domcontentloaded` plutôt que `load` : une vidéo en cours de lecture
     retarde indéfiniment l'événement `load`, ce qui ferait expirer la
     navigation sans rien dire du poids réel. */
  await page.goto(`${BASE}${path}${SHARE}`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await wait(3500);
  const atLoad = bytes;

  /* Défilement complet : déclenche les plans d'ambiance. */
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
  });
  await wait(2500);
  const afterScroll = bytes;

  rows.push({
    page: path,
    'au chargement': `${(atLoad / 1048576).toFixed(2)} Mo`,
    'après défilement': `${(afterScroll / 1048576).toFixed(2)} Mo`,
    fichiers: seen.size,
  });

  await page.close();
}

await browser.close();
console.table(rows);

const bad = rows.filter((row) => parseFloat(row['au chargement']) > 0.01);
console.log(
  bad.length === 0
    ? '\nAucune vidéo chargée avant intention : contrat tenu.'
    : `\n${bad.length} page(s) chargent de la vidéo trop tôt.`,
);
