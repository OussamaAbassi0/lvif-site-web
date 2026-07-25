/**
 * Prépare la séquence d'images du hero.
 *
 * Pourquoi une séquence plutôt qu'une vidéo : piloter `video.currentTime` au
 * scroll oblige le décodeur à chercher une image-clé à chaque frame. Sur un
 * H.264 classique (une clé toutes les 2 s) cela produit un à-coup visible.
 * On extrait donc les images une fois pour toutes au build, et le scroll ne
 * fait plus que dessiner un bitmap déjà décodé dans un canvas.
 */
import { mkdir, writeFile, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'sequence');
const MANIFEST = path.join(ROOT, 'lib', 'sequence-manifest.json');

const CLIPS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_232744_28253e7b-453f-4ae5-9d1c-3394f13c5854.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_233947_53c536b7-64a8-4c5a-a04e-eef94bfd9129.mp4',
];

/* 8 img/s sur deux clips de 8 s → 128 images.
   Compromis retenu entre fluidité perçue et poids total (~5 Mo). */
const FPS = 8;
const WIDTH = 1120;
const QUALITY = '7';

async function ffmpegPath() {
  try {
    const mod = await import('ffmpeg-static');
    return mod.default;
  } catch {
    return 'ffmpeg';
  }
}

async function main() {
  if (existsSync(OUT)) {
    const existing = (await readdir(OUT)).filter((f) => f.endsWith('.jpg'));
    if (existing.length > 40) {
      await writeFile(
        MANIFEST,
        `${JSON.stringify({ count: existing.length, width: WIDTH }, null, 2)}\n`,
        'utf8',
      );
      console.log(`[frames] ${existing.length} images déjà présentes`);
      return;
    }
    await rm(OUT, { recursive: true, force: true });
  }

  await mkdir(OUT, { recursive: true });
  const bin = await ffmpegPath();
  let index = 0;

  for (const clip of CLIPS) {
    const tmp = path.join(OUT, `_src-${index}.mp4`);
    const response = await fetch(clip);
    if (!response.ok) throw new Error(`téléchargement ${response.status}`);
    await writeFile(tmp, Buffer.from(await response.arrayBuffer()));

    await run(bin, [
      '-y',
      '-i',
      tmp,
      '-vf',
      `fps=${FPS},scale=${WIDTH}:-2:flags=lanczos`,
      '-q:v',
      QUALITY,
      '-start_number',
      String(index * 1000),
      path.join(OUT, `f-%05d.jpg`),
    ]);

    await rm(tmp, { force: true });
    index += 1;
  }

  // Renumérotation continue 0..n-1
  const files = (await readdir(OUT)).filter((f) => f.endsWith('.jpg')).sort();
  const { rename } = await import('node:fs/promises');
  for (let i = 0; i < files.length; i += 1) {
    await rename(path.join(OUT, files[i]), path.join(OUT, `tmp-${String(i).padStart(4, '0')}.jpg`));
  }
  const tmps = (await readdir(OUT)).filter((f) => f.startsWith('tmp-')).sort();
  for (let i = 0; i < tmps.length; i += 1) {
    await rename(path.join(OUT, tmps[i]), path.join(OUT, `${String(i).padStart(4, '0')}.jpg`));
  }

  await writeFile(
    MANIFEST,
    `${JSON.stringify({ count: tmps.length, width: WIDTH }, null, 2)}\n`,
    'utf8',
  );
  console.log(`[frames] ${tmps.length} images extraites`);
}

main().catch(async (error) => {
  console.warn('[frames] extraction impossible :', error.message);
  // On remet le compteur à zéro : le hero bascule alors sur son image fixe.
  await writeFile(MANIFEST, `${JSON.stringify({ count: 0, width: WIDTH }, null, 2)}\n`, 'utf8');
});
