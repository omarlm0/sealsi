import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import { SelectionPage } from './pages/SelectionPage'
import { RequestPage } from './pages/RequestPage'
import { ProfessionalsPage } from './pages/ProfessionalsPage'
import { PAGE_META, PRODUCT, href, parseLocation } from './data/site'
import type { PageId } from './data/site'
import { readCartons, writeCartons } from './lib/cart'

function setMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector)
  if (element) element.setAttribute('content', content)
}

export function App() {
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
    const meta = PAGE_META[route.page]
    document.title = meta.title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
  }, [route.page])

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

  const needsExampleSelection = route.page === 'selection' || route.page === 'demande'
  const effectiveCartons = needsExampleSelection && cartons === 0 ? PRODUCT.exampleCartons : cartons

  useEffect(() => {
    if (needsExampleSelection && cartons === 0) {
      updateCartons(PRODUCT.exampleCartons)
    }
  }, [needsExampleSelection, cartons, updateCartons])

  const handleAdd = (quantity: number) => {
    updateCartons(cartons + quantity)
    navigate('selection')
  }

  const renderPage = () => {
    switch (route.page) {
      case 'produit':
        return <ProductPage onAdd={handleAdd} onNavigate={navigate} />
      case 'selection':
        return (
          <SelectionPage
            cartons={effectiveCartons}
            onCartonsChange={updateCartons}
            onNavigate={navigate}
          />
        )
      case 'demande':
        return <RequestPage cartons={effectiveCartons} onNavigate={navigate} />
      case 'professionnels':
        return <ProfessionalsPage onNavigate={navigate} />
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
        Aller au contenu principal
      </a>

      <Header
        page={route.page}
        cartons={effectiveCartons}
        dark={route.page === 'accueil'}
        onNavigate={navigate}
      />

      {renderPage()}

      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
