/**
 * Prépare la séquence d'images du hero.
 *
 * Pourquoi une séquence plutôt qu'une vidéo : piloter `video.currentTime` au
 * scroll oblige le décodeur à chercher une image-clé à chaque frame. Sur un
 * H.264 classique (une clé toutes les 2 s) cela produit un à-coup visible.
 * On extrait donc les images une fois pour toutes au build, et le scroll ne
 * fait plus que dessiner un bitmap déjà décodé dans un canvas.
 *
 * Deux résolutions sont produites :
 *   public/sequence/proxy/  ~360 px, très compressé — la totalité pèse moins
 *     qu'une seule image pleine résolution, donc le mouvement est piloté par
 *     le scroll dès la première seconde ;
 *   public/sequence/        1120 px — chargé ensuite, en arrière-plan, et
 *     substitué image par image sans que le visiteur voie la bascule.
 */
import { mkdir, writeFile, readdir, rm, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'sequence');
const PROXY = path.join(OUT, 'proxy');
const MANIFEST = path.join(ROOT, 'lib', 'sequence-manifest.json');

const CLIPS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_232744_28253e7b-453f-4ae5-9d1c-3394f13c5854.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_233947_53c536b7-64a8-4c5a-a04e-eef94bfd9129.mp4',
];

/* 8 img/s sur deux clips de 8 s → 128 images. */
const FPS = 8;
const WIDTH = 1120;
const QUALITY = '7';

/* La proxy : assez fine pour que le mouvement se lise, assez légère pour que
   la séquence entière arrive avant que le visiteur ait fini de lire le titre. */
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

async function writeManifest(count) {
  await writeFile(
    MANIFEST,
    `${JSON.stringify({ count, width: WIDTH, proxyWidth: PROXY_WIDTH }, null, 2)}\n`,
    'utf8',
  );
}

async function main() {
  if (existsSync(OUT) && existsSync(PROXY)) {
    const hi = (await readdir(OUT)).filter((f) => f.endsWith('.jpg'));
    const lo = (await readdir(PROXY)).filter((f) => f.endsWith('.jpg'));
    if (hi.length > 40 && lo.length === hi.length) {
      await writeManifest(hi.length);
      console.log(`[frames] ${hi.length} images déjà présentes (+ proxy)`);
      return;
    }
  }
  await rm(OUT, { recursive: true, force: true });

  await mkdir(OUT, { recursive: true });
  await mkdir(PROXY, { recursive: true });
  const bin = await ffmpegPath();
  let index = 0;

  for (const clip of CLIPS) {
    const tmp = path.join(ROOT, `_src-${index}.mp4`);
    const response = await fetch(clip);
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
      '-start_number',
      String(index * 1000),
      path.join(OUT, 'f-%05d.jpg'),
      '-map',
      '[lo]',
      '-q:v',
      PROXY_QUALITY,
      '-start_number',
      String(index * 1000),
      path.join(PROXY, 'f-%05d.jpg'),
    ]);

    await rm(tmp, { force: true });
    index += 1;
  }

  const count = await renumber(OUT);
  await renumber(PROXY);

  await writeManifest(count);
  console.log(`[frames] ${count} images extraites en deux résolutions`);
}

main().catch(async (error) => {
  console.warn('[frames] extraction impossible :', error.message);
  // On remet le compteur à zéro : le hero bascule alors sur son image fixe.
  await writeManifest(0);
});
