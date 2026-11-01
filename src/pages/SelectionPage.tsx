import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { PRODUCT, href } from '../data/site'
import type { PageId } from '../data/site'
import { bottlesFor, litresFor } from '../lib/cart'
import { useCartonInput } from '../lib/useCartonInput'
import { ContactRibbon } from '../components/ContactRibbon'
import { Icon } from '../components/Icon'
import { Packshot } from '../components/Packshot'
import { QuantityStepper } from '../components/QuantityStepper'
import { SummaryCard } from '../components/SummaryCard'

type SelectionPageProps = {
  cartons: number
  onCartonsChange: (cartons: number) => void
  onNavigate: (page: PageId, section?: string) => void
}

const PRESETS = [1, 5, 10, 30]

export function SelectionPage({ cartons, onCartonsChange, onNavigate }: SelectionPageProps) {
  const quantity = useCartonInput(cartons)
  const shownCartons = quantity.value ?? cartons

  useEffect(() => {
    if (quantity.value !== null) onCartonsChange(quantity.value)
  }, [quantity.value, onCartonsChange])

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
            / Ma sélection
          </nav>
          <h1>Votre sélection.</h1>
          <p className="lead">Vos besoins, simplement exprimés en cartons.</p>
        </div>

        <section className="cart-layout" aria-label="Votre sélection de cartons">
          <div>
            <div className="cart-line">
              <div className="cart-thumb">
                <Packshot sizes="110px" />
              </div>
              <div className="cart-item-main">
                <span className="eyebrow">SEALSI / OCEANIC</span>
                <h2>{PRODUCT.name}</h2>
                <p>
                  Lessive liquide 5 L
                  <br />1 carton = 3 bouteilles = 15 litres
                </p>
                <div className="quantity-row">
                  <QuantityStepper
                    text={quantity.text}
                    value={quantity.value}
                    error={quantity.error}
                    inputId="quantity"
                    describedBy="quantity-error"
                    onChange={quantity.setText}
                    onStep={quantity.step}
                  />
                  <div className="quantity-explain">
                    Nombre de cartons
                    <br />
                    <strong>Quantité modifiable</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="quantity-presets" role="group" aria-label="Quantités rapides">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={quantity.value === preset}
                  onClick={() => quantity.setCartons(preset)}
                >
                  {preset} carton{preset > 1 ? 's' : ''}
                </button>
              ))}
            </div>

            <p id="quantity-error" className="error" aria-live="polite">
              {quantity.error}
            </p>

            <div className="volume-summary">
              <div>
                <strong>{shownCartons}</strong>
                <span>cartons</span>
              </div>
              <div>
                <strong>{bottlesFor(shownCartons)}</strong>
                <span>bouteilles</span>
              </div>
              <div>
                <strong>{litresFor(shownCartons)} L</strong>
                <span>de lessive</span>
              </div>
            </div>

            <div className="selection-note">
              <Icon name="check" />
              <p>Vous gardez la main sur la quantité jusqu’à la confirmation.</p>
            </div>

            <div className="subtle-panel">
              <h2>Un besoin professionnel ?</h2>
              <p>
                Indiquez votre société et votre ville à l’étape suivante. Nous pourrons préciser
                les conditions adaptées à votre demande.
              </p>
            </div>

            <div className="cart-side-note">
              <Icon name="shield" />
              <span>
                Aucun paiement demandé à cette étape. La commande sera confirmée après accord sur
                le tarif et les modalités.
              </span>
            </div>
          </div>

          <SummaryCard
            cartons={shownCartons}
            onContinue={() => onNavigate('demande')}
            continueDisabled={quantity.value === null}
          />
        </section>
      </div>

      <ContactRibbon onNavigate={onNavigate} />
    </main>
  )
}

