import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { RequestPage } from './pages/RequestPage'
import { ProfessionalsPage } from './pages/ProfessionalsPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PATHS, href, parseLocation } from './data/site'
import type { PageId } from './data/site'
import { isLegalPage } from './data/legal'
import { absoluteUrl } from './config/business'
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

export function App() {
  const { c, lang } = useLanguage()
  const [route, setRoute] = useState(() =>
    parseLocation(typeof window === 'undefined' ? { pathname: '/', hash: '' } : window.location),
  )
  const [cartons, setCartons] = useState(() => readCartons())

  const updateCartons = useCallback((next: number) => {
    setCartons(next)
    writeCartons(next)
  }, [])

  const navigate = useCallback((page: PageId, section?: string) => {
    const nextUrl = href(page, section)
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
  }, [])

  useEffect(() => {
    const onLocationChange = () => setRoute(parseLocation(window.location))
    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onLocationChange)
    }
  }, [])

  useEffect(() => {
    const meta = c.meta[route.page]
    document.title = meta.title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[property="og:locale"]', lang === 'ar' ? 'ar_MA' : 'fr_FR')

    const indexable = route.page !== 'introuvable'
    const canonical = absoluteUrl(
      indexable ? PATHS[route.page] : window.location.pathname,
    )
    setLink('link[rel="canonical"]', canonical)
    setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[name="robots"]', indexable ? 'index, follow' : 'noindex, follow')
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
    window.history.replaceState(null, '', href('demande'))
    setRoute({ page: 'demande', section: route.section })
  }, [route.page, route.section])

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
      case 'professionnels':
        return <ProfessionalsPage onNavigate={navigate} />
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
