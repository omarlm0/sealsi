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
import { PRODUCT, href } from '../data/site'
import type { PageId } from '../data/site'
import { bottlesFor, litresFor } from '../lib/cart'
import { useCartonInput } from '../lib/useCartonInput'
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

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Indiquez votre nom et prénom.'
  if (!/^[+0-9 ()-]{8,20}$/.test(values.phone.trim())) {
    errors.phone = 'Indiquez un numéro de téléphone valide (8 à 20 caractères).'
  }
  if (!values.city.trim()) errors.city = 'Indiquez votre ville.'
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Indiquez une adresse e-mail valide.'
  }
  if (!values.consent) {
    errors.consent = 'Veuillez accepter l’utilisation de vos coordonnées pour cette demande.'
  }
  return errors
}

export function RequestPage({ cartons, onCartonsChange, onNavigate }: RequestPageProps) {
  const quantity = useCartonInput(cartons)
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

    const nextErrors = validate(values)
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
      type: values.company.trim() ? 'Professionnel / revendeur' : 'Particulier',
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
      setSubmitError(
        'L’envoi automatique n’a pas abouti. Réessayez ou transmettez votre demande via WhatsApp ou e-mail.',
      )
      setDialogMode('error')
    } finally {
      setSubmitting(false)
    }
  }

  const copyMessage = async () => {
    if (!lastRequest) return
    try {
      await navigator.clipboard.writeText(buildRequestMessage(lastRequest))
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
  const message = lastRequest ? buildRequestMessage(lastRequest) : ''
  const subject = lastRequest ? buildRequestSubject(lastRequest) : ''
  const directMessage =
    'Bonjour SEALSI, je souhaite des informations sur la lessive Oceanic Scent 5 L.'

  const handoffActions = lastRequest ? (
    <>
      <p className="dialog-reference">
        Référence : <strong>{lastRequest.reference}</strong>
      </p>
      <div className="dialog-actions">
        <a
          className="btn btn-primary full"
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" /> Envoyer sur WhatsApp
        </a>
        <a className="btn btn-outline full" href={mailtoLink(subject, message)}>
          <Icon name="mail" /> Envoyer par e-mail
        </a>
        <button type="button" className="btn btn-quiet full" onClick={copyMessage}>
          <Icon name="copy" />
          {copyState === 'copied' ? 'Récapitulatif copié' : 'Copier le récapitulatif'}
        </button>
      </div>
      {copyState === 'error' ? (
        <p className="field-error" role="alert">
          La copie automatique est indisponible. Sélectionnez le texte du message ou utilisez
          WhatsApp / e-mail.
        </p>
      ) : null}
      <p className="small muted">
        Le message contient vos coordonnées et votre sélection. Vérifiez-le avant l’envoi.
      </p>
    </>
  ) : null

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <div className="page-head">
          <nav className="breadcrumb" aria-label="Fil d’Ariane">
            <a
              href={href('accueil')}
              onClick={(event) => {
                event.preventDefault()
                onNavigate('accueil')
              }}
            >
              Accueil
            </a>{' '}
            / Ma commande
          </nav>

          <ol className="order-steps" aria-label="Étapes de la commande">
            <li>
              <b>01</b> Quantité
            </li>
            <li>
              <b>02</b> Coordonnées
            </li>
            <li>
              <b>03</b> Confirmation SEALSI
            </li>
          </ol>

          <h1>Votre commande, simplement.</h1>
          <p className="lead">
            Choisissez vos cartons et laissez vos coordonnées. Nous confirmons ensemble le tarif
            et la livraison avant validation.
          </p>
        </div>

        <section className="checkout-grid">
          <form id="request-form" className="request-form" noValidate onSubmit={handleSubmit}>
            <section className="form-panel" aria-labelledby="quantity-title">
              <div className="panel-head">
                <span className="panel-index" aria-hidden="true">
                  1
                </span>
                <h2 id="quantity-title">Votre quantité</h2>
              </div>

              <div className="order-product">
                <div className="order-thumb">
                  <Packshot sizes="96px" />
                </div>
                <div>
                  <h3>{PRODUCT.name}</h3>
                  <p>Lessive liquide · Bouteille 5 L</p>
                  <span className="tag">
                    1 carton = {PRODUCT.bottlesPerCarton} bouteilles ={' '}
                    {PRODUCT.litresPerCarton} L
                  </span>
                </div>
              </div>

              <div className="order-qty-row">
                <div>
                  <span className="field-label" id="quantity-label">
                    Nombre de cartons
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
                <div className="quantity-presets" role="group" aria-label="Quantités rapides">
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
                      {preset} carton{preset > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="order-qty-result">
                {quantity.value === null ? (
                  <span>Choisissez au moins un carton pour continuer.</span>
                ) : (
                  <>
                    <span>
                      <strong>{quantity.value}</strong> carton
                      {quantity.value > 1 ? 's' : ''} sélectionné
                      {quantity.value > 1 ? 's' : ''}
                    </span>
                    <span>
                      {bottlesFor(quantity.value)} bouteilles · {litresFor(quantity.value)} L
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
                <h2 id="contact-title">Où vous contacter ?</h2>
              </div>

              {hasErrors ? (
                <p className="form-alert" role="alert">
                  Vérifiez les champs signalés ci-dessous.
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
                  <label htmlFor="name">Nom et prénom *</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Votre nom"
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
                    Société / commerce <span className="optional">facultatif</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Votre établissement"
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Téléphone *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    pattern="[+0-9 ()-]{8,20}"
                    placeholder="06 XX XX XX XX"
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
                  <label htmlFor="city">Ville *</label>
                  <input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    placeholder="Votre ville"
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
                    E-mail <span className="optional">facultatif</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Votre adresse e-mail"
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
                    Un détail à préciser ? <span className="optional">facultatif</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Livraison, quantité régulière, question…"
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
                  <span>
                    J’accepte que mes coordonnées soient utilisées pour traiter cette demande et me
                    recontacter à ce sujet.
                  </span>
                </label>
                {errors.consent ? (
                  <p className="field-error" id="consent-error">
                    {errors.consent}
                  </p>
                ) : null}
                <p className="consent-note">
                  Les informations sont conservées {COMMERCE.dataRetentionMonths} mois après le
                  dernier contact et ne sont ni vendues ni utilisées pour de la prospection non
                  sollicitée. Consultez la{' '}
                  <a
                    href={href('confidentialite')}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate('confidentialite')
                    }}
                  >
                    politique de confidentialité
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
                  'Envoi en cours…'
                ) : (
                  <>
                    Demander la confirmation <Icon name="arrow" />
                  </>
                )}
              </button>
              <p className="small muted form-footnote">
                Aucun paiement à cette étape. La commande devient définitive après votre accord sur
                le tarif et les modalités.
              </p>

              <div className="form-direct">
                <h2>Vous préférez échanger directement ?</h2>
                <p>
                  Notre équipe peut répondre à vos questions sur la quantité, la livraison ou les
                  conditions professionnelles.
                </p>
                <div className="form-direct-links">
                  <a
                    href={whatsappLink(directMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" /> WhatsApp
                  </a>
                  <a href={CONTACT.phoneHref}>
                    <Icon name="phone" /> {CONTACT.phoneDisplay}
                  </a>
                  <a href={mailtoLink('Demande d’information SEALSI', directMessage)}>
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
              <span className="eyebrow">DEMANDE ENREGISTRÉE</span>
              <h2 id="request-dialog-title">Merci, votre demande est partie.</h2>
              <p className="dialog-reference">
                Référence : <strong>{lastRequest.reference}</strong>
              </p>
              <p>{COMMERCE.responseNote}</p>
              <p className="small muted">
                Conservez cette référence pour faciliter nos échanges. Aucun paiement n’a été
                demandé.
              </p>
              <form method="dialog">
                <button className="btn btn-primary">Fermer</button>
              </form>
            </>
          ) : null}

          {dialogMode === 'handoff' && lastRequest ? (
            <>
              <span className="eyebrow">DERNIÈRE ÉTAPE</span>
              <h2 id="request-dialog-title">Transmettez votre demande.</h2>
              <p>
                Votre récapitulatif est prêt. Choisissez WhatsApp ou l’e-mail pour l’envoyer à
                SEALSI. <strong>Aucune donnée n’a encore été transmise.</strong>
              </p>
              {handoffActions}
              <form method="dialog">
                <button className="btn btn-quiet">Fermer</button>
              </form>
            </>
          ) : null}

          {dialogMode === 'error' && lastRequest ? (
            <>
              <span className="eyebrow">ENVOI INTERROMPU</span>
              <h2 id="request-dialog-title">La transmission automatique a échoué.</h2>
              <p>
                Vos informations restent dans le formulaire. Réessayez, ou envoyez le
                récapitulatif ci-dessous via WhatsApp ou e-mail.
              </p>
              {handoffActions}
              <form method="dialog">
                <button className="btn btn-quiet">Fermer</button>
              </form>
            </>
          ) : null}
        </div>
      </dialog>
    </main>
  )
}
