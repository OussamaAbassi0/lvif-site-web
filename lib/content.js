/**
 * Contenu éditorial et inventaire des médias.
 * Textes, chiffres et visuels proviennent du site existant de LED Visual Innovation.
 */

const UPLOADS = 'https://led-visual-innovation.fr/wp-content/uploads';

export const company = {
  name: 'LED Visual Innovation',
  legal: 'SAS LVIF',
  since: 2018,
  phone: '01 34 90 21 11',
  phoneHref: 'tel:+33134902111',
  email: 'contact@led-visual-innovation.fr',
  headquarters: '49 rue de Ponthieu, 75008 Paris',
  logistics: "15 rue de l'Ancienne, 28380 Saint-Rémy-sur-Avre",
  capital: '55 550 €',
  rcs: 'RCS Paris 839544764',
  siren: '839544764',
  tva: 'FR10 839544764',
  linkedin: 'https://www.linkedin.com/company/led-visual-innovation-lu-fr/',
  youtube: 'https://www.youtube.com/channel/UCdyuypz61hvttO9d2-Ff3Jg',
  instagram: 'https://instagram.com/led_visual_innovation',
  google:
    'https://www.google.com/maps/place//data=!4m4!3m3!1s0x47e66fde53f0dbcf%3A0xf18904259965e519!9m1!1i1',
  avisVerifies: 'https://www.avis-verifies.com/avis-clients/led-visual-innovation.fr',
};

export const keyFigures = [
  {
    value: 1400,
    prefix: '+',
    label: 'installations réalisées',
    note: 'Depuis 2018, en France et à l’international',
  },
  {
    value: 2160,
    suffix: ' m²',
    label: 'd’écrans LED déployés en 2025',
    note: 'Du stand de salon au dispositif grand format',
  },
  {
    value: 4.5,
    suffix: ' M€',
    decimals: 1,
    label: 'de chiffre d’affaires groupe',
    note: 'Exercice 2024',
  },
  {
    value: 200,
    prefix: '+',
    label: 'entreprises clientes',
    note: 'Grands comptes, collectivités, PME',
  },
];

export const pillars = [
  {
    index: '01',
    title: 'Assemblage en France',
    body: 'Ateliers et entrepôt de 11 000 m² à moins d’une heure de Paris. Structures et supports fabriqués et assemblés en France, logiciels conçus en interne.',
  },
  {
    index: '02',
    title: 'Garantie 5 ans',
    body: 'Dont 3 ans pièces et main d’œuvre. Extension possible +1 ou +2 ans. Maintenance préventive ou curative sur site, assurance basée en France.',
  },
  {
    index: '03',
    title: 'Logiciel sans abonnement',
    body: 'SmartView, notre solution d’affichage dynamique développée à 100 % en interne. Pilotage à distance, planification fine, aucun abonnement éditeur.',
  },
  {
    index: '04',
    title: 'Intervention sous 48 h',
    body: 'Hotline technique gratuite 5 j/7, espace client dédié, techniciens salariés. Un seul interlocuteur, que la panne soit matérielle ou logicielle.',
  },
];

/* Cas d'usage mis en avant sur l'accueil, repris de la structure existante */
export const useCases = [
  {
    title: 'Tous types d’événements',
    image: `${UPLOADS}/2024/12/CARD-AUTRES-768x512.webp`,
    alt: 'Écran géant LED installé lors d’un événement scénique',
    href: 'https://led-visual-innovation.fr/catalogue/realisation-evenementielle/',
  },
  {
    title: 'Stands et salons professionnels',
    image: `${UPLOADS}/2024/12/CARD-STANDS.webp`,
    alt: 'Mur LED intégré à un stand de salon professionnel',
    href: 'https://led-visual-innovation.fr/catalogue/creation-stand-paris/',
  },
  {
    title: 'Studios et tournages TV',
    image: `${UPLOADS}/2024/12/CARD-STUDIO.webp`,
    alt: 'Plateau de tournage équipé d’un mur d’images LED',
    href: 'https://led-visual-innovation.fr/catalogue/studios-et-tournage-tv/',
  },
  {
    title: 'Événements extérieurs',
    image: `${UPLOADS}/2025/03/Le_Mans___P3_9_Led_Visual_Innovation-1440x1080.jpg`,
    alt: 'Écran géant LED extérieur en fan zone',
    href: 'https://led-visual-innovation.fr/catalogue/location-ecran-geant-exterieur/',
  },
  {
    title: 'Conférences et livestreaming',
    image: `${UPLOADS}/2024/12/CARD-CONFERENCES.webp`,
    alt: 'Écran LED installé dans une salle de conférence',
    href: 'https://led-visual-innovation.fr/catalogue/ecran-salle-de-conference/',
  },
  {
    title: 'Façades et vitrines commerciales',
    image: `${UPLOADS}/2024/12/CARD-FACADES.webp`,
    alt: 'Écran LED installé en façade d’un commerce',
    href: 'https://led-visual-innovation.fr/catalogue/ecran-exterieur-led/',
  },
];

export const ranges = [
  {
    slug: 'ecran-exterieur',
    kicker: 'Achat · Installation fixe',
    title: 'Écran LED extérieur',
    summary:
      'Enseignes numériques en façade ou sur mât acier, panneaux publicitaires bord de route. Modules haute luminosité IP65 conçus pour résister aux intempéries.',
    specs: ['Pitch 3 à 10 mm', 'IP65 / haute luminosité', 'Façade, mât ou poteaux'],
    image: `${UPLOADS}/2024/12/AUTOPOLIS-PLACEHOLDER.webp`,
    alt: 'Écran géant LED extérieur installé pour la concession Autopolis',
  },
  {
    slug: 'mur-images',
    kicker: 'Achat · Intérieur',
    title: 'Mur d’images LED',
    summary:
      'Surface continue sans bord apparent pour halls d’accueil, salles de conférence et communication interne. Pitch fin, colorimétrie homogène sur toute la durée de vie.',
    specs: ['Pitch fin 1,2 à 2,5 mm', 'Sans bord apparent', 'Sur mesure'],
    image: `${UPLOADS}/2024/12/LA-COQUE-PLACEHOLDER.webp`,
    alt: 'Mur d’images LED intérieur du complexe olympique La Coque',
  },
  {
    slug: 'transparent',
    kicker: 'Achat · Vitrine',
    title: 'Écran LED transparent',
    summary:
      'Diffusion en vitrine sans occulter la lumière naturelle ni la visibilité du point de vente. Idéal pour les commerces et franchises en centre-ville.',
    specs: ['Transparence 60 à 90 %', 'Pose en vitrage', 'Faible consommation'],
    image: `${UPLOADS}/2025/03/ECRAN-VITRINE-PARIS-JENNIFER-2023-1080x1440.jpg`,
    alt: 'Écran LED installé en vitrine d’une boutique parisienne',
  },
  {
    slug: 'publicitaire',
    kicker: 'Achat · Régie',
    title: 'Écran publicitaire LED',
    summary:
      'Panneaux installés sur poteaux acier pour la commercialisation d’espaces publicitaires. Gestion des plannings de diffusion et des annonceurs via SmartView.',
    specs: ['Simple ou double face', 'Planification annonceurs', 'Structure acier'],
    image: `${UPLOADS}/2024/12/BK-PLACEHOLDER.webp`,
    alt: 'Écran géant LED extérieur d’angle installé pour Burger King',
  },
  {
    slug: 'evenementiel',
    kicker: 'Location · Événementiel',
    title: 'Écran géant de location',
    summary:
      'Dalles modulaires légères pour salons, concerts, fan zones et retransmissions sportives. Montage rapide, régie multi-sources, écrans sur remorque autonome.',
    specs: ['Montage sous 4 h', 'Régie live multi-sources', 'Remorque autonome'],
    image: `${UPLOADS}/2025/03/Le_Mans___P3_9_Led_Visual_Innovation-1440x1080.jpg`,
    alt: 'Écran géant LED loué pour la fan zone de l’EURO 2024 au Mans',
  },
  {
    slug: 'studio-controle',
    kicker: 'Solutions métiers',
    title: 'Studios TV & salles de contrôle',
    summary:
      'Murs d’images à haut taux de rafraîchissement pour la captation vidéo, murs LCD très fin bord pour les centres opérationnels et la vidéosurveillance.',
    specs: ['Haut rafraîchissement', 'Bord LCD 0,6 à 0,8 mm', 'Supervision 24/7'],
    image: `${UPLOADS}/2025/06/TOURNAGE-STUDIO.webp`,
    alt: 'Mur d’images LED installé sur un plateau de tournage TV',
  },
];

export const projects = [
  {
    client: 'Stade National du Luxembourg',
    title: 'Boarding LED de 254 m² en enceinte sportive',
    place: 'Luxembourg',
    year: '2023',
    tag: 'Extérieur',
    image: `${UPLOADS}/2024/11/LVI-STADE-LUXEMBOURG-PLACEHOLDER.webp`,
    alt: 'Boarding LED de 254 m² installé dans le Stade National du Luxembourg',
    href: 'https://led-visual-innovation.fr/stade-national-du-luxembourg-luxembourg-1821-mai-2023/',
    feature: true,
  },
  {
    client: 'Autopolis',
    title: '100 m² d’écrans géants LED pour une concession automobile',
    place: 'Luxembourg',
    year: '2023',
    tag: 'Extérieur',
    image: `${UPLOADS}/2024/12/AUTOPOLIS-PLACEHOLDER.webp`,
    alt: 'Écrans géants LED extérieurs installés pour la concession Autopolis',
    href: 'https://led-visual-innovation.fr/installation-ecrans-geants-led-concession-autopolis/',
  },
  {
    client: 'Burger King',
    title: 'Écran géant extérieur d’angle en façade de restaurant',
    place: 'Luxembourg',
    year: '2024',
    tag: 'Extérieur',
    image: `${UPLOADS}/2024/12/BK-PLACEHOLDER.webp`,
    alt: 'Écran LED extérieur d’angle installé en façade d’un Burger King',
    href: 'https://led-visual-innovation.fr/installation-ecran-led-exterieur-burger-king/',
  },
  {
    client: 'La Coque',
    title: '60 m² d’écrans LED intérieur pour le complexe olympique',
    place: 'Luxembourg',
    year: '2022',
    tag: 'Intérieur',
    image: `${UPLOADS}/2024/12/LA-COQUE-PLACEHOLDER.webp`,
    alt: 'Cube LED intérieur installé au complexe olympique La Coque',
    href: 'https://led-visual-innovation.fr/installation-cube-led-la-coque-luxembourg/',
  },
  {
    client: 'Fan Zone EURO 2024',
    title: 'Écran de 60 m² pour la retransmission en fan zone',
    place: 'Le Mans',
    year: '2024',
    tag: 'Location',
    image: `${UPLOADS}/2025/03/Le_Mans___P3_9_Led_Visual_Innovation-1440x1080.jpg`,
    alt: 'Écran géant LED de 60 m² installé en fan zone au Mans pour l’EURO 2024',
    href: 'https://led-visual-innovation.fr/ecran-geant-pour-transmission-de-leuro-2024-en-direct-de-la-fan-zone-le-mans-14-juin-au-14-juillet-2024/',
  },
  {
    client: 'Posos',
    title: 'Création de stand et mur LED pour un salon professionnel',
    place: 'Paris',
    year: '2023',
    tag: 'Salon',
    image: `${UPLOADS}/2025/03/STAND-POSOS-2023-1440x1080.webp`,
    alt: 'Stand de salon professionnel équipé d’un mur LED pour Posos',
    href: 'https://led-visual-innovation.fr/catalogue/creation-stand-paris/',
  },
  {
    client: 'Decathlon',
    title: 'Mur d’images pour plateau de tournage et captation vidéo',
    place: 'Lille',
    year: '2025',
    tag: 'Studio TV',
    image: `${UPLOADS}/2025/06/TOURNAGE-STUDIO.webp`,
    alt: 'Mur d’images LED sur un plateau de tournage pour Decathlon',
    href: 'https://led-visual-innovation.fr/led-visual-innovation-partenaire-privilegie-de-decathlon-lille-2024/',
  },
  {
    client: 'Championnat de vélo de route',
    title: 'Écran géant LED sur remorque pour épreuve sportive',
    place: 'Guilherand-Granges',
    year: '2025',
    tag: 'Location',
    image: `${UPLOADS}/2026/05/LVI-LOCATION-REMORQUE-CHAMPIONNAT-VELO.webp`,
    alt: 'Écran géant LED sur remorque loué pour un championnat de vélo de route',
    href: 'https://led-visual-innovation.fr/actualite/',
  },
  {
    client: 'Mairie de Miserey',
    title: 'Panneau lumineux d’information municipale',
    place: 'Miserey',
    year: '2022',
    tag: 'Collectivité',
    image: `${UPLOADS}/2025/03/Ecran_digital_infos_legales_mairie_Miserey-1440x1080.jpg`,
    alt: 'Panneau numérique d’information municipale installé pour la mairie de Miserey',
    href: 'https://led-visual-innovation.fr/catalogue/ecran-exterieur-led/',
  },
  {
    client: 'Jennifer',
    title: 'Écran LED de vitrine pour un commerce de centre-ville',
    place: 'Paris',
    year: '2023',
    tag: 'Vitrine',
    image: `${UPLOADS}/2025/03/ECRAN-VITRINE-PARIS-JENNIFER-2023-1080x1440.jpg`,
    alt: 'Écran LED de vitrine installé dans une boutique Jennifer à Paris',
    href: 'https://led-visual-innovation.fr/catalogue/ecran-pour-vitrine/',
  },
  {
    client: 'Festival Music Rock',
    title: 'Écran sur remorque pour un festival de musique',
    place: 'Nantes',
    year: '2024',
    tag: 'Location',
    image: `${UPLOADS}/2025/03/WhatsApp-Image-2025-03-20-a-15.01.05_25e5d454-1080x1440.jpg`,
    alt: 'Écran géant LED sur remorque installé pour un festival de musique à Nantes',
    href: 'https://led-visual-innovation.fr/catalogue/location-ecran-geant-festivals-concerts/',
  },
  {
    client: 'Ville de Bagnolet',
    title: 'Écran sur remorque pour la finale de Ligue des Champions',
    place: 'Bagnolet',
    year: '2026',
    tag: 'Location',
    image: `${UPLOADS}/2025/11/SHARED-IMG.jpg`,
    alt: 'Écran géant LED sur remorque installé à Bagnolet pour la finale de la Ligue des Champions',
    href: 'https://led-visual-innovation.fr/location-ecran-geant-remorque-bagnolet-finale-ligue-champions/',
  },
];

export const clientNames = [
  'Burger King',
  'Decathlon',
  'Leroy Merlin',
  'Autopolis',
  'Stade National du Luxembourg',
  'La Coque',
  'Airbus',
  'Total Énergies',
  'Bouygues Telecom',
  'Park Hyatt',
  'Roland-Garros',
  'UGC',
  '24 Heures du Mans',
  'Armée de Terre',
  'Prysmian',
  'Venturi Space',
  'Cactus',
  'Garage Gauthier',
];

export const sectors = [
  'Salons et congrès',
  'Événements sportifs et fan zones',
  'Concerts et festivals',
  'Collectivités locales',
  'Commerces et franchises',
  'Studios TV et plateaux',
  'Salles de contrôle',
  'Pharmacies et santé',
];

/**
 * Avis clients — deux sources indépendantes.
 * Avis Vérifiés reprend la section « Nos avis clients vérifiés » du site
 * actuel ; Google Maps est la fiche d'établissement (5,0 sur 32 avis).
 */
export const reviews = {
  sources: [
    {
      key: 'google',
      label: 'Google',
      score: '5,0',
      count: 32,
      href: company.google,
    },
    {
      key: 'avis-verifies',
      label: 'Avis Vérifiés',
      score: '5,0',
      count: 42,
      href: company.avisVerifies,
    },
  ],
  items: [
    {
      text: 'Vraiment une équipe incroyable, remplie de pros qui ont le meilleur matériel trouvé en région parisienne. Je n’ai juste pas trouvé mieux après avoir rencontré plus de 10 prestataires.',
      author: 'Yassine S.',
      date: 'Avril 2026',
      origin: 'google',
    },
    {
      text: 'L’équipe a fait preuve d’un grand professionnalisme, tant dans la préparation que dans l’installation du matériel. Réactivité et disponibilité au rendez-vous.',
      author: 'Karim B.',
      date: 'Juin 2026',
      origin: 'google',
    },
    {
      text: 'Nous avons fait appel à LVI pour notre événement dédié à l’IA chez Bouygues Telecom. Roll-up numériques et superbes cadres : nous sommes ravis du résultat.',
      author: 'Cécile A.',
      date: 'Avril 2026',
      origin: 'google',
    },
    {
      text: 'Un grand merci pour la qualité du matériel, qui a véritablement sublimé mon stand et lui a donné une identité unique lors d’un congrès professionnel.',
      author: 'Carolina B.',
      date: 'Mai 2026',
      origin: 'google',
    },
    {
      text: 'L’écran sur remorque a été installé en un temps record, et le rendu visuel était vraiment à la hauteur. Équipe discrète, efficace et toujours disponible.',
      author: 'Jean-Pascal M.',
      date: 'Mai 2025',
      origin: 'google',
    },
    {
      text: 'Très bonne expérience pour l’installation d’un écran en vitrine. La luminosité est parfaite et la gestion du contenu à distance est très simple.',
      author: 'Yanis A.',
      date: 'Mars 2026',
      origin: 'google',
    },
    {
      text: 'Une société capable du plus grand tout en restant proche de ses partenaires. Un accompagnement de bout en bout.',
      author: 'Stéphane M.',
      date: '12/06/2025',
      origin: 'avis-verifies',
    },
    {
      text: 'Rapide et efficace. Excellent rapport qualité-prix.',
      author: 'Olivier C.',
      date: '03/06/2025',
      origin: 'avis-verifies',
    },
    {
      text: 'Entreprise de qualité. Réactive, arrangeante et très sympathique.',
      author: 'S. G.',
      date: '24/10/2024',
      origin: 'avis-verifies',
    },
    {
      text: 'Réactivité, efficacité, implication et professionnalisme : de l’excellent travail.',
      author: 'A. A.',
      date: '24/05/2024',
      origin: 'avis-verifies',
    },
  ],
};

export const faq = [
  {
    question: 'Comment se calcule le prix d’un écran géant LED ?',
    answer:
      'Pour une installation fixe, le tarif dépend de la dimension, du type de fixation (façade ou mât) et de la résolution d’image souhaitée. En location, les facteurs sont la durée, la résolution et la surface. Un configurateur et un formulaire de devis permettent d’obtenir une estimation, ou d’être rappelé par un technicien.',
  },
  {
    question: 'Quelle différence entre un mur LED et un mur d’images LCD ?',
    answer:
      'Le mur LED est composé de modules assemblés sans bord apparent : surface continue, visible de près comme de loin, adaptée aux grands formats et à l’extérieur. Le mur d’images LCD utilise des écrans à très fin bord (0,6 à 0,8 mm), plutôt destinés aux salles de contrôle et de conférence en intérieur. Les deux technologies sont maîtrisées en interne.',
  },
  {
    question: 'Que couvre exactement la garantie 5 ans ?',
    answer:
      'Les écrans sont garantis jusqu’à cinq ans selon la configuration, dont 3 ans pièces et main d’œuvre. La garantie couvre les modules, l’alimentation et les composants électroniques. Les pièces de rechange sont commandées dès la production de l’écran, dans le même bain de production, afin de garantir l’homogénéité colorimétrique lors d’un remplacement.',
  },
  {
    question: 'Le logiciel d’affichage est-il facturé à l’abonnement ?',
    answer:
      'Non. SmartView est développé à 100 % en interne et fourni sans abonnement. Full web, il permet de piloter les contenus à distance depuis un navigateur, de programmer les plannings de diffusion et d’intégrer des flux dynamiques (météo, actualités, réseaux sociaux, données internes).',
  },
  {
    question: 'Quels sont les délais d’intervention en cas de panne ?',
    answer:
      'La hotline technique est gratuite et ouverte 5 j/7. Les interventions sur site sont réalisées sous 48 h par des techniciens salariés. Un seul interlocuteur prend en charge le dossier, que le problème soit matériel ou logiciel.',
  },
  {
    question: 'Où intervenez-vous ?',
    answer:
      'Partout en France, avec une présence forte à Paris et en région parisienne, ainsi qu’à Lyon, Lille, Marseille, Nantes, Toulouse et Bordeaux. Également à l’international, notamment en Suisse (Genève, Lausanne), au Luxembourg et en Allemagne.',
  },
];

export const cities = [
  'Paris',
  'Lyon',
  'Lille',
  'Marseille',
  'Nantes',
  'Toulouse',
  'Bordeaux',
  'Strasbourg',
  'Reims',
  'Rennes',
  'Dijon',
  'Nice',
  'Versailles',
  'Genève',
  'Luxembourg',
];

export const navigation = [
  { label: 'Gammes', href: '/catalogue' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Devis', href: '/devis' },
];
