/**
 * Single source of truth for the SEALSI site.
 *
 * Product facts and copy come from the final packaging handoff
 * (CONTENU-SITE-FR.md / design-tokens.json). Prices are intentionally
 * absent: this version works on quotation only.
 */

export const BRAND = 'SEALSI'

export const PRODUCT = {
  name: 'Oceanic Scent',
  sku: 'SEALSI-OCEANIC-5L',
  volumeL: 5,
  bottlesPerCarton: 3,
  litresPerCarton: 15,
  washes: 100,
  doseMl: 50,
  minimumCartons: 1,
  /** Demonstration limit only — replace with the validated commercial rule. */
  maximumCartons: 999,
} as const

export const QUANTITY_ERROR = `Indiquez un nombre entier entre ${PRODUCT.minimumCartons} et ${PRODUCT.maximumCartons} cartons.`

export const BENEFITS = [
  { icon: 'parfum', title: 'Parfum', text: 'Une inspiration marine' },
  { icon: 'nettoyant', title: 'Nettoyant', text: 'Le soin du linge' },
  { icon: 'adoucissant', title: 'Adoucissant', text: 'Une touche de douceur' },
  { icon: 'anti-taches', title: 'Anti-taches', text: 'Au cœur de la formule' },
] as const

export const FAQ = [
  {
    question: 'Combien de bouteilles contient un carton ?',
    answer: 'Un carton contient 3 bouteilles de 5 L, soit 15 litres au total.',
  },
  {
    question: 'Comment connaître le tarif de ma quantité ?',
    answer:
      'Préparez votre sélection et transmettez vos coordonnées. Le prix et les modalités seront confirmés selon votre demande.',
  },
  {
    question: 'Puis-je demander un approvisionnement régulier ?',
    answer: "Précisez votre besoin dans le formulaire afin d'en discuter avec SEALSI.",
  },
  {
    question: 'Comment se passe la livraison ?',
    answer:
      'Indiquez votre ville. La zone desservie, les frais et le délai sont à confirmer avant la commande.',
  },
] as const

export type PageId =
  | 'accueil'
  | 'produit'
  | 'selection'
  | 'demande'
  | 'professionnels'
  | 'mentions-legales'
  | 'confidentialite'
  | 'conditions-de-vente'
  | 'introuvable'

export const PATHS: Record<PageId, string> = {
  accueil: '/',
  produit: '/lessive/oceanic-5l',
  selection: '/selection',
  demande: '/demande',
  professionnels: '/professionnels',
  'mentions-legales': '/mentions-legales',
  confidentialite: '/confidentialite',
  'conditions-de-vente': '/conditions-de-vente',
  introuvable: '/404',
}

const PATH_TO_PAGE: Record<string, PageId> = Object.fromEntries(
  (Object.entries(PATHS) as Array<[PageId, string]>).map(([page, path]) => [path, page]),
) as Record<string, PageId>

export function href(page: PageId, section?: string): string {
  return `${PATHS[page]}${section ? `#${section}` : ''}`
}

export function parseLocation(location: { pathname: string; hash: string }): {
  page: PageId
  section: string | null
} {
  const decode = (value: string) => {
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }
  const rawPath = decode(location.pathname)
  const path = rawPath.replace(/\/+$/, '') || '/'
  const section = decode(location.hash.replace(/^#/, '')) || null
  return {
    page: PATH_TO_PAGE[path] ?? 'introuvable',
    section,
  }
}

export const PAGE_META: Record<PageId, { title: string; description: string }> = {
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
  professionnels: {
    title: 'Professionnels et revendeurs — SEALSI',
    description:
      'Revendeurs et approvisionnements en volume : une gamme SEALSI, un conditionnement par cartons de 3 bouteilles et un échange direct.',
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
}

export const NAV_ITEMS = [
  { label: 'Notre lessive', page: 'produit' as PageId },
  { label: "L'univers SEALSI", page: 'accueil' as PageId, section: 'univers' },
  { label: 'Professionnels', page: 'professionnels' as PageId },
]
