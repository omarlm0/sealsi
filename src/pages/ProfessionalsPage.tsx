import type { MouseEvent } from 'react'
import { FAQ, href } from '../data/site'
import type { PageId } from '../data/site'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'
import { Packshot } from '../components/Packshot'

type ProfessionalsPageProps = {
  onNavigate: (page: PageId, section?: string) => void
}

const SERVICES = [
  {
    icon: 'spark' as const,
    title: 'Notre gamme SEALSI',
    text: 'La fabrication de nos produits, avec une identité cohérente et un format 5 L pour la lessive Oceanic Scent.',
  },
  {
    icon: 'box' as const,
    title: 'Approvisionnement des revendeurs',
    text: 'Une demande structurée par cartons pour préciser vos besoins et préparer votre prochain réassort.',
  },
  {
    icon: 'message' as const,
    title: 'Commandes en quantité',
    text: 'Un échange pour confirmer les volumes, les disponibilités, le tarif et les modalités de livraison.',
  },
]

export function ProfessionalsPage({ onNavigate }: ProfessionalsPageProps) {
  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="service-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">SEALSI POUR LES PROFESSIONNELS</span>
            <h1>
              Votre prochain
              <br />
              réassort commence ici.
            </h1>
            <p>
              Une gamme SEALSI, un conditionnement par cartons et un échange direct pour
              organiser vos besoins en quantité.
            </p>
            <a className="btn btn-primary" href={href('demande')} onClick={go('demande')}>
              Parlons de votre besoin <Icon name="arrow" />
            </a>
          </div>

          <div className="service-visual" aria-hidden="true">
            <Packshot sizes="(max-width: 760px) 40vw, 20vw" />
            <Packshot sizes="(max-width: 760px) 40vw, 20vw" />
            <Packshot sizes="(max-width: 760px) 40vw, 20vw" />
            <div className="carton-label">
              <Icon name="box" />
              <div>
                <strong>3 × 5 L</strong>
                par carton
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">CE QUE NOUS PROPOSONS</span>
              <h2 id="services-title">
                Le produit, le volume,
                <br />
                le bon accompagnement.
              </h2>
            </div>
            <p>
              Une approche claire pour les revendeurs et les demandes de produits SEALSI en
              volume.
            </p>
          </div>

          <div className="service-cards">
            {SERVICES.map((service) => (
              <article className="service-card" key={service.title}>
                <Icon name={service.icon} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial" id="faq">
        <div className="wrap faq">
          <div>
            <span className="eyebrow">VOS QUESTIONS</span>
            <h2>
              Avant de préparer
              <br />
              votre sélection.
            </h2>
          </div>
          <div>
            {FAQ.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactRibbon onNavigate={onNavigate} />
    </main>
  )
}

