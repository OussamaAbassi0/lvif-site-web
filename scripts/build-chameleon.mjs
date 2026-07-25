/**
 * Extrait le caméléon du logo officiel pour en faire une silhouette réutilisable.
 *
 * Le logo est une mosaïque d'une soixantaine de facettes colorées ; réduites à
 * une seule couleur et superposées, elles se fondent en une silhouette pleine.
 * On écarte les tracés du texte « LED VISUAL INNOVATION » (classe cls-11), on
 * recadre sur la boîte englobante du seul animal, et on écrit un composant
 * React qui prend la couleur de son conteneur.
 *
 *   node scripts/build-chameleon.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(ROOT, 'public', 'logo-lvi.svg');
const OUT = path.join(ROOT, 'components', 'chameleon-mark.jsx');

const source = await readFile(SOURCE, 'utf8');

const shapes = [];
const seen = new Set();
const pattern = /<(polygon|path)\b([^>]*?)(points|d)="([^"]+)"([^>]*)>/g;

for (const match of source.matchAll(pattern)) {
  const [, tag, before, attribute, value, after] = match;
  const cls = `${before}${after}`.match(/class="(cls-\d+)"/)?.[1];
  if (cls === 'cls-11') continue; // le texte du logo
  const key = `${attribute}|${value}`;
  if (seen.has(key)) continue; // le fichier duplique le groupe
  seen.add(key);
  shapes.push({ tag, attribute, value });
}

/* Boîte englobante : les coordonnées apparaissent en clair dans les `points`,
   et les rares `path` du logo restent dans la même plage. */
const numbers = shapes
  .flatMap((shape) => shape.value.match(/-?\d+(?:\.\d+)?/g) || [])
  .map(Number);
const xs = numbers.filter((unused, i) => i % 2 === 0);
const ys = numbers.filter((unused, i) => i % 2 === 1);
const minX = Math.floor(Math.min(...xs));
const minY = Math.floor(Math.min(...ys));
const maxX = Math.ceil(Math.max(...xs));
const maxY = Math.ceil(Math.max(...ys));

const body = shapes
  .map(({ tag, attribute, value }) => `      <${tag} ${attribute}="${value}" />`)
  .join('\n');

const file = `/**
 * Silhouette du caméléon du logo LVI.
 * Fichier produit par scripts/build-chameleon.mjs — ne pas modifier à la main.
 *
 * Les facettes du logo sont conservées telles quelles mais peintes d'une seule
 * couleur (\`currentColor\`) : superposées, elles donnent une silhouette pleine,
 * lisible jusqu'à une quinzaine de pixels.
 */

export default function ChameleonMark(props) {
  return (
    <svg
      viewBox="${minX} ${minY} ${maxX - minX} ${maxY - minY}"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
${body}
    </svg>
  );
}
`;

await writeFile(OUT, file, 'utf8');
console.log(`[chameleon] ${shapes.length} facettes, viewBox ${maxX - minX}×${maxY - minY}`);
