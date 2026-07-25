/**
 * Génère les tracés de la carte d'implantation.
 *
 * Le contour de la France était jusqu'ici saisi à la main : une trentaine de
 * points, donc un littoral faux et pas de Corse. On part désormais du jeu
 * Natural Earth (via world.geo.json), projeté en Mercator sur le cadrage de
 * la section, et on écrit le résultat dans lib/map-paths.json — le composant
 * n'a plus qu'à afficher des chaînes déjà calculées, sans dépendance.
 *
 *   node scripts/build-map.mjs
 */
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'lib', 'map-paths.json');
const SOURCE =
  'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';
const REGIONS =
  'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson';

/* Cadrage : la France entière, Corse comprise, avec assez de marge pour que
   les pays voisins remplissent les angles. */
const BOUNDS = { minLon: -6.4, maxLon: 10.6, minLat: 41.1, maxLat: 51.5 };
const W = 640;

const FRANCE = 'FRA';
const NEIGHBOURS = ['BEL', 'NLD', 'LUX', 'DEU', 'CHE', 'ITA', 'ESP', 'GBR', 'AND', 'PRT'];

/* Mercator : conserve les angles, donc une France de forme juste plutôt que
   l'aplatissement d'une projection linéaire en latitude. */
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

const Y0 = merc(BOUNDS.maxLat);
const Y1 = merc(BOUNDS.minLat);
const SPAN_X = BOUNDS.maxLon - BOUNDS.minLon;
const SCALE = W / SPAN_X;
const H = Math.round((Y0 - Y1) * (180 / Math.PI) * SCALE);

const px = (lon) => (lon - BOUNDS.minLon) * SCALE;
const py = (lat) => ((Y0 - merc(lat)) * (180 / Math.PI)) * SCALE;

/* Un anneau de moins de ~0,25 % de la largeur du cadre est un îlot invisible
   à cette échelle : on l'écarte pour ne pas gonfler le fichier. */
const MIN_EXTENT = SPAN_X * 0.0025;

function ringToPath(ring) {
  const lons = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  const extent = Math.max(Math.max(...lons) - Math.min(...lons), Math.max(...lats) - Math.min(...lats));
  if (extent < MIN_EXTENT) return '';
  if (Math.min(...lons) > BOUNDS.maxLon || Math.max(...lons) < BOUNDS.minLon) return '';
  if (Math.min(...lats) > BOUNDS.maxLat || Math.max(...lats) < BOUNDS.minLat) return '';

  let out = '';
  let last = null;
  ring.forEach(([lon, lat]) => {
    const x = px(lon);
    const y = py(lat);
    /* Deux points séparés de moins d'un pixel et demi ne se distinguent pas à
       l'affichage : les écarter divise le poids du fichier par cinq. */
    if (last && Math.abs(x - last[0]) < 1.5 && Math.abs(y - last[1]) < 1.5) return;
    out += `${out ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    last = [x, y];
  });
  return out ? `${out}Z` : '';
}

function featureToPath(feature) {
  const { type, coordinates } = feature.geometry;
  const polygons = type === 'Polygon' ? [coordinates] : coordinates;
  return polygons
    .map((polygon) => polygon.map(ringToPath).join(''))
    .join('')
    .trim();
}

async function load(argIndex, url) {
  const local = process.argv[argIndex];
  if (local) return JSON.parse(await readFile(local, 'utf8'));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function main() {
  const world = await load(2, SOURCE);
  const regionsSource = await load(3, REGIONS);

  const find = (id) => world.features.find((feature) => feature.id === id);

  const france = featureToPath(find(FRANCE));
  const context = NEIGHBOURS.map((id) => find(id))
    .filter(Boolean)
    .map(featureToPath)
    .filter(Boolean)
    .join('');

  /* Les régions sont tracées au 1/100 000 : le littoral et la Corse
     apparaissent enfin, et le découpage donne à la carte de la matière
     sans avoir à charger un fond de tuiles. */
  const regions = regionsSource.features
    .map((feature) => ({
      name: feature.properties.nom,
      d: featureToPath(feature),
    }))
    .filter((region) => region.d);

  await writeFile(
    OUT,
    `${JSON.stringify({ width: W, height: H, bounds: BOUNDS, france, context, regions })}\n`,
    'utf8',
  );
  const weight = regions.reduce((sum, region) => sum + region.d.length, 0);
  console.log(`[map] ${W}×${H} — ${regions.length} régions (${Math.round(weight / 1024)} Ko)`);
}

main().catch((error) => {
  console.error('[map] échec :', error.message);
  process.exitCode = 1;
});
