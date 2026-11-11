import type { MouseEvent } from 'react'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import { Packshot } from '../components/Packshot'

type ProfessionalsPageProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function ProfessionalsPage({ onNavigate }: ProfessionalsPageProps) {
  const { c } = useLanguage()

  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
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
            <a className="btn btn-primary" href={href('demande')} onClick={go('demande')}>
              {c.pros.heroButton} <Icon name="arrow" />
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

          <div className="service-cards">
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

      <section className="section editorial" id="faq">
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

      <ContactRibbon onNavigate={onNavigate} />
    </main>
  )
}
