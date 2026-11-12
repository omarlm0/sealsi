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

export type Lang = 'fr' | 'ar'

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

export type LegalPageId =
  | 'mentions-legales'
  | 'confidentialite'
  | 'conditions-de-vente'

export const LEGAL_PAGE_IDS: readonly LegalPageId[] = [
  'mentions-legales',
  'confidentialite',
  'conditions-de-vente',
]

export function isLegalPage(page: PageId): page is LegalPageId {
  return (LEGAL_PAGE_IDS as readonly PageId[]).includes(page)
}

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

/** Arabic lives under its own prefix so each language has a crawlable URL. */
export const LANG_PREFIX: Record<Lang, string> = {
  fr: '',
  ar: '/ar',
}

const PATH_TO_PAGE: Record<string, PageId> = Object.fromEntries(
  (Object.entries(PATHS) as Array<[PageId, string]>).map(([page, path]) => [path, page]),
) as Record<string, PageId>

export function href(page: PageId, section?: string, lang: Lang = 'fr'): string {
  const base = PATHS[page]
  const prefix = LANG_PREFIX[lang]
  const path = base === '/' ? prefix || '/' : `${prefix}${base}`
  return `${path}${section ? `#${section}` : ''}`
}

/** Splits an incoming pathname into its language and the unprefixed path. */
export function stripLangPrefix(pathname: string): { lang: Lang; path: string } {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname
  if (normalized === '/ar') return { lang: 'ar', path: '/' }
  if (normalized.startsWith('/ar/')) return { lang: 'ar', path: normalized.slice(3) || '/' }
  return { lang: 'fr', path: normalized }
}

/** Applies a language prefix to an unprefixed pathname. */
export function withLang(pathname: string, lang: Lang): string {
  if (lang === 'fr') return pathname
  return pathname === '/' ? '/ar' : `/ar${pathname}`
}

export type Route = {
  page: PageId
  section: string | null
  lang: Lang
}

export function parseLocation(location: { pathname: string; hash: string }): Route {
  const decode = (value: string) => {
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }
  const rawPath = decode(location.pathname)
  const { lang, path } = stripLangPrefix(rawPath)
  const section = decode(location.hash.replace(/^#/, '')) || null

  // Legacy route: /lessive/oceanic-5l redirects to home
  if (path === '/lessive/oceanic-5l') {
    return { page: 'accueil', section, lang }
  }

  return {
    page: PATH_TO_PAGE[path] ?? 'introuvable',
    section,
    lang,
  }
}
