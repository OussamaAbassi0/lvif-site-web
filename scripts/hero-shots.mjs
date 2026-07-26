/**
 * Capture le hero à trois moments du défilement, sur le déploiement réel.
 * On vérifie ainsi que la séquence est bien rendue (et non le poster figé)
 * et que l'animation est terminée avant la fin de la section.
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const URL = process.argv[2];
const OUT = 'captures';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox'],
});

for (const view of [
  { label: 'desktop', width: 1440, height: 900, mobile: false },
  { label: 'mobile', width: 390, height: 844, mobile: true },
]) {
  const page = await browser.newPage();
  await page.setViewport({
    width: view.width,
    height: view.height,
    deviceScaleFactor: view.mobile ? 2 : 1,
    isMobile: view.mobile,
    hasTouch: view.mobile,
  });

  await page.goto(URL, { waitUntil: 'load' });
  await new Promise((resolve) => setTimeout(resolve, 5000));

  for (const [name, ratio] of [
    ['debut', 0],
    ['milieu', 0.5],
    ['fin', 1],
  ]) {
    await page.evaluate((r) => {
      const section = document.querySelector('section[aria-label="Présentation"]');
      const span = section.getBoundingClientRect().height - window.innerHeight;
      window.scrollTo(0, span * r);
    }, ratio);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await page.screenshot({ path: `${OUT}/hero-${view.label}-${name}.png` });
  }

  await page.close();
}

await browser.close();
console.log('captures écrites');
