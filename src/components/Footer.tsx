import { CONTACT, mailtoLink, whatsappLink } from '../config/business'
import { LEGAL_DOCUMENTS } from '../data/legal'
import type { LegalPageId } from '../data/legal'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from './Icon'
import { Logo } from './Logo'

type FooterProps = {
  onNavigate: (page: PageId, section?: string) => void
}

const LEGAL_LINKS: Array<{ page: LegalPageId; label: string }> = [
  { page: 'mentions-legales', label: 'Mentions légales' },
  { page: 'confidentialite', label: 'Confidentialité' },
  { page: 'conditions-de-vente', label: 'Conditions de vente' },
]

const DEFAULT_MESSAGE =
  'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.'

export function Footer({ onNavigate }: FooterProps) {
  const link = (page: PageId, section: string | undefined, label: string) => (
    <a
      href={href(page, section)}
      onClick={(event) => {
        event.preventDefault()
        onNavigate(page, section)
      }}
    >
      {label}
    </a>
  )

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="white" />
            <p>
              Le propre. La fraîcheur.
              <br />
              Et un peu de sérénité au quotidien.
            </p>
          </div>

          <nav aria-label="Découvrir">
            <h2>Découvrir</h2>
            <ul>
              <li>{link('produit', undefined, 'Oceanic Scent')}</li>
              <li>{link('accueil', 'univers', 'Notre univers')}</li>
              <li>{link('produit', 'conseils', "Conseils d'utilisation")}</li>
            </ul>
          </nav>

          <nav aria-label="Commander">
            <h2>Commander</h2>
            <ul>
              <li>{link('selection', undefined, 'Commander par carton')}</li>
              <li>{link('professionnels', undefined, 'Devenir revendeur')}</li>
              <li>{link('professionnels', 'faq', 'Questions fréquentes')}</li>
            </ul>
          </nav>

          <div>
            <h2>Restons en contact</h2>
            <p className="footer-contact-intro">Votre projet commence par une conversation.</p>
            <ul className="footer-contact">
              <li>
                <a href={mailtoLink('Demande d’information SEALSI', DEFAULT_MESSAGE)}>
                  <Icon name="mail" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>
                  <Icon name="phone" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" />
                  WhatsApp
                </a>
              </li>
            </ul>
            <a
              className="text-link"
              href={href('demande')}
              onClick={(event) => {
                event.preventDefault()
                onNavigate('demande')
              }}
            >
              Nous écrire <Icon name="arrow" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SEALSI. Tous droits réservés.</span>
          <div className="footer-legal">
            {LEGAL_LINKS.map(({ page, label }) => (
              <span key={page}>
                <a
                  href={href(page)}
                  title={LEGAL_DOCUMENTS[page].title}
                  onClick={(event) => {
                    event.preventDefault()
                    onNavigate(page)
                  }}
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
