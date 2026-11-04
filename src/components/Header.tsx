import { useEffect, useRef, useState } from 'react'
import { whatsappLink } from '../config/business'
import { NAV_ITEMS, href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from './Icon'
import { Logo } from './Logo'

type HeaderProps = {
  page: PageId
  cartons: number
  dark?: boolean
  onNavigate: (page: PageId, section?: string) => void
}

export function Header({ page, cartons, dark = false, onNavigate }: HeaderProps) {
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

  return (
    <header className={dark ? 'site-header dark' : 'site-header'}>
      <div className="wrap">
        <a
          href={href('accueil')}
          className="brand"
          aria-label="SEALSI — Accueil"
          onClick={(event) => {
            event.preventDefault()
            go('accueil')
          }}
        >
          <Logo variant={dark ? 'white' : 'navy'} />
        </a>

        <nav className="nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => {
            const active = page === item.page && !item.section
            return (
              <a
                key={item.label}
                href={href(item.page, item.section)}
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
          <span className="header-language" aria-label="Langue du site : français">
            FR
          </span>
          <a
            className="header-contact"
            href={whatsappLink(
              'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter SEALSI sur WhatsApp"
          >
            <Icon name="whatsapp" />
            <span>WhatsApp</span>
          </a>
          <a
            href={href('selection')}
            className="cart-link"
            aria-label={`Voir ma sélection : ${cartons} carton${cartons === 1 ? '' : 's'}`}
            onClick={(event) => {
              event.preventDefault()
              go('selection')
            }}
          >
            <Icon name="bag" />
            <span className="cart-text">Ma sélection</span>
            <span className="cart-badge" aria-hidden="true">
              {cartons}
            </span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
          aria-label="Navigation mobile"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={href(item.page, item.section)}
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
            href={href('selection')}
            aria-current={page === 'selection' ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault()
              go('selection')
            }}
          >
            Ma sélection
          </a>
          <a
            href={whatsappLink(
              'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.',
            )}
            className="mobile-contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" /> WhatsApp
          </a>
        </nav>
      ) : null}
    </header>
  )
}
