/**
 * Base de pré-diagnostic du SAV.
 *
 * Le site actuel propose une page /sav qui se résume à un formulaire et à la
 * promesse d'un rappel « dans les plus brefs délais ». Deux problèmes : le
 * client ne sait pas s'il doit s'inquiéter, et l'équipe technique traite au
 * téléphone des pannes qui n'en sont pas — un player débranché, un planning
 * arrivé à expiration, une luminosité programmée.
 *
 * Chaque symptôme porte donc quatre informations : la cause la plus fréquente,
 * ce que le client peut vérifier lui-même en deux minutes, le niveau de
 * gravité, et le délai que LVIF s'engage à tenir. Le formulaire n'arrive
 * qu'après, déjà rempli du symptôme retenu.
 *
 * Les délais reprennent les engagements affichés par LVIF : hotline gratuite
 * 5 j/7, intervention sur site sous 48 h, garantie 5 ans dont 3 ans pièces et
 * main-d'œuvre.
 */

export const levels = {
  bloquant: {
    label: 'Écran hors service',
    tone: 'alert',
    sla: 'Intervention sur site sous 48 h',
    note: 'Un technicien vous rappelle le jour même pour qualifier la panne avant déplacement.',
  },
  degrade: {
    label: 'Fonctionnement dégradé',
    tone: 'warn',
    sla: 'Diagnostic à distance sous 4 h ouvrées',
    note: 'L’écran reste exploitable. La majorité de ces cas se règlent sans déplacement.',
  },
  mineur: {
    label: 'Réglage ou configuration',
    tone: 'calm',
    sla: 'Résolu par la hotline, souvent pendant l’appel',
    note: 'Aucune pièce en cause : il s’agit d’un paramétrage ou d’une connexion.',
  },
};

export const symptoms = [
  {
    key: 'noir',
    label: 'L’écran est totalement noir',
    level: 'bloquant',
    cause:
      'Coupure de l’alimentation dédiée, disjoncteur déclenché, ou player d’affichage éteint. Une panne matérielle simultanée de tous les caissons est rare.',
    checks: [
      'Vérifiez le disjoncteur dédié à l’écran, souvent séparé du tableau général.',
      'Contrôlez que le player ou le vidéoprocesseur est sous tension et que sa diode est allumée.',
      'Coupez puis rétablissez l’alimentation, et laissez deux minutes à l’écran pour se réinitialiser.',
    ],
  },
  {
    key: 'modules',
    label: 'Une partie des modules reste éteinte',
    level: 'bloquant',
    cause:
      'Carte de réception ou boîtier d’alimentation d’un caisson. Le câblage réseau entre dalles étant en série, une dalle en défaut éteint souvent toutes celles qui la suivent.',
    checks: [
      'Repérez si la zone éteinte forme une bande continue : cela désigne le premier caisson de la série.',
      'Vérifiez que les connecteurs réseau et alimentation de ce caisson sont bien enfoncés.',
      'Notez la position du caisson — nous préparons la pièce avant de nous déplacer.',
    ],
  },
  {
    key: 'pixels',
    label: 'Des pixels ou des lignes sont morts',
    level: 'degrade',
    cause:
      'Module LED à remplacer. Les pièces de rechange ont été commandées dans le même bain de production que votre écran, ce qui garantit l’homogénéité des couleurs après échange.',
    checks: [
      'Photographiez la zone concernée sur fond blanc, puis sur fond rouge, vert et bleu.',
      'Comptez le nombre de modules touchés — un module fait généralement 32 × 32 cm.',
      'Vérifiez si le défaut se déplace quand le contenu change : dans ce cas il vient de la source, pas de la dalle.',
    ],
  },
  {
    key: 'image',
    label: 'L’image est décalée, déchirée ou dédoublée',
    level: 'degrade',
    cause:
      'Configuration du vidéoprocesseur ou ordre de câblage modifié. Neuf fois sur dix, le réglage se refait à distance sans intervention.',
    checks: [
      'Notez si le décalage est apparu après une coupure de courant ou une intervention sur le site.',
      'Vérifiez la résolution de sortie de la source vidéo connectée.',
      'Photographiez l’écran entier, cadre compris, pour que nous identifiions le découpage.',
    ],
  },
  {
    key: 'contenu',
    label: 'L’écran affiche un ancien contenu',
    level: 'mineur',
    cause:
      'Le player n’a plus accès au réseau, ou le planning de diffusion est arrivé à son terme. L’écran continue alors d’afficher la dernière séquence reçue.',
    checks: [
      'Vérifiez la connexion internet du site et le fonctionnement de la box.',
      'Ouvrez votre espace d’affichage : la date de dernière synchronisation y est indiquée.',
      'Contrôlez les dates de fin de vos campagnes programmées.',
    ],
  },
  {
    key: 'luminosite',
    label: 'La luminosité est anormale',
    level: 'mineur',
    cause:
      'Planning de luminosité ou capteur de lumière ambiante. Un écran extérieur baisse volontairement en intensité la nuit, souvent par obligation réglementaire locale.',
    checks: [
      'Notez à quelles heures le phénomène se produit.',
      'Vérifiez qu’aucun obstacle ne masque le capteur de luminosité en façade de l’écran.',
      'Consultez le planning de luminosité dans votre espace d’affichage.',
    ],
  },
  {
    key: 'logiciel',
    label: 'Je n’accède plus au logiciel d’affichage',
    level: 'mineur',
    cause:
      'Session expirée ou droits d’accès modifiés. Le logiciel étant développé en interne, nous rétablissons l’accès sans passer par un éditeur tiers.',
    checks: [
      'Essayez depuis un autre navigateur ou une navigation privée.',
      'Vérifiez que l’adresse utilisée est bien celle communiquée à la livraison.',
      'Indiquez-nous le nom du compte concerné plutôt que son mot de passe.',
    ],
  },
];

/** Engagements affichés à côté du formulaire. */
export const commitments = [
  {
    title: 'Hotline technique gratuite',
    body: 'Ouverte 5 j/7. Aucun contrat de maintenance n’est exigé pour y accéder.',
  },
  {
    title: 'Intervention sur site sous 48 h',
    body: 'Les monteurs sont salariés de LVIF, pas sous-traités : le délai ne dépend pas d’un prestataire.',
  },
  {
    title: 'Garantie 5 ans',
    body: 'Dont 3 ans pièces et main-d’œuvre. Les modules de rechange proviennent du bain de production de votre écran.',
  },
  {
    title: 'Logiciel développé en interne',
    body: 'Un seul interlocuteur, que la panne vienne du matériel ou de l’affichage.',
  },
];
