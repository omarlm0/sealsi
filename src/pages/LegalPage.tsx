import type { LegalPageId, PageId } from '../data/site'
import type { LegalDocumentCopy } from '../i18n/copy'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from '../components/Icon'

type LegalPageProps = {
  page: LegalPageId
  onNavigate: (page: PageId, section?: string) => void
}

const PLACEHOLDER_MARKER = '[À COMPLÉTER'

export function LegalPage({ page, onNavigate }: LegalPageProps) {
  const { c, hrefFor } = useLanguage()
  const document: LegalDocumentCopy = c.legal.docs[page]
  const hasPlaceholders = document.sections.some((section) =>
    [...section.paragraphs, ...(section.list ?? [])].some((text) =>
      text.includes(PLACEHOLDER_MARKER),
    ),
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap legal-page">
        <nav className="breadcrumb" aria-label={c.common.breadcrumbAria}>
          <a
            href={hrefFor('accueil')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('accueil')
            }}
          >
            {c.common.home}
          </a>{' '}
          / {document.title}
        </nav>

        <header className="legal-head">
          <span className="eyebrow">{c.legal.eyebrow}</span>
          <h1>{document.title}</h1>
          <p className="lead">{document.description}</p>
          <p className="legal-updated">{c.legal.updatedPrefix(document.updated)}</p>
        </header>

        {hasPlaceholders ? (
          <div className="legal-notice" role="note">
            <Icon name="shield" />
            <p>
              {c.legal.noticeBefore}
              <strong>{c.legal.noticeTag}</strong>
              {c.legal.noticeAfter}
            </p>
          </div>
        ) : null}

        <article className="legal-body">
          {document.sections.map((section, index) => (
            <section key={section.title}>
              <h2>
                {index + 1}. {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <p className="legal-back">
          <a
            href={hrefFor('accueil')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('accueil')
            }}
          >
            <Icon name="arrow" /> {c.legal.back}
          </a>
        </p>
      </div>
    </main>
  )
}
