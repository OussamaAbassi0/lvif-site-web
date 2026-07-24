/**
 * Récupère les clips vidéo du hero au moment du build et les place dans /public/media
 * afin qu'ils soient servis en same-origin (requêtes Range fiables pour le scrub GSAP).
 *
 * Si le téléchargement échoue (pas de réseau, CDN indisponible), le build continue :
 * le manifeste conserve alors l'URL distante en secours.
 */
import { writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MEDIA_DIR = path.join(ROOT, 'public', 'media');
const MANIFEST = path.join(ROOT, 'lib', 'media-manifest.json');

const SOURCES = [
  {
    key: 'ignition',
    file: 'lvif-ignition.mp4',
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_214552_29d06505-1b71-436d-b9c7-accfbef7f69b.mp4',
  },
  {
    key: 'assembly',
    file: 'lvif-assembly.mp4',
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3DqYn3j4DArebNPxwQdIoJfqAKB/hf_20260724_214614_6f07ac2a-a1c6-4aeb-8b97-85cacc775452.mp4',
  },
];

async function download(source) {
  const target = path.join(MEDIA_DIR, source.file);

  try {
    const existing = await stat(target);
    if (existing.size > 0) {
      console.log(`[media] ${source.file} déjà présent (${existing.size} octets)`);
      return `/media/${source.file}`;
    }
  } catch {
    /* fichier absent : on télécharge */
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(source.remote, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength < 1024) throw new Error('réponse trop petite');
    await writeFile(target, buffer);
    console.log(`[media] ${source.file} téléchargé (${buffer.byteLength} octets)`);
    return `/media/${source.file}`;
  } catch (error) {
    console.warn(`[media] échec pour ${source.file} : ${error.message} — repli sur le CDN`);
    return source.remote;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  await mkdir(MEDIA_DIR, { recursive: true });
  const manifest = {};
  for (const source of SOURCES) {
    manifest[source.key] = await download(source);
  }
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log('[media] manifeste écrit :', manifest);
}

main().catch((error) => {
  console.warn('[media] étape ignorée :', error.message);
});
