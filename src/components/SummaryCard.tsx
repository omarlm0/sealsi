import { PRODUCT } from '../data/site'
import { bottlesFor, litresFor } from '../lib/cart'
import { useLanguage } from '../i18n/LanguageContext'
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
  const { c } = useLanguage()

  return (
    <aside
      className={`summary-card${light ? ' summary-light' : ''}`}
      aria-labelledby="summary-title"
    >
      <h2 id="summary-title" className="summary-title">
        {c.summary.title}
      </h2>

      <dl>
        <div>
          <dt>{c.summary.product}</dt>
          <dd>{PRODUCT.name}</dd>
        </div>
        <div>
          <dt>{c.summary.cartons}</dt>
          <dd>{cartons}</dd>
        </div>
        <div>
          <dt>{c.summary.bottles}</dt>
          <dd>{bottlesFor(cartons)}</dd>
        </div>
        <div>
          <dt>{c.summary.volume}</dt>
          <dd>{litresFor(cartons)} L</dd>
        </div>
      </dl>

      <div className="divider" />

      <dl>
        <div>
          <dt>{c.summary.price}</dt>
          <dd>{c.summary.onConfirmation}</dd>
        </div>
        <div>
          <dt>{c.summary.delivery}</dt>
          <dd>{c.summary.byCity}</dd>
        </div>
      </dl>

      <div className="divider" />

      <span className="small">{c.summary.amount}</span>
      <div className="summary-price">{c.summary.quote}</div>

      {final ? null : (
        <button
          type="button"
          className="btn btn-gold full"
          onClick={onContinue}
          disabled={continueDisabled}
        >
          {c.summary.continue} <Icon name="arrow" />
        </button>
      )}

      <p className="summary-disclaimer">{c.summary.disclaimer}</p>
    </aside>
  )
}
