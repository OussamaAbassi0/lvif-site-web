/**
 * Mesure le hero au scroll, sur une page servie en production locale.
 *
 * Trois chiffres seulement, mais ce sont ceux dont se plaint un visiteur :
 *   - la hauteur totale du hero, en écrans, c'est-à-dire le nombre de gestes
 *     nécessaires pour le franchir ;
 *   - le délai avant que la première image bouge après un scroll ;
 *   - le temps de traitement le plus long occupé sur le thread principal
 *     pendant un défilement continu (au-delà de 50 ms, la page accroche).
 */
import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:3000';

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900, mobile: false },
  { label: 'mobile', width: 390, height: 844, mobile: true },
];

async function measure(browser, viewport, url) {
  const page = await browser.newPage();
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.mobile ? 3 : 1,
    isMobile: viewport.mobile,
    hasTouch: viewport.mobile,
  });

  await page.goto(url, { waitUntil: 'load' });
  /* La géométrie n'est définitive qu'une fois ScrollTrigger monté : il insère
     un espaceur autour de l'élément épinglé. */
  await new Promise((resolve) => setTimeout(resolve, 2500));

  /* Hauteur du hero : la section suivie par ScrollTrigger, espaceur compris. */
  const geometry = await page.evaluate(() => {
    const section = document.querySelector('section[aria-label="Présentation"]');
    const box = section?.getBoundingClientRect();
    return { hero: box ? Math.round(box.height) : 0, viewport: window.innerHeight };
  });

  /* Délai entre un scroll et le premier repaint du canvas. On échantillonne
     le canvas plutôt que d'espionner le code : c'est ce que voit l'œil. */
  const latency = await page.evaluate(async () => {
    const canvas = document.querySelector('section[aria-label="Présentation"] canvas');
    if (!canvas) return -1;

    const sample = () => {
      const scratch = document.createElement('canvas');
      scratch.width = 32;
      scratch.height = 18;
      scratch.getContext('2d').drawImage(canvas, 0, 0, 32, 18);
      return scratch.getContext('2d').getImageData(0, 0, 32, 18).data.join(',');
    };

    const before = sample();
    const start = performance.now();
    window.scrollTo(0, window.innerHeight * 0.4);

    for (let i = 0; i < 400; i += 1) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (sample() !== before) return Math.round(performance.now() - start);
    }
    return -1;
  });

  /* Tâches longues pendant un défilement continu à travers tout le hero. */
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((resolve) => setTimeout(resolve, 400));

  const blocking = await page.evaluate(async () => {
    const long = [];
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => long.push(Math.round(entry.duration)));
    });
    observer.observe({ entryTypes: ['longtask'] });

    const height = document.body.scrollHeight;
    for (let y = 0; y < Math.min(height, window.innerHeight * 3); y += 40) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }

    observer.disconnect();
    return long;
  });

  await page.close();

  return {
    vue: viewport.label,
    heroEcrans: Number((geometry.hero / geometry.viewport).toFixed(2)),
    heroPx: geometry.hero,
    latenceMs: latency,
    tachesLongues: blocking.length,
    plusLongueMs: blocking.length ? Math.max(...blocking) : 0,
  };
}

const browser = await puppeteer.launch({
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox'],
});

const rows = [];
for (const path of ['/', '/a-propos']) {
  for (const viewport of VIEWPORTS) {
    rows.push({ page: path, ...(await measure(browser, viewport, BASE + path)) });
  }
}

await browser.close();
console.table(rows);
