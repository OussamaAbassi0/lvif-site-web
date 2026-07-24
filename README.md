# LVIF — prototype de site vitrine

Proposition de refonte pour LED Visual Innovation (SAS LVIF). Projet privé,
non indexé, indépendant du site WordPress en production.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 — tokens déclarés dans `app/globals.css`
- GSAP + ScrollTrigger pour le hero piloté par le scroll

## Points notables

- **`components/scroll-video-hero.jsx`** — la lecture vidéo n'est pas un autoplay.
  ScrollTrigger (`scrub`) fait progresser une valeur qui pilote directement
  `video.currentTime`, sur deux clips chaînés avec fondu enchaîné à la bascule.
  Les vidéos sont amorcées (`play()` puis `pause()`) pour que le seek reste fluide
  sur iOS et Safari.
- **`lib/chatbot-engine.js`** — moteur de qualification déterministe : aucun appel
  réseau, aucun modèle de langage. Les réponses proviennent d'une base de
  connaissances figée. Le bot qualifie puis oriente vers le formulaire de devis,
  qu'il pré-remplit via `sessionStorage`. Aucun envoi automatique.
- **`scripts/fetch-media.mjs`** — télécharge les clips au build pour les servir en
  same-origin (requêtes Range fiables). Repli sur le CDN en cas d'échec.
- Les photos de réalisations proviennent du site existant de l'entreprise et sont
  servies via l'optimiseur d'images de Next.

## Direction artistique

Noir profond (`#060607`) et ambre signal (`#ffc400`), conservés depuis l'identité
existante. Typographie : Archivo en display (grotesque étendue, référence à la
signalétique grand format), Instrument Sans en texte courant, Geist Mono pour les
métadonnées techniques. Grille éditoriale à larges marges, filets d'un pixel,
trame de pixels LED en fond.

## Développement

```bash
npm install
npm run dev
```
