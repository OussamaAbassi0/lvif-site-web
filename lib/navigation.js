/**
 * Architecture de navigation.
 *
 * Elle reprend celle du site actuel — cinq entrées, dont trois ouvrent un
 * menu illustré — parce que c'est l'arborescence que le client connaît et
 * que ses clients à lui ont déjà apprise. Ce qui change, c'est la mise en
 * forme : vignettes, colonnes titrées, et un seul niveau de profondeur.
 */

const UPLOADS = 'https://led-visual-innovation.fr/wp-content/uploads';

export const pressNews = {
  text: 'LED Visual Innovation mis à l’honneur dans l’émission 66 minutes sur M6',
  href: '/a-propos#presse',
};

export const navigation = [
  {
    label: 'Écrans géants',
    href: '/catalogue',
    columns: [
      {
        title: 'Achat · installation fixe',
        items: [
          {
            label: 'Écran géant LED',
            href: '/catalogue',
            image: `${UPLOADS}/2025/12/THUMBNAIL-ECRAN-LED.webp`,
          },
          {
            label: 'Écran géant LED extérieur',
            href: '/catalogue/ecran-exterieur-led',
            image: `${UPLOADS}/2025/12/THUMBNAIL-ECRAN-LED-EXTERIEUR.webp`,
          },
          {
            label: 'Écran géant LED intérieur',
            href: '/catalogue/ecran-interieur-led',
            image: `${UPLOADS}/2025/12/THUMBNAIL-ECRAN-LED-INTERIEUR.webp`,
          },
        ],
      },
      {
        title: 'Formats spécifiques',
        items: [
          {
            label: 'Mur d’images',
            href: '/catalogue/mur-images',
            image: `${UPLOADS}/2025/12/THUMBNAIL-MUR-IMAGES.webp`,
          },
          {
            label: 'Écran LED transparent',
            href: '/catalogue/ecran-transparent',
            image: `${UPLOADS}/2025/12/THUMBNAIL-ECRAN-LED-TRANSPARENT.webp`,
          },
          {
            label: 'Écran publicitaire LED',
            href: '/catalogue/ecran-publicitaire',
            image: `${UPLOADS}/2025/12/THUMBNAIL-ECRAN-PUBLICITAIRE-LED.webp`,
          },
        ],
      },
    ],
  },
  {
    label: 'Location écran géant',
    href: '/location',
    columns: [
      {
        title: 'Louer un écran',
        items: [
          {
            label: 'Location écran géant',
            href: '/location',
            image: `${UPLOADS}/2025/12/THUMBNAIL-LOC-ECRAN-GEANT.webp`,
          },
          {
            label: 'Location écran géant Paris',
            href: '/location#villes',
            image: `${UPLOADS}/2025/12/THUMBNAIL-LOC-ECRAN-PARIS.webp`,
          },
          {
            label: 'Festivals et concerts',
            href: '/location#usages',
            image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-FESTIVALS-CONCERTS.webp`,
          },
        ],
      },
      {
        title: 'Par configuration',
        items: [
          {
            label: 'Location écran extérieur',
            href: '/location#usages',
            image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-EXTERIEUR.webp`,
          },
          {
            label: 'Location écran de stand',
            href: '/location#usages',
            image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-STAND.webp`,
          },
          {
            label: 'Écran géant sur remorque',
            href: '/location#usages',
            image: `${UPLOADS}/2024/10/THUMBNAIL-ECRAN-REMORQUE.webp`,
          },
        ],
      },
    ],
  },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/a-propos' },
  {
    label: 'Solutions métiers',
    href: '/solutions',
    columns: [
      {
        title: 'Événementiel',
        items: [
          {
            label: 'Création de stand Paris',
            href: '/solutions/stand-paris',
            image: `${UPLOADS}/2024/10/THUMBNAIL-STAND-PARIS.webp`,
          },
          {
            label: 'Réalisation événementielle',
            href: '/solutions/evenementiel',
            image: `${UPLOADS}/2024/10/THUMBNAIL-REAL-EVENT.webp`,
          },
          {
            label: 'Studios et tournage TV',
            href: '/solutions/studios-tv',
            image: `${UPLOADS}/2024/10/THUMBNAIL-STUDIOS-TV.webp`,
          },
        ],
      },
      {
        title: 'Entreprise et commerce',
        items: [
          {
            label: 'Mur d’écrans salle de contrôle',
            href: '/solutions/salle-de-controle',
            image: `${UPLOADS}/2024/10/salle-de-controle-400x400-1.webp`,
          },
          {
            label: 'Écran pour salle de réunion',
            href: '/solutions/salle-de-reunion',
            image: `${UPLOADS}/2024/10/salle-de-conferences-400x400-1.webp`,
          },
          {
            label: 'Écran de pharmacie',
            href: '/solutions/pharmacie',
            image: `${UPLOADS}/2024/10/ecran-pharmacie-400x400-1.webp`,
          },
        ],
      },
    ],
  },
];

/** Index de la recherche : toutes les destinations du site, à plat. */
export const searchIndex = [
  { label: 'Accueil', href: '/', kind: 'Page', keywords: 'écran géant led location achat' },
  {
    label: 'Catalogue complet',
    href: '/catalogue',
    kind: 'Page',
    keywords: 'gammes écrans modèles',
  },
  {
    label: 'Écran géant LED extérieur',
    href: '/catalogue/ecran-exterieur-led',
    kind: 'Écran',
    keywords: 'façade mât publicitaire ip65 luminosité plein soleil enseigne',
  },
  {
    label: 'Écran géant LED intérieur',
    href: '/catalogue/ecran-interieur-led',
    kind: 'Écran',
    keywords: 'pitch fin hall accueil showroom scène',
  },
  {
    label: 'Mur d’images',
    href: '/catalogue/mur-images',
    kind: 'Écran',
    keywords: 'lcd dalles bord fin salle de contrôle vidéo mur',
  },
  {
    label: 'Écran LED transparent',
    href: '/catalogue/ecran-transparent',
    kind: 'Écran',
    keywords: 'vitrine verre transparence commerce',
  },
  {
    label: 'Écran publicitaire LED',
    href: '/catalogue/ecran-publicitaire',
    kind: 'Écran',
    keywords: 'régie annonceur bord de route mât rentabilité',
  },
  {
    label: 'Location d’écran géant',
    href: '/location',
    kind: 'Page',
    keywords: 'louer événement festival concert stand remorque',
  },
  { label: 'Réalisations clients', href: '/realisations', kind: 'Page', keywords: 'projets références chantiers' },
  { label: 'Qui sommes-nous', href: '/a-propos', kind: 'Page', keywords: 'expertise équipe entreprise française histoire' },
  { label: 'Solutions métiers', href: '/solutions', kind: 'Page', keywords: 'métier secteur usage' },
  { label: 'Création de stand Paris', href: '/solutions/stand-paris', kind: 'Métier', keywords: 'salon congrès exposition' },
  { label: 'Réalisation événementielle', href: '/solutions/evenementiel', kind: 'Métier', keywords: 'événement scène fan zone' },
  { label: 'Studios et tournage TV', href: '/solutions/studios-tv', kind: 'Métier', keywords: 'plateau décor virtuel tournage' },
  { label: 'Mur d’écrans salle de contrôle', href: '/solutions/salle-de-controle', kind: 'Métier', keywords: 'supervision pc sécurité crise' },
  { label: 'Écran pour salle de réunion', href: '/solutions/salle-de-reunion', kind: 'Métier', keywords: 'visioconférence bureau entreprise' },
  { label: 'Écran de pharmacie', href: '/solutions/pharmacie', kind: 'Métier', keywords: 'officine vitrine croix santé' },
  { label: 'Demander un devis', href: '/devis', kind: 'Page', keywords: 'prix tarif estimation contact' },
  {
    label: 'Prendre rendez-vous',
    href: '/devis#rendez-vous',
    kind: 'Page',
    keywords: 'agenda créneau appel visio visite technique calendrier',
  },
  {
    label: 'SAV et support technique',
    href: '/sav',
    kind: 'Page',
    keywords: 'panne dysfonctionnement dépannage garantie hotline diagnostic écran noir pixels morts',
  },
];
