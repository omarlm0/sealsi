import type { MouseEvent } from 'react'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'
import { InfoRequestForm } from '../components/InfoRequestForm'
import type { IconName } from '../components/Icon'
import { Packshot } from '../components/Packshot'
import { whatsappLink } from '../config/business'

type ProfessionalsPageProps = {
  onNavigate: (page: PageId, section?: string) => void
  onSelectVolume?: (cartons: number) => void
}

export function ProfessionalsPage({ onNavigate, onSelectVolume }: ProfessionalsPageProps) {
  const { c, hrefFor } = useLanguage()

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
            <span className="eyebrow">{c.pros.heroEyebrow}</span>
            <h1>
              {c.pros.heroTitle1}
              <br />
              {c.pros.heroTitle2}
            </h1>
            <p>{c.pros.heroLead}</p>
            <div className="btn-row">
              <a
                className="btn btn-primary"
                href={hrefFor('professionnels', 'infos')}
                onClick={go('professionnels', 'infos')}
              >
                {c.pros.heroButton} <Icon name="arrow" />
              </a>
              <a
                className="btn btn-outline"
                href={whatsappLink(c.pros.directMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> {c.pros.whatsappButton}
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
                {c.pros.perCarton}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{c.pros.servicesEyebrow}</span>
              <h2 id="services-title">
                {c.pros.servicesTitle1}
                <br />
                {c.pros.servicesTitle2}
              </h2>
            </div>
            <p>{c.pros.servicesLead}</p>
          </div>

          <div className="service-cards cols-4">
            {c.pros.services.map((service) => (
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
              <span className="eyebrow">{c.pros.packagesEyebrow}</span>
              <h2 id="packages-title">{c.pros.packagesTitle}</h2>
            </div>
            <p>{c.pros.packagesLead}</p>
          </div>

          <div className="volume-packages">
            {c.pros.packages.map((pkg) => (
              <div className="volume-card" key={pkg.cartons}>
                <div>
                  <div className="volume-card-qty">
                    {pkg.cartons}{' '}
                    <span className="volume-unit">{c.common.cartonWord(pkg.cartons)}</span>
                  </div>
                  <div className="volume-card-sub">
                    {pkg.bottles} {c.common.bottleWord(pkg.bottles)} · {pkg.litres}{' '}
                    {c.common.litreWord()} · {pkg.bottles * 100}{' '}
                    {c.common.washWord(pkg.bottles * 100)}
                  </div>
                  <div className="volume-card-label">{pkg.label}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline full"
                  onClick={() => handleSelectPackage(pkg.cartons)}
                >
                  {c.pros.selectVolume} <Icon name="arrow" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap faq">
          <div>
            <span className="eyebrow">{c.pros.faqEyebrow}</span>
            <h2>
              {c.pros.faqTitle1}
              <br />
              {c.pros.faqTitle2}
            </h2>
          </div>
          <div>
            {c.pros.faq.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <InfoRequestForm audience="professional" onNavigate={onNavigate} />

      <ContactRibbon onNavigate={onNavigate} />
    </main>
  )
}
