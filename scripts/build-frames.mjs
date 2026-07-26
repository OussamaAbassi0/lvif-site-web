/**
 * Prépare les séquences d'images pilotées par le scroll.
 *
 * Pourquoi une séquence plutôt qu'une vidéo : piloter `video.currentTime` au
 * scroll oblige le décodeur à chercher une image-clé à chaque frame. Sur un
 * H.264 classique (une clé toutes les 2 s) cela produit un à-coup visible.
 * On extrait donc les images une fois pour toutes au build, et le scroll ne
 * fait plus que dessiner un bitmap déjà décodé dans un canvas.
 *
 * Deux clips, deux séquences distinctes : `accueil` en tête de la page
 * d'accueil, `apropos` en tête de la page Qui sommes-nous. Les enchaîner
 * dans un seul hero doublait le poids à charger pour un plan que le
 * visiteur n'atteignait qu'après trois écrans de défilement.
 *
 * Chaque séquence est produite en deux résolutions :
 *   public/sequence/<nom>/proxy/  ~360 px, très compressé — l'ensemble pèse
 *     moins qu'une seule image nette, donc le mouvement répond au scroll dès
 *     la première seconde ;
 *   public/sequence/<nom>/        1120 px — chargé ensuite, en arrière-plan,
 *     et substitué image par image sans que la bascule se voie.
 */
import { mkdir, writeFile, readdir, rm, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'sequence');
const MANIFEST = path.join(ROOT, 'lib', 'sequence-manifest.json');

const CLIPS = [
  {
    name: 'accueil',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_232744_28253e7b-453f-4ae5-9d1c-3394f13c5854.mp4',
  },
  {
    name: 'apropos',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_233947_53c536b7-64a8-4c5a-a04e-eef94bfd9129.mp4',
  },
];

/* 8 img/s sur un clip de 8 s → environ 64 images par séquence. */
const FPS = 8;
const WIDTH = 1120;
const QUALITY = '7';

/* La proxy : assez fine pour que le mouvement se lise, assez légère pour que
   la séquence arrive avant que le visiteur ait fini de lire le titre. */
const PROXY_WIDTH = 360;
const PROXY_QUALITY = '16';

async function ffmpegPath() {
  try {
    const mod = await import('ffmpeg-static');
    return mod.default;
  } catch {
    return 'ffmpeg';
  }
}

/** Renumérote un dossier en 0000.jpg, 0001.jpg… */
async function renumber(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.jpg')).sort();
  for (let i = 0; i < files.length; i += 1) {
    await rename(path.join(dir, files[i]), path.join(dir, `t-${String(i).padStart(4, '0')}.jpg`));
  }
  const tmps = (await readdir(dir)).filter((f) => f.startsWith('t-')).sort();
  for (let i = 0; i < tmps.length; i += 1) {
    await rename(path.join(dir, tmps[i]), path.join(dir, `${String(i).padStart(4, '0')}.jpg`));
  }
  return tmps.length;
}

async function writeManifest(counts) {
  await writeFile(
    MANIFEST,
    `${JSON.stringify({ ...counts, width: WIDTH, proxyWidth: PROXY_WIDTH }, null, 2)}\n`,
    'utf8',
  );
}

/**
 * Poster WebP tiré de la première image de la séquence.
 *
 * C'est le tout premier pixel que voit le visiteur, avant même que le
 * JavaScript s'exécute : il doit peser le moins possible. En WebP à 1280 px
 * on tombe autour de 40 ko, contre 180 ko pour le JPEG équivalent.
 */
async function poster(bin, clip) {
  const source = path.join(OUT, clip.name, '0000.jpg');
  if (!existsSync(source)) return;
  const target = path.join(OUT, clip.name, 'poster.webp');
  await run(bin, [
    '-y',
    '-i',
    source,
    '-vf',
    'scale=1280:-2:flags=lanczos',
    '-quality',
    '62',
    target,
  ]);
  console.log(`[frames] ${clip.name} : poster.webp`);
}

/** Extrait un clip en deux résolutions ; renvoie le nombre d'images. */
async function extract(bin, clip) {
  const dir = path.join(OUT, clip.name);
  const proxy = path.join(dir, 'proxy');

  if (existsSync(dir) && existsSync(proxy)) {
    const hi = (await readdir(dir)).filter((f) => f.endsWith('.jpg'));
    const lo = (await readdir(proxy)).filter((f) => f.endsWith('.jpg'));
    if (hi.length > 20 && lo.length === hi.length) {
      console.log(`[frames] ${clip.name} : ${hi.length} images déjà présentes`);
      return hi.length;
    }
  }
  await rm(dir, { recursive: true, force: true });
  await mkdir(proxy, { recursive: true });

  const tmp = path.join(ROOT, `_src-${clip.name}.mp4`);
  const response = await fetch(clip.url);
  if (!response.ok) throw new Error(`téléchargement ${response.status}`);
  await writeFile(tmp, Buffer.from(await response.arrayBuffer()));

  /* Une seule passe de décodage pour les deux résolutions. */
  await run(bin, [
    '-y',
    '-i',
    tmp,
    '-filter_complex',
    `[0:v]fps=${FPS},split=2[a][b];` +
      `[a]scale=${WIDTH}:-2:flags=lanczos[hi];` +
      `[b]scale=${PROXY_WIDTH}:-2:flags=lanczos[lo]`,
    '-map',
    '[hi]',
    '-q:v',
    QUALITY,
    path.join(dir, 'f-%05d.jpg'),
    '-map',
    '[lo]',
    '-q:v',
    PROXY_QUALITY,
    path.join(proxy, 'f-%05d.jpg'),
  ]);

  await rm(tmp, { force: true });

  const count = await renumber(dir);
  await renumber(proxy);
  console.log(`[frames] ${clip.name} : ${count} images en deux résolutions`);
  return count;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const bin = await ffmpegPath();
  const counts = {};

  for (const clip of CLIPS) {
    counts[clip.name] = await extract(bin, clip);
    await poster(bin, clip);
  }

  await writeManifest(counts);
}

main().catch(async (error) => {
  console.warn('[frames] extraction impossible :', error.message);
  // Compteurs à zéro : les heros basculent alors sur leur image fixe.
  await writeManifest({ accueil: 0, apropos: 0 });
});
