import type { MouseEvent } from 'react'
import { href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from '../components/Icon'

type NotFoundPageProps = {
  onNavigate: (page: PageId, section?: string) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap not-found">
        <span className="eyebrow">ERREUR 404</span>
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1>Cette page a pris le large.</h1>
        <p className="lead">
          L’adresse demandée n’existe pas ou a été déplacée. Retrouvez le produit, votre sélection
          ou l’accueil du site.
        </p>

        <div className="btn-row">
          <a className="btn btn-primary" href={href('accueil')} onClick={go('accueil')}>
            Retour à l’accueil <Icon name="arrow" />
          </a>
          <a className="btn btn-outline" href={href('produit')} onClick={go('produit')}>
            Découvrir Oceanic Scent
          </a>
        </div>

        <nav className="not-found-links" aria-label="Pages utiles">
          <a href={href('demande')} onClick={go('demande')}>
            Préparer ma commande
          </a>
          <a href={href('produit')} onClick={go('produit')}>
            Voir le produit
          </a>
          <a href={href('professionnels')} onClick={go('professionnels')}>
            Professionnels
          </a>
          <a href={href('mentions-legales')} onClick={go('mentions-legales')}>
            Mentions légales
          </a>
        </nav>
      </div>
    </main>
  )
}
