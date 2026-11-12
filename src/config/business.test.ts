import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  buildReference,
  buildRequestMessage,
  buildRequestSubject,
  mailtoLink,
  whatsappLink,
} from './business'
import type { RequestDetails } from './business'
import { COPY } from '../i18n/copy'

const RECAP_FR = COPY.fr.request.recap
const RECAP_AR = COPY.ar.request.recap

const DETAILS: RequestDetails = {
  reference: 'SLS-20261104-ABCD',
  createdAt: '2026-11-04T10:30:00.000Z',
  product: 'Oceanic Scent 5 L',
  cartons: 6,
  bottles: 18,
  litres: 90,
  type: 'Professionnel / revendeur',
  name: 'Amina Test',
  company: 'Épicerie du Port',
  phone: '+212 657 567 876',
  city: 'Casablanca',
  email: 'amina@example.com',
  message: 'Besoin d’un réassort mensuel.',
}

describe('business helpers', () => {
  it('builds absolute canonical URLs', () => {
    expect(absoluteUrl('/selection')).toBe('https://www.sealsi.com/selection')
    expect(absoluteUrl('selection')).toBe('https://www.sealsi.com/selection')
  })

  it('creates a dated reference', () => {
    expect(buildReference(new Date(2026, 10, 4))).toMatch(/^SLS-20261104-[A-Z0-9]{4}$/)
  })

  it('formats the handoff message with the full selection and contact details', () => {
    const message = buildRequestMessage(DETAILS, RECAP_FR, 'fr-FR')
    expect(message).toContain('Demande SEALSI — SLS-20261104-ABCD')
    expect(message).toContain('Sélection : 6 cartons = 18 bouteilles = 90 L')
    expect(message).toContain('Société : Épicerie du Port')
    expect(message).toContain('Téléphone : +212 657 567 876')
    expect(message).toContain('Ville : Casablanca')
    expect(message).toContain('Message : Besoin d’un réassort mensuel.')
  })

  it('formats the handoff message in Arabic for the Arabic site', () => {
    const message = buildRequestMessage(DETAILS, RECAP_AR, 'ar-MA')
    expect(message).toContain('طلب SEALSI — SLS-20261104-ABCD')
    expect(message).toContain('الاختيار: 6 كرتونة = 18 زجاجة = 90 لتر')
    expect(message).toContain('المدينة : Casablanca')
    expect(message).not.toContain('Sélection')
  })

  it('uses the singular for a one-carton request', () => {
    const message = buildRequestMessage(
      { ...DETAILS, cartons: 1, bottles: 3, litres: 15 },
      RECAP_FR,
      'fr-FR',
    )
    expect(message).toContain('Sélection : 1 carton = 3 bouteilles = 15 L')
  })

  it('omits optional empty fields from the message', () => {
    const message = buildRequestMessage(
      { ...DETAILS, company: '', email: '', message: '' },
      RECAP_FR,
      'fr-FR',
    )
    expect(message).not.toContain('Société :')
    expect(message).not.toContain('E-mail :')
    expect(message).not.toContain('Message :')
  })

  it('builds the e-mail subject and channel links', () => {
    expect(buildRequestSubject(DETAILS, RECAP_FR)).toBe(
      'Demande SEALSI SLS-20261104-ABCD — 6 cartons',
    )
    expect(whatsappLink('Bonjour SEALSI')).toContain(
      'https://wa.me/212657567876?text=Bonjour%20SEALSI',
    )
    const mail = mailtoLink('Sujet', 'Corps du message')
    expect(mail).toContain('mailto:contact@sealsi.com')
    expect(mail).toContain('subject=Sujet')
    expect(mail).toContain('body=Corps%20du%20message')
  })
})
