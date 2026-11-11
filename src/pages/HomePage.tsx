import type { MouseEvent } from 'react'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { BenefitsBar } from '../components/BenefitsBar'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'

type HomePageProps = {
  onNavigate: (page: PageId, section?: string) => void
}

const PRO_FEATURES = [
  {
    icon: 'box' as const,
    title: 'Un conditionnement clair',
    text: '1 carton = 3 bouteilles de 5 litres.',
  },
  {
    icon: 'grid' as const,
    title: 'Des commandes en volume',
    text: 'Choisissez votre nombre de cartons.',
  },
  {
    icon: 'message' as const,
    title: 'Une proposition adaptée',
    text: 'Tarif et modalités confirmés avec SEALSI.',
  },
]

const STEPS = [
  {
    index: '01 / CHOISIR',
    title: 'Choisissez votre quantité',
    text: 'Indiquez le nombre de cartons Oceanic Scent dont vous avez besoin.',
  },
  {
    index: '02 / PRÉCISER',
    title: 'Complétez vos coordonnées',
    text: 'Nom, téléphone et ville, sur la même page, sans créer de compte.',
  },
  {
    index: '03 / CONFIRMER',
    title: 'Validez la proposition',
    text: 'Confirmez le tarif, les disponibilités et les modalités de livraison.',
  },
]

export function HomePage({ onNavigate }: HomePageProps) {
  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">SEALSI / OCEANIC SCENT</span>
            <h1>
              Le propre.
              <br />
              <em>
                Une vague
                <br />
                de fraîcheur.
              </em>
            </h1>
            <p>
              La force de l’eau, la douceur du linge. Découvrez l’univers Oceanic de SEALSI.
            </p>
            <div className="btn-row">
              <a className="btn btn-gold" href={href('demande')} onClick={go('demande')}>
                Préparer ma commande <Icon name="arrow" />
              </a>
              <a className="btn btn-ghost" href={href('produit')} onClick={go('produit')}>
                Découvrir Oceanic
              </a>
            </div>
            <div className="hero-meta">
              <span>5 L par bouteille</span>
              <span>100 lavages*</span>
              <span>Formule 4 en 1</span>
            </div>
          </div>
        </div>

        <div className="hero-media" aria-hidden="true">
          <img
            src="/assets/oceanic-hero.webp"
            alt=""
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <span className="hero-caption" aria-hidden="true">
          OCEANIC SCENT / LA SIGNATURE SEALSI
        </span>
      </section>

      <BenefitsBar />

      <section className="section editorial" id="univers">
        <div className="wrap editorial-grid">
          <div className="signature-stage">
            <img
              src="/assets/sealsi-oceanic-signature.webp"
              srcSet="/assets/sealsi-oceanic-signature-700.webp 700w, /assets/sealsi-oceanic-signature-1000.webp 1000w, /assets/sealsi-oceanic-signature.webp 1400w"
              sizes="(max-width: 760px) 90vw, 45vw"
              alt="La signature SEALSI : étoile bleue, vague et tissu blanc"
              width={1400}
              height={1078}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="editorial-copy">
            <span className="eyebrow">NOTRE SIGNATURE</span>
            <div className="mini-rule" aria-hidden="true" />
            <h2>
              Un univers marin.
              <br />
              Un quotidien plus doux.
            </h2>
            <p>
              Une étoile lumineuse, l’eau en mouvement et un tissu blanc : les signes du propre,
              de la fraîcheur et du confort SEALSI.
            </p>
            <a className="text-link" href={href('produit')} onClick={go('produit')}>
              Explorer notre lessive <Icon name="arrow" />
            </a>
          </div>
        </div>
      </section>

      <section className="section pro-section" aria-labelledby="pro-title">
        <div className="wrap pro-grid">
          <div>
            <span className="eyebrow">POUR LES PROFESSIONNELS</span>
            <h2 id="pro-title">
              Vos quantités.
              <br />
              Notre attention.
            </h2>
            <p>
              Vous êtes revendeur ou vous préparez un approvisionnement en volume ? Construisons
              une demande adaptée à vos besoins.
            </p>
            <a
              className="btn btn-white"
              href={href('professionnels')}
              onClick={go('professionnels')}
            >
              Découvrir nos services <Icon name="arrow" />
            </a>
          </div>
          <div className="pro-features">
            {PRO_FEATURES.map((feature) => (
              <div className="pro-feature" key={feature.title}>
                <Icon name={feature.icon} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="wrap">
          <span className="eyebrow">COMMENT COMMANDER</span>
          <h2 id="steps-title">Simple, du choix au contact.</h2>
          <div className="steps">
            {STEPS.map((step) => (
              <div key={step.index}>
                <span className="step-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactRibbon onNavigate={onNavigate} />
    </main>
  )
}

