import { CONTACT, mailtoLink, whatsappLink } from '../config/business'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'

type ContactRibbonProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function ContactRibbon({ onNavigate }: ContactRibbonProps) {
  const { c, hrefFor } = useLanguage()

  return (
    <section className="contact-ribbon" aria-labelledby="contact-ribbon-title">
      <div className="wrap">
        <div>
          <h2 id="contact-ribbon-title">{c.contactRibbon.title}</h2>
          <p>{c.contactRibbon.lead}</p>
        </div>
        <div className="contact-ribbon-actions">
          <a
            className="btn btn-primary"
            href={hrefFor('demande')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('demande')
            }}
          >
            {c.contactRibbon.button} <Icon name="arrow" />
          </a>
          <div className="contact-ribbon-direct">
            <a
              href={whatsappLink(c.contactRibbon.directMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" /> WhatsApp
            </a>
            <a href={CONTACT.phoneHref} dir="ltr">
              <Icon name="phone" /> {CONTACT.phoneDisplay}
            </a>
            <a href={mailtoLink(c.contactRibbon.mailSubject, c.contactRibbon.directMessage)} dir="ltr">
              <Icon name="mail" /> {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
