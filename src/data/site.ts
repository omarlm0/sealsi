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

export type PageId =
  | 'accueil'
  | 'selection'
  | 'demande'
  | 'revendeurs'
  | 'professionnels'
  | 'mentions-legales'
  | 'confidentialite'
  | 'conditions-de-vente'
  | 'introuvable'

export const PATHS: Record<PageId, string> = {
  accueil: '/',
  selection: '/selection',
  demande: '/demande',
  revendeurs: '/revendeurs',
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

  // Legacy route: /lessive/oceanic-5l redirects to home
  if (path === '/lessive/oceanic-5l') {
    return { page: 'accueil', section }
  }

  return {
    page: PATH_TO_PAGE[path] ?? 'introuvable',
    section,
  }
}


