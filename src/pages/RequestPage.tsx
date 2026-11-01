import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { PRODUCT, href } from '../data/site'
import type { PageId } from '../data/site'
import { bottlesFor, litresFor } from '../lib/cart'
import { Icon } from '../components/Icon'
import { SummaryCard } from '../components/SummaryCard'

type RequestPageProps = {
  cartons: number
  onNavigate: (page: PageId, section?: string) => void
}

type FormValues = {
  type: string
  name: string
  company: string
  phone: string
  city: string
  email: string
  message: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const INITIAL_VALUES: FormValues = {
  type: 'Professionnel / revendeur',
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

export function RequestPage({ cartons, onNavigate }: RequestPageProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (dialogOpen && !dialog.open) dialog.showModal()
    if (!dialogOpen && dialog.open) dialog.close()
  }, [dialogOpen])

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setDialogOpen(true)
  }

  const hasErrors = Object.keys(errors).length > 0
  const describedBy = (field: keyof FormValues) => (errors[field] ? `${field}-error` : undefined)

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <div className="page-head">
          <a
            className="back-link"
            href={href('selection')}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('selection')
            }}
          >
            <Icon name="arrow" /> Modifier ma sélection
          </a>
          <h1>Parlons de votre commande.</h1>
          <p className="lead">Quelques informations pour vous proposer la suite adaptée.</p>
        </div>

        <section className="checkout-grid">
          <form id="request-form" className="form-panel" noValidate onSubmit={handleSubmit}>
            <h2>Vos coordonnées</h2>

            {hasErrors ? (
              <p className="form-alert" role="alert">
                Vérifiez les champs signalés ci-dessous.
              </p>
            ) : null}

            <div className="form-grid">
              <div className="field full-row">
                <label htmlFor="type">Vous commandez en tant que</label>
                <select
                  id="type"
                  name="type"
                  value={values.type}
                  onChange={(event) => update('type', event.target.value)}
                >
                  <option>Professionnel / revendeur</option>
                  <option>Particulier</option>
                </select>
              </div>

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
                <label htmlFor="company">Société / commerce</label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Nom de votre établissement"
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
                  placeholder="Votre numéro de téléphone"
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
                <label htmlFor="email">E-mail</label>
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
                <label htmlFor="message">Votre besoin en quelques mots</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Précisez vos besoins ou vos questions."
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
            </div>

            <button className="btn btn-primary full" type="submit">
              Envoyer ma demande <Icon name="arrow" />
            </button>
            <p className="small muted form-footnote">
              La commande devient définitive après confirmation du tarif et des modalités.
              <br />
              Maquette locale : aucune donnée n’est envoyée.
            </p>
          </form>

          <SummaryCard cartons={cartons} light final />
        </section>
      </div>

      <dialog
        ref={dialogRef}
        className="demo-dialog"
        aria-labelledby="demo-dialog-title"
        onClose={() => setDialogOpen(false)}
      >
        <div className="demo-dialog-inner">
          <span className="eyebrow">MAQUETTE LOCALE</span>
          <h2 id="demo-dialog-title">Aucune demande n’a été envoyée.</h2>
          <p>
            Ce prototype n’est connecté à aucun serveur. Les informations saisies restent dans
            votre navigateur et ne sont transmises à personne.
          </p>
          <p>
            Votre sélection : <strong>{cartons} cartons</strong> ={' '}
            {bottlesFor(cartons)} bouteilles = {litresFor(cartons)} L (1 carton ={' '}
            {PRODUCT.bottlesPerCarton} bouteilles de {PRODUCT.volumeL} L).
          </p>
          <p>
            En production, la demande sera enregistrée avec un identifiant, puis l’équipe SEALSI
            vous recontactera pour confirmer le tarif et les modalités.
          </p>
          <form method="dialog">
            <button className="btn btn-primary">Fermer</button>
          </form>
        </div>
      </dialog>
    </main>
  )
}

