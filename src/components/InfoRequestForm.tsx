import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  COMMERCE,
  CONTACT,
  REQUEST_ENDPOINT,
  buildInfoMessage,
  buildInfoSubject,
  buildReference,
  mailtoLink,
  whatsappLink,
} from '../config/business'
import type { InfoAudience, InfoRequestDetails } from '../config/business'
import type { PageId } from '../data/site'
import type { Copy } from '../i18n/copy'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'

type InfoRequestFormProps = {
  audience: InfoAudience
  onNavigate: (page: PageId, section?: string) => void
}

type FormValues = {
  company: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type DialogMode = 'handoff' | 'sent' | 'error'
type CopyState = 'idle' | 'copied' | 'error'

const INITIAL_VALUES: FormValues = {
  company: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  consent: false,
}

const PHONE_PATTERN = /^[+0-9 ()-]{8,20}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(
  values: FormValues,
  audience: InfoAudience,
  copy: Copy,
): FormErrors {
  const next: FormErrors = {}

  if (audience === 'professional' && !values.company.trim()) {
    next.company = copy.infoRequest.errors.company
  }
  if (audience === 'reseller' && !values.name.trim()) {
    next.name = copy.infoRequest.errors.name
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) next.email = copy.request.errors.email
  if (!PHONE_PATTERN.test(values.phone.trim())) next.phone = copy.request.errors.phone
  if (!values.address.trim()) next.address = copy.infoRequest.errors.address
  if (!values.city.trim()) next.city = copy.request.errors.city
  if (!values.consent) next.consent = copy.request.errors.consent

  return next
}

/**
 * Short information-request form shown on the professional and reseller pages.
 * It asks only for contact details — no quantity, since the volume buttons
 * already carry a carton count to `/demande`.
 */
export function InfoRequestForm({ audience, onNavigate }: InfoRequestFormProps) {
  const { c, lang, hrefFor } = useLanguage()
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [lastRequest, setLastRequest] = useState<InfoRequestDetails | null>(null)
  const [dialogMode, setDialogMode] = useState<DialogMode | null>(null)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const dialogRef = useRef<HTMLDialogElement>(null)

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

    const nextErrors = validate(values, audience, c)
    setErrors(nextErrors)
    const fieldOrder: Array<keyof FormValues> =
      audience === 'professional'
        ? ['company', 'email', 'phone', 'address', 'city', 'consent']
        : ['name', 'email', 'phone', 'address', 'city', 'consent']
    const firstInvalid = fieldOrder.find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(`info-${firstInvalid}`)?.focus()
      return
    }

    const details: InfoRequestDetails = {
      reference: buildReference(),
      createdAt: new Date().toISOString(),
      audience,
      company: values.company.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
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
  const describedBy = (field: keyof FormValues) =>
    errors[field] ? `info-${field}-error` : undefined
  const recapMessage = lastRequest
    ? buildInfoMessage(lastRequest, c.infoRequest.recap, lang === 'ar' ? 'ar-MA' : 'fr-FR')
    : ''
  const subject = lastRequest ? buildInfoSubject(lastRequest, c.infoRequest.recap) : ''

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
    <section className="section info-section" id="infos" aria-labelledby="infos-title">
      <div className="wrap info-grid">
        <div className="info-intro">
          <span className="eyebrow">{c.infoRequest.eyebrow}</span>
          <h2 id="infos-title">{c.infoRequest.title}</h2>
          <p className="lead">{c.infoRequest.lead}</p>

          <div className="form-direct">
            <h3>{c.request.directTitle}</h3>
            <p>{c.request.directLead}</p>
            <div className="form-direct-links">
              <a
                href={whatsappLink(c.infoRequest.directMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> WhatsApp
              </a>
              <a href={CONTACT.phoneHref} dir="ltr">
                <Icon name="phone" /> {CONTACT.phoneDisplay}
              </a>
              <a
                href={mailtoLink(c.infoRequest.mailSubject, c.infoRequest.directMessage)}
                dir="ltr"
              >
                <Icon name="mail" /> {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="info-panel">
          <form className="info-form" noValidate onSubmit={handleSubmit}>
            {hasErrors ? (
              <p className="form-alert" role="alert">
                {c.request.formAlert}
              </p>
            ) : null}

            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="info-website">Site web</label>
              <input
                id="info-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <div className="form-grid">
              {audience === 'professional' ? (
                <div className="field full-row">
                  <label htmlFor="info-company">{c.infoRequest.companyLabel}</label>
                  <input
                    id="info-company"
                    name="company"
                    autoComplete="organization"
                    required
                    placeholder={c.infoRequest.companyPlaceholder}
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={describedBy('company')}
                  />
                  {errors.company ? (
                    <p className="field-error" id="info-company-error">
                      {errors.company}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="field full-row">
                  <label htmlFor="info-name">{c.infoRequest.nameLabel}</label>
                  <input
                    id="info-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder={c.infoRequest.namePlaceholder}
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                  />
                  {errors.name ? (
                    <p className="field-error" id="info-name-error">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
              )}

              <div className="field full-row">
                <label htmlFor="info-email">{c.infoRequest.emailLabel}</label>
                <input
                  id="info-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                  placeholder={c.infoRequest.emailPlaceholder}
                  value={values.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy('email')}
                />
                {errors.email ? (
                  <p className="field-error" id="info-email-error">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="info-phone">{c.infoRequest.phoneLabel}</label>
                <input
                  id="info-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  required
                  pattern="[+0-9 ()-]{8,20}"
                  placeholder={c.infoRequest.phonePlaceholder}
                  value={values.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={describedBy('phone')}
                />
                {errors.phone ? (
                  <p className="field-error" id="info-phone-error">
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="info-city">{c.infoRequest.cityLabel}</label>
                <input
                  id="info-city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  placeholder={c.infoRequest.cityPlaceholder}
                  value={values.city}
                  onChange={(event) => update('city', event.target.value)}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={describedBy('city')}
                />
                {errors.city ? (
                  <p className="field-error" id="info-city-error">
                    {errors.city}
                  </p>
                ) : null}
              </div>

              <div className="field full-row">
                <label htmlFor="info-address">{c.infoRequest.addressLabel}</label>
                <input
                  id="info-address"
                  name="address"
                  autoComplete="street-address"
                  required
                  placeholder={c.infoRequest.addressPlaceholder}
                  value={values.address}
                  onChange={(event) => update('address', event.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={describedBy('address')}
                />
                {errors.address ? (
                  <p className="field-error" id="info-address-error">
                    {errors.address}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="consent-field">
              <label className="consent" htmlFor="info-consent">
                <input
                  id="info-consent"
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
                <p className="field-error" id="info-consent-error">
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
                  {c.infoRequest.submit} <Icon name="arrow" />
                </>
              )}
            </button>
            <p className="small muted form-footnote">{c.infoRequest.footnote}</p>
          </form>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="demo-dialog"
        aria-labelledby="info-dialog-title"
        onClose={closeDialog}
      >
        <div className="demo-dialog-inner">
          {dialogMode === 'sent' && lastRequest ? (
            <>
              <span className="eyebrow">{c.request.dialog.sentEyebrow}</span>
              <h2 id="info-dialog-title">{c.request.dialog.sentTitle}</h2>
              <p className="dialog-reference">
                {c.request.dialog.reference} <strong>{lastRequest.reference}</strong>
              </p>
              <p>{c.infoRequest.sentNote}</p>
              <p className="small muted">{c.request.dialog.sentSmall}</p>
              <form method="dialog">
                <button className="btn btn-primary">{c.request.dialog.close}</button>
              </form>
            </>
          ) : null}

          {dialogMode === 'handoff' && lastRequest ? (
            <>
              <span className="eyebrow">{c.request.dialog.handoffEyebrow}</span>
              <h2 id="info-dialog-title">{c.request.dialog.handoffTitle}</h2>
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
              <h2 id="info-dialog-title">{c.request.dialog.errorTitle}</h2>
              <p>{c.request.dialog.errorLead}</p>
              {handoffActions}
              <form method="dialog">
                <button className="btn btn-quiet">{c.request.dialog.close}</button>
              </form>
            </>
          ) : null}
        </div>
      </dialog>
    </section>
  )
}
