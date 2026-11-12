import { CONTACT, mailtoLink, whatsappLink } from '../config/business'
import type { LegalPageId } from '../data/legal'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'
import { Logo } from './Logo'

type FooterProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const { c } = useLanguage()

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

  const legalLinks: Array<{ page: LegalPageId; label: string }> = [
    { page: 'mentions-legales', label: c.footer.mentions },
    { page: 'confidentialite', label: c.footer.privacy },
    { page: 'conditions-de-vente', label: c.footer.terms },
  ]

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="white" />
            <p>
              {c.footer.tagline1}
              <br />
              {c.footer.tagline2}
            </p>
          </div>

          <nav aria-label={c.footer.discover}>
            <h2>{c.footer.discover}</h2>
            <ul>
              <li>{link('accueil', undefined, c.footer.oceanic)}</li>
              <li>{link('accueil', 'univers', c.footer.universe)}</li>
            </ul>
          </nav>

          <nav aria-label={c.footer.order}>
            <h2>{c.footer.order}</h2>
            <ul>
              <li>{link('demande', undefined, c.footer.orderLink)}</li>
              <li>{link('professionnels', undefined, c.footer.reseller)}</li>
              <li>{link('professionnels', 'faq', c.footer.faq)}</li>
            </ul>
          </nav>

          <div>
            <h2>{c.footer.contact}</h2>
            <p className="footer-contact-intro">{c.footer.contactIntro}</p>
            <ul className="footer-contact">
              <li>
                <a
                  href={mailtoLink(c.request.mailSubject, c.request.directMessage)}
                  dir="ltr"
                >
                  <Icon name="mail" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} dir="ltr">
                  <Icon name="phone" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(c.request.directMessage)}
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
              {c.footer.write} <Icon name="arrow" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{c.footer.rights}</span>
          <div className="footer-legal">
            {legalLinks.map(({ page, label }) => (
              <span key={page}>
                <a
                  href={href(page)}
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
