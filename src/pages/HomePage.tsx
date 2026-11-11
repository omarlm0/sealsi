import type { MouseEvent } from 'react'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { BenefitsBar } from '../components/BenefitsBar'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'

type HomePageProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { c } = useLanguage()

  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">{c.hero.eyebrow}</span>
            <h1>
              {c.hero.line1}
              <br />
              <em>
                {c.hero.line2}
                <br />
                {c.hero.line3}
              </em>
            </h1>
            <p>{c.hero.lead}</p>
            <div className="btn-row">
              <a className="btn btn-gold" href={href('demande')} onClick={go('demande')}>
                {c.hero.primary} <Icon name="arrow" />
              </a>
              <a className="btn btn-ghost" href={href('produit')} onClick={go('produit')}>
                {c.hero.secondary}
              </a>
            </div>
            <div className="hero-meta">
              {c.hero.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
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
          {c.hero.caption}
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
            <span className="eyebrow">{c.home.signatureEyebrow}</span>
            <div className="mini-rule" aria-hidden="true" />
            <h2>
              {c.home.signatureTitle1}
              <br />
              {c.home.signatureTitle2}
            </h2>
            <p>{c.home.signatureLead}</p>
            <a className="text-link" href={href('produit')} onClick={go('produit')}>
              {c.home.signatureLink} <Icon name="arrow" />
            </a>
          </div>
        </div>
      </section>

      <section className="section pro-section" aria-labelledby="pro-title">
        <div className="wrap pro-grid">
          <div>
            <span className="eyebrow">{c.home.proEyebrow}</span>
            <h2 id="pro-title">
              {c.home.proTitle1}
              <br />
              {c.home.proTitle2}
            </h2>
            <p>{c.home.proLead}</p>
            <a
              className="btn btn-white"
              href={href('professionnels')}
              onClick={go('professionnels')}
            >
              {c.home.proButton} <Icon name="arrow" />
            </a>
          </div>
          <div className="pro-features">
            {c.home.proFeatures.map((feature) => (
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
          <span className="eyebrow">{c.home.stepsEyebrow}</span>
          <h2 id="steps-title">{c.home.stepsTitle}</h2>
          <div className="steps">
            {c.home.steps.map((step) => (
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
