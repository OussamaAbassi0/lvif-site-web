/**
 * Récupère les logos des entreprises clientes.
 *
 * Méthode : l'image principale de l'article Wikipédia d'une société est son
 * logo d'infobox, c'est-à-dire le logo officiel courant. C'est nettement plus
 * fiable qu'une recherche par mots-clés, qui renvoyait des homonymes
 * (« Rafale logo » pour Dassault, la filiale bancaire pour Mercedes-Benz).
 *
 * On interroge d'abord la Wikipédia francophone, puis l'anglophone.
 * Les marques sans article exploitable restent affichées en typographie :
 * la mosaïque gère les deux cas.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'logos');
const MANIFEST = path.join(ROOT, 'lib', 'logos-manifest.json');
const UA = 'lvif-prototype/1.0 (maquette interne)';

const BRANDS = [
  { slug: 'airbus', name: 'Airbus', pages: [['fr', 'Airbus'], ['en', 'Airbus']] },
  { slug: 'disney', name: 'Disney', pages: [['en', 'Walt Disney Pictures'], ['fr', 'Walt Disney Pictures']] },
  { slug: 'sncf', name: 'SNCF', pages: [['fr', 'SNCF'], ['en', 'SNCF']] },
  { slug: 'vinci', name: 'Vinci', pages: [['fr', 'Vinci (entreprise)'], ['en', 'Vinci (company)']] },
  { slug: 'thales', name: 'Thales', pages: [['fr', 'Thales (entreprise)'], ['en', 'Thales Group']] },
  { slug: 'orpi', name: 'Orpi', pages: [['fr', 'Orpi']] },
  { slug: 'borealis', name: 'Borealis', pages: [['en', 'Borealis (company)'], ['fr', 'Borealis']] },
  { slug: 'leroy-merlin', name: 'Leroy Merlin', pages: [['fr', 'Leroy Merlin'], ['en', 'Leroy Merlin']] },
  { slug: 'saint-gobain', name: 'Saint-Gobain', pages: [['fr', 'Saint-Gobain'], ['en', 'Saint-Gobain']] },
  { slug: 'dassault-aviation', name: 'Dassault Aviation', pages: [['fr', 'Dassault Aviation'], ['en', 'Dassault Aviation']] },
  { slug: 'decathlon', name: 'Decathlon', pages: [['fr', 'Decathlon'], ['en', 'Decathlon (retailer)']] },
  { slug: 'burger-king', name: 'Burger King', pages: [['en', 'Burger King'], ['fr', 'Burger King']] },
  { slug: 'total-energies', name: 'TotalEnergies', pages: [['fr', 'TotalEnergies'], ['en', 'TotalEnergies']] },
  { slug: 'mercedes-benz', name: 'Mercedes-Benz', pages: [['en', 'Mercedes-Benz'], ['fr', 'Mercedes-Benz']] },
  { slug: 'credit-agricole', name: 'Crédit Agricole', pages: [['fr', 'Crédit agricole'], ['en', 'Crédit Agricole']] },
  { slug: 'boconcept', name: 'BoConcept', pages: [['en', 'BoConcept'], ['da', 'BoConcept']] },
  { slug: 'lefebvre-dalloz', name: 'Lefebvre Dalloz', pages: [['fr', 'Dalloz']] },
  { slug: 'foir-fouille', name: 'La Foir’Fouille', pages: [['fr', 'La Foir’Fouille']] },
  { slug: 'besancon', name: 'Ville de Besançon', pages: [['fr', 'Besançon']] },
  { slug: 'viva-technology', name: 'Viva Technology', pages: [['fr', 'Viva Technology'], ['en', 'Viva Technology']] },
];

const EXT = { 'image/svg+xml': 'svg', 'image/png': 'png', 'image/jpeg': 'jpg' };

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Passe d'une vignette (…/thumb/a/ab/Nom.svg/220px-Nom.svg.png) au fichier d'origine. */
function toOriginal(src) {
  const url = src.startsWith('//') ? `https:${src}` : src;
  const match = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/[^/]+)\/thumb\/(.+?)\/[^/]+$/);
  return match ? `${match[1]}/${match[2]}` : url;
}

/**
 * Récupère l'image de l'infobox de l'article : pour une société, c'est le logo.
 * On lit le HTML rendu de la section d'introduction plutôt que l'API
 * pageimages, qui ne renvoie rien sur beaucoup d'articles.
 */
async function leadImage(lang, title, token) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=parse&format=json&origin=*` +
    `&page=${encodeURIComponent(title)}&prop=text&section=0&redirects=1`;

  const response = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!response.ok) return null;
  const data = await response.json();
  const html = data?.parse?.text?.['*'];
  if (!html) return null;

  const infobox = html.indexOf('infobox');
  const scope = infobox >= 0 ? html.slice(infobox, infobox + 20000) : html.slice(0, 20000);
  const images = [...scope.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)].map((m) => m[1]);

  /* Les articles contiennent aussi des icônes d'interface (crayon d'édition,
     pictogramme d'information, liens Wikidata) : on les écarte. */
  const CHROME = /(blue_pencil|ooui|information|wikidata|edit|commons-logo|wiktionary|disambig|question_book|padlock|ambox)/;

  for (const src of images) {
    const original = toOriginal(src);
    const name = decodeURIComponent(original)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
    if (CHROME.test(name)) continue;
    // Le fichier doit porter le nom de la marque : sans cela on récupère
    // les pictogrammes génériques de l'encyclopédie.
    if (!name.includes(token)) continue;
    if (/(logo|wordmark|logotype)/.test(name)) return original;
    if (/\.svg$/.test(name) && !/(map|flag|blason|coat|drapeau)/.test(name)) return original;
  }
  return null;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  /* Le manifeste est incrémental : Wikipédia limite le débit, et une passe
     échouée ne doit pas effacer ce qui a déjà été récupéré. */
  let manifest = {};
  try {
    manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  } catch {
    manifest = {};
  }

  for (const brand of BRANDS) {
    if (manifest[brand.slug]) {
      console.log(`[logos] ${brand.name} : déjà présent`);
      continue;
    }
    let source = null;
    for (const [lang, title] of brand.pages) {
      // Wikipédia limite le débit : on espace les appels.
      await pause(900);
      try {
        source = await leadImage(lang, title, brand.token || brand.slug.split('-')[0]);
        if (source) break;
      } catch {
        /* on tente la langue suivante */
      }
    }

    if (!source) {
      console.log(`[logos] ${brand.name} : pas de logo exploitable`);
      continue;
    }

    try {
      const asset = await fetch(source, { headers: { 'User-Agent': UA } });
      if (!asset.ok) throw new Error(`HTTP ${asset.status}`);
      const mime = (asset.headers.get('content-type') || '').split(';')[0];
      const ext = EXT[mime];
      if (!ext) throw new Error(`type non géré (${mime})`);

      const buffer = Buffer.from(await asset.arrayBuffer());
      const file = `${brand.slug}.${ext}`;
      await writeFile(path.join(OUT, file), buffer);
      manifest[brand.slug] = { src: `/logos/${file}`, name: brand.name };
      console.log(`[logos] ${brand.name} → ${file}`);
    } catch (error) {
      console.log(`[logos] ${brand.name} : ${error.message}`);
    }
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`[logos] ${Object.keys(manifest).length} logos enregistrés`);
}

main().catch(async (error) => {
  console.warn('[logos] étape ignorée :', error.message);
  await writeFile(MANIFEST, '{}\n', 'utf8');
});
