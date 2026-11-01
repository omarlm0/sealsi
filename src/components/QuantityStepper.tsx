import { PRODUCT } from '../data/site'
import { Icon } from './Icon'

type QuantityStepperProps = {
  text: string
  value: number | null
  error: string
  inputId: string
  describedBy?: string
  onChange: (text: string) => void
  onStep: (delta: 1 | -1) => void
}

export function QuantityStepper({
  text,
  value,
  error,
  inputId,
  describedBy,
  onChange,
  onStep,
}: QuantityStepperProps) {
  const invalid = Boolean(error)
  const helpId = `${inputId}-help`

  return (
    <div className="stepper">
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Retirer un carton"
        aria-controls={inputId}
        disabled={value !== null && value <= PRODUCT.minimumCartons}
      >
        <Icon name="minus" />
      </button>
      <input
        id={inputId}
        name="cartons"
        type="number"
        min={PRODUCT.minimumCartons}
        max={PRODUCT.maximumCartons}
        step={1}
        inputMode="numeric"
        value={text}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Nombre de cartons"
        aria-invalid={invalid}
        aria-describedby={[helpId, describedBy].filter(Boolean).join(' ')}
      />
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Ajouter un carton"
        aria-controls={inputId}
        disabled={value !== null && value >= PRODUCT.maximumCartons}
      >
        <Icon name="plus" />
      </button>
      <span id={helpId} className="visually-hidden">
        Entier compris entre {PRODUCT.minimumCartons} et {PRODUCT.maximumCartons} cartons.
      </span>
    </div>
  )
}
