import { PRODUCT } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
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
  const { c } = useLanguage()
  const invalid = Boolean(error)
  const helpId = `${inputId}-help`

  return (
    <div className="stepper">
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label={c.stepper.remove}
        aria-controls={inputId}
        disabled={value === null || value <= PRODUCT.minimumCartons}
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
        placeholder="0"
        required
        value={text}
        onChange={(event) => onChange(event.target.value)}
        aria-label={c.stepper.inputAria}
        aria-required="true"
        aria-invalid={invalid}
        aria-describedby={[helpId, describedBy].filter(Boolean).join(' ')}
      />
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label={c.stepper.add}
        aria-controls={inputId}
        disabled={value !== null && value >= PRODUCT.maximumCartons}
      >
        <Icon name="plus" />
      </button>
      <span id={helpId} className="visually-hidden">
        {c.stepper.help(PRODUCT.minimumCartons, PRODUCT.maximumCartons)}
      </span>
    </div>
  )
}
