/**
 * Moteur de qualification commerciale — déterministe.
 *
 * Aucun appel réseau, aucun modèle de langage : les réponses proviennent
 * exclusivement de la base de connaissances ci-dessous, alimentée par le contenu
 * public de LED Visual Innovation. Le bot ne chiffre jamais un projet lui-même :
 * il qualifie le besoin puis oriente vers le formulaire de devis.
 */

export const normalize = (input) =>
  String(input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/* --- Base de connaissances ------------------------------------------------ */

export const knowledge = [
  {
    id: 'prix',
    keywords: [
      'prix', 'tarif', 'cout', 'couts', 'combien', 'budget', 'devis', 'euro', 'euros', 'cher',
    ],
    answer:
      'Le prix dépend de quatre paramètres : la surface, le pitch (finesse des pixels), le mode de fixation et — en location — la durée. Je ne donne pas de chiffre au hasard : une fois votre besoin cadré, un technicien vous transmet une configuration chiffrée. On peut commencer la qualification ensemble si vous voulez.',
  },
  {
    id: 'garantie',
    keywords: ['garantie', 'garanti', 'garanties', 'sav', 'panne', 'casse', 'assurance'],
    answer:
      'La garantie va jusqu’à 5 ans selon la configuration, dont 3 ans pièces et main d’œuvre. Elle couvre les modules, l’alimentation et les cartes électroniques. Point important : les pièces de rechange sont commandées dès la production, dans le même bain de LED, pour que la colorimétrie reste homogène après un remplacement.',
  },
  {
    id: 'maintenance',
    keywords: ['maintenance', 'intervention', 'delai', 'delais', 'hotline', 'support', 'assistance', 'depannage'],
    answer:
      'La hotline technique est gratuite et ouverte 5 j/7. Les interventions sur site se font sous 48 h, par des techniciens salariés. Un seul interlocuteur suit le dossier, que la panne soit matérielle ou logicielle.',
  },
  {
    id: 'logiciel',
    keywords: ['logiciel', 'smartview', 'abonnement', 'software', 'contenu', 'contenus', 'diffusion', 'programmer', 'pilotage'],
    answer:
      'Le logiciel s’appelle SmartView, développé à 100 % en interne et fourni sans abonnement. Il est full web : vous pilotez les contenus depuis un navigateur, programmez les plannings et intégrez des flux dynamiques (météo, actualités, réseaux sociaux, données internes).',
  },
  {
    id: 'fabrication',
    keywords: ['france', 'francais', 'fabrication', 'fabricant', 'assemblage', 'atelier', 'usine', 'origine'],
    answer:
      'L’assemblage est réalisé en France, dans des ateliers et un entrepôt de 11 000 m² situés à moins d’une heure de Paris. Les structures et supports sont fabriqués sur place, les logiciels conçus en interne. Les composants LED proviennent de fabricants mondiaux sélectionnés, assemblés selon nos spécifications.',
  },
  {
    id: 'pitch',
    keywords: ['pitch', 'resolution', 'definition', 'pixel', 'pixels', 'qualite image', 'nettete'],
    answer:
      'Le pitch, c’est la distance entre deux LED : plus il est faible, plus l’image est fine — et plus l’écran coûte cher. En intérieur, on descend souvent à 1,2–2,5 mm. En extérieur, où l’on regarde de plus loin, 3 à 10 mm suffisent. La règle simple : distance de vision minimale en mètres ≈ valeur du pitch en mm.',
  },
  {
    id: 'exterieur',
    keywords: ['exterieur', 'dehors', 'pluie', 'intemperie', 'intemperies', 'etanche', 'etancheite', 'ip65', 'soleil'],
    answer:
      'Les écrans extérieurs sont en IP65 : étanches, conçus pour la pluie, le gel et le plein soleil, avec une haute luminosité pour rester lisibles en plein jour. Ils s’installent en façade, sur mât acier ou sur poteaux selon l’usage (enseigne ou support publicitaire).',
  },
  {
    id: 'interieur',
    keywords: ['interieur', 'mur d images', 'mur images', 'murimage', 'hall', 'bureau', 'reunion', 'conference'],
    answer:
      'En intérieur, on parle de mur d’images : une surface continue, sans bord apparent, à pitch fin. Usages courants : halls d’accueil, communication interne, salles de conférence et visioconférence, fonds de scène, plateaux TV.',
  },
  {
    id: 'location',
    keywords: ['location', 'louer', 'evenement', 'evenementiel', 'salon', 'concert', 'festival', 'fan zone', 'stand', 'remorque'],
    answer:
      'En location, nous utilisons des dalles modulaires légères : montage rapide, régie multi-sources pour le live, et écrans sur remorque autonome pour les sites sans infrastructure. Salons, concerts, fan zones et retransmissions sportives représentent l’essentiel des demandes.',
  },
  {
    id: 'transparent',
    keywords: ['transparent', 'vitrine', 'vitre', 'vitrage', 'boutique', 'magasin'],
    answer:
      'L’écran transparent se pose sur le vitrage et laisse passer 60 à 90 % de la lumière : la vitrine reste visible et lumineuse tout en diffusant du contenu. C’est la solution la plus courante pour les commerces et franchises en centre-ville.',
  },
  {
    id: 'zone',
    keywords: ['zone', 'region', 'ville', 'secteur', 'deplacez', 'deplacement', 'france entiere', 'suisse', 'luxembourg', 'paris', 'lyon', 'lille', 'bordeaux', 'toulouse', 'nantes', 'marseille', 'geneve', 'ou intervenez'],
    answer:
      'Nous intervenons partout en France — Paris, Lyon, Lille, Marseille, Nantes, Toulouse, Bordeaux et au-delà — ainsi qu’en Suisse, au Luxembourg et en Allemagne. Le siège est à Paris 8e, le centre logistique à Saint-Rémy-sur-Avre.',
  },
  {
    id: 'references',
    keywords: ['reference', 'references', 'client', 'clients', 'realisation', 'realisations', 'exemple', 'exemples', 'qui'],
    answer:
      'Plus de 1 400 installations depuis 2018 et plus de 200 entreprises clientes : Burger King, Decathlon, Leroy Merlin, Autopolis, La Coque, le Stade National du Luxembourg, Total Énergies, Airbus. La page Réalisations liste les projets avec client, ville et année.',
  },
  {
    id: 'delai-livraison',
    keywords: ['delai de livraison', 'combien de temps', 'quand', 'rapidement', 'urgence', 'urgent', 'installation delai'],
    answer:
      'Pour une location événementielle, le montage se fait généralement en quelques heures le jour J, avec une réservation à caler selon la disponibilité du parc. Pour une installation fixe, comptez une étude technique puis une pose planifiée. Indiquez-moi votre date, je la transmets au dossier.',
  },
  {
    id: 'consommation',
    keywords: ['consommation', 'electricite', 'energie', 'watt', 'ecologie', 'ecologique'],
    answer:
      'La consommation dépend de la surface, du pitch et de la luminosité réglée. Les LED modernes consomment nettement moins que les générations précédentes, et SmartView permet de baisser automatiquement la luminosité selon l’heure. Le dimensionnement électrique précis fait partie de l’étude technique.',
  },
  {
    id: 'salutation',
    keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'coucou', 'hey'],
    answer: 'Bonjour. Dites-moi ce que vous cherchez et je vous oriente.',
  },
  {
    id: 'remerciement',
    keywords: ['merci', 'nickel', 'parfait', 'super', 'ok merci'],
    answer: 'Avec plaisir. Autre chose à vérifier avant de passer au devis ?',
  },
];

export function findAnswer(input) {
  const text = normalize(input);
  if (!text) return null;

  let best = null;
  let bestScore = 0;

  const words = new Set(text.split(' '));

  knowledge.forEach((entry) => {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      const needle = normalize(keyword);
      if (!needle) return;
      if (text === needle) {
        score += 4;
      } else if (needle.includes(' ')) {
        // Expression : on cherche la séquence complète
        if (text.includes(needle)) score += 3;
      } else if (words.has(needle)) {
        // Mot isolé : correspondance stricte, pas de sous-chaîne
        score += 2;
      }
    });
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  });

  return bestScore >= 2 ? best : null;
}

/* --- Parcours de qualification -------------------------------------------- */

export const STEPS = ['mode', 'usage', 'type', 'surface', 'date', 'done'];

export const stepPrompts = {
  mode: {
    question: 'Premier point : vous cherchez à acheter un écran pour une installation durable, ou à en louer un pour un événement ?',
    options: [
      { label: 'Acheter', value: 'achat' },
      { label: 'Louer', value: 'location' },
    ],
  },
  usage: {
    question: 'L’écran sera installé en intérieur ou en extérieur ?',
    options: [
      { label: 'Extérieur', value: 'exterieur' },
      { label: 'Intérieur', value: 'interieur' },
    ],
  },
  type: {
    question: 'Quel type d’écran correspond le mieux ?',
    optionsByContext: {
      'achat-exterieur': [
        { label: 'Enseigne / façade', value: 'Écran LED extérieur' },
        { label: 'Écran publicitaire', value: 'Écran publicitaire' },
        { label: 'Je ne sais pas', value: 'Je ne sais pas encore' },
      ],
      'achat-interieur': [
        { label: 'Mur d’images', value: 'Mur d’images intérieur' },
        { label: 'Vitrine transparente', value: 'Écran LED transparent' },
        { label: 'Studio / salle de contrôle', value: 'Studio TV / salle de contrôle' },
      ],
      'location-exterieur': [
        { label: 'Écran géant', value: 'Écran géant événementiel' },
        { label: 'Sur remorque', value: 'Écran sur remorque' },
        { label: 'Je ne sais pas', value: 'Je ne sais pas encore' },
      ],
      'location-interieur': [
        { label: 'Écran géant', value: 'Écran géant événementiel' },
        { label: 'Mur pour stand', value: 'Mur d’images intérieur' },
        { label: 'Je ne sais pas', value: 'Je ne sais pas encore' },
      ],
    },
  },
  surface: {
    question: 'Quelle surface envisagez-vous, approximativement ?',
    options: [
      { label: 'Moins de 10 m²', value: '8' },
      { label: '10 à 30 m²', value: '20' },
      { label: '30 à 100 m²', value: '60' },
      { label: 'Plus de 100 m²', value: '150' },
    ],
  },
  date: {
    question: 'Dernière question : à quelle échéance ?',
    options: [
      { label: 'Sous 1 mois', value: 'Sous 1 mois' },
      { label: '1 à 3 mois', value: '1 à 3 mois' },
      { label: 'Plus de 3 mois', value: 'Plus de 3 mois' },
      { label: 'Pas encore fixée', value: '' },
    ],
  },
};

export function typeOptions(profile) {
  const key = `${profile.mode || 'achat'}-${profile.usage || 'exterieur'}`;
  return stepPrompts.type.optionsByContext[key] || stepPrompts.type.optionsByContext['achat-exterieur'];
}

export function buildSummary(profile) {
  const parts = [];
  parts.push(profile.mode === 'location' ? 'Location événementielle' : 'Achat, installation fixe');
  parts.push(profile.usage === 'interieur' ? 'usage intérieur' : 'usage extérieur');
  if (profile.type) parts.push(profile.type.toLowerCase());
  if (profile.surface) parts.push(`environ ${profile.surface} m²`);
  if (profile.date) parts.push(`échéance : ${profile.date.toLowerCase()}`);
  return `Qualification : ${parts.join(', ')}.`;
}

/**
 * Recommandation technique factuelle, dérivée du profil.
 * Aucune estimation de prix n'est produite ici — c'est le rôle du devis.
 */
export function recommendation(profile) {
  const lines = [];

  if (profile.usage === 'exterieur') {
    lines.push(
      'Pour l’extérieur, on part sur des modules IP65 haute luminosité, avec un pitch de 3 à 10 mm selon la distance de vision.',
    );
  } else {
    lines.push(
      'Pour l’intérieur, on vise un pitch fin de 1,2 à 2,5 mm, en surface continue sans bord apparent.',
    );
  }

  if (profile.mode === 'location') {
    lines.push(
      'En location, ce sont des dalles modulaires légères : montage rapide, régie multi-sources pour le direct, et remorque autonome si le site n’a pas d’infrastructure.',
    );
  } else {
    lines.push(
      'À l’achat, l’ensemble est couvert par la garantie 5 ans (dont 3 ans pièces et main d’œuvre) et piloté par SmartView, sans abonnement.',
    );
  }

  const surface = Number(profile.surface);
  if (Number.isFinite(surface) && surface >= 100) {
    lines.push(
      'À cette surface, une étude technique sur site est systématique : structure, dimensionnement électrique et accès sont à valider avant chiffrage.',
    );
  }

  return lines.join(' ');
}
