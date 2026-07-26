/**
 * Génère une affiche pour chaque vidéo.
 *
 * Sans affiche, une vidéo non encore lancée est un rectangle noir. C'est
 * acceptable une demi-seconde, pas quand la lecture automatique est refusée
 * — mode économie d'énergie sur iPhone, économiseur de données, préférence
 * de mouvement réduit. Le visiteur verrait alors un trou noir dans la page.
 *
 * On extrait donc une image représentative de chaque fichier, une fois pour
 * toutes, et on la range dans public/. Les affiches sont versionnées : le
 * déploiement n'a rien à télécharger ni à calculer.
 *
 * À relancer uniquement si le client change une vidéo.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { videos, showcase } from '../lib/videos.js';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'video-posters');

/* Seconde d'extraction : on évite la toute première image, souvent noire ou
   floue à cause du fondu d'ouverture. */
const AT = '00:00:01.5';

async function ffmpegPath() {
  try {
    const mod = await import('ffmpeg-static');
    return mod.default;
  } catch {
    return 'ffmpeg';
  }
}

/**
 * ffmpeg lit directement l'URL.
 *
 * Première approche essayée : télécharger les premiers mégaoctets et les
 * passer à ffmpeg. Mauvaise idée — dans un MP4 l'index se trouve souvent à
 * la fin du fichier, et ffmpeg reste bloqué sur un fichier tronqué qu'il ne
 * sait pas lire. En lui donnant l'URL, il fait lui-même les requêtes par
 * plage dont il a besoin, index compris.
 *
 * `-ss` placé avant `-i` : ffmpeg saute directement à la position demandée
 * au lieu de décoder tout ce qui précède.
 */
async function poster(bin, key, url) {
  const target = path.join(OUT, `${key}.webp`);
  if (existsSync(target)) {
    console.log(`[posters] ${key} : déjà présent`);
    return true;
  }

  const attempt = (at) =>
    run(
      bin,
      [
        '-y',
        '-ss',
        at,
        '-i',
        url,
        '-frames:v',
        '1',
        '-vf',
        'scale=1280:-2:flags=lanczos',
        '-quality',
        '58',
        target,
      ],
      /* Garde-fou : un fichier illisible ne doit pas figer la génération. */
      { timeout: 60000 },
    );

  try {
    await attempt(AT);
    console.log(`[posters] ${key} : écrit`);
    return true;
  } catch (error) {
    try {
      /* Clip plus court que la seconde et demie : on prend la première image. */
      await attempt('00:00:00.2');
      console.log(`[posters] ${key} : écrit (première image)`);
      return true;
    } catch {
      console.warn(`[posters] ${key} : échec — ${error.message.split('\n')[0]}`);
      return false;
    }
  }
}

await mkdir(OUT, { recursive: true });
const bin = await ffmpegPath();

const jobs = [
  ...Object.entries(videos).map(([key, item]) => [key, item.src]),
  ...showcase.map((item) => [`showcase-${item.key}`, item.src]),
];

let ok = 0;
for (const [key, url] of jobs) {
  if (await poster(bin, key, url)) ok += 1;
}

const written = (await readdir(OUT)).filter((name) => name.endsWith('.webp'));
console.log(`\n${ok}/${jobs.length} affiches disponibles, ${written.length} fichiers dans public/video-posters.`);
