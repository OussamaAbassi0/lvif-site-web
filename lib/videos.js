/**
 * Catalogue des vidéos du site.
 *
 * Toutes proviennent de la médiathèque du client — ce sont ses tournages, sur
 * ses chantiers. Chaque URL a été contrôlée par une requête HEAD : 200 et
 * type `video/mp4`. Aucune n'est recopiée de mémoire.
 *
 * Les affectations reprennent celles du site actuel page par page, relevées
 * dans le HTML publié. Quatre vidéos présentes dans la médiathèque mais
 * posées nulle part sont ajoutées là où leur sujet l'impose : le stand Paris,
 * la remorque, les 24 h du Mans et le sol LED. Les fichiers restants sont des
 * doublons de format ou des rushes verticaux.
 *
 * `mode` décide du comportement de lecture :
 *   - `ambiance` : plan court, sans parole, joué en boucle et sans son dès
 *     qu'il entre dans l'écran. Il illustre, il ne raconte pas.
 *   - `film`     : sujet long, avec montage. Affiche fixe et lecture au clic,
 *     avec les commandes. On ne lance pas 30 Mo dans le dos du visiteur.
 */

const UP = 'https://led-visual-innovation.fr/wp-content/uploads';

/**
 * Affiches : une image extraite de chaque vidéo, produite une fois par
 * `scripts/build-video-posters.mjs` et versionnée dans public/.
 *
 * Sans elle, une vidéo non lancée est un rectangle noir — ce qui arrive dès
 * que la lecture automatique est refusée : iPhone en économie d'énergie,
 * économiseur de données, préférence de mouvement réduit.
 */
const poster = (key) => `/video-posters/${key}.webp`;

export const videos = {
  /* — Fiches produit ————————————————————————————————— */
  'ecran-exterieur-led': {
    src: `${UP}/2025/04/BK-LVI.mp4`,
    poster: poster('ecran-exterieur-led'),
    mode: 'film',
    ratio: '16 / 9',
    title: 'Enseigne LED de façade pour Burger King',
    caption: 'Burger King · Luxembourg · 2024',
  },
  'ecran-interieur-led': {
    src: `${UP}/2025/06/MERCEDES-LVI.mp4`,
    poster: poster('ecran-interieur-led'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Mur d’images en showroom automobile',
    caption: 'Mercedes · showroom · boucle sans son',
  },
  'mur-images': {
    src: `${UP}/2026/02/DEMO-CUBE-LED-LVI-PARIS.mp4`,
    poster: poster('mur-images'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Cube LED, démonstration en atelier',
    caption: 'Atelier LVIF · Paris · 2026',
  },
  'ecran-transparent': {
    src: `${UP}/2025/06/LVI-ECRAN-TRANSPARENT.mp4`,
    poster: poster('ecran-transparent'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Écran LED transparent en vitrine',
    caption: 'La transparence conservée derrière l’affichage',
  },
  'ecran-publicitaire': {
    src: `${UP}/2025/04/AUTOPOLIS-LVI.mp4`,
    poster: poster('ecran-publicitaire'),
    mode: 'film',
    ratio: '16 / 9',
    title: 'Écran publicitaire extérieur pour Autopolis',
    caption: 'Autopolis · 2023',
  },

  /* — Location ————————————————————————————————————— */
  'location-stand': {
    src: `${UP}/2024/11/Location-ecran-geant-Stand.mp4`,
    poster: poster('location-stand'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Écran géant sur stand de salon',
    caption: 'Montage et démontage dans la journée',
  },
  'location-exterieur': {
    src: `${UP}/2024/11/LVI-LOCATION-EXTERIEUR.mp4`,
    poster: poster('location-exterieur'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Écran géant en extérieur',
    caption: 'Structure autoportée, résistance aux intempéries',
  },
  'location-remorque': {
    src: `${UP}/2025/06/LVI-ECRAN-REMOQUE.mp4`,
    poster: poster('location-remorque'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Écran géant sur remorque',
    caption: 'Déployable en moins d’une heure, sans grue',
  },
  'location-24h-mans': {
    src: `${UP}/2026/06/24H-MANS-INSTALLATIONS-LVI.mp4`,
    poster: poster('location-24h-mans'),
    mode: 'film',
    ratio: '16 / 9',
    title: 'Installations des 24 heures du Mans',
    caption: 'Le Mans · 2026',
  },

  /* — Solutions métiers ——————————————————————————————— */
  'stand-paris': {
    src: `${UP}/2026/03/LOCATION-ECRAN-STAND-PARIS-LVI.mp4`,
    poster: poster('stand-paris'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Stand équipé d’un écran LED, Paris',
    caption: 'Salon professionnel · 2026',
  },
  'salle-de-controle': {
    src: `${UP}/2025/06/LVI-ECRAN-CONTROLE.mp4`,
    poster: poster('salle-de-controle'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Mur d’écrans de salle de contrôle',
    caption: 'Affichage continu, 24 h/24',
  },
  'salle-de-reunion': {
    src: `${UP}/2025/03/LVI-SALLE-CONFERENCE.mp4`,
    poster: poster('salle-de-reunion'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Écran de salle de conférence',
    caption: 'Visioconférence et présentations',
  },
  pharmacie: {
    src: `${UP}/2025/06/LVI-Ecran-vitrine.mp4`,
    poster: poster('pharmacie'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Écran de vitrine',
    caption: 'Lisible en plein jour, derrière une devanture',
  },
  evenementiel: {
    src: `${UP}/2026/05/LVI-SOL-LED-DEMONSTRATION.mp4`,
    poster: poster('evenementiel'),
    mode: 'ambiance',
    ratio: '16 / 9',
    title: 'Sol LED, démonstration',
    caption: 'Dalles praticables pour scène et événement',
  },

  /* — À propos ————————————————————————————————————— */
  atelier: {
    src: `${UP}/2025/07/COB-miniLED.mp4`,
    poster: poster('atelier'),
    mode: 'film',
    ratio: '16 / 9',
    title: 'Technologie COB et mini-LED',
    caption: 'Ce qui distingue une dalle d’une autre',
  },
};

/**
 * Page d'accueil : « Nos plus belles réalisations en vidéo ».
 * Quatre onglets, comme sur le site actuel, avec les quatre mêmes chantiers.
 */
export const showcase = [
  {
    key: 'autopolis',
    label: 'Autopolis',
    src: `${UP}/2025/04/AUTOPOLIS-LVI.mp4`,
    poster: poster('showcase-autopolis'),
    title: 'Écran extérieur LED pour Autopolis',
    client: 'Autopolis',
    city: 'Paris',
    year: '2023',
  },
  {
    key: 'burger-king',
    label: 'Burger King',
    src: `${UP}/2025/04/BK-LVI.mp4`,
    poster: poster('showcase-burger-king'),
    title: 'Écran extérieur LED pour Burger King',
    client: 'Burger King',
    city: 'Luxembourg',
    year: '2024',
  },
  {
    key: 'la-coque',
    label: 'La Coque',
    src: `${UP}/2025/04/Gymnase-La-Coque-Luxembourg-2022.mp4`,
    poster: poster('showcase-la-coque'),
    title: '60 m² d’écrans LED intérieur pour le complexe olympique La Coque',
    client: 'La Coque',
    city: 'Luxembourg',
    year: '2022',
  },
  {
    key: 'stade-luxembourg',
    label: 'Stade national',
    src: `${UP}/2025/06/Led-Visual-Innovation-partenaire-du-stade-national-du-Luxembourg.mp4`,
    poster: poster('showcase-stade-luxembourg'),
    title: 'Boarding LED de 254 m² pour le Stade national du Luxembourg',
    client: 'Stade National',
    city: 'Luxembourg',
    year: '2023',
  },
];
