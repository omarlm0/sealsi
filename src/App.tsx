import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { RequestPage } from './pages/RequestPage'
import { ResellersPage } from './pages/ResellersPage'
import { ProfessionalsPage } from './pages/ProfessionalsPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import {
  PRODUCT,
  href,
  isLegalPage,
  parseLocation,
  stripLangPrefix,
  withLang,
} from './data/site'
import type { Lang, PageId } from './data/site'
import { CONTACT, SITE, absoluteUrl } from './config/business'
import { readCartons, writeCartons } from './lib/cart'
import { useLanguage } from './i18n/LanguageContext'

function setMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector)
  if (element) element.setAttribute('content', content)
}

function setLink(selector: string, value: string) {
  const element = document.querySelector<HTMLLinkElement>(selector)
  if (element) element.setAttribute('href', value)
}

function setLocalizedLink(selector: string, lang: Lang | 'x-default', value: string) {
  const element = document.querySelector<HTMLLinkElement>(selector)
  if (!element) return
  element.setAttribute('href', value)
  element.setAttribute('hreflang', lang)
}

function buildSchema(lang: Lang, description: string, canonical: string) {
  const inLanguage = lang === 'ar' ? 'ar' : 'fr'
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: `${SITE.url}/`,
        logo: absoluteUrl('/assets/sealsi-logo-navy.png'),
        email: CONTACT.email,
        telephone: CONTACT.phoneDisplay,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: CONTACT.phoneDisplay,
            contactType: 'sales',
            availableLanguage: ['fr', 'ar'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: absoluteUrl(href('accueil', undefined, lang)),
        name: SITE.name,
        inLanguage,
        publisher: { '@id': `${SITE.url}/#organization` },
      },
      {
        '@type': 'Product',
        '@id': `${SITE.url}/#product`,
        name: `${SITE.name} ${PRODUCT.name} ${PRODUCT.volumeL} L`,
        brand: { '@type': 'Brand', name: SITE.name },
        sku: PRODUCT.sku,
        description,
        image: absoluteUrl('/assets/sealsi-oceanic-packshot.webp'),
        url: canonical,
        category: lang === 'ar' ? 'سائل غسيل' : 'Lessive liquide',
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Volume', value: `${PRODUCT.volumeL} L` },
          {
            '@type': 'PropertyValue',
            name: lang === 'ar' ? 'زجاجات لكل كرتونة' : 'Bouteilles par carton',
            value: String(PRODUCT.bottlesPerCarton),
          },
          {
            '@type': 'PropertyValue',
            name: lang === 'ar' ? 'لترات لكل كرتونة' : 'Litres par carton',
            value: `${PRODUCT.litresPerCarton} L`,
          },
        ],
      },
    ],
  }
}

export function App() {
  const { c, lang, setLang, hrefFor } = useLanguage()
  const [route, setRoute] = useState(() =>
    parseLocation(typeof window === 'undefined' ? { pathname: '/', hash: '' } : window.location),
  )
  const [cartons, setCartons] = useState(() => readCartons())

  const updateCartons = useCallback((next: number) => {
    setCartons(next)
    writeCartons(next)
  }, [])

  const navigate = useCallback(
    (page: PageId, section?: string) => {
      const nextUrl = hrefFor(page, section)
      const currentUrl = `${window.location.pathname}${window.location.hash}`
      if (currentUrl === nextUrl) {
        if (section) {
          document.getElementById(section)?.scrollIntoView({ block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' })
        }
        return
      }
      window.history.pushState(null, '', nextUrl)
      setRoute(parseLocation(window.location))
    },
    [hrefFor],
  )

  useEffect(() => {
    const onLocationChange = () => setRoute(parseLocation(window.location))
    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onLocationChange)
    }
  }, [])

  /**
   * Back/forward can land on the other language version. The URL wins, so the
   * active copy follows the address bar without adding history entries.
   */
  useEffect(() => {
    const urlLang = parseLocation(window.location).lang
    if (urlLang !== lang) setLang(urlLang)
  }, [route, lang, setLang])

  useEffect(() => {
    const meta = c.meta[route.page]
    document.title = meta.title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[property="og:locale"]', lang === 'ar' ? 'ar_MA' : 'fr_FR')
    setMeta('meta[property="og:locale:alternate"]', lang === 'ar' ? 'fr_FR' : 'ar_MA')
    setMeta('meta[property="og:image:alt"]', c.common.packshotAlt)
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.description)
    setMeta('meta[name="twitter:image:alt"]', c.common.packshotAlt)

    const indexable = route.page !== 'introuvable'
    const currentPath = stripLangPrefix(window.location.pathname).path
    const canonicalPath = indexable ? href(route.page, undefined, lang) : window.location.pathname
    const canonical = absoluteUrl(canonicalPath)
    const alternateFr = indexable
      ? absoluteUrl(href(route.page, undefined, 'fr'))
      : absoluteUrl(currentPath)
    const alternateAr = indexable
      ? absoluteUrl(href(route.page, undefined, 'ar'))
      : absoluteUrl(withLang(currentPath, 'ar'))

    setLink('link[rel="canonical"]', canonical)
    setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[name="robots"]', indexable ? 'index, follow' : 'noindex, follow')
    setLocalizedLink('link[rel="alternate"][hreflang="fr"]', 'fr', alternateFr)
    setLocalizedLink('link[rel="alternate"][hreflang="ar"]', 'ar', alternateAr)
    setLocalizedLink('link[rel="alternate"][hreflang="x-default"]', 'x-default', alternateFr)

    const schema = document.getElementById('site-schema')
    if (schema) {
      schema.textContent = JSON.stringify(
        buildSchema(lang, c.meta.accueil.description, canonical),
      )
    }
  }, [route.page, c, lang])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (route.section) {
        document.getElementById(route.section)?.scrollIntoView({ block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [route.page, route.section])

  /**
   * The old two-step flow (`/selection` → `/demande`) now lives on a single
   * request page. Keep the old URL as a client-side redirect for bookmarks.
   */
  useEffect(() => {
    if (route.page !== 'selection') return
    window.history.replaceState(null, '', href('demande', undefined, route.lang))
    setRoute({ page: 'demande', section: route.section, lang: route.lang })
  }, [route.page, route.section, route.lang])

  const renderPage = () => {
    if (isLegalPage(route.page)) {
      return <LegalPage page={route.page} onNavigate={navigate} />
    }

    switch (route.page) {
      case 'selection':
      case 'demande':
        return (
          <RequestPage
            cartons={cartons}
            onCartonsChange={updateCartons}
            onNavigate={navigate}
          />
        )
      case 'revendeurs':
        return (
          <ResellersPage
            onNavigate={navigate}
            onSelectVolume={updateCartons}
          />
        )
      case 'professionnels':
        return (
          <ProfessionalsPage
            onNavigate={navigate}
            onSelectVolume={updateCartons}
          />
        )
      case 'introuvable':
        return <NotFoundPage onNavigate={navigate} />
      case 'accueil':
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <div className="site-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        {c.skipLink}
      </a>

      <Header
        page={route.page}
        cartons={cartons}
        dark={route.page === 'accueil'}
        onNavigate={navigate}
      />

      {renderPage()}

      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
