import type { MouseEvent } from 'react'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import { Packshot } from '../components/Packshot'
import { whatsappLink } from '../config/business'

type ResellersPageProps = {
  onNavigate: (page: PageId, section?: string) => void
  onSelectVolume?: (cartons: number) => void
}

export function ResellersPage({ onNavigate, onSelectVolume }: ResellersPageProps) {
  const { c } = useLanguage()

  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  const handleSelectPackage = (cartons: number) => {
    onSelectVolume?.(cartons)
    onNavigate('demande')
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="service-hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">{c.resellers.heroEyebrow}</span>
            <h1>
              {c.resellers.heroTitle1}
              <br />
              {c.resellers.heroTitle2}
            </h1>
            <p>{c.resellers.heroLead}</p>
            <div className="btn-row">
              <a className="btn btn-gold" href={href('demande')} onClick={go('demande')}>
                {c.resellers.heroButton} <Icon name="arrow" />
              </a>
              <a
                className="btn btn-outline"
                href={whatsappLink(c.resellers.directMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> {c.resellers.whatsappButton}
              </a>
            </div>
          </div>

          <div className="service-visual" aria-hidden="true">
            <Packshot sizes="(max-width: 760px) 40vw, 20vw" />
            <Packshot sizes="(max-width: 760px) 40vw, 20vw" />
            <Packshot sizes="(max-width: 760px) 40vw, 20vw" />
            <div className="carton-label">
              <Icon name="box" />
              <div>
                <strong>3 × 5 L</strong>
                {c.resellers.perCarton}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{c.resellers.servicesEyebrow}</span>
              <h2 id="services-title">
                {c.resellers.servicesTitle1}
                <br />
                {c.resellers.servicesTitle2}
              </h2>
            </div>
            <p>{c.resellers.servicesLead}</p>
          </div>

          <div className="service-cards cols-4">
            {c.resellers.services.map((service) => (
              <article className="service-card" key={service.title}>
                <Icon name={service.icon as IconName} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial" id="volumes" aria-labelledby="packages-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{c.resellers.packagesEyebrow}</span>
              <h2 id="packages-title">{c.resellers.packagesTitle}</h2>
            </div>
            <p>{c.resellers.packagesLead}</p>
          </div>

          <div className="volume-packages">
            {c.resellers.packages.map((pkg) => (
              <div className="volume-card" key={pkg.cartons}>
                <div>
                  <div className="volume-card-qty">
                    {pkg.cartons} <span className="volume-unit">cartons</span>
                  </div>
                  <div className="volume-card-sub">
                    {pkg.bottles} bouteilles · {pkg.litres} L · 1 carton = 3 × 5 L
                  </div>
                  <div className="volume-card-label">{pkg.label}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline full"
                  onClick={() => handleSelectPackage(pkg.cartons)}
                >
                  {c.resellers.selectVolume} <Icon name="arrow" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap faq">
          <div>
            <span className="eyebrow">{c.resellers.faqEyebrow}</span>
            <h2>
              {c.resellers.faqTitle1}
              <br />
              {c.resellers.faqTitle2}
            </h2>
          </div>
          <div>
            {c.resellers.faq.map((item, index) => (
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
