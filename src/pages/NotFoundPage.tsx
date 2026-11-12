import type { MouseEvent } from 'react'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from '../components/Icon'

type NotFoundPageProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const { c } = useLanguage()

  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap not-found">
        <span className="eyebrow">{c.notFound.eyebrow}</span>
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1>{c.notFound.title}</h1>
        <p className="lead">{c.notFound.lead}</p>

        <div className="btn-row">
          <a className="btn btn-primary" href={href('accueil')} onClick={go('accueil')}>
            {c.notFound.home} <Icon name="arrow" />
          </a>
          <a className="btn btn-outline" href={href('demande')} onClick={go('demande')}>
            {c.notFound.order}
          </a>
        </div>

        <nav className="not-found-links" aria-label={c.notFound.usefulPages}>
          <a href={href('accueil')} onClick={go('accueil')}>
            {c.notFound.home}
          </a>
          <a href={href('demande')} onClick={go('demande')}>
            {c.notFound.order}
          </a>
          <a href={href('professionnels')} onClick={go('professionnels')}>
            {c.notFound.pros}
          </a>
          <a href={href('mentions-legales')} onClick={go('mentions-legales')}>
            {c.notFound.legal}
          </a>
        </nav>
      </div>
    </main>
  )
}
