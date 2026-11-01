import { useState } from 'react'
import type { MouseEvent } from 'react'
import { PRODUCT, href } from '../data/site'
import type { PageId } from '../data/site'
import { bottlesFor, litresFor } from '../lib/cart'
import { useCartonInput } from '../lib/useCartonInput'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'
import { Packshot } from '../components/Packshot'
import { QuantityStepper } from '../components/QuantityStepper'

type ProductPageProps = {
  onAdd: (cartons: number) => void
  onNavigate: (page: PageId, section?: string) => void
}

type GalleryView = 'front' | 'rear'

export function ProductPage({ onAdd, onNavigate }: ProductPageProps) {
  const quantity = useCartonInput(1)
  const [gallery, setGallery] = useState<GalleryView>('front')
  const cartons = quantity.value

  const go = (page: PageId, section?: string) => (event: MouseEvent) => {
    event.preventDefault()
    onNavigate(page, section)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <div className="page-head">
          <nav className="breadcrumb" aria-label="Fil d’Ariane">
            <a href={href('accueil')} onClick={go('accueil')}>
              Accueil
            </a>{' '}
            / Notre lessive / Oceanic Scent
          </nav>
        </div>

        <section className="product-main" aria-labelledby="product-title">
          <div>
            <div className="gallery-stage">
              <span className="tag gallery-badge">OCEANIC SCENT</span>
              {gallery === 'front' ? (
                <Packshot priority sizes="(max-width: 760px) 85vw, 40vw" />
              ) : (
                <img
                  src="/assets/sealsi-rear-mockup.webp"
                  alt="Vue arrière de la bouteille SEALSI et de son étiquette"
                  width={950}
                  height={1267}
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>
            <div className="gallery-switch" role="group" aria-label="Choisir la vue du produit">
              <button
                type="button"
                aria-pressed={gallery === 'front'}
                onClick={() => setGallery('front')}
              >
                Face avant
              </button>
              <button
                type="button"
                aria-pressed={gallery === 'rear'}
                onClick={() => setGallery('rear')}
              >
                Étiquette
              </button>
            </div>
          </div>

          <div className="product-detail">
            <span className="eyebrow">LA LESSIVE LIQUIDE SEALSI</span>
            <h1 id="product-title">Oceanic Scent</h1>
            <p className="product-subtitle">L’inspiration marine, pour votre linge.</p>

            <div className="benefit-tags">
              <span className="tag">5 L</span>
              <span className="tag">100 lavages*</span>
              <span className="tag">4 en 1</span>
            </div>

            <p>
              Parfum, nettoyant, adoucissant et anti-taches : les quatre fonctions réunies sur
              l’emballage SEALSI, dans un grand format pensé pour vos besoins.
            </p>

            <div className="order-box">
              <span className="field-label" id="product-quantity-label">
                Votre quantité
              </span>
              <div className="quantity-row">
                <QuantityStepper
                  text={quantity.text}
                  value={cartons}
                  error={quantity.error}
                  inputId="quantity"
                  describedBy="quantity-error"
                  onChange={quantity.setText}
                  onStep={quantity.step}
                />
                <div className="quantity-explain">
                  <strong>carton(s) de {PRODUCT.bottlesPerCarton} bouteilles</strong>
                  <br />
                  {cartons === null ? '—' : bottlesFor(cartons)} bouteilles /{' '}
                  {cartons === null ? '—' : litresFor(cartons)} litres au total
                </div>
              </div>
              <p id="quantity-error" className="error" aria-live="polite">
                {quantity.error}
              </p>
              <button
                type="button"
                className="btn btn-primary full"
                disabled={cartons === null}
                onClick={() => {
                  if (cartons !== null) onAdd(cartons)
                }}
              >
                Ajouter à ma sélection <Icon name="arrow" />
              </button>
              <p className="small">
                Tarif, disponibilité et livraison confirmés selon votre demande.
              </p>
            </div>

            <div className="detail-list" id="conseils">
              <details open>
                <summary>Dosage et nombre de lavages</summary>
                <p>
                  *100 lavages sur la base d’une dose de 50 ml. Ajuster à la charge, au degré de
                  salissure et à la dureté de l’eau. Se référer à l’étiquette du produit.
                </p>
              </details>
              <details>
                <summary>Conseils et précautions</summary>
                <p>
                  Respecter l’étiquette des textiles et les instructions de la machine. Conserver
                  hors de portée des enfants et lire les précautions sur l’emballage avant
                  utilisation.
                </p>
              </details>
              <details>
                <summary>Conditionnement</summary>
                <p>
                  Une bouteille contient 5 litres. Un carton contient 3 bouteilles, soit 15
                  litres. Les commandes sont préparées en nombres entiers de cartons.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>

      <ContactRibbon onNavigate={onNavigate} />
    </main>
  )
}

