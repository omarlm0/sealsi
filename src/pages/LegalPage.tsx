import { LEGAL_DOCUMENTS } from '../data/legal'
import type { LegalPageId } from '../data/legal'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from '../components/Icon'

type LegalPageProps = {
  page: LegalPageId
  onNavigate: (page: PageId, section?: string) => void
}

export function LegalPage({ page, onNavigate }: LegalPageProps) {
  const document = LEGAL_DOCUMENTS[page]
  const hasPlaceholders = document.sections.some((section) =>
    [...section.paragraphs, ...(section.list ?? [])].some((text) =>
      text.includes('[À COMPLÉTER'),
    ),
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap legal-page">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <a
            href={href('accueil')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('accueil')
            }}
          >
            Accueil
          </a>{' '}
          / {document.title}
        </nav>

        <header className="legal-head">
          <span className="eyebrow">INFORMATIONS LÉGALES</span>
          <h1>{document.title}</h1>
          <p className="lead">{document.description}</p>
          <p className="legal-updated">Dernière mise à jour : {document.updated}</p>
        </header>

        {hasPlaceholders ? (
          <div className="legal-notice" role="note">
            <Icon name="shield" />
            <p>
              Les champs marqués <strong>[À COMPLÉTER]</strong> doivent être renseignés avec les
              informations validées de l’entreprise avant la mise en ligne. Ils ne constituent pas
              des données définitives.
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
            href={href('accueil')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('accueil')
            }}
          >
            <Icon name="arrow" /> Retour à l’accueil
          </a>
        </p>
      </div>
    </main>
  )
}
