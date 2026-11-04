import { CONTACT, mailtoLink, whatsappLink } from '../config/business'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from './Icon'

type ContactRibbonProps = {
  onNavigate: (page: PageId, section?: string) => void
}

const DEFAULT_MESSAGE =
  'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.'

export function ContactRibbon({ onNavigate }: ContactRibbonProps) {
  return (
    <section className="contact-ribbon" aria-labelledby="contact-ribbon-title">
      <div className="wrap">
        <div>
          <h2 id="contact-ribbon-title">Une question, un besoin en quantité ?</h2>
          <p>Parlons de votre prochain approvisionnement.</p>
        </div>
        <div className="contact-ribbon-actions">
          <a
            className="btn btn-primary"
            href={href('demande')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('demande')
            }}
          >
            Contacter SEALSI <Icon name="arrow" />
          </a>
          <div className="contact-ribbon-direct">
            <a
              href={whatsappLink(DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" /> WhatsApp
            </a>
            <a href={CONTACT.phoneHref}>
              <Icon name="phone" /> {CONTACT.phoneDisplay}
            </a>
            <a href={mailtoLink('Demande d’information SEALSI', DEFAULT_MESSAGE)}>
              <Icon name="mail" /> {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
