/**
 * Contenu des pages internes.
 *
 * Textes et visuels repris du site actuel de LED Visual Innovation
 * (/qui-sommes-nous/, /catalogue/ecran-exterieur-led/ et les pages métiers),
 * réorganisés pour tenir en une lecture linéaire.
 */

const UPLOADS = 'https://led-visual-innovation.fr/wp-content/uploads';

/* ————————————————————————————————— À propos ————————————————————————————————— */

export const about = {
  title: 'Qui sommes-nous ?',
  lead: 'Une expertise française au service de l’affichage dynamique grand format',
  intro:
    'LED Visual Innovation est une entreprise française indépendante spécialisée dans l’affichage dynamique grand format. Notre métier consiste à concevoir, installer, louer et maintenir des dispositifs numériques : écrans LED géants, murs d’images intérieurs, panneaux lumineux extérieurs, totems numériques. Nous intervenons aussi bien pour des événements éphémères que pour des installations permanentes.',
  hero: `${UPLOADS}/2026/06/ECRAN-LED-INCURVE-LVI-TOULOUSE-AIRBUS.webp`,
  heroAlt: 'Écran LED incurvé installé par LED Visual Innovation pour Airbus à Toulouse',

  expertise: {
    title: 'Notre expertise',
    strong:
      'Nous combinons technologie et expérience pour proposer à nos clients le meilleur rapport qualité-prix pour leur projet d’achat ou de location d’écrans géants.',
    body: [
      'Nous sommes devenus en moins de 10 ans un des spécialistes français des écrans géants LED, avec plus de 4,5 millions d’euros de chiffre d’affaires réalisés sur l’ensemble du groupe en 2024. Notre réussite repose sur deux facteurs : la maîtrise de la chaîne d’approvisionnement des composants avec un assemblage réalisé en France, qui nous permet de proposer des garanties 5 ans pièces de tous nos produits, adossée à une assurance basée en France qui couvre toutes nos installations.',
      'Nous travaillons en direct avec les plus grandes usines, tout en apportant nos expertises sur la composition et l’assemblage de nos écrans géants, afin de proposer un tarif juste à nos clients, quel que soit leur besoin. Nous internalisons notamment la fabrication des structures et supports de nos écrans géants, et développons à 100 % tous nos logiciels d’affichage dynamique, que nous proposons sans abonnement, et qui répondent aux exigences les plus strictes en matière de sécurité.',
      'Le second facteur de notre réussite est notre équipe technique, qui se compose de profils passionnés et expérimentés au service de nos clients. Des monteurs LED au directeur technique, en passant par nos développeurs logiciels, toute notre équipe est mobilisée pour répondre à vos besoins.',
    ],
    image: `${UPLOADS}/2024/12/Caserne-1440x648.webp`,
    imageAlt: 'Écran géant LED extérieur aux couleurs de LED Visual Innovation',
  },

  /* « En savoir plus » : les trois onglets du site actuel. */
  more: [
    {
      key: 'piliers',
      label: 'Nos trois piliers',
      title: 'Trois engagements qui tiennent après la signature',
      body: [
        'Nos ateliers et notre entrepôt de 11 000 m² sont situés à moins d’une heure de Paris. Les structures et supports sont fabriqués et assemblés en France, ce qui raccourcit les délais et permet des formats hors standard sans surcoût de développement.',
        'La garantie court jusqu’à cinq ans, dont trois ans pièces, main-d’œuvre et déplacement. Les pièces de rechange sont commandées dès la production de l’écran, dans le même bain, pour éviter toute différence de teinte lors d’un remplacement.',
      ],
      bullets: [
        'Assemblage et fabrication des supports en France',
        'Garantie 5 ans dont 3 ans pièces, main-d’œuvre et déplacement',
        'Assurance basée en France couvrant toutes les installations',
      ],
      image: `${UPLOADS}/2024/11/LED-VISUAL-INNOVATION-ECRAN-FACADE.webp`,
      alt: 'Écran LED en façade installé par LED Visual Innovation',
    },
    {
      key: 'equipe',
      label: 'Équipe engagée et polyvalente',
      title: 'Une équipe technique, pas un réseau de sous-traitants',
      body: [
        'Des monteurs LED au directeur technique, en passant par les développeurs logiciels, l’équipe est interne. C’est elle qui étudie le site, qui pose, qui règle la colorimétrie et qui revient en cas d’incident — pas un prestataire différent à chaque étape.',
        'Cette continuité change surtout l’après-vente : l’interlocuteur qui répond au téléphone connaît l’installation dont vous parlez.',
      ],
      bullets: [
        'Étude technique, pose et réglage assurés en interne',
        'Développement logiciel intégré à l’équipe projet',
        'Intervention sur site en maintenance préventive ou curative',
      ],
      image: `${UPLOADS}/2025/10/LOCATION-ROLL-UP-LVI-PARIS-1440x1080.webp`,
      alt: 'Équipe LED Visual Innovation lors d’une installation à Paris',
    },
    {
      key: 'materiel',
      label: 'Matériel et logistique',
      title: 'La complémentarité entre le matériel et le logiciel',
      body: [
        'Nous sélectionnons et assemblons les composants LED selon les exigences de chaque projet : pitch fin pour les installations intérieures haute définition, modules haute luminosité IP65 pour l’extérieur, écrans incurvés ou modulaires pour les configurations spécifiques.',
        'À cette expertise matérielle s’ajoute une compétence logicielle, également développée en interne. Notre solution SmartView permet de piloter facilement les contenus à distance, d’automatiser la diffusion et d’intégrer des flux dynamiques : actualités, météo, données institutionnelles, réseaux sociaux. Les clients mettent à jour leurs écrans sans compétences techniques particulières.',
      ],
      bullets: [
        'Pitch de 1,9 à 10 mm selon la distance de lecture',
        'Modules IP65 haute luminosité pour l’extérieur',
        'SmartView : pilotage à distance, sans abonnement',
      ],
      image: `${UPLOADS}/2025/04/20230222_164510-1.webp`,
      alt: 'Modules LED en cours d’assemblage',
    },
  ],

  team: {
    image: `${UPLOADS}/2025/03/Boarding_LED___Led_Visual_Innovation___Championnat_du_monde_tir_a_l_arc_Indoor-1440x960.jpg`,
    alt: 'Équipe technique LED Visual Innovation devant un mur LED',
    caption: 'Équipe technique LED Visual Innovation',
    note: 'Lors d’un événement Decathlon',
  },

  references: {
    title: 'Des références variées et exigeantes',
    body: 'Nous comptons parmi nos clients des collectivités locales qui équipent leurs centres-villes ou bâtiments publics en panneaux LED, des grands groupes industriels qui utilisent les murs d’images pour la communication interne, des organisateurs d’événements sportifs qui installent des écrans géants dans les stades ou les fan zones, des organisateurs de salons professionnels qui intègrent des murs LED dans leurs espaces d’exposition, et des marques internationales qui cherchent à capter l’attention grâce à des dispositifs visuels percutants.',
  },

  /* « Des solutions adaptées à chaque usage » */
  usages: [
    {
      key: 'salons',
      label: 'Salons et congrès',
      title: 'Salons professionnels et congrès',
      body: [
        'Un stand se joue sur la première seconde. Un mur LED sans bordure visible remplace la bâche imprimée et permet de changer de message d’une session à l’autre, sans réimpression.',
        'Montage la veille, démontage le soir même : nos équipes travaillent aux horaires imposés par le parc des expositions.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-STAND-PARIS.webp`,
      alt: 'Mur LED intégré à un stand de salon professionnel',
      href: '/solutions/stand-paris',
    },
    {
      key: 'sport',
      label: 'Évén. sportifs et fan zones',
      title: 'Événements sportifs et fan zones',
      body: [
        'Boarding de bord de terrain, écran géant de fan zone, écran sur remorque autonome : les configurations diffèrent surtout par la logistique et l’alimentation.',
        'Nous avons livré un boarding de 254 m² au Stade National du Luxembourg et équipé des fan zones municipales sur remorque.',
      ],
      image: `${UPLOADS}/2025/03/Boarding_LED___Led_Visual_Innovation___Championnat_du_monde_tir_a_l_arc_Indoor-1440x960.jpg`,
      alt: 'Boarding LED installé pour un championnat du monde de tir à l’arc',
      href: '/location',
    },
    {
      key: 'concerts',
      label: 'Concerts et festivals',
      title: 'Concerts et festivals',
      body: [
        'Le format scénique impose un pitch adapté à la distance du public et une structure qui accepte le vent. Nous fournissons l’écran, la structure et le pilotage, ou seulement l’écran si le régisseur a déjà son parc.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-FESTIVALS-CONCERTS.webp`,
      alt: 'Écran géant LED installé sur une scène de festival',
      href: '/location',
    },
    {
      key: 'collectivites',
      label: 'Collectivités locales',
      title: 'Collectivités locales',
      body: [
        'Panneau d’information municipale, écran de façade d’équipement public, écran tactile extérieur en mairie : l’enjeu est autant réglementaire que technique.',
        'Nous prenons en charge l’étude, les plans d’exécution et les autorisations administratives, encadrées par le code de l’environnement et le règlement local de publicité.',
      ],
      image: `${UPLOADS}/2025/10/ECRAN-LED-TACTILE-MAIRIE.webp`,
      alt: 'Écran LED tactile extérieur installé devant une mairie',
      href: '/catalogue/ecran-exterieur-led',
    },
    {
      key: 'commerces',
      label: 'Commerces et franchises',
      title: 'Commerces et franchises',
      body: [
        'Enseigne numérique en façade, écran transparent en vitrine, réseau d’écrans piloté depuis le siège : la franchise a besoin d’un parc homogène et d’une diffusion centralisée.',
        'SmartView programme les campagnes par magasin, par horaire ou par région, sans abonnement par écran.',
      ],
      image: `${UPLOADS}/2025/04/Supermache_Markup___Mantes_la_Ville___6m2_pitch_3_9mm.webp`,
      alt: 'Écran LED de 6 m² installé en façade d’un supermarché',
      href: '/catalogue/ecran-publicitaire',
    },
    {
      key: 'studios',
      label: 'Studios TV et plateaux',
      title: 'Studios TV et plateaux de tournage',
      body: [
        'Le plateau exige un taux de rafraîchissement élevé pour éviter le scintillement à la caméra, et une colorimétrie stable d’un module à l’autre.',
        'Nos cartes de réception Novastar dernière génération et notre contrôle de bain de production répondent à ces deux contraintes.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-STUDIOS-TV.webp`,
      alt: 'Mur LED utilisé comme fond de plateau de tournage',
      href: '/solutions/studios-tv',
    },
  ],

  future: {
    title: 'Une technologie tournée vers l’avenir et l’IA',
    body: [
      'L’affichage dynamique évolue rapidement avec les usages digitaux. LED Visual Innovation développe des dispositifs compatibles avec les technologies d’IA afin de rendre l’affichage plus intelligent et contextuel. Les écrans peuvent adapter leur contenu selon l’heure de la journée, la météo ou les événements programmés.',
      'Nos solutions permettent également d’intégrer des données externes : flux RSS, réseaux sociaux, bases de données internes. Grâce à l’IA, un contenu peut être généré, mis en forme et diffusé automatiquement, ce qui réduit la charge opérationnelle pour le client.',
      'Cette approche ouvre la voie à un affichage réellement interactif et évolutif, où la donnée en temps réel enrichit la communication visuelle.',
    ],
  },

  press: {
    title: 'La presse parle de nous',
    body: 'LED Visual Innovation a été mis à l’honneur dans l’émission 66 minutes sur M6, consacrée à l’essor de l’affichage LED en France et aux industriels qui assemblent encore sur le territoire.',
  },
};

/* ————————————————————————————————— Catalogue ————————————————————————————————— */

/**
 * Fiches produit. `slug` sert de route : /catalogue/[slug].
 * Les contenus les plus complets (extérieur) viennent de la page officielle ;
 * les autres reprennent la même trame pour que la lecture reste homogène.
 */
export const catalog = [
  {
    slug: 'ecran-exterieur-led',
    kicker: 'Achat · installation fixe',
    title: 'Écran géant LED extérieur',
    lead: 'Découvrez notre gamme professionnelle d’écrans LED extérieurs',
    intro:
      'Nos écrans extérieurs LED, aussi appelés écrans géants extérieurs, sont assemblés en France et répondent aux exigences de qualité des professionnels. Tous nos écrans géants LED se composent de plusieurs modules d’affichage dynamique dont les dimensions, la résolution et la luminosité sont définies en fonction de vos besoins.',
    image: `${UPLOADS}/2024/11/LED-VISUAL-INNOVATION-ECRAN-EXTERIEUR-1440x1080.webp`,
    alt: 'Écran géant LED extérieur installé en façade',
    essential: {
      title: 'L’essentiel à retenir',
      body: 'Les écrans LED extérieurs assurent une visibilité parfaite même en plein jour, grâce à leur haute luminosité et à leur conception étanche et résistante. Ces solutions s’adaptent aux façades commerciales, stades, vitrines ou espaces publics, avec un déploiement sur mesure. LED Visual Innovation propose une installation clé en main et un suivi technique complet.',
      bullets: [
        'Luminosité jusqu’à 8 500 cd/m² pour un affichage lisible en plein soleil',
        'Haute définition pour une visibilité optimale dès 3 mètres',
        'Caissons étanches sur mesure, finition aluminium dans la couleur souhaitée',
        'Aucune différence colorimétrique entre modules, ce qui facilite leur remplacement',
        'Grande fluidité des vidéos grâce à la carte de réception Novastar MRV328',
        'Capteurs intégrés pour prévenir tout dysfonctionnement',
        'Garantie 5 ans dont 3 ans pièces, main-d’œuvre et déplacement',
        'Formats personnalisés et maintenance assurée',
      ],
    },
    variants: {
      title: 'Un écran pour chaque type d’usage',
      lead: 'Nous avons une solution adaptée à chaque type d’usage : écran extérieur publicitaire, écran géant sur façade ou écran LED sur mât pour enseigne commerciale.',
      items: [
        {
          key: 'publicitaire',
          label: 'Écran publicitaire',
          title: 'Écran publicitaire',
          body: [
            'Support stratégique pour la commercialisation d’espaces de communication à forte audience. Il s’agit généralement d’un écran sur mât installé en bordure de route à fort trafic, pensé pour une diffusion commerciale : spots d’annonceurs, messages institutionnels, partenariats locaux.',
            'Ce type de projet s’adresse principalement aux régies publicitaires, agences ou collectivités. L’installation est strictement encadrée par la réglementation — code de l’environnement, règlement local de publicité. Nous prenons en charge l’étude technique, la conception du support, les plans d’exécution et les autorisations administratives.',
          ],
          image: `${UPLOADS}/2024/11/LVI-ASPIC-ECRAN-SUR-MAT-1080x1440.webp`,
          alt: 'Écran publicitaire LED installé sur mât en bordure de route',
          tags: ['Aspic', 'Bord de route', '2024'],
        },
        {
          key: 'facade',
          label: 'Écran géant sur façade',
          title: 'Écran géant sur façade',
          body: [
            'L’écran de façade transforme un bâtiment en support de communication. Il s’intègre au bardage existant ou vient en applique sur une structure acier que nous fabriquons sur mesure.',
            'C’est la configuration la plus répandue pour les enseignes commerciales, les concessions automobiles et les équipements publics.',
          ],
          image: `${UPLOADS}/2024/11/LED-VISUAL-INNOVATION-BUXY-ECRAN-FACADE.webp`,
          alt: 'Écran LED géant installé sur la façade d’un bâtiment',
          tags: ['Buxy', 'Façade', '2024'],
        },
        {
          key: 'mat',
          label: 'Écran sur mât',
          title: 'Écran sur mât',
          body: [
            'Le mât acier permet de placer l’écran en hauteur, visible depuis un axe routier, indépendamment du bâti. Nous réalisons l’étude de sol, la conception du mât et le massif béton.',
            'Le double face est fréquent sur cette configuration : un visuel pour chaque sens de circulation.',
          ],
          image: `${UPLOADS}/2024/11/ECRAN-DOUBLE-FACE-EXTERIEUR-FRYNEL.webp`,
          alt: 'Écran LED double face installé sur mât',
          tags: ['Frynel', 'Double face', '2024'],
        },
        {
          key: 'panneau',
          label: 'Panneau publicitaire LED',
          title: 'Panneau publicitaire LED',
          body: [
            'Format standardisé, généralement 8 ou 12 m², destiné à l’affichage commercial rotatif. Le pitch est adapté à une lecture à partir de 8 à 15 mètres.',
            'Le retour sur investissement dépend du trafic de l’axe et du nombre d’annonceurs : nous fournissons une étude de rentabilité avant l’engagement.',
          ],
          image: `${UPLOADS}/2025/09/panneau-lumineux-exterieur-1440x665.webp`,
          alt: 'Panneau publicitaire lumineux LED en extérieur',
          tags: ['Affichage', 'Régie', '2025'],
        },
        {
          key: 'tactile',
          label: 'Écran tactile extérieur',
          title: 'Écran tactile extérieur LED',
          body: [
            'Borne d’information consultable en libre-service, résistante aux intempéries et au vandalisme. Utilisée par les collectivités pour les démarches, les horaires et l’actualité municipale.',
            'Le contenu est piloté à distance par SmartView, avec un mode veille programmable la nuit.',
          ],
          image: `${UPLOADS}/2025/10/ECRAN-LED-TACTILE-MAIRIE.webp`,
          alt: 'Écran LED tactile extérieur installé devant une mairie',
          tags: ['Mairie', 'Tactile', '2025'],
        },
        {
          key: 'stade',
          label: 'Écran tour de stade',
          title: 'Écran tour de stade',
          body: [
            'Boarding périphérique de bord de terrain ou écran de tribune. La contrainte principale est la résistance au choc et la rapidité de montage entre deux rencontres.',
            'Nous avons livré un boarding de 254 m² au Stade National du Luxembourg.',
          ],
          image: `${UPLOADS}/2025/03/Boarding_LED___Led_Visual_Innovation___Championnat_du_monde_tir_a_l_arc_Indoor-1440x960.jpg`,
          alt: 'Boarding LED périphérique installé dans une enceinte sportive',
          tags: ['Stade', 'Boarding', '2023'],
        },
      ],
    },
    guide: {
      title: 'Comment choisir un écran extérieur LED ?',
      steps: [
        {
          index: '01',
          title: 'La distance de lecture',
          body: 'Elle détermine le pitch. En règle simple, le pitch en millimètres correspond à peu près à la distance minimale de lecture en mètres : un P6 se lit confortablement à partir de 6 à 8 mètres.',
        },
        {
          index: '02',
          title: 'L’exposition à la lumière',
          body: 'Un écran plein sud face au soleil demande 6 500 à 8 500 cd/m². Une façade à l’ombre se contente de 4 000 cd/m², avec une consommation nettement inférieure.',
        },
        {
          index: '03',
          title: 'Le mode de fixation',
          body: 'Façade, mât ou poteaux : le choix dépend de la visibilité recherchée et de la portance du bâti. L’étude de structure fait partie de notre prestation.',
        },
        {
          index: '04',
          title: 'Le cadre réglementaire',
          body: 'Enseigne, préenseigne ou publicité : les trois régimes n’ont pas les mêmes contraintes de surface ni les mêmes autorisations. Nous montons le dossier.',
        },
      ],
    },
    faq: [
      {
        question: 'Quelle est la durée de vie moyenne d’un écran géant LED extérieur ?',
        answer:
          'Les modules sont donnés pour 100 000 heures de fonctionnement, soit une dizaine d’années en usage courant de 16 h par jour. La luminosité décroît progressivement plutôt que l’écran ne tombe en panne d’un coup, ce qui laisse le temps d’anticiper le remplacement.',
      },
      {
        question:
          'Peut-on intégrer un écran extérieur dans une charte architecturale ou un plan de rénovation urbaine ?',
        answer:
          'Oui. Le caisson est fabriqué sur mesure et la finition aluminium peut être teintée dans la couleur imposée par l’architecte des Bâtiments de France ou le règlement local. Nous fournissons les plans d’exécution pour le dossier d’urbanisme.',
      },
      {
        question: 'Quelle est la consommation électrique d’un écran LED extérieur ?',
        answer:
          'Comptez en moyenne 250 à 400 W par m² en pointe, et environ un tiers de cette valeur en usage réel : la consommation dépend du contenu affiché et la luminosité s’ajuste automatiquement à l’éclairement ambiant. Un écran de 12 m² revient à quelques centaines d’euros par an.',
      },
      {
        question: 'L’écran peut-il fonctionner de manière autonome sans réseau internet ?',
        answer:
          'Oui. Les contenus sont stockés localement sur le lecteur et la programmation continue de tourner sans connexion. Le réseau ne sert qu’à mettre à jour les contenus et à remonter les alertes des capteurs.',
      },
      {
        question: 'Est-il possible de mettre à jour les contenus à distance ?',
        answer:
          'C’est le principe de SmartView, notre logiciel développé en interne et fourni sans abonnement. Vous programmez les visuels, les plages horaires et les flux dynamiques depuis un navigateur, pour un écran ou pour un parc entier.',
      },
      {
        question: 'Que se passe-t-il en cas de panne ou de problème technique ?',
        answer:
          'Les capteurs intégrés signalent l’anomalie avant qu’elle ne soit visible. La garantie couvre pièces, main-d’œuvre et déplacement pendant trois ans, et les modules de rechange sont issus du même bain de production que l’écran d’origine, sans écart de teinte.',
      },
    ],
  },
  {
    slug: 'ecran-interieur-led',
    kicker: 'Achat · intérieur',
    title: 'Écran géant LED intérieur',
    lead: 'Des murs LED sans bordure pour halls, showrooms et scènes',
    intro:
      'L’écran LED intérieur se distingue par un pitch fin, adapté à une lecture rapprochée, et par une luminosité modérée qui ne fatigue pas l’œil en espace clos. Il remplace avantageusement la vidéoprojection : pas d’ombre portée, pas de contraste écrasé par l’éclairage ambiant.',
    image: `${UPLOADS}/2026/06/ECRAN-LED-INCURVE-LVI-TOULOUSE-AIRBUS.webp`,
    alt: 'Écran LED incurvé installé en intérieur',
    essential: {
      title: 'L’essentiel à retenir',
      body: 'La surface est continue, sans bordure entre les modules, ce qui permet des formats hors normes et des courbures. Le montage se fait en applique murale ou sur structure autoportante.',
      bullets: [
        'Pitch de 1,9 à 3,9 mm selon la distance de lecture',
        'Surface continue, sans bord visible entre modules',
        'Formats sur mesure, y compris incurvés',
        'Taux de rafraîchissement élevé, compatible captation vidéo',
        'Montage mural ou sur structure autoportante',
        'Garantie 5 ans dont 3 ans pièces et main-d’œuvre',
      ],
    },
  },
  {
    slug: 'mur-images',
    kicker: 'Achat · intérieur',
    title: 'Mur d’images',
    lead: 'Dalles LCD à bord ultra-fin pour la supervision et la conférence',
    intro:
      'Le mur d’images assemble des dalles LCD professionnelles dont le bord mesure 0,6 à 0,8 mm. C’est la technologie de référence pour les salles de contrôle et de réunion, où l’on affiche simultanément plusieurs sources informatiques à haute résolution.',
    image: `${UPLOADS}/2024/10/salle-de-controle-400x400-1.webp`,
    alt: 'Mur d’images LCD installé dans une salle de contrôle',
    essential: {
      title: 'L’essentiel à retenir',
      body: 'Contrairement au mur LED, le mur d’images conserve une définition native très élevée sur une petite surface : c’est ce qu’il faut pour lire du texte ou une cartographie à un mètre de distance.',
      bullets: [
        'Bord de dalle de 0,6 à 0,8 mm',
        'Définition native adaptée à la lecture rapprochée',
        'Affichage multi-sources et fenêtrage libre',
        'Fonctionnement continu 24 h/24',
        'Supervision et remontée d’alertes',
      ],
    },
  },
  {
    slug: 'ecran-transparent',
    kicker: 'Achat · vitrine',
    title: 'Écran LED transparent',
    lead: 'Communiquer en vitrine sans occulter la lumière',
    intro:
      'L’écran transparent se pose derrière la vitrine et laisse passer 60 à 80 % de la lumière. Le commerce garde sa devanture et sa clarté intérieure tout en diffusant un message visible depuis la rue.',
    image: `${UPLOADS}/2025/12/THUMBNAIL-ECRAN-LED-TRANSPARENT.webp`,
    alt: 'Écran LED transparent installé en vitrine',
    essential: {
      title: 'L’essentiel à retenir',
      body: 'La contrepartie de la transparence est une définition plus faible : le format se prête aux messages courts et aux animations graphiques, moins à la vidéo détaillée.',
      bullets: [
        'Transparence de 60 à 80 %',
        'Pose derrière la vitrine, sans travaux de façade',
        'Poids réduit, structure légère',
        'Adapté aux messages courts et aux animations',
        'Pilotage à distance par SmartView',
      ],
    },
  },
  {
    slug: 'ecran-publicitaire',
    kicker: 'Achat · régie',
    title: 'Écran publicitaire LED',
    lead: 'Un support commercialisable, et le dossier réglementaire qui va avec',
    intro:
      'L’écran publicitaire est un investissement dont la rentabilité dépend du trafic de l’axe et du nombre d’annonceurs. Sa pose est strictement encadrée par le code de l’environnement et le règlement local de publicité.',
    image: `${UPLOADS}/2024/11/TWO-REFLEX-ECRAN-SUR-MAT-LVI.webp`,
    alt: 'Écran publicitaire LED sur mât',
    essential: {
      title: 'L’essentiel à retenir',
      body: 'Nous accompagnons le projet dès l’amont : étude technique, conception du support, plans d’exécution, et surtout dossier d’autorisation administrative. C’est là que la plupart des projets échouent.',
      bullets: [
        'Étude de rentabilité avant engagement',
        'Conception du mât et du massif béton',
        'Dossier d’autorisation administrative pris en charge',
        'Diffusion multi-annonceurs planifiée',
        'Mesure d’audience et rapports de diffusion',
      ],
    },
  },
];

/* ————————————————————————————————— Location ————————————————————————————————— */

export const rental = {
  title: 'Location d’écran géant',
  lead: 'Le parc, la structure, le montage et le régisseur — ou seulement l’écran',
  intro:
    'La location couvre l’événement d’un jour comme la saison entière. Nous livrons, montons, réglons et démontons, avec un technicien présent pendant l’exploitation si le dispositif le demande.',
  image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-EXTERIEUR.webp`,
  alt: 'Écran géant LED de location installé en extérieur',
  usages: [
    {
      key: 'festivals',
      label: 'Festivals et concerts',
      title: 'Festivals et concerts',
      body: [
        'Écran de scène ou écran latéral de renfort, monté sur structure accrochée ou au sol. Le pitch est choisi selon la profondeur du public et la position des caméras.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-FESTIVALS-CONCERTS.webp`,
      alt: 'Écran géant LED de location sur une scène de festival',
    },
    {
      key: 'exterieur',
      label: 'Événement extérieur',
      title: 'Événement extérieur',
      body: [
        'Fan zone, projection publique, cérémonie : la structure doit être calculée au vent et l’alimentation sécurisée. Nous fournissons les notes de calcul pour la commission de sécurité.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-EXTERIEUR.webp`,
      alt: 'Écran géant LED de location en extérieur',
    },
    {
      key: 'stand',
      label: 'Stand et salon',
      title: 'Stand et salon',
      body: [
        'Mur LED intégré au stand, monté dans les créneaux horaires imposés par le parc des expositions, et démonté le soir de la clôture.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-LOC-ECRAN-STAND.webp`,
      alt: 'Mur LED de location intégré à un stand de salon',
    },
    {
      key: 'remorque',
      label: 'Écran sur remorque',
      title: 'Écran géant sur remorque',
      body: [
        'La remorque est autonome : elle se déplace, se met à niveau et se déploie en une trentaine de minutes, sans grue ni raccordement lourd. C’est la formule retenue par les communes pour les retransmissions sportives.',
      ],
      image: `${UPLOADS}/2024/10/THUMBNAIL-ECRAN-REMORQUE.webp`,
      alt: 'Écran géant LED monté sur remorque autonome',
    },
    {
      key: 'roll-up',
      label: 'Roll-up numérique',
      title: 'Roll-up numérique et cadres LED',
      body: [
        'Formats réduits pour l’accueil, le hall ou l’allée de salon. Livrés programmés, ils ne demandent qu’une prise de courant.',
      ],
      image: `${UPLOADS}/2025/10/LOCATION-ROLL-UP-LVI-PARIS-1440x1080.webp`,
      alt: 'Roll-up numérique LED loué pour un événement à Paris',
    },
  ],
  steps: [
    {
      index: '01',
      title: 'Vous décrivez le contexte',
      body: 'Lieu, dates, surface visée, distance du public. Le simulateur de la page d’accueil donne déjà une fourchette.',
    },
    {
      index: '02',
      title: 'Nous validons la faisabilité',
      body: 'Accès, portance du sol, alimentation, contraintes de vent. Une visite technique est prévue pour les dispositifs importants.',
    },
    {
      index: '03',
      title: 'Montage et exploitation',
      body: 'Nos équipes montent, règlent la colorimétrie et restent sur place si l’événement le demande.',
    },
    {
      index: '04',
      title: 'Démontage',
      body: 'Sur le créneau convenu, y compris de nuit. Le site est rendu dans l’état.',
    },
  ],
};

/* ————————————————————————————————— Solutions métiers ————————————————————————————————— */

export const solutions = [
  {
    slug: 'stand-paris',
    title: 'Création de stand Paris',
    lead: 'Un stand conçu, fabriqué et monté autour de son mur LED',
    body: [
      'Nous concevons le stand dans son ensemble — structure, agencement, mur LED — plutôt que d’y ajouter un écran après coup. Le mur devient le fond de scène, la surface d’accueil ou la cloison lumineuse selon le plan.',
      'Le montage se fait dans les créneaux du parc des expositions, et le démontage le soir de la clôture. Nous travaillons régulièrement à la Porte de Versailles, à Villepinte et au Palais des Congrès.',
    ],
    image: `${UPLOADS}/2024/10/THUMBNAIL-STAND-PARIS.webp`,
    alt: 'Stand de salon professionnel équipé d’un mur LED',
    bullets: [
      'Conception du stand et du mur LED en un seul lot',
      'Montage et démontage dans les créneaux imposés',
      'Contenus programmés avant l’ouverture',
    ],
  },
  {
    slug: 'evenementiel',
    title: 'Réalisation événementielle',
    lead: 'De l’écran seul au dispositif scénique complet',
    body: [
      'Convention d’entreprise, cérémonie, lancement de produit : le dispositif se dimensionne à partir de la salle et de la position du public, pas l’inverse.',
      'Nous fournissons l’écran, la structure, le pilotage et, si besoin, le régisseur qui tient la conduite pendant l’événement.',
    ],
    image: `${UPLOADS}/2024/10/THUMBNAIL-REAL-EVENT.webp`,
    alt: 'Dispositif LED installé pour un événement d’entreprise',
    bullets: [
      'Étude de la salle et de la distance de vision',
      'Structure, pilotage et régie sur demande',
      'Intervention en France, Suisse et Luxembourg',
    ],
  },
  {
    slug: 'studios-tv',
    title: 'Studios et tournage TV',
    lead: 'Un fond LED qui ne scintille pas à la caméra',
    body: [
      'Le plateau impose un taux de rafraîchissement élevé, sans quoi la caméra capte des bandes de scintillement. Nos cartes de réception Novastar dernière génération montent à des fréquences compatibles avec la captation.',
      'La seconde contrainte est la stabilité colorimétrique : nos modules proviennent du même bain de production, ce qui évite les écarts de teinte visibles à l’image.',
    ],
    image: `${UPLOADS}/2024/10/THUMBNAIL-STUDIOS-TV.webp`,
    alt: 'Mur LED utilisé comme fond de plateau de tournage',
    bullets: [
      'Rafraîchissement élevé, sans scintillement caméra',
      'Colorimétrie homogène entre modules',
      'Décors virtuels et fonds de plateau sur mesure',
    ],
  },
  {
    slug: 'salle-de-controle',
    title: 'Mur d’écrans salle de contrôle',
    lead: 'Superviser plusieurs sources sans perdre en lisibilité',
    body: [
      'La salle de contrôle affiche simultanément des cartographies, des flux vidéo et des tableaux de bord, lus à un ou deux mètres. C’est le domaine du mur d’images LCD à bord ultra-fin, pas du mur LED.',
      'Le dispositif fonctionne 24 h/24 : nous prévoyons la redondance d’alimentation et la remontée d’alertes.',
    ],
    image: `${UPLOADS}/2024/10/salle-de-controle-400x400-1.webp`,
    alt: 'Mur d’écrans installé dans une salle de contrôle',
    bullets: [
      'Dalles à bord de 0,6 à 0,8 mm',
      'Fenêtrage libre et affichage multi-sources',
      'Fonctionnement continu et redondance',
    ],
  },
  {
    slug: 'salle-de-reunion',
    title: 'Écran pour salle de réunion',
    lead: 'Remplacer le vidéoprojecteur, sans faire le noir',
    body: [
      'Un mur LED de pitch fin reste lisible avec les stores ouverts et supprime l’ombre portée du présentateur. Il démarre en quelques secondes et ne demande ni lampe ni recalibrage.',
      'Nous intégrons la visioconférence existante et laissons la salle utilisable par n’importe qui, sans notice.',
    ],
    image: `${UPLOADS}/2024/10/salle-de-conferences-400x400-1.webp`,
    alt: 'Écran LED installé dans une salle de réunion',
    bullets: [
      'Lisible en lumière du jour',
      'Aucune ombre portée, aucune lampe à remplacer',
      'Intégration à la visioconférence en place',
    ],
  },
  {
    slug: 'pharmacie',
    title: 'Écran de pharmacie',
    lead: 'La vitrine d’officine, en affichage dynamique',
    body: [
      'Croix animée, écran de vitrine, écran de comptoir : l’officine communique sur les campagnes de santé publique, les services et les gardes.',
      'Le contenu se programme à l’avance et se met à jour depuis un navigateur, sans intervention technique.',
    ],
    image: `${UPLOADS}/2024/10/ecran-pharmacie-400x400-1.webp`,
    alt: 'Écran LED installé en vitrine de pharmacie',
    bullets: [
      'Vitrine, comptoir ou croix animée',
      'Programmation des campagnes à l’avance',
      'Mise à jour depuis un navigateur',
    ],
  },
];
