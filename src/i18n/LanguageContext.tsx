import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { COPY } from './copy'
import type { Copy, Lang } from './copy'
import { href, parseLocation, stripLangPrefix, withLang } from '../data/site'
import type { PageId } from '../data/site'

type LanguageContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  c: Copy
  setLang: (lang: Lang) => void
  /** Builds a link for the active language, so every URL keeps its prefix. */
  hrefFor: (page: PageId, section?: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * The URL is the source of truth: `/…` is French, `/ar/…` is Arabic. Keeping
 * the language in the path makes each version crawlable, shareable and
 * restorable from a bookmark instead of a hidden localStorage preference.
 */
function readLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  return parseLocation(window.location).lang
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)

    if (typeof window === 'undefined') return
    const { path } = stripLangPrefix(window.location.pathname)
    const nextPath = withLang(path, next)
    if (nextPath !== window.location.pathname) {
      window.history.pushState(
        null,
        '',
        `${nextPath}${window.location.search}${window.location.hash}`,
      )
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const hrefFor = useCallback(
    (page: PageId, section?: string) => href(page, section, lang),
    [lang],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', c: COPY[lang], setLang, hrefFor }),
    [lang, setLang, hrefFor],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
