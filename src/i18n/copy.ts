import type { PageId } from '../data/site'

export type Lang = 'fr' | 'ar'

export type BenefitIcon = 'parfum' | 'nettoyant' | 'adoucissant' | 'anti-taches'
export type ServiceIcon = 'spark' | 'box' | 'message' | 'grid'

export type NavItem = { label: string; page: PageId; section?: string }
export type BenefitItem = { icon: BenefitIcon; title: string; text: string }
export type FeatureItem = { icon: ServiceIcon; title: string; text: string }
export type StepItem = { index: string; title: string; text: string }
export type FaqItem = { question: string; answer: string }
export type VolumePackage = { cartons: number; bottles: number; litres: number; label: string }
export type LegalSectionCopy = { title: string; paragraphs: string[]; list?: string[] }
export type LegalDocumentCopy = {
  title: string
  description: string
  updated: string
  sections: LegalSectionCopy[]
}
export type LegalPageId = 'mentions-legales' | 'confidentialite' | 'conditions-de-vente'

const fr = {
  meta: {
    accueil: {
      title: 'SEALSI — Le propre. Une vague de fraîcheur.',
      description:
        'Découvrez SEALSI Oceanic Scent, la lessive liquide 5 L inspirée de l’océan. Format 5 litres, 3 bouteilles par carton, tarif sur confirmation.',
    },
    produit: {
      title: 'Oceanic Scent 5 L — Lessive liquide SEALSI',
      description:
        'Oceanic Scent, lessive liquide SEALSI 5 L : parfum, nettoyant, adoucissant et anti-taches. 1 carton = 3 bouteilles = 15 litres.',
    },
    selection: {
      title: 'Votre commande — SEALSI',
      description:
        'Choisissez votre nombre de cartons SEALSI Oceanic Scent. 1 carton = 3 bouteilles de 5 L = 15 litres. Tarif et livraison sur confirmation.',
    },
    demande: {
      title: 'Votre commande — SEALSI',
      description:
        'Choisissez votre nombre de cartons et laissez vos coordonnées sur une seule page. SEALSI confirme ensuite le tarif, la disponibilité et la livraison.',
    },
    revendeurs: {
      title: 'Offre Revendeurs & Grossistes — SEALSI',
      description:
        'Commercialisez la lessive liquide 5 L Oceanic Scent dans votre magasin. Cartons de 3 bouteilles, marges attractives et livraison rapide.',
    },
    professionnels: {
      title: 'Hôtels & Professionnels — SEALSI',
      description:
        'Solution linge pour hôtels, riads, résidences et blanchisseries : format 5 L concentré 4-en-1, 100 lavages, fraîcheur marine et devis sur-mesure.',
    },
    'mentions-legales': {
      title: 'Mentions légales — SEALSI',
      description:
        'Éditeur, hébergement, propriété intellectuelle et informations légales du site SEALSI.',
    },
    confidentialite: {
      title: 'Politique de confidentialité — SEALSI',
      description:
        'Données collectées via le formulaire SEALSI, finalités, durée de conservation et droits des personnes.',
    },
    'conditions-de-vente': {
      title: 'Conditions générales de vente — SEALSI',
      description:
        'Devis, prix, livraison, paiement, rétractation et garanties des produits SEALSI.',
    },
    introuvable: {
      title: 'Page introuvable — SEALSI',
      description: 'La page demandée n’existe pas ou a été déplacée.',
    },
  },
  nav: [
    { label: 'Accueil', page: 'accueil' as PageId },
    { label: 'Revendeurs', page: 'revendeurs' as PageId },
    { label: 'Hôtels & Pros', page: 'professionnels' as PageId },
  ] as NavItem[],
  header: {
    homeAria: 'SEALSI — Accueil',
    mainNavAria: 'Navigation principale',
    languageAria: 'Langue du site',
    whatsappAria: 'Contacter SEALSI sur WhatsApp',
    cartAria: (n: number) =>
      `Voir ma commande : ${n} carton${n === 1 ? '' : 's'}`,
    cart: 'Ma commande',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mobileNavAria: 'Navigation mobile',
  },
  skipLink: 'Aller au contenu principal',
  hero: {
    eyebrow: 'SEALSI / OCEANIC SCENT',
    line1: 'Le propre.',
    line2: 'Une vague',
    line3: 'de fraîcheur.',
    lead: 'La force de l’eau, la douceur du linge. Découvrez l’univers Oceanic de SEALSI.',
    primary: 'Préparer ma commande',
    secondary: 'Découvrir Oceanic',
    resellers: 'Offre Revendeurs',
    professionals: 'Hôtels & Professionnels',
    meta: ['5 L par bouteille', '100 lavages*', 'Formule 4 en 1'],
    caption: 'OCEANIC SCENT / LA SIGNATURE SEALSI',
  },
  benefits: {
    aria: 'Les quatre fonctions de la formule',
    items: [
      { icon: 'parfum', title: 'Parfum', text: 'Une inspiration marine' },
      { icon: 'nettoyant', title: 'Nettoyant', text: 'Le soin du linge' },
      { icon: 'adoucissant', title: 'Adoucissant', text: 'Une touche de douceur' },
      { icon: 'anti-taches', title: 'Anti-taches', text: 'Au cœur de la formule' },
    ],
  },
  home: {
    signatureEyebrow: 'NOTRE SIGNATURE',
    signatureTitle1: 'Un univers marin.',
    signatureTitle2: 'Un quotidien plus doux.',
    signatureLead:
      'Une étoile lumineuse, l’eau en mouvement et un tissu blanc : les signes du propre, de la fraîcheur et du confort SEALSI.',
    signatureLink: 'Explorer notre lessive',
    proEyebrow: 'POUR LES PROFESSIONNELS',
    proTitle1: 'Vos quantités.',
    proTitle2: 'Notre attention.',
    proLead:
      'Vous êtes revendeur ou vous préparez un approvisionnement en volume ? Construisons une demande adaptée à vos besoins.',
    proButton: 'Découvrir nos services',
    proFeatures: [
      {
        icon: 'box',
        title: 'Un conditionnement clair',
        text: '1 carton = 3 bouteilles de 5 litres.',
      },
      {
        icon: 'grid',
        title: 'Des commandes en volume',
        text: 'Choisissez votre nombre de cartons.',
      },
      {
        icon: 'message',
        title: 'Une proposition adaptée',
        text: 'Tarif et modalités confirmés avec SEALSI.',
      },
    ],
    stepsEyebrow: 'COMMENT COMMANDER',
    stepsTitle: 'Simple, du choix au contact.',
    steps: [
      {
        index: '01 / CHOISIR',
        title: 'Choisissez votre quantité',
        text: 'Indiquez le nombre de cartons Oceanic Scent dont vous avez besoin.',
      },
      {
        index: '02 / PRÉCISER',
        title: 'Complétez vos coordonnées',
        text: 'Nom, téléphone et ville, sur la même page, sans créer de compte.',
      },
      {
        index: '03 / CONFIRMER',
        title: 'Validez la proposition',
        text: 'Confirmez le tarif, les disponibilités et les modalités de livraison.',
      },
    ],
  },
  product: {
    breadcrumbAria: 'Fil d’Ariane',
    breadcrumbHome: 'Accueil',
    breadcrumbCurrent: 'Notre lessive',
    galleryAlt: 'Vue arrière de la bouteille SEALSI et de son étiquette',
    gallerySwitchAria: 'Choisir la vue du produit',
    front: 'Face avant',
    label: 'Étiquette',
    eyebrow: 'LA LESSIVE LIQUIDE SEALSI',
    title: 'Oceanic Scent',
    subtitle: 'L’inspiration marine, pour votre linge.',
    tags: ['5 L', '100 lavages*', '4 en 1'],
    lead: 'Parfum, nettoyant, adoucissant et anti-taches : les quatre fonctions réunies sur l’emballage SEALSI, dans un grand format pensé pour vos besoins.',
    quantityLabel: 'Votre quantité',
    cartonsOfBottles: (n: number) => `carton(s) de ${n} bouteilles`,
    bottlesLitres: (bottles: number, litres: number) =>
      `${bottles} bouteilles / ${litres} litres au total`,
    primary: 'Préparer ma commande',
    priceNote: 'Tarif, disponibilité et livraison confirmés selon votre demande.',
    details: [
      {
        summary: 'Dosage et nombre de lavages',
        text: '*100 lavages sur la base d’une dose de 50 ml. Ajuster à la charge, au degré de salissure et à la dureté de l’eau. Se référer à l’étiquette du produit.',
      },
      {
        summary: 'Conseils et précautions',
        text: 'Respecter l’étiquette des textiles et les instructions de la machine. Conserver hors de portée des enfants et lire les précautions sur l’emballage avant utilisation.',
      },
      {
        summary: 'Conditionnement',
        text: 'Une bouteille contient 5 litres. Un carton contient 3 bouteilles, soit 15 litres. Les commandes sont préparées en nombres entiers de cartons.',
      },
    ],
  },
  request: {
    breadcrumbAria: 'Fil d’Ariane',
    breadcrumbHome: 'Accueil',
    breadcrumbCurrent: 'Ma commande',
    stepsAria: 'Étapes de la commande',
    steps: ['Quantité', 'Coordonnées', 'Confirmation SEALSI'],
    title: 'Votre commande, simplement.',
    lead: 'Choisissez vos cartons et laissez vos coordonnées. Nous confirmons ensemble le tarif et la livraison avant validation.',
    quantityTitle: 'Votre quantité',
    liquidBottle: 'Lessive liquide · Bouteille 5 L',
    cartonContents: (bottles: number, litres: number) =>
      `1 carton = ${bottles} bouteilles = ${litres} L`,
    cartonsLabel: 'Nombre de cartons',
    presetsAria: 'Quantités rapides',
    cartonsOption: (n: number) => `${n} carton${n > 1 ? 's' : ''}`,
    selectAtLeastOne: 'Choisissez au moins un carton pour continuer.',
    selected: (n: number) =>
      `${n} carton${n > 1 ? 's' : ''} sélectionné${n > 1 ? 's' : ''}`,
    bottlesLitres: (bottles: number, litres: number) =>
      `${bottles} bouteilles · ${litres} L`,
    contactTitle: 'Où vous contacter ?',
    formAlert: 'Vérifiez les champs signalés ci-dessous.',
    fields: {
      nameLabel: 'Nom et prénom *',
      namePlaceholder: 'Votre nom',
      companyLabel: 'Société / commerce',
      companyPlaceholder: 'Votre établissement',
      optional: 'facultatif',
      phoneLabel: 'Téléphone *',
      phonePlaceholder: '06 XX XX XX XX',
      cityLabel: 'Ville *',
      cityPlaceholder: 'Votre ville',
      emailLabel: 'E-mail',
      emailPlaceholder: 'Votre adresse e-mail',
      messageLabel: 'Un détail à préciser ?',
      messagePlaceholder: 'Livraison, quantité régulière, question…',
    },
    consent:
      'J’accepte que mes coordonnées soient utilisées pour traiter cette demande et me recontacter à ce sujet.',
    consentNote: (months: number) =>
      `Les informations sont conservées ${months} mois après le dernier contact et ne sont ni vendues ni utilisées pour de la prospection non sollicitée. Consultez la `,
    privacyLink: 'politique de confidentialité',
    submit: 'Demander la confirmation',
    submitting: 'Envoi en cours…',
    footnote:
      'Aucun paiement à cette étape. La commande devient définitive après votre accord sur le tarif et les modalités.',
    directTitle: 'Vous préférez échanger directement ?',
    directLead:
      'Notre équipe peut répondre à vos questions sur la quantité, la livraison ou les conditions professionnelles.',
    dialog: {
      sentEyebrow: 'DEMANDE ENREGISTRÉE',
      sentTitle: 'Merci, votre demande est partie.',
      reference: 'Référence :',
      sentNote:
        'Nous revenons vers vous avec une proposition adaptée à votre quantité et à votre ville.',
      sentSmall:
        'Conservez cette référence pour faciliter nos échanges. Aucun paiement n’a été demandé.',
      handoffEyebrow: 'DERNIÈRE ÉTAPE',
      handoffTitle: 'Transmettez votre demande.',
      handoffLead:
        'Votre récapitulatif est prêt. Choisissez WhatsApp ou l’e-mail pour l’envoyer à SEALSI. Aucune donnée n’a encore été transmise.',
      whatsapp: 'Envoyer sur WhatsApp',
      email: 'Envoyer par e-mail',
      copy: 'Copier le récapitulatif',
      copied: 'Récapitulatif copié',
      copyError:
        'La copie automatique est indisponible. Sélectionnez le texte du message ou utilisez WhatsApp / e-mail.',
      handoffSmall:
        'Le message contient vos coordonnées et votre sélection. Vérifiez-le avant l’envoi.',
      errorEyebrow: 'ENVOI INTERROMPU',
      errorTitle: 'La transmission automatique a échoué.',
      errorLead:
        'Vos informations restent dans le formulaire. Réessayez, ou envoyez le récapitulatif ci-dessous via WhatsApp ou e-mail.',
      close: 'Fermer',
    },
    errors: {
      name: 'Indiquez votre nom et prénom.',
      phone: 'Indiquez un numéro de téléphone valide (8 à 20 caractères).',
      city: 'Indiquez votre ville.',
      email: 'Indiquez une adresse e-mail valide.',
      consent: 'Veuillez accepter l’utilisation de vos coordonnées pour cette demande.',
      submit:
        'L’envoi automatique n’a pas abouti. Réessayez ou transmettez votre demande via WhatsApp ou e-mail.',
    },
    typePro: 'Professionnel / revendeur',
    typeIndividual: 'Particulier',
    mailSubject: 'Demande d’information SEALSI',
    directMessage:
      'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.',
  },
  resellers: {
    heroEyebrow: 'SEALSI POUR LES REVENDEURS & COMMERCES',
    heroTitle1: 'Développez vos ventes',
    heroTitle2: 'avec Oceanic Scent 5 L.',
    heroLead:
      'Épiceries, drogueries, supérettes et grossistes : proposez à vos clients une lessive liquide 5 L haut de gamme, conditionnée par cartons de 3 bouteilles, avec une marge commerciale attractive.',
    heroButton: 'Commander pour mon commerce',
    whatsappButton: 'Tarifs revendeurs WhatsApp',
    perCarton: 'par carton (3 × 5 L = 15 L)',
    servicesEyebrow: 'LES ATOUTS REVENDEURS',
    servicesTitle1: 'Rentabilité, rotation,',
    servicesTitle2: 'un produit qui fidélise.',
    servicesLead:
      'Une formule 4 en 1 plébiscitée par les ménages et un format économique qui génère des réachats réguliers dans votre point de vente.',
    services: [
      {
        icon: 'spark',
        title: 'Forte rotation en rayon',
        text: 'Le format 5 L 4-en-1 répond parfaitement à la recherche de volume et d’économie des familles, garantissant des ventes rapides.',
      },
      {
        icon: 'grid',
        title: 'Marges & tarifs dégressifs',
        text: 'Bénéficiez de conditions d’achat grossiste étudiées pour préserver votre marge commerciale sur chaque carton vendu.',
      },
      {
        icon: 'box',
        title: 'Cartons protecteurs 3 × 5 L',
        text: 'Conditionnement robuste de 15 L, facile à empiler en réserve, évitant les risques de casse et facilitant la manutention.',
      },
      {
        icon: 'message',
        title: 'Approvisionnement direct',
        text: 'Un contact direct avec notre équipe commerciale pour des réassorts fluides, des stocks sécurisés et des livraisons rapides.',
      },
    ],
    packagesEyebrow: 'ESTIMEZ VOTRE COMMANDE',
    packagesTitle: 'Des volumes adaptés à votre commerce',
    packagesLead:
      'Choisissez le volume de cartons correspondant à la taille de votre rayon ou magasin.',
    packages: [
      { cartons: 5, bottles: 15, litres: 75, label: 'Découverte / Test en rayon' },
      { cartons: 10, bottles: 30, litres: 150, label: 'Réassort régulier commerce' },
      { cartons: 30, bottles: 90, litres: 450, label: 'Approvisionnement supérette' },
      { cartons: 50, bottles: 150, litres: 750, label: 'Volume grossiste & distributeur' },
    ],
    selectVolume: 'Sélectionner ce volume',
    faqEyebrow: 'QUESTIONS REVENDEURS',
    faqTitle1: 'Tout savoir avant',
    faqTitle2: 'votre première commande.',
    faq: [
      {
        question: 'Quel est le minimum de commande pour les revendeurs ?',
        answer:
          'Vous pouvez démarrer dès 1 à 5 cartons pour tester la demande de vos clients avant d’engager des volumes plus importants.',
      },
      {
        question: 'Comment obtenir les tarifs revendeurs et les conditions de remise ?',
        answer:
          'Transmettez votre demande via le formulaire ou contactez-nous directement sur WhatsApp en indiquant le nom de votre commerce et votre ville.',
      },
      {
        question: 'Quels sont les délais et zones de livraison ?',
        answer:
          'Nous assurons des livraisons rapides sur les principales agglomérations. Le délai exact et les modalités d’acheminement sont confirmés selon votre localisation.',
      },
      {
        question: 'Fournissez-vous une facture avec mention légale ?',
        answer:
          'Oui, toute commande commerciale fait l’objet d’une facturation en bonne et due forme pour votre comptabilité.',
      },
    ],
    directMessage:
      'Bonjour SEALSI, je suis revendeur / commerçant et je souhaite obtenir les tarifs et conditions pour la lessive Oceanic Scent 5 L.',
  },
  pros: {
    heroEyebrow: 'SEALSI POUR LES HÔTELS & PROFESSIONNELS',
    heroTitle1: 'L’exigence du propre',
    heroTitle2: 'pour votre établissement.',
    heroLead:
      'Hôtels, riads, résidences, blanchisseries et collectivités : garantissez à vos résidents un linge d’une douceur irréprochable et un parfum marin signature, tout en maîtrisant votre coût par cycle de lavage.',
    heroButton: 'Demander un devis établissement',
    whatsappButton: 'Devis rapide sur WhatsApp',
    perCarton: 'par carton (3 × 5 L = 300 lavages)',
    servicesEyebrow: 'SOLUTIONS ÉTABLISSEMENTS',
    servicesTitle1: 'Soin du linge, rentabilité,',
    servicesTitle2: 'fraîcheur hôtelière.',
    servicesLead:
      'Une lessive professionnelle 4 en 1 conçue pour répondre aux exigences élevées de l’hôtellerie et du nettoyage de gros volumes.',
    services: [
      {
        icon: 'spark',
        title: 'Éclat du linge blanc & fibres préservées',
        text: 'Draps, serviettes, peignoirs et nappes : propreté profonde dès 30°C sans agresser les textiles, préservant la longévité de votre linge.',
      },
      {
        icon: 'grid',
        title: '100 lavages par bidon (50 ml/cycle)',
        text: 'Un coût par lavage maîtrisé grâce à une concentration optimale. La formule intègre adoucissant et détachant pour simplifier vos achats.',
      },
      {
        icon: 'box',
        title: 'Signature parfumée Oceanic',
        text: 'Une fraîcheur marine raffinée qui sublime l’atmosphère de vos chambres et valorise la qualité perçue par vos clients.',
      },
      {
        icon: 'message',
        title: 'Livraison sur site & régularité',
        text: 'Approvisionnements programmés selon votre taux d’occupation, avec suivi personnalisé et facturation professionnelle adaptée.',
      },
    ],
    packagesEyebrow: 'VOS BESOINS EN VOLUME',
    packagesTitle: 'Adapté à votre capacité d’accueil',
    packagesLead:
      'Estimez vos besoins selon le nombre de chambres ou de cycles quotidiens.',
    packages: [
      { cartons: 5, bottles: 15, litres: 75, label: 'Maison d’hôtes / Riad (10-15 chambres)' },
      { cartons: 10, bottles: 30, litres: 150, label: 'Hôtel boutique (20-40 chambres)' },
      { cartons: 25, bottles: 75, litres: 375, label: 'Hôtel grande capacité / Blanchisserie' },
      { cartons: 50, bottles: 150, litres: 750, label: 'Approvisionnement mensuel groupe' },
    ],
    selectVolume: 'Sélectionner ce volume',
    faqEyebrow: 'QUESTIONS PROFESSIONNELS',
    faqTitle1: 'Conçu pour vos',
    faqTitle2: 'exigences d’exploitation.',
    faq: [
      {
        question: 'La formule est-elle adaptée aux lave-linges professionnels ?',
        answer:
          'Oui, la formule liquide est parfaitement soluble, ne laisse aucun dépôt dans les bacs de dosage et s’adapte aux machines professionnelles et semi-professionnelles.',
      },
      {
        question: 'Peut-on réaliser un essai avant un approvisionnement régulier ?',
        answer:
          'Oui, nous pouvons vous fournir un échantillon ou un premier carton de test afin que votre équipe d’étages ou buanderie valide le rendu sur votre linge.',
      },
      {
        question: 'Proposez-vous des livraisons échelonnées ?',
        answer:
          'Absolument. Nous planifions des livraisons récurrentes adaptées à la saisonnalité et à la fréquence de lavage de votre établissement.',
      },
      {
        question: 'Comment obtenir un devis pro avec facturation TVA ?',
        answer:
          'Contactez-nous via le formulaire ou directement par WhatsApp avec votre nom d’établissement et votre besoin mensuel estimé.',
      },
    ],
    directMessage:
      'Bonjour SEALSI, je représente un établissement (hôtel / blanchisserie / société) et je souhaite un devis professionnel pour la lessive Oceanic 5 L.',
  },
  notFound: {
    eyebrow: 'ERREUR 404',
    title: 'Cette page a pris le large.',
    lead:
      'L’adresse demandée n’existe pas ou a été déplacée. Retrouvez le produit, votre sélection ou l’accueil du site.',
    home: 'Retour à l’accueil',
    product: 'Découvrir Oceanic Scent',
    usefulPages: 'Pages utiles',
    order: 'Préparer ma commande',
    viewProduct: 'Voir le produit',
    resellers: 'Offre Revendeurs',
    pros: 'Hôtels & Professionnels',
    legal: 'Mentions légales',
  },
  footer: {
    tagline1: 'Le propre. La fraîcheur.',
    tagline2: 'Et un peu de sérénité au quotidien.',
    discover: 'Découvrir',
    order: 'Commander',
    contact: 'Restons en contact',
    contactIntro: 'Votre projet commence par une conversation.',
    oceanic: 'Oceanic Scent',
    universe: 'Notre univers',
    tips: "Conseils d'utilisation",
    orderLink: 'Préparer ma commande',
    reseller: 'Offre Revendeurs',
    pros: 'Hôtels & Professionnels',
    faq: 'Questions fréquentes',
    write: 'Nous écrire',
    rights: '© 2026 SEALSI. Tous droits réservés.',
    mentions: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'Conditions de vente',
  },
  contactRibbon: {
    title: 'Une question, un besoin en quantité ?',
    lead: 'Parlons de votre prochain approvisionnement.',
    button: 'Contacter SEALSI',
    mailSubject: 'Demande d’information SEALSI',
    directMessage:
      'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.',
  },
  summary: {
    title: 'Votre récapitulatif',
    product: 'Produit',
    cartons: 'Cartons',
    bottles: 'Bouteilles',
    volume: 'Volume total',
    price: 'Tarif',
    onConfirmation: 'Sur confirmation',
    delivery: 'Livraison',
    byCity: 'Selon votre ville',
    amount: 'Montant de la commande',
    quote: 'Sur devis',
    continue: 'Continuer',
    disclaimer:
      'Votre demande permet de confirmer le prix et les modalités avant validation de la commande.',
  },
  stepper: {
    remove: 'Retirer un carton',
    add: 'Ajouter un carton',
    inputAria: 'Nombre de cartons',
    help: (min: number, max: number) =>
      `Entier compris entre ${min} et ${max} cartons.`,
  },
  legal: {
    eyebrow: 'INFORMATIONS LÉGALES',
    updatedPrefix: (date: string) => `Dernière mise à jour : ${date}`,
    noticeBefore: 'Les champs marqués ',
    noticeTag: '[À COMPLÉTER]',
    noticeAfter:
      ' doivent être renseignés avec les informations validées de l’entreprise avant la mise en ligne. Ils ne constituent pas des données définitives.',
    back: 'Retour à l’accueil',
    docs: {
      'mentions-legales': {
        title: 'Mentions légales',
        description:
          'Informations relatives à l’éditeur du site SEALSI, à son hébergement et à la propriété intellectuelle.',
        updated: '4 novembre 2026',
        sections: [
          {
            title: 'Éditeur du site',
            paragraphs: [
              'Le site sealsi.com est édité par [À COMPLÉTER — raison sociale], [À COMPLÉTER — forme juridique], au capital de [À COMPLÉTER — capital social].',
              'Siège social : [À COMPLÉTER — adresse du siège social].',
              'Immatriculation : [À COMPLÉTER — SIRET / registre du commerce]. Numéro de TVA intracommunautaire : [À COMPLÉTER — numéro de TVA intracommunautaire].',
              'Contact : contact@sealsi.com — +212 657 567 876.',
            ],
          },
          {
            title: 'Responsable de la publication',
            paragraphs: [
              'Le responsable de la publication est [À COMPLÉTER — responsable de la publication].',
            ],
          },
          {
            title: 'Hébergement',
            paragraphs: [
              'Le site est hébergé par [À COMPLÉTER — nom de l’hébergeur], dont l’adresse est [À COMPLÉTER — adresse de l’hébergeur]. Téléphone : [À COMPLÉTER — téléphone de l’hébergeur].',
            ],
          },
          {
            title: 'Propriété intellectuelle',
            paragraphs: [
              'L’ensemble des éléments du site (textes, visuels, photographies, logos, marques, graphismes et mise en page) est protégé par le droit de la propriété intellectuelle.',
              'Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de l’éditeur est interdite, sous réserve des exceptions prévues par la loi.',
            ],
          },
          {
            title: 'Liens et responsabilité',
            paragraphs: [
              'Le site peut contenir des liens vers des sites tiers. L’éditeur n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.',
              'L’éditeur s’efforce de maintenir les informations du site à jour. Les caractéristiques, disponibilités et modalités commerciales sont toutefois confirmées dans le devis remis au client.',
            ],
          },
          {
            title: 'Données personnelles',
            paragraphs: [
              'Le traitement des données transmises via le formulaire de demande est décrit dans la politique de confidentialité.',
            ],
          },
          {
            title: 'Droit applicable',
            paragraphs: [
              'Le présent site et les présentes mentions sont soumis au droit applicable au siège de l’éditeur, sous réserve des règles impératives applicables aux consommateurs. Tout litige relève des juridictions compétentes.',
            ],
          },
        ],
      },
      confidentialite: {
        title: 'Politique de confidentialité',
        description:
          'Comment SEALSI collecte, utilise et conserve les données transmises via le formulaire de demande de devis.',
        updated: '4 novembre 2026',
        sections: [
          {
            title: 'Responsable du traitement',
            paragraphs: [
              'Le responsable du traitement est [À COMPLÉTER — raison sociale], [À COMPLÉTER — forme juridique], dont le siège social est situé [À COMPLÉTER — adresse du siège social].',
              'Pour toute question relative à vos données : contact@sealsi.com.',
            ],
          },
          {
            title: 'Données collectées',
            paragraphs: [
              'Lorsque vous envoyez une demande de devis, nous collectons les informations que vous renseignez : type de demande, nom et prénom, société le cas échéant, téléphone, ville, adresse e-mail le cas échéant et contenu de votre message.',
              'La quantité de cartons sélectionnée et la référence de la demande sont associées à ces informations. Aucun paiement ni numéro de carte bancaire n’est demandé sur ce site.',
            ],
          },
          {
            title: 'Finalités et base légale',
            paragraphs: [
              'Les données sont utilisées pour répondre à votre demande, préparer une proposition commerciale, organiser la livraison et assurer le suivi de la relation.',
              'Ce traitement repose sur les mesures précontractuelles prises à votre demande et, le cas échéant, sur votre consentement. Les données nécessaires à la gestion d’une commande peuvent également être traitées pour respecter nos obligations légales.',
            ],
          },
          {
            title: 'Destinataires',
            paragraphs: [
              'Les données sont accessibles aux personnes de SEALSI chargées de traiter la demande. Elles peuvent être transmises à des prestataires techniques (hébergement, messagerie, logistique) agissant pour notre compte et uniquement dans la mesure nécessaire.',
              'Vos données ne sont ni vendues ni louées à des tiers à des fins commerciales.',
            ],
          },
          {
            title: 'Durée de conservation',
            paragraphs: [
              'Les données liées à une demande sont conservées pendant 12 mois à compter du dernier contact, sauf obligation légale de conservation plus longue ou demande d’effacement anticipée.',
              'Les documents comptables et commerciaux sont conservés pour la durée légale applicable.',
            ],
          },
          {
            title: 'Vos droits',
            paragraphs: [
              'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et, lorsque la loi le prévoit, de portabilité de vos données. Vous pouvez également retirer votre consentement à tout moment.',
              'Pour exercer ces droits, écrivez à contact@sealsi.com en précisant votre demande. Une réponse vous sera apportée dans les délais prévus par la réglementation.',
              'Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à l’autorité de contrôle compétente. En France, il s’agit de la Commission nationale de l’informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou cnil.fr.',
            ],
          },
          {
            title: 'Cookies et stockage local',
            paragraphs: [
              'Ce site n’utilise pas de cookie publicitaire ou de mesure d’audience. Aucun traceur tiers n’est déposé sans votre accord.',
              'Votre nombre de cartons est enregistré dans le stockage local de votre navigateur (clé « sealsi-cartons ») uniquement pour conserver votre sélection. Vous pouvez le supprimer à tout moment en effaçant les données du site dans votre navigateur.',
            ],
          },
          {
            title: 'Sécurité',
            paragraphs: [
              'Des mesures techniques et organisationnelles raisonnables sont mises en œuvre pour protéger les données contre la perte, l’accès non autorisé et la modification. Aucun système ne pouvant garantir une sécurité absolue, nous vous invitons à ne pas transmettre d’informations sensibles via le formulaire.',
            ],
          },
          {
            title: 'Modifications',
            paragraphs: [
              'Cette politique peut être mise à jour pour tenir compte de l’évolution du site ou de la réglementation. La date de dernière mise à jour figure en haut de cette page.',
            ],
          },
        ],
      },
      'conditions-de-vente': {
        title: 'Conditions générales de vente',
        description:
          'Cadre commercial des demandes de devis et des commandes SEALSI : prix, livraison, paiement et garanties.',
        updated: '4 novembre 2026',
        sections: [
          {
            title: 'Objet et champ d’application',
            paragraphs: [
              'Les présentes conditions encadrent les demandes de devis et les ventes de produits SEALSI réalisées auprès de professionnels et, le cas échéant, de particuliers.',
              'Toute demande implique l’acceptation des présentes conditions. Les conditions particulières figurant dans le devis accepté prévalent sur les présentes conditions générales.',
            ],
          },
          {
            title: 'Devis et formation de la commande',
            paragraphs: [
              'La sélection effectuée sur le site ne constitue pas une commande ferme. Elle permet de préparer une demande de devis.',
              'Une proposition précisant le tarif, les disponibilités, les modalités de livraison et, le cas échéant, les conditions de paiement est adressée au demandeur. La vente est formée lorsque le devis est accepté et confirmé par SEALSI.',
            ],
          },
          {
            title: 'Prix',
            paragraphs: [
              'Aucun prix public n’est affiché sur le site. Les prix applicables sont ceux du devis accepté, dans la devise qui y est indiquée.',
              'Sauf mention contraire, les prix sont indiqués hors taxes. Les taxes, droits et frais de livraison applicables sont précisés dans le devis.',
            ],
          },
          {
            title: 'Livraison',
            paragraphs: [
              'Les zones desservies, les délais et les frais de livraison sont confirmés dans le devis. Les délais sont donnés à titre indicatif et peuvent dépendre des disponibilités et du transporteur.',
              'Le client doit vérifier l’état du colis à la réception et signaler sans délai toute anomalie au transporteur et à SEALSI.',
            ],
          },
          {
            title: 'Paiement',
            paragraphs: [
              'Aucun paiement en ligne n’est effectué sur ce site. Les modalités de paiement sont celles indiquées dans le devis accepté.',
              'En cas de retard de paiement, les pénalités et indemnités prévues par la loi et par le devis peuvent s’appliquer.',
            ],
          },
          {
            title: 'Rétractation',
            paragraphs: [
              'Lorsque le client est un consommateur, il bénéficie du droit de rétractation prévu par les articles L. 221-18 et suivants du code de la consommation, dans les conditions et délais légaux.',
              'Les modalités pratiques de retour et les exceptions applicables, notamment lorsque le produit a été descellé ou utilisé, sont rappelées dans le devis. Ce droit ne s’applique pas aux commandes conclues dans le cadre d’une activité professionnelle.',
            ],
          },
          {
            title: 'Garanties',
            paragraphs: [
              'Les produits bénéficient des garanties légales de conformité et des vices cachés dans les conditions prévues par la loi.',
              'Les conseils d’utilisation, de dosage et de conservation figurent sur l’emballage. Le client est invité à les respecter.',
            ],
          },
          {
            title: 'Réclamations et litiges',
            paragraphs: [
              'Toute réclamation peut être adressée à contact@sealsi.com ou au +212 657 567 876, en précisant la référence de la demande ou du devis.',
              'Le client consommateur peut recourir gratuitement à un médiateur de la consommation : [À COMPLÉTER — médiateur de la consommation].',
              'À défaut de résolution amiable, le litige sera soumis aux juridictions compétentes selon les règles légales applicables.',
            ],
          },
          {
            title: 'Droit applicable',
            paragraphs: [
              'Les présentes conditions sont soumises au droit applicable au siège de l’éditeur. Les dispositions impératives protégeant les consommateurs demeurent applicables lorsque le client est un consommateur.',
            ],
          },
        ],
      },
    },
  },
}

export type Copy = typeof fr

const ar: Copy = {
  meta: {
    accueil: {
      title: 'SEALSI — النقاء. موجة من الانتعاش.',
      description:
        'اكتشف SEALSI Oceanic Scent، سائل الغسيل 5 لترات المستوحى من المحيط. حجم 5 لترات، 3 زجاجات لكل كرتونة، والسعر عند التأكيد.',
    },
    produit: {
      title: 'Oceanic Scent 5 لترات — سائل الغسيل SEALSI',
      description:
        'Oceanic Scent، سائل الغسيل SEALSI 5 لترات: عطر، منظّف، منعّم وضد البقع. كرتونة واحدة = 3 زجاجات = 15 لترًا.',
    },
    selection: {
      title: 'طلبك — SEALSI',
      description:
        'اختر عدد كراتين SEALSI Oceanic Scent. كرتونة واحدة = 3 زجاجات سعة 5 لترات = 15 لترًا. السعر والتوصيل عند التأكيد.',
    },
    demande: {
      title: 'طلبك — SEALSI',
      description:
        'اختر عدد الكراتين واترك بياناتك في صفحة واحدة. تؤكد SEALSI بعد ذلك السعر والتوفر والتوصيل.',
    },
    revendeurs: {
      title: 'عرض الموزعين ونقاط البيع — SEALSI',
      description:
        'بيع غسول أوشيانيك 5 لتر في محلاتكم: تعبئة كرتونية من 3 زجاجات، هوامش ربح مجزية وتوصيل سريع وموثوق.',
    },
    professionnels: {
      title: 'الفنادق والمحترفين — SEALSI',
      description:
        'حلول الغسيل للفنادق، الرياضات، دور الضيافة والمغاسل: غسول 5 لتر 4 في 1، 100 غسلة وانتعاش بحري مع عروض أسعار مخصصة.',
    },
    'mentions-legales': {
      title: 'المعلومات القانونية — SEALSI',
      description: 'الناشر والاستضافة والملكية الفكرية والمعلومات القانونية لموقع SEALSI.',
    },
    confidentialite: {
      title: 'سياسة الخصوصية — SEALSI',
      description:
        'البيانات المجمّعة عبر نموذج SEALSI، والأغراض، ومدة الحفظ، وحقوق الأشخاص.',
    },
    'conditions-de-vente': {
      title: 'الشروط العامة للبيع — SEALSI',
      description: 'العروض والأسعار والتوصيل والدفع وحق التراجع والضمانات لمنتجات SEALSI.',
    },
    introuvable: {
      title: 'الصفحة غير موجودة — SEALSI',
      description: 'الصفحة المطلوبة غير موجودة أو تم نقلها.',
    },
  },
  nav: [
    { label: 'الرئيسية', page: 'accueil' as PageId },
    { label: 'الموزعون', page: 'revendeurs' as PageId },
    { label: 'الفنادق والمحترفون', page: 'professionnels' as PageId },
  ] as NavItem[],
  header: {
    homeAria: 'SEALSI — الرئيسية',
    mainNavAria: 'التنقل الرئيسي',
    languageAria: 'لغة الموقع',
    whatsappAria: 'تواصل مع SEALSI عبر واتساب',
    cartAria: (n: number) => `عرض طلبي: ${n} كرتونة`,
    cart: 'طلبي',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    mobileNavAria: 'قائمة التنقل للجوال',
  },
  skipLink: 'انتقل إلى المحتوى الرئيسي',
  hero: {
    eyebrow: 'SEALSI / OCEANIC SCENT',
    line1: 'النقاء.',
    line2: 'موجة من',
    line3: 'الانتعاش.',
    lead: 'قوة الماء، ونعومة الغسيل. اكتشف عالم Oceanic من SEALSI.',
    primary: 'حضّر طلبي',
    secondary: 'اكتشف Oceanic',
    resellers: 'عرض الموزعين',
    professionals: 'الفنادق والمحترفين',
    meta: ['5 لترات للزجاجة', '100 غسلة*', 'تركيبة 4 في 1'],
    caption: 'OCEANIC SCENT / توقيع SEALSI',
  },
  benefits: {
    aria: 'الوظائف الأربع للتركيبة',
    items: [
      { icon: 'parfum', title: 'عطر', text: 'إلهام بحري' },
      { icon: 'nettoyant', title: 'منظّف', text: 'عناية بالغسيل' },
      { icon: 'adoucissant', title: 'منعّم', text: 'لمسة نعومة' },
      { icon: 'anti-taches', title: 'ضد البقع', text: 'في قلب التركيبة' },
    ],
  },
  home: {
    signatureEyebrow: 'توقيعنا',
    signatureTitle1: 'عالم بحري.',
    signatureTitle2: 'ويوم أكثر نعومة.',
    signatureLead:
      'نجمة مضيئة، وماء متحرك، وقماش أبيض: علامات النقاء والانتعاش والراحة من SEALSI.',
    signatureLink: 'اكتشف غسولنا',
    proEyebrow: 'للمحترفين',
    proTitle1: 'كمياتك.',
    proTitle2: 'وعنايتنا.',
    proLead:
      'هل أنت موزّع أو تحضّر تموينًا بكميات كبيرة؟ لنضع معًا طلبًا يناسب احتياجاتك.',
    proButton: 'اكتشف خدماتنا',
    proFeatures: [
      {
        icon: 'box',
        title: 'تغليف واضح',
        text: 'كرتونة واحدة = 3 زجاجات سعة 5 لترات.',
      },
      {
        icon: 'grid',
        title: 'طلبات بكميات كبيرة',
        text: 'اختر عدد الكراتين.',
      },
      {
        icon: 'message',
        title: 'عرض مناسب',
        text: 'يُؤكَّد السعر والشروط مع SEALSI.',
      },
    ],
    stepsEyebrow: 'كيف تطلب',
    stepsTitle: 'بسيط، من الاختيار إلى التواصل.',
    steps: [
      {
        index: '01 / اختيار',
        title: 'اختر الكمية',
        text: 'حدّد عدد كراتين Oceanic Scent التي تحتاجها.',
      },
      {
        index: '02 / توضيح',
        title: 'أكمل بياناتك',
        text: 'الاسم والهاتف والمدينة، في صفحة واحدة، دون إنشاء حساب.',
      },
      {
        index: '03 / تأكيد',
        title: 'أكّد العرض',
        text: 'أكّد السعر والتوفر وشروط التوصيل.',
      },
    ],
  },
  product: {
    breadcrumbAria: 'مسار التنقل',
    breadcrumbHome: 'الرئيسية',
    breadcrumbCurrent: 'غسولنا',
    galleryAlt: 'الوجه الخلفي لزجاجة SEALSI وملصقها',
    gallerySwitchAria: 'اختر عرض المنتج',
    front: 'الوجه الأمامي',
    label: 'الملصق',
    eyebrow: 'سائل الغسيل SEALSI',
    title: 'Oceanic Scent',
    subtitle: 'إلهام بحري لغسيلك.',
    tags: ['5 لترات', '100 غسلة*', '4 في 1'],
    lead: 'عطر، منظّف، منعّم وضد البقع: أربع وظائف مجتمعة على عبوة SEALSI، بحجم كبير مصمم لاحتياجاتك.',
    quantityLabel: 'كميتك',
    cartonsOfBottles: (n: number) => `كرتونة من ${n} زجاجات`,
    bottlesLitres: (bottles: number, litres: number) =>
      `${bottles} زجاجة / ${litres} لترًا إجمالًا`,
    primary: 'حضّر طلبي',
    priceNote: 'يُؤكَّد السعر والتوفر والتوصيل حسب طلبك.',
    details: [
      {
        summary: 'الجرعة وعدد الغسلات',
        text: '*100 غسلة على أساس جرعة 50 مل. عدّل حسب الحمولة ودرجة الاتساخ وعسر الماء. راجع ملصق المنتج.',
      },
      {
        summary: 'نصائح واحتياطات',
        text: 'احترم ملصق الأقمشة وتعليمات الغسالة. احفظه بعيدًا عن متناول الأطفال واقرأ الاحتياطات على العبوة قبل الاستخدام.',
      },
      {
        summary: 'التغليف',
        text: 'تحتوي الزجاجة على 5 لترات. تحتوي الكرتونة على 3 زجاجات، أي 15 لترًا. تُحضَّر الطلبات بأعداد كاملة من الكراتين.',
      },
    ],
  },
  request: {
    breadcrumbAria: 'مسار التنقل',
    breadcrumbHome: 'الرئيسية',
    breadcrumbCurrent: 'طلبي',
    stepsAria: 'خطوات الطلب',
    steps: ['الكمية', 'بيانات التواصل', 'تأكيد SEALSI'],
    title: 'طلبك، ببساطة.',
    lead: 'اختر كراتينك واترك بياناتك. نؤكد معًا السعر والتوصيل قبل الاعتماد.',
    quantityTitle: 'كميتك',
    liquidBottle: 'سائل غسيل · زجاجة 5 لترات',
    cartonContents: (bottles: number, litres: number) =>
      `1 كرتونة = ${bottles} زجاجات = ${litres} لترًا`,
    cartonsLabel: 'عدد الكراتين',
    presetsAria: 'كميات سريعة',
    cartonsOption: (n: number) => `${n} كرتونة`,
    selectAtLeastOne: 'اختر كرتونة واحدة على الأقل للمتابعة.',
    selected: (n: number) => `تم اختيار ${n} كرتونة`,
    bottlesLitres: (bottles: number, litres: number) =>
      `${bottles} زجاجة · ${litres} لترًا`,
    contactTitle: 'أين نتواصل معك؟',
    formAlert: 'تحقق من الحقول المشار إليها أدناه.',
    fields: {
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'اسمك',
      companyLabel: 'الشركة / المتجر',
      companyPlaceholder: 'مؤسستك',
      optional: 'اختياري',
      phoneLabel: 'الهاتف *',
      phonePlaceholder: '06 XX XX XX XX',
      cityLabel: 'المدينة *',
      cityPlaceholder: 'مدينتك',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'بريدك الإلكتروني',
      messageLabel: 'هل هناك تفصيل تودّ توضيحه؟',
      messagePlaceholder: 'التوصيل، كمية منتظمة، سؤال…',
    },
    consent:
      'أوافق على استخدام بياناتي لمعالجة هذا الطلب والتواصل معي بشأنه.',
    consentNote: (months: number) =>
      `تُحفظ المعلومات لمدة ${months} شهرًا بعد آخر تواصل، ولا تُباع ولا تُستخدم لمراسلات غير مرغوب فيها. اطّلع على `,
    privacyLink: 'سياسة الخصوصية',
    submit: 'اطلب التأكيد',
    submitting: 'جارٍ الإرسال…',
    footnote:
      'لا يوجد دفع في هذه المرحلة. يصبح الطلب نهائيًا بعد موافقتك على السعر والشروط.',
    directTitle: 'تفضّل التواصل مباشرة؟',
    directLead:
      'يمكن لفريقنا الإجابة عن أسئلتك حول الكمية أو التوصيل أو الشروط المهنية.',
    dialog: {
      sentEyebrow: 'تم تسجيل الطلب',
      sentTitle: 'شكرًا، تم إرسال طلبك.',
      reference: 'المرجع:',
      sentNote: 'سنعود إليك بعرض يناسب الكمية والمدينة.',
      sentSmall: 'احتفظ بهذا المرجع لتسهيل تواصلنا. لم يُطلب أي دفع.',
      handoffEyebrow: 'الخطوة الأخيرة',
      handoffTitle: 'أرسل طلبك.',
      handoffLead:
        'ملخصك جاهز. اختر واتساب أو البريد الإلكتروني لإرساله إلى SEALSI. لم تُرسَل أي بيانات بعد.',
      whatsapp: 'أرسل عبر واتساب',
      email: 'أرسل بالبريد الإلكتروني',
      copy: 'انسخ الملخص',
      copied: 'تم نسخ الملخص',
      copyError:
        'النسخ التلقائي غير متاح. حدّد نص الرسالة أو استخدم واتساب / البريد الإلكتروني.',
      handoffSmall: 'تحتوي الرسالة على بياناتك واختيارك. راجعها قبل الإرسال.',
      errorEyebrow: 'توقف الإرسال',
      errorTitle: 'فشل الإرسال التلقائي.',
      errorLead:
        'تبقى معلوماتك في النموذج. أعد المحاولة، أو أرسل الملخص أدناه عبر واتساب أو البريد الإلكتروني.',
      close: 'إغلاق',
    },
    errors: {
      name: 'أدخل اسمك الكامل.',
      phone: 'أدخل رقم هاتف صالحًا (من 8 إلى 20 حرفًا).',
      city: 'أدخل مدينتك.',
      email: 'أدخل بريدًا إلكترونيًا صالحًا.',
      consent: 'يرجى الموافقة على استخدام بياناتك لهذا الطلب.',
      submit:
        'لم يتم الإرسال التلقائي. أعد المحاولة أو أرسل طلبك عبر واتساب أو البريد الإلكتروني.',
    },
    typePro: 'محترف / موزّع',
    typeIndividual: 'فرد',
    mailSubject: 'طلب معلومات SEALSI',
    directMessage: 'مرحبًا SEALSI، أريد معلومات عن سائل الغسيل Oceanic Scent 5 لتر.',
  },
  resellers: {
    heroEyebrow: 'SEALSI للموزعين ونقاط البيع',
    heroTitle1: 'طوّروا مبيعاتكم',
    heroTitle2: 'مع غسول أوشيانيك 5 لتر.',
    heroLead:
      'محلات البقالة، مستودعات المنظفات، الأسواق الممتازة والموزعون: وفروا لزبائنكم غسولاً سائلاً ممتازاً سعة 5 لتر، معبأ في كراتين من 3 زجاجات، بهامش ربح تجاري مجزٍ.',
    heroButton: 'طلب كراتين لمحلي التجاري',
    whatsappButton: 'أسعار الموزعين عبر واتساب',
    perCarton: 'لكل كرتونة (3 × 5 لتر = 15 لتر)',
    servicesEyebrow: 'مزايا الموزعين',
    servicesTitle1: 'مردودية ممتازة، مبيعات سريعة،',
    servicesTitle2: 'ومنتج يكسب وفاء الزبائن.',
    servicesLead:
      'تركيبة 4 في 1 يفضلها المستهلكون وحجم اقتصادي يضمن مشتريات متكررة في نقطة بيعكم.',
    services: [
      {
        icon: 'spark',
        title: 'إقبال سريع في الرفوف',
        text: 'حجم 5 لتر مع تركيبة 4 في 1 يلبي متطلبات الأسر من حيث التوفير والفعالية، مما يضمن مبيعات سريعة.',
      },
      {
        icon: 'grid',
        title: 'هوامش ربح وأسعار تنازلية',
        text: 'استفيدوا من شروط تسعير مخصصة للجملة للحفاظ على هامش ربحكم في كل كرتونة تباع.',
      },
      {
        icon: 'box',
        title: 'كراتين متينة 3 × 5 لتر',
        text: 'تعبئة متينة سعة 15 لتر تسهل التخزين والترتيب في المستودع وتقلل من مخاطر التلف.',
      },
      {
        icon: 'message',
        title: 'تزويد مباشر ومستمر',
        text: 'تواصل مباشر مع فريقنا التجاري لتأمين التموين المنتظم وتفادي أي نفاد في المخزون.',
      },
    ],
    packagesEyebrow: 'قدّر طلبيتك',
    packagesTitle: 'كميات تناسب حجم نشاطكم',
    packagesLead: 'اختر كمية الكراتين المناسبة لحجم متجرك أو مستودعك.',
    packages: [
      { cartons: 5, bottles: 15, litres: 75, label: 'تجربة / اختبار الرف' },
      { cartons: 10, bottles: 30, litres: 150, label: 'تموين منتظم للمحل' },
      { cartons: 30, bottles: 90, litres: 450, label: 'تموين سوبرماركت' },
      { cartons: 50, bottles: 150, litres: 750, label: 'كميات الجملة والتوزيع' },
    ],
    selectVolume: 'اختر هذه الكمية',
    faqEyebrow: 'أسئلة الموزعين',
    faqTitle1: 'كل ما تحتاج معرفته',
    faqTitle2: 'قبل أول طلبية.',
    faq: [
      {
        question: 'ما هو الحد الأدنى للطلب للموزعين؟',
        answer: 'يمكنك البدء من 1 إلى 5 كراتين لاختبار إقبال الزبائن قبل الانتقال إلى كميات أكبر.',
      },
      {
        question: 'كيف أحصل على لائحة أسعار الموزعين وشروط التخفيض؟',
        answer: 'أرسل طلبك عبر النموذج أو تواصل معنا مباشرة عبر واتساب مع ذكر اسم محلك ومدينتك.',
      },
      {
        question: 'ما هي مواعيد ومناطق التوصيل؟',
        answer: 'نوفر التوصيل السريع إلى المدن الرئيسية، ويتم تأكيد الموعد المحدد بناءً على موقعكم.',
      },
      {
        question: 'هل تقدمون فواتير قانونية؟',
        answer: 'نعم، نوفر فواتير رسمية مطابقة لكافة المعاملات التجارية لمحاسبتكم.',
      },
    ],
    directMessage:
      'مرحباً SEALSI، أنا تاجر / موزع وأرغب في الحصول على أسعار وشروط غسول أوشيانيك 5 لتر.',
  },
  pros: {
    heroEyebrow: 'SEALSI للفنادق والمحترفين',
    heroTitle1: 'نظافة استثنائية',
    heroTitle2: 'لمؤسستكم الفندقية.',
    heroLead:
      'فنادق، رياضات، دور ضيافة، مصبغات ومؤسسات: اضمنوا لزبائنكم غسيلاً فائق النعومة بعطر بحري مميز، مع التحكم الكامل في تكلفة كل دورة غسيل.',
    heroButton: 'طلب عرض أسعار للمؤسسات',
    whatsappButton: 'عرض أسعار سريع عبر واتساب',
    perCarton: 'لكل كرتونة (3 × 5 لتر = 300 غسلة)',
    servicesEyebrow: 'حلول المؤسسات',
    servicesTitle1: 'العناية بالأقمشة، المردودية،',
    servicesTitle2: 'وانتعاش فندقي رفيع.',
    servicesLead:
      'غسول احترافي 4 في 1 مصمم ليلبي المعايير العالية للفندقة والمغاسل ذات الحجم الكبير.',
    services: [
      {
        icon: 'spark',
        title: 'نصاعة البياض وحماية الألياف',
        text: 'ملاءات، مناشف، أرواب وأغطية: نظافة عميقة من 30 درجة مئوية دون إتلاف الأقمشة، للحفاظ على متانة بياضاتكم.',
      },
      {
        icon: 'grid',
        title: '100 غسلة للزجاجة (50 مل/دورة)',
        text: 'تحكم مثالي في تكلفة كل غسلة بفضل التركيز الفعال. تركيبة متكاملة تشمل المنعم ومزيل البقع لتسهيل مشترياتكم.',
      },
      {
        icon: 'box',
        title: 'عطر أوشيانيك المميز',
        text: 'انتعاش بحري راقٍ يضفي لمسة نقاء ونظافة داخل الغرف، مما يعزز رضا ضيوفكم.',
      },
      {
        icon: 'message',
        title: 'توصيل مباشر وتزويد دوري',
        text: 'تزويد مبرمج حسب نسبة إشغال مؤسستكم مع متابعة مخصصة وفواتير مهنية متكاملة.',
      },
    ],
    packagesEyebrow: 'احتياجاتكم حسب الحجم',
    packagesTitle: 'مخصص لقدرة استيعاب مؤسستكم',
    packagesLead: 'قدّروا احتياجكم حسب عدد الغرف أو دورات الغسيل اليومية.',
    packages: [
      { cartons: 5, bottles: 15, litres: 75, label: 'دار ضيافة / رياض (10-15 غرفة)' },
      { cartons: 10, bottles: 30, litres: 150, label: 'فندق بوتيك (20-40 غرفة)' },
      { cartons: 25, bottles: 75, litres: 375, label: 'فندق كبير / مصبغة احترافية' },
      { cartons: 50, bottles: 150, litres: 750, label: 'تموين شهري لمجموعة فندقية' },
    ],
    selectVolume: 'اختر هذه الكمية',
    faqEyebrow: 'أسئلة المحترفين',
    faqTitle1: 'مصمم لمتطلبات',
    faqTitle2: 'نشاطكم الفندقي.',
    faq: [
      {
        question: 'هل التركيبة متوافقة مع الغسالات الاحترافية؟',
        answer: 'نعم، التركيبة السائلة تذوب فورياً دون ترك أي رواسب وتلائم الغسالات المنزلية وشبه الاحترافية والصناعية.',
      },
      {
        question: 'هل يمكن طلب عينة تجريبية للمغسلة؟',
        answer: 'بالتأكيد، يمكننا توفير كرتونة تجريبية لتقييم النتيجة وجودة النظافة على بياضاتكم.',
      },
      {
        question: 'هل توفرون جدول تموين دوري؟',
        answer: 'نعم، نقوم بجدولة شحنات منتظمة تتوافق مع موسمية ونشاط مؤسستكم.',
      },
      {
        question: 'كيف أحصل على عرض أسعار مهني مع فاتورة ضريبية؟',
        answer: 'تواصلوا معنا عبر النموذج أو مباشرة عبر واتساب مع ذكر اسم المؤسسة وحجم الاستهلاك التقديري.',
      },
    ],
    directMessage:
      'مرحباً SEALSI، أمثل مؤسسة (فندق / دار ضيافة / مصبغة) وأرغب في الحصول على عرض أسعار احترافي لغسول أوشيانيك 5 لتر.',
  },
  notFound: {
    eyebrow: 'خطأ 404',
    title: 'هذه الصفحة أبحرت بعيدًا.',
    lead:
      'العنوان المطلوب غير موجود أو تم نقله. عُد إلى المنتج أو اختيارك أو الصفحة الرئيسية.',
    home: 'العودة إلى الرئيسية',
    product: 'اكتشف Oceanic Scent',
    usefulPages: 'صفحات مفيدة',
    order: 'حضّر طلبي',
    viewProduct: 'عرض المنتج',
    resellers: 'عرض الموزعين',
    pros: 'الفنادق والمحترفين',
    legal: 'المعلومات القانونية',
  },
  footer: {
    tagline1: 'النقاء. الانتعاش.',
    tagline2: 'وقليل من السكينة في كل يوم.',
    discover: 'اكتشف',
    order: 'اطلب',
    contact: 'لنبقَ على تواصل',
    contactIntro: 'مشروعك يبدأ بمحادثة.',
    oceanic: 'Oceanic Scent',
    universe: 'عالمنا',
    tips: 'نصائح الاستخدام',
    orderLink: 'حضّر طلبي',
    reseller: 'عرض الموزعين',
    pros: 'الفنادق والمحترفين',
    faq: 'الأسئلة الشائعة',
    write: 'راسلنا',
    rights: '© 2026 SEALSI. جميع الحقوق محفوظة.',
    mentions: 'المعلومات القانونية',
    privacy: 'الخصوصية',
    terms: 'شروط البيع',
  },
  contactRibbon: {
    title: 'لديك سؤال أو حاجة بكميات كبيرة؟',
    lead: 'لنتحدث عن تموينك القادم.',
    button: 'تواصل مع SEALSI',
    mailSubject: 'طلب معلومات SEALSI',
    directMessage: 'مرحبًا SEALSI، أريد معلومات عن سائل الغسيل Oceanic Scent 5 لتر.',
  },
  summary: {
    title: 'ملخصك',
    product: 'المنتج',
    cartons: 'الكراتين',
    bottles: 'الزجاجات',
    volume: 'الحجم الإجمالي',
    price: 'السعر',
    onConfirmation: 'عند التأكيد',
    delivery: 'التوصيل',
    byCity: 'حسب مدينتك',
    amount: 'قيمة الطلب',
    quote: 'حسب العرض',
    continue: 'متابعة',
    disclaimer:
      'يتيح طلبك تأكيد السعر والشروط قبل اعتماد الطلب.',
  },
  stepper: {
    remove: 'إزالة كرتونة',
    add: 'إضافة كرتونة',
    inputAria: 'عدد الكراتين',
    help: (min: number, max: number) =>
      `عدد صحيح بين ${min} و${max} كرتونة.`,
  },
  legal: {
    eyebrow: 'معلومات قانونية',
    updatedPrefix: (date: string) => `آخر تحديث: ${date}`,
    noticeBefore: 'يجب تعبئة الحقول المعلّمة بـ ',
    noticeTag: '[À COMPLÉTER]',
    noticeAfter:
      ' بمعلومات الشركة المعتمدة قبل النشر. وهي ليست بيانات نهائية.',
    back: 'العودة إلى الرئيسية',
    docs: {
      'mentions-legales': {
        title: 'المعلومات القانونية',
        description:
          'معلومات تتعلق بناشر موقع SEALSI واستضافته والملكية الفكرية.',
        updated: '4 نوفمبر 2026',
        sections: [
          {
            title: 'ناشر الموقع',
            paragraphs: [
              'موقع sealsi.com ينشره [À COMPLÉTER — raison sociale]، [À COMPLÉTER — forme juridique]، برأس مال قدره [À COMPLÉTER — capital social].',
              'المقر الاجتماعي: [À COMPLÉTER — adresse du siège social].',
              'التسجيل: [À COMPLÉTER — SIRET / registre du commerce]. رقم ضريبة القيمة المضافة: [À COMPLÉTER — numéro de TVA intracommunautaire].',
              'التواصل: contact@sealsi.com — +212 657 567 876.',
            ],
          },
          {
            title: 'مسؤول النشر',
            paragraphs: ['مسؤول النشر هو [À COMPLÉTER — responsable de la publication].'],
          },
          {
            title: 'الاستضافة',
            paragraphs: [
              'يُستضاف الموقع لدى [À COMPLÉTER — nom de l’hébergeur]، وعنوانه [À COMPLÉTER — adresse de l’hébergeur]. الهاتف: [À COMPLÉTER — téléphone de l’hébergeur].',
            ],
          },
          {
            title: 'الملكية الفكرية',
            paragraphs: [
              'جميع عناصر الموقع (النصوص والصور والرسوم والشعارات والعلامات والتنسيق) محمية بموجب قانون الملكية الفكرية.',
              'يُحظر أي نسخ أو تمثيل أو تعديل أو استغلال كلي أو جزئي دون إذن كتابي مسبق من الناشر، مع مراعاة الاستثناءات التي يقررها القانون.',
            ],
          },
          {
            title: 'الروابط والمسؤولية',
            paragraphs: [
              'قد يحتوي الموقع على روابط لمواقع خارجية. لا يمارس الناشر أي رقابة على محتواها ويرفض أي مسؤولية عنها.',
              'يسعى الناشر إلى إبقاء معلومات الموقع محدّثة. غير أن الخصائص والتوفر والشروط التجارية تُؤكَّد في العرض المقدّم إلى العميل.',
            ],
          },
          {
            title: 'البيانات الشخصية',
            paragraphs: [
              'تُوصف معالجة البيانات المرسلة عبر نموذج الطلب في سياسة الخصوصية.',
            ],
          },
          {
            title: 'القانون المطبق',
            paragraphs: [
              'يخضع هذا الموقع وهذه المعلومات للقانون المطبق في مقر الناشر، مع مراعاة القواعد الآمرة المتعلقة بالمستهلكين. ويختص القضاء المختص بأي نزاع.',
            ],
          },
        ],
      },
      confidentialite: {
        title: 'سياسة الخصوصية',
        description:
          'كيف تجمع SEALSI البيانات المرسلة عبر نموذج طلب العرض وتستخدمها وتحفظها.',
        updated: '4 نوفمبر 2026',
        sections: [
          {
            title: 'مسؤول المعالجة',
            paragraphs: [
              'مسؤول المعالجة هو [À COMPLÉTER — raison sociale]، [À COMPLÉTER — forme juridique]، ومقره الاجتماعي [À COMPLÉTER — adresse du siège social].',
              'لأي سؤال يتعلق ببياناتك: contact@sealsi.com.',
            ],
          },
          {
            title: 'البيانات المجمّعة',
            paragraphs: [
              'عند إرسال طلب عرض، نجمع المعلومات التي تدخلها: نوع الطلب، الاسم الكامل، الشركة عند الاقتضاء، الهاتف، المدينة، البريد الإلكتروني عند الاقتضاء، ومحتوى رسالتك.',
              'يُربط عدد الكراتين المختار ومرجع الطلب بهذه المعلومات. لا يُطلب أي دفع أو رقم بطاقة بنكية على هذا الموقع.',
            ],
          },
          {
            title: 'الأغراض والأساس القانوني',
            paragraphs: [
              'تُستخدم البيانات للرد على طلبك وإعداد عرض تجاري وتنظيم التوصيل ومتابعة العلاقة.',
              'تستند هذه المعالجة إلى التدابير السابقة للتعاقد المتخذة بناءً على طلبك، وإلى موافقتك عند الاقتضاء. وقد تُعالج البيانات اللازمة لإدارة الطلب للوفاء بالتزاماتنا القانونية.',
            ],
          },
          {
            title: 'المتلقون',
            paragraphs: [
              'تطّلع على البيانات الأشخاص المكلفون بمعالجة الطلب داخل SEALSI. وقد تُنقل إلى متعهدين تقنيين (الاستضافة، المراسلة، الخدمات اللوجستية) يعملون لحسابنا وفي حدود الضرورة فقط.',
              'لا تُباع بياناتك ولا تُؤجَّر لأطراف ثالثة لأغراض تجارية.',
            ],
          },
          {
            title: 'مدة الحفظ',
            paragraphs: [
              'تُحفظ البيانات المرتبطة بالطلب لمدة 12 شهرًا من آخر تواصل، إلا إذا كان هناك التزام قانوني بحفظ أطول أو طلب محو مسبق.',
              'تُحفظ الوثائق المحاسبية والتجارية للمدة القانونية المطبقة.',
            ],
          },
          {
            title: 'حقوقك',
            paragraphs: [
              'لديك حق الوصول والتصحيح والمحو والتقييد والاعتراض، وعند ما ينص القانون عليه، حق نقل بياناتك. يمكنك أيضًا سحب موافقتك في أي وقت.',
              'لممارسة هذه الحقوق، اكتب إلى contact@sealsi.com مع توضيح طلبك. ستُقدَّم لك إجابة في المدد التي ينص عليها القانون.',
              'إذا رأيت، بعد التواصل معنا، أن حقوقك غير محترمة، يمكنك تقديم شكوى إلى السلطة الرقابية المختصة. في فرنسا تتعلق الأمر باللجنة الوطنية للمعلوماتية والحريات (CNIL)، 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07، أو cnil.fr.',
            ],
          },
          {
            title: 'ملفات تعريف الارتباط والتخزين المحلي',
            paragraphs: [
              'لا يستخدم هذا الموقع ملفات تعريف ارتباط إعلانية أو لقياس الجمهور. ولا يُودَع أي متتبّع خارجي دون موافقتك.',
              'يُسجَّل عدد الكراتين في التخزين المحلي لمتصفحك (المفتاح «sealsi-cartons») فقط للحفاظ على اختيارك. يمكنك حذفه في أي وقت بمسح بيانات الموقع من متصفحك.',
            ],
          },
          {
            title: 'الأمان',
            paragraphs: [
              'تُتخذ تدابير تقنية وتنظيمية معقولة لحماية البيانات من الفقد والوصول غير المصرح به والتعديل. وبما أنه لا يوجد نظام يضمن أمانًا مطلقًا، ندعوك إلى عدم إرسال معلومات حساسة عبر النموذج.',
            ],
          },
          {
            title: 'التعديلات',
            paragraphs: [
              'قد تُحدَّث هذه السياسة لمواكبة تطور الموقع أو التشريع. يظهر تاريخ آخر تحديث أعلى هذه الصفحة.',
            ],
          },
        ],
      },
      'conditions-de-vente': {
        title: 'الشروط العامة للبيع',
        description:
          'الإطار التجاري لطلبات العروض وطلبات SEALSI: السعر والتوصيل والدفع والضمانات.',
        updated: '4 نوفمبر 2026',
        sections: [
          {
            title: 'الموضوع ونطاق التطبيق',
            paragraphs: [
              'تنظم هذه الشروط طلبات العروض وبيوع منتجات SEALSI المبرمة مع المحترفين، وعند الاقتضاء مع الأفراد.',
              'كل طلب يعني قبول هذه الشروط. وتُرجَّح الشروط الخاصة الواردة في العرض المقبول على هذه الشروط العامة.',
            ],
          },
          {
            title: 'العرض وتكوين الطلب',
            paragraphs: [
              'الاختيار المنجز على الموقع لا يشكّل طلبًا نهائيًا. بل يتيح إعداد طلب عرض.',
              'يُرسَل إلى مقدّم الطلب عرض يحدد السعر والتوفر وشروط التوصيل، وعند الاقتضاء شروط الدفع. ويُبرَم البيع عند قبول العرض وتأكيده من SEALSI.',
            ],
          },
          {
            title: 'السعر',
            paragraphs: [
              'لا يُعرض أي سعر للعموم على الموقع. الأسعار المطبقة هي أسعار العرض المقبول، بالعملة المذكورة فيه.',
              'ما لم يُذكر خلاف ذلك، تُعرض الأسعار دون ضرائب. وتُحدَّد الضرائب والرسوم وتكاليف التوصيل المطبقة في العرض.',
            ],
          },
          {
            title: 'التوصيل',
            paragraphs: [
              'تُؤكَّد مناطق الخدمة والمدد وتكاليف التوصيل في العرض. وتُقدَّم المدد على سبيل الإرشاد وقد تتوقف على التوفر والناقل.',
              'على العميل التحقق من حالة الطرد عند الاستلام والإبلاغ فورًا عن أي خلل للناقل ولـ SEALSI.',
            ],
          },
          {
            title: 'الدفع',
            paragraphs: [
              'لا يتم أي دفع إلكتروني على هذا الموقع. شروط الدفع هي تلك المذكورة في العرض المقبول.',
              'في حالة تأخر الدفع، قد تُطبَّق العقوبات والتعويضات المنصوص عليها في القانون وفي العرض.',
            ],
          },
          {
            title: 'حق التراجع',
            paragraphs: [
              'عندما يكون العميل مستهلكًا، يستفيد من حق التراجع المنصوص عليه في المواد L. 221-18 وما يليها من قانون الاستهلاك، وفق الشروط والمدد القانونية.',
              'تُذكَّر في العرض الشروط العملية للإرجاع والاستثناءات المطبقة، خاصة عندما يكون المنتج مفتوحًا أو مستعملًا. ولا ينطبق هذا الحق على الطلبات المبرمة في إطار نشاط مهني.',
            ],
          },
          {
            title: 'الضمانات',
            paragraphs: [
              'تستفيد المنتجات من الضمانات القانونية للمطابقة والعيوب الخفية وفق الشروط التي ينص عليها القانون.',
              'تظهر نصائح الاستخدام والجرعة والحفظ على العبوة. ويُدعى العميل إلى احترامها.',
            ],
          },
          {
            title: 'الشكاوى والنزاعات',
            paragraphs: [
              'يمكن إرسال أي شكوى إلى contact@sealsi.com أو إلى +212 657 567 876، مع ذكر مرجع الطلب أو العرض.',
              'يمكن للعميل المستهلك اللجوء مجانًا إلى وسيط استهلاكي: [À COMPLÉTER — médiateur de la consommation].',
              'وفي حال عدم التوصل إلى حل ودي، يُحال النزاع إلى المحاكم المختصة وفق القواعد القانونية المطبقة.',
            ],
          },
          {
            title: 'القانون المطبق',
            paragraphs: [
              'تخضع هذه الشروط للقانون المطبق في مقر الناشر. وتبقى الأحكام الآمرة التي تحمي المستهلكين مطبقة عندما يكون العميل مستهلكًا.',
            ],
          },
        ],
      },
    },
  },
}

export const COPY: Record<Lang, Copy> = { fr, ar }

export const LANG_STORAGE_KEY = 'sealsi-lang'

export function isLang(value: string | null): value is Lang {
  return value === 'fr' || value === 'ar'
}
