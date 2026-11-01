import { PRODUCT } from '../data/site'
import { bottlesFor, litresFor } from '../lib/cart'
import { Icon } from './Icon'

type SummaryCardProps = {
  cartons: number
  light?: boolean
  final?: boolean
  onContinue?: () => void
  continueDisabled?: boolean
}

export function SummaryCard({
  cartons,
  light = false,
  final = false,
  onContinue,
  continueDisabled = false,
}: SummaryCardProps) {
  return (
    <aside
      className={`summary-card${light ? ' summary-light' : ''}`}
      aria-labelledby="summary-title"
    >
      <h2 id="summary-title" className="summary-title">
        Votre récapitulatif
      </h2>

      <dl>
        <div>
          <dt>Produit</dt>
          <dd>{PRODUCT.name}</dd>
        </div>
        <div>
          <dt>Cartons</dt>
          <dd>{cartons}</dd>
        </div>
        <div>
          <dt>Bouteilles de 5 L</dt>
          <dd>{bottlesFor(cartons)}</dd>
        </div>
        <div>
          <dt>Volume total</dt>
          <dd>{litresFor(cartons)} L</dd>
        </div>
      </dl>

      <div className="divider" />

      <dl>
        <div>
          <dt>Tarif</dt>
          <dd>Sur confirmation</dd>
        </div>
        <div>
          <dt>Livraison</dt>
          <dd>Selon votre ville</dd>
        </div>
      </dl>

      <div className="divider" />

      <span className="small">Montant de la commande</span>
      <div className="summary-price">Sur devis</div>

      {final ? null : (
        <button
          type="button"
          className="btn btn-gold full"
          onClick={onContinue}
          disabled={continueDisabled}
        >
          Continuer <Icon name="arrow" />
        </button>
      )}

      <p className="summary-disclaimer">
        Votre demande permet de confirmer le prix et les modalités avant validation de la
        commande.
      </p>
    </aside>
  )
}
