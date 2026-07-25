/**
 * Captures de contrôle : desktop 1440 et mobile 390.
 * Usage : node scripts/shots.mjs <baseUrl> <dossierDeSortie>
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] || 'http://localhost:4310';
const OUT = process.argv[3] || './captures';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const videos = Array.from(document.querySelectorAll('video'));
    await Promise.all(
      videos.map(
        (v) =>
          new Promise((resolve) => {
            if (v.readyState >= 2) return resolve();
            v.addEventListener('loadeddata', resolve, { once: true });
            setTimeout(resolve, 6000);
          }),
      ),
    );
  });
  await wait(1400);
}

async function scrollTo(page, y) {
  await page.evaluate((target) => window.scrollTo(0, target), y);
  await wait(1300);
}

async function scrollToSelector(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, selector);
  await wait(1500);
}

/** Amène au centre de l'écran la section portant ce titre. */
async function byHeading(page, text) {
  await page.evaluate((needle) => {
    const target = Array.from(document.querySelectorAll('h2')).find((h) =>
      h.textContent.includes(needle),
    );
    if (target) target.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, text);
  await wait(1600);
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--hide-scrollbars'],
  });

  const shots = [];

  const capture = async (page, name) => {
    const file = path.join(OUT, `${name}.png`);
    await page.screenshot({ path: file });
    shots.push(name);
    console.log('shot', name);
  };

  for (const device of [
    { key: 'desktop', width: 1440, height: 900, mobile: false },
    { key: 'mobile', width: 390, height: 844, mobile: true },
  ]) {
    const page = await browser.newPage();
    await page.setViewport({
      width: device.width,
      height: device.height,
      deviceScaleFactor: 1,
      isMobile: device.mobile,
      hasTouch: device.mobile,
    });

    // Accueil
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle0', timeout: 60000 });
    await settle(page);
    await capture(page, `01-accueil-hero-${device.key}`);

    await scrollTo(page, device.mobile ? 900 : 1500);
    await capture(page, `02-accueil-scroll-video-${device.key}`);

    await scrollTo(page, device.mobile ? 2600 : 3600);
    await capture(page, `03-accueil-scroll-video-fin-${device.key}`);

    await scrollToSelector(page, 'section[aria-label="Presentation"] + div, .marquee-track');
    await capture(page, `04-accueil-references-${device.key}`);

    await scrollToSelector(page, 'h2');
    await capture(page, `05-accueil-chiffres-${device.key}`);

    await byHeading(page, 'Dimensionnez');
    await capture(page, `05b-simulateur-${device.key}`);

    await byHeading(page, 'avis clients');
    await capture(page, `05c-avis-${device.key}`);

    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const target = headings.find((h) => h.textContent.includes('implantation'));
      if (target) target.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await wait(1600);
    await capture(page, `06-accueil-carte-${device.key}`);

    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const target = headings.find((h) => h.textContent.includes('acheteur'));
      if (target) target.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await wait(1200);
    await capture(page, `07-accueil-faq-${device.key}`);

    // Chatbot
    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Qualifier mon projet'),
      );
      if (button) button.click();
    });
    await wait(900);
    await page.evaluate(() => {
      const chip = Array.from(document.querySelectorAll('#lvif-chat button')).find(
        (b) => b.textContent.trim() === 'Louer',
      );
      if (chip) chip.click();
    });
    await wait(900);
    await page.evaluate(() => {
      const chip = Array.from(document.querySelectorAll('#lvif-chat button')).find(
        (b) => b.textContent.trim() === 'Extérieur',
      );
      if (chip) chip.click();
    });
    await wait(1000);
    await capture(page, `08-chatbot-${device.key}`);

    // Autres pages
    for (const [slug, name] of [
      ['catalogue', '09-catalogue'],
      ['realisations', '10-realisations'],
      ['devis', '11-devis'],
    ]) {
      await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle0', timeout: 60000 });
      await settle(page);
      await capture(page, `${name}-${device.key}`);
      await scrollTo(page, device.mobile ? 1100 : 1300);
      await capture(page, `${name}-detail-${device.key}`);
    }

    await page.close();
  }

  await browser.close();
  console.log(`TOTAL=${shots.length}`);
}

run().catch((error) => {
  console.error('ERREUR', error);
  process.exit(1);
});
