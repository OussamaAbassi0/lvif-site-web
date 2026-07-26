/**
 * Capture les quatre nouveaux parcours, dans l'état où un visiteur les voit
 * après avoir interagi — pas la page vide au chargement.
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const BASE = process.argv[2];
const SHARE = BASE.includes('?') ? `&${BASE.split('?')[1]}` : '';
const ROOT = BASE.split('?')[0];
const OUT = 'captures';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function shot(name, width, height, path, act) {
  await page.setViewport({ width, height, isMobile: width < 700, hasTouch: width < 700 });
  await page.goto(`${ROOT}${path}${path.includes('?') ? SHARE : `?${SHARE.slice(1)}`}`, {
    waitUntil: 'load',
  });
  await wait(2500);
  if (act) await act();
  await wait(900);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

/* SAV : symptôme sélectionné, diagnostic affiché. */
await shot('f-sav', 1440, 1100, '/sav', async () => {
  const buttons = await page.$$('button');
  for (const button of buttons) {
    const text = await page.evaluate((node) => node.textContent, button);
    if (text.includes('modules reste éteinte')) {
      await button.click();
      break;
    }
  }
  await page.evaluate(() => window.scrollTo(0, 420));
});

/* Rendez-vous : onglet ouvert, date choisie, créneaux visibles. */
await shot('f-rdv', 1440, 1100, '/devis#rendez-vous', async () => {
  await page.evaluate(() => window.scrollTo(0, 380));
  await wait(600);
  const days = await page.$$('button[aria-pressed="false"]');
  for (const day of days) {
    const enabled = await page.evaluate((node) => {
      const text = node.textContent.trim();
      return !node.disabled && /^\d+$/.test(text) && Number(text) > 26;
    }, day);
    if (enabled) {
      await day.click();
      break;
    }
  }
});

/* Récapitulatif imprimable, avec amortissement. */
await shot(
  'f-recap',
  1440,
  1250,
  '/devis/recapitulatif?mode=achat&usage=exterieur&pitch=P4&largeur=6&hauteur=3.5&surface=21.0&bas=23100&haut=35700&px=1500x875&mensuel=900&amortissement=40',
);

/* Amortissement dans le simulateur, sur la page d'accueil. */
await shot('f-amortissement', 1440, 1100, '/', async () => {
  await page.evaluate(() => {
    const node = document.getElementById('sim-monthly');
    node?.scrollIntoView({ block: 'center' });
  });
});

/* Deux vues mobiles pour vérifier qu'aucune ne déborde. */
await shot('f-sav-mobile', 390, 844, '/sav', async () => {
  const buttons = await page.$$('button');
  for (const button of buttons) {
    const text = await page.evaluate((node) => node.textContent, button);
    if (text.includes('totalement noir')) {
      await button.click();
      break;
    }
  }
  await page.evaluate(() => window.scrollTo(0, 900));
});

await shot('f-rdv-mobile', 390, 844, '/devis#rendez-vous', async () => {
  await page.evaluate(() => window.scrollTo(0, 400));
});

/* Contrôle de débordement horizontal sur les nouvelles pages. */
const overflow = [];
for (const path of ['/sav', '/devis', '/devis/recapitulatif']) {
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${ROOT}${path}?${SHARE.slice(1)}`, { waitUntil: 'load' });
  await wait(1500);
  overflow.push(
    await page.evaluate((p) => ({
      page: p,
      scrollW: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }), path),
  );
}

await browser.close();
console.table(overflow);
console.log('captures écrites');
