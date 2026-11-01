import { href } from '../data/site'
import type { PageId } from '../data/site'
import { Icon } from './Icon'
import { Logo } from './Logo'

type FooterProps = {
  onNavigate: (page: PageId, section?: string) => void
}

const LEGAL_LABELS = ['Mentions légales', 'Confidentialité', 'Conditions de vente']

export function Footer({ onNavigate }: FooterProps) {
  const link = (page: PageId, section: string | undefined, label: string) => (
    <a
      href={href(page, section)}
      onClick={(event) => {
        event.preventDefault()
        onNavigate(page, section)
      }}
    >
      {label}
    </a>
  )

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="white" />
            <p>
              Le propre. La fraîcheur.
              <br />
              Et un peu de sérénité au quotidien.
            </p>
          </div>

          <nav aria-label="Découvrir">
            <h4>Découvrir</h4>
            <ul>
              <li>{link('produit', undefined, 'Oceanic Scent')}</li>
              <li>{link('accueil', 'univers', 'Notre univers')}</li>
              <li>{link('produit', 'conseils', "Conseils d'utilisation")}</li>
            </ul>
          </nav>

          <nav aria-label="Commander">
            <h4>Commander</h4>
            <ul>
              <li>{link('selection', undefined, 'Commander par carton')}</li>
              <li>{link('professionnels', undefined, 'Devenir revendeur')}</li>
              <li>{link('professionnels', 'faq', 'Questions fréquentes')}</li>
            </ul>
          </nav>

          <div>
            <h4>Restons en contact</h4>
            <ul>
              <li>
                Votre projet commence
                <br />
                par une conversation.
              </li>
            </ul>
            <a
              className="text-link"
              href={href('demande')}
              onClick={(event) => {
                event.preventDefault()
                onNavigate('demande')
              }}
            >
              Nous écrire <Icon name="arrow" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SEALSI. Tous droits réservés.</span>
          <div className="footer-legal">
            {LEGAL_LABELS.map((label) => (
              <span key={label} className="footer-legal-label" title="Document à rédiger avant mise en ligne">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
