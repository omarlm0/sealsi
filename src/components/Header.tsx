import { useEffect, useRef, useState } from 'react'
import { whatsappLink } from '../config/business'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'
import { Logo } from './Logo'

type HeaderProps = {
  page: PageId
  cartons: number
  dark?: boolean
  onNavigate: (page: PageId, section?: string) => void
}

export function Header({ page, cartons, dark = false, onNavigate }: HeaderProps) {
  const { c, lang, setLang, hrefFor } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [page])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const go = (target: PageId, section?: string) => {
    setMenuOpen(false)
    onNavigate(target, section)
  }

  const languageSwitch = (
    <div className="header-language" role="group" aria-label={c.header.languageAria}>
      <button
        type="button"
        lang="fr"
        aria-pressed={lang === 'fr'}
        onClick={() => {
          setMenuOpen(false)
          setLang('fr')
        }}
      >
        FR
      </button>
      <span className="lang-separator" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        lang="ar"
        aria-pressed={lang === 'ar'}
        onClick={() => {
          setMenuOpen(false)
          setLang('ar')
        }}
      >
        AR
      </button>
    </div>
  )

  return (
    <header className={dark ? 'site-header dark' : 'site-header'}>
      <div className="wrap">
        <a
          href={hrefFor('accueil')}
          className="brand"
          aria-label={c.header.homeAria}
          onClick={(event) => {
            event.preventDefault()
            go('accueil')
          }}
        >
          <Logo variant={dark ? 'white' : 'navy'} />
        </a>

        <nav className="nav" aria-label={c.header.mainNavAria}>
          {c.nav.map((item) => {
            const active = page === item.page && !item.section
            return (
              <a
                key={item.label}
                href={hrefFor(item.page, item.section)}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  go(item.page, item.section)
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="header-right">
          {languageSwitch}
          <a
            className="header-contact"
            href={whatsappLink(c.request.directMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.header.whatsappAria}
          >
            <Icon name="whatsapp" />
            <span>WhatsApp</span>
          </a>
          <a
            href={hrefFor('demande')}
            className="cart-link"
            aria-label={c.header.cartAria(cartons)}
            aria-current={page === 'demande' ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault()
              go('demande')
            }}
          >
            <Icon name="bag" />
            <span className="cart-text">{c.header.cart}</span>
            <span className="cart-badge" aria-hidden="true">
              {cartons}
            </span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-label={menuOpen ? c.header.closeMenu : c.header.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="mobile-nav open"
          aria-label={c.header.mobileNavAria}
        >
          {c.nav.map((item) => (
            <a
              key={item.label}
              href={hrefFor(item.page, item.section)}
              aria-current={page === item.page && !item.section ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                go(item.page, item.section)
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={hrefFor('demande')}
            aria-current={page === 'demande' ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault()
              go('demande')
            }}
          >
            {c.header.cart}
          </a>
          <a
            href={whatsappLink(c.request.directMessage)}
            className="mobile-contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" /> WhatsApp
          </a>
          {languageSwitch}
        </nav>
      ) : null}
    </header>
  )
}
