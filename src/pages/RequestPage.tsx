import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  COMMERCE,
  CONTACT,
  REQUEST_ENDPOINT,
  buildReference,
  buildRequestMessage,
  buildRequestSubject,
  mailtoLink,
  whatsappLink,
} from '../config/business'
import type { RequestDetails } from '../config/business'
import { PRODUCT } from '../data/site'
import type { PageId } from '../data/site'
import type { Copy } from '../i18n/copy'
import { bottlesFor, litresFor } from '../lib/cart'
import { useCartonInput } from '../lib/useCartonInput'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from '../components/Icon'
import { Packshot } from '../components/Packshot'
import { QuantityStepper } from '../components/QuantityStepper'
import { SummaryCard } from '../components/SummaryCard'

type RequestPageProps = {
  cartons: number
  onCartonsChange: (cartons: number) => void
  onNavigate: (page: PageId, section?: string) => void
}

type FormValues = {
  name: string
  company: string
  phone: string
  city: string
  email: string
  message: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type DialogMode = 'handoff' | 'sent' | 'error'
type CopyState = 'idle' | 'copied' | 'error'

const PRESETS = [1, 5, 10, 30]

const INITIAL_VALUES: FormValues = {
  name: '',
  company: '',
  phone: '',
  city: '',
  email: '',
  message: '',
  consent: false,
}

const FIELD_ORDER: Array<keyof FormValues> = ['name', 'phone', 'city', 'email', 'consent']

function validate(values: FormValues, errors: Copy['request']['errors']): FormErrors {
  const next: FormErrors = {}
  if (!values.name.trim()) next.name = errors.name
  if (!/^[+0-9 ()-]{8,20}$/.test(values.phone.trim())) next.phone = errors.phone
  if (!values.city.trim()) next.city = errors.city
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    next.email = errors.email
  }
  if (!values.consent) next.consent = errors.consent
  return next
}

export function RequestPage({ cartons, onCartonsChange, onNavigate }: RequestPageProps) {
  const { c, lang, hrefFor } = useLanguage()
  const quantity = useCartonInput(
    cartons,
    c.stepper.error(PRODUCT.minimumCartons, PRODUCT.maximumCartons),
  )
  const [quantityTouched, setQuantityTouched] = useState(false)
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [lastRequest, setLastRequest] = useState<RequestDetails | null>(null)
  const [dialogMode, setDialogMode] = useState<DialogMode | null>(null)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const dialogRef = useRef<HTMLDialogElement>(null)

  const shownCartons = quantity.value ?? 0
  const quantityError = quantityTouched ? quantity.error : ''

  // Keep the header badge and localStorage in sync while the visitor adjusts
  // the quantity on the combined page.
  useEffect(() => {
    onCartonsChange(quantity.value ?? 0)
  }, [quantity.value, onCartonsChange])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (dialogMode && !dialog.open) dialog.showModal()
    if (!dialogMode && dialog.open) dialog.close()
  }, [dialogMode])

  useEffect(() => {
    if (copyState !== 'copied') return
    const timer = window.setTimeout(() => setCopyState('idle'), 3000)
    return () => window.clearTimeout(timer)
  }, [copyState])

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    // Step 1 lives on this page too: block submission until a valid whole
    // number of cartons is selected.
    if (quantity.value === null) {
      setQuantityTouched(true)
      document.getElementById('quantity')?.focus()
      return
    }

    const nextErrors = validate(values, c.request.errors)
    setErrors(nextErrors)
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }

    const selectedCartons = quantity.value
    const details: RequestDetails = {
      reference: buildReference(),
      createdAt: new Date().toISOString(),
      product: `${PRODUCT.name} ${PRODUCT.volumeL} L`,
      cartons: selectedCartons,
      bottles: bottlesFor(selectedCartons),
      litres: litresFor(selectedCartons),
      type: values.company.trim() ? c.request.typePro : c.request.typeIndividual,
      name: values.name.trim(),
      company: values.company.trim(),
      phone: values.phone.trim(),
      city: values.city.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    }

    setLastRequest(details)
    setSubmitError('')
    setCopyState('idle')

    // Honeypot: a real visitor never fills this hidden field. Bots get a
    // success-looking dialog without any network request or data transfer.
    if (honeypot.trim()) {
      setDialogMode('sent')
      return
    }

    if (!REQUEST_ENDPOINT) {
      setDialogMode('handoff')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(details),
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      setDialogMode('sent')
    } catch {
      setSubmitError(c.request.errors.submit)
      setDialogMode('error')
    } finally {
      setSubmitting(false)
    }
  }

  const copyMessage = async () => {
    if (!lastRequest) return
    try {
      await navigator.clipboard.writeText(recapMessage)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  const closeDialog = () => {
    setDialogMode(null)
    setCopyState('idle')
  }

  const hasErrors = Object.keys(errors).length > 0
  const describedBy = (field: keyof FormValues) => (errors[field] ? `${field}-error` : undefined)
  const recapMessage = lastRequest
    ? buildRequestMessage(lastRequest, c.request.recap, lang === 'ar' ? 'ar-MA' : 'fr-FR')
    : ''
  const subject = lastRequest ? buildRequestSubject(lastRequest, c.request.recap) : ''
  const directMessage = c.request.directMessage

  const handoffActions = lastRequest ? (
    <>
      <p className="dialog-reference">
        {c.request.dialog.reference} <strong>{lastRequest.reference}</strong>
      </p>
      <div className="dialog-actions">
        <a
          className="btn btn-primary full"
          href={whatsappLink(recapMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" /> {c.request.dialog.whatsapp}
        </a>
        <a className="btn btn-outline full" href={mailtoLink(subject, recapMessage)}>
          <Icon name="mail" /> {c.request.dialog.email}
        </a>
        <button type="button" className="btn btn-quiet full" onClick={copyMessage}>
          <Icon name="copy" />
          {copyState === 'copied' ? c.request.dialog.copied : c.request.dialog.copy}
        </button>
      </div>
      {copyState === 'error' ? (
        <p className="field-error" role="alert">
          {c.request.dialog.copyError}
        </p>
      ) : null}
      <p className="small muted">{c.request.dialog.handoffSmall}</p>
    </>
  ) : null

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <div className="page-head">
          <nav className="breadcrumb" aria-label={c.common.breadcrumbAria}>
            <a
              href={hrefFor('accueil')}
              onClick={(event) => {
                event.preventDefault()
                onNavigate('accueil')
              }}
            >
              {c.common.home}
            </a>{' '}
            / {c.request.breadcrumbCurrent}
          </nav>

          <ol className="order-steps" aria-label={c.request.stepsAria}>
            {c.request.steps.map((step, index) => (
              <li key={step}>
                <b>{String(index + 1).padStart(2, '0')}</b> {step}
              </li>
            ))}
          </ol>

          <h1>{c.request.title}</h1>
          <p className="lead">{c.request.lead}</p>
        </div>

        <section className="checkout-grid">
          <form id="request-form" className="request-form" noValidate onSubmit={handleSubmit}>
            <section className="form-panel" aria-labelledby="quantity-title">
              <div className="panel-head">
                <span className="panel-index" aria-hidden="true">
                  1
                </span>
                <h2 id="quantity-title">{c.request.quantityTitle}</h2>
              </div>

              <div className="order-product">
                <div className="order-thumb">
                  <Packshot sizes="96px" alt={c.common.packshotAlt} />
                </div>
                <div>
                  <h3>{PRODUCT.name}</h3>
                  <p>{c.request.liquidBottle}</p>
                  <span className="tag">
                    {c.request.cartonContents(
                      PRODUCT.bottlesPerCarton,
                      PRODUCT.litresPerCarton,
                    )}
                  </span>
                </div>
              </div>

              <div className="order-qty-row">
                <div>
                  <span className="field-label" id="quantity-label">
                    {c.request.cartonsLabel}
                  </span>
                  <QuantityStepper
                    text={quantity.text}
                    value={quantity.value}
                    error={quantityError}
                    inputId="quantity"
                    describedBy="quantity-error"
                    onChange={(text) => {
                      setQuantityTouched(true)
                      quantity.setText(text)
                    }}
                    onStep={(delta) => {
                      setQuantityTouched(true)
                      quantity.step(delta)
                    }}
                  />
                </div>
                <div className="quantity-presets" role="group" aria-label={c.request.presetsAria}>
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      aria-pressed={quantity.value === preset}
                      onClick={() => {
                        setQuantityTouched(true)
                        quantity.setCartons(preset)
                      }}
                    >
                      {c.request.cartonsOption(preset)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="order-qty-result">
                {quantity.value === null ? (
                  <span>{c.request.selectAtLeastOne}</span>
                ) : (
                  <>
                    <span>{c.request.selected(quantity.value)}</span>
                    <span>
                      {c.request.bottlesLitres(
                        bottlesFor(quantity.value),
                        litresFor(quantity.value),
                      )}
                    </span>
                  </>
                )}
              </div>
              <p id="quantity-error" className="error" aria-live="polite">
                {quantityError}
              </p>
            </section>

            <section className="form-panel" aria-labelledby="contact-title">
              <div className="panel-head">
                <span className="panel-index" aria-hidden="true">
                  2
                </span>
                <h2 id="contact-title">{c.request.contactTitle}</h2>
              </div>

              {hasErrors ? (
                <p className="form-alert" role="alert">
                  {c.request.formAlert}
                </p>
              ) : null}

              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="website">Site web</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">{c.request.fields.nameLabel}</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder={c.request.fields.namePlaceholder}
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                  />
                  {errors.name ? (
                    <p className="field-error" id="name-error">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="company">
                    {c.request.fields.companyLabel}{' '}
                    <span className="optional">{c.request.fields.optional}</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder={c.request.fields.companyPlaceholder}
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">{c.request.fields.phoneLabel}</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    required
                    pattern="[+0-9 ()-]{8,20}"
                    placeholder={c.request.fields.phonePlaceholder}
                    value={values.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={describedBy('phone')}
                  />
                  {errors.phone ? (
                    <p className="field-error" id="phone-error">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="city">{c.request.fields.cityLabel}</label>
                  <input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    placeholder={c.request.fields.cityPlaceholder}
                    value={values.city}
                    onChange={(event) => update('city', event.target.value)}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={describedBy('city')}
                  />
                  {errors.city ? (
                    <p className="field-error" id="city-error">
                      {errors.city}
                    </p>
                  ) : null}
                </div>

                <div className="field full-row">
                  <label htmlFor="email">
                    {c.request.fields.emailLabel}{' '}
                    <span className="optional">{c.request.fields.optional}</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder={c.request.fields.emailPlaceholder}
                    value={values.email}
                    onChange={(event) => update('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                  />
                  {errors.email ? (
                    <p className="field-error" id="email-error">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="field full-row">
                  <label htmlFor="message">
                    {c.request.fields.messageLabel}{' '}
                    <span className="optional">{c.request.fields.optional}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={c.request.fields.messagePlaceholder}
                    maxLength={1000}
                    value={values.message}
                    onChange={(event) => update('message', event.target.value)}
                  />
                </div>
              </div>

              <div className="consent-field">
                <label className="consent" htmlFor="consent">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={values.consent}
                    onChange={(event) => update('consent', event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={describedBy('consent')}
                  />
                  <span>{c.request.consent}</span>
                </label>
                {errors.consent ? (
                  <p className="field-error" id="consent-error">
                    {errors.consent}
                  </p>
                ) : null}
                <p className="consent-note">
                  {c.request.consentNote(COMMERCE.dataRetentionMonths)}
                  <a
                    href={hrefFor('confidentialite')}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate('confidentialite')
                    }}
                  >
                    {c.request.privacyLink}
                  </a>
                  .
                </p>
              </div>

              {submitError ? (
                <p className="form-alert" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button className="btn btn-primary full" type="submit" disabled={submitting}>
                {submitting ? (
                  c.request.submitting
                ) : (
                  <>
                    {c.request.submit} <Icon name="arrow" />
                  </>
                )}
              </button>
              <p className="small muted form-footnote">{c.request.footnote}</p>

              <div className="form-direct">
                <h2>{c.request.directTitle}</h2>
                <p>{c.request.directLead}</p>
                <div className="form-direct-links">
                  <a
                    href={whatsappLink(directMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" /> WhatsApp
                  </a>
                  <a href={CONTACT.phoneHref} dir="ltr">
                    <Icon name="phone" /> {CONTACT.phoneDisplay}
                  </a>
                  <a href={mailtoLink(c.request.mailSubject, directMessage)} dir="ltr">
                    <Icon name="mail" /> {CONTACT.email}
                  </a>
                </div>
              </div>
            </section>
          </form>

          <SummaryCard cartons={shownCartons} light final />
        </section>
      </div>

      <dialog
        ref={dialogRef}
        className="demo-dialog"
        aria-labelledby="request-dialog-title"
        onClose={closeDialog}
      >
        <div className="demo-dialog-inner">
          {dialogMode === 'sent' && lastRequest ? (
            <>
              <span className="eyebrow">{c.request.dialog.sentEyebrow}</span>
              <h2 id="request-dialog-title">{c.request.dialog.sentTitle}</h2>
              <p className="dialog-reference">
                {c.request.dialog.reference} <strong>{lastRequest.reference}</strong>
              </p>
              <p>{c.request.dialog.sentNote}</p>
              <p className="small muted">{c.request.dialog.sentSmall}</p>
              <form method="dialog">
                <button className="btn btn-primary">{c.request.dialog.close}</button>
              </form>
            </>
          ) : null}

          {dialogMode === 'handoff' && lastRequest ? (
            <>
              <span className="eyebrow">{c.request.dialog.handoffEyebrow}</span>
              <h2 id="request-dialog-title">{c.request.dialog.handoffTitle}</h2>
              <p>{c.request.dialog.handoffLead}</p>
              {handoffActions}
              <form method="dialog">
                <button className="btn btn-quiet">{c.request.dialog.close}</button>
              </form>
            </>
          ) : null}

          {dialogMode === 'error' && lastRequest ? (
            <>
              <span className="eyebrow">{c.request.dialog.errorEyebrow}</span>
              <h2 id="request-dialog-title">{c.request.dialog.errorTitle}</h2>
              <p>{c.request.dialog.errorLead}</p>
              {handoffActions}
              <form method="dialog">
                <button className="btn btn-quiet">{c.request.dialog.close}</button>
              </form>
            </>
          ) : null}
        </div>
      </dialog>
    </main>
  )
}
