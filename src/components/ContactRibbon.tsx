import { href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from './Icon'

type ContactRibbonProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function ContactRibbon({ onNavigate }: ContactRibbonProps) {
  return (
    <section className="contact-ribbon" aria-labelledby="contact-ribbon-title">
      <div className="wrap">
        <div>
          <h2 id="contact-ribbon-title">Une question, un besoin en quantité ?</h2>
          <p>Parlons de votre prochain approvisionnement.</p>
        </div>
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
      </div>
    </section>
  )
}
