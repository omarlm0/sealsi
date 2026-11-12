import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  buildInfoMessage,
  buildInfoSubject,
  buildReference,
  buildRequestMessage,
  buildRequestSubject,
  mailtoLink,
  whatsappLink,
} from './business'
import type { InfoRequestDetails, RequestDetails } from './business'
import { COPY } from '../i18n/copy'

const RECAP_FR = COPY.fr.request.recap
const RECAP_AR = COPY.ar.request.recap
const INFO_RECAP_FR = COPY.fr.infoRequest.recap
const INFO_RECAP_AR = COPY.ar.infoRequest.recap

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

const INFO_DETAILS: InfoRequestDetails = {
  reference: 'SLS-20261104-INFO',
  createdAt: '2026-11-04T10:30:00.000Z',
  audience: 'professional',
  company: 'Hôtel Atlas',
  name: '',
  email: 'contact@hotel-atlas.example',
  phone: '+212 657 567 876',
  address: '12 rue des Dunes',
  city: 'Casablanca',
}

describe('info request helpers', () => {
  it('formats a professional recap with the company and address', () => {
    const message = buildInfoMessage(INFO_DETAILS, INFO_RECAP_FR, 'fr-FR')
    expect(message).toContain('Demande d’information SEALSI — SLS-20261104-INFO')
    expect(message).toContain('Type de demande : Professionnel')
    expect(message).toContain('Société : Hôtel Atlas')
    expect(message).toContain('E-mail : contact@hotel-atlas.example')
    expect(message).toContain('Téléphone : +212 657 567 876')
    expect(message).toContain('Adresse : 12 rue des Dunes')
    expect(message).toContain('Ville : Casablanca')
    expect(message).not.toContain('Nom complet :')
  })

  it('formats a reseller recap with the full name and no company', () => {
    const message = buildInfoMessage(
      { ...INFO_DETAILS, audience: 'reseller', company: '', name: 'Amina Test' },
      INFO_RECAP_FR,
      'fr-FR',
    )
    expect(message).toContain('Type de demande : Revendeur')
    expect(message).toContain('Nom complet : Amina Test')
    expect(message).not.toContain('Société :')
  })

  it('formats the info recap in Arabic for the Arabic site', () => {
    const message = buildInfoMessage(
      { ...INFO_DETAILS, audience: 'reseller', company: '', name: 'Amina Test' },
      INFO_RECAP_AR,
      'ar-MA',
    )
    expect(message).toContain('طلب معلومات SEALSI — SLS-20261104-INFO')
    expect(message).toContain('نوع الطلب : موزّع')
    expect(message).toContain('الاسم الكامل : Amina Test')
    expect(message).not.toContain('Type de demande')
  })

  it('builds the info e-mail subject', () => {
    expect(buildInfoSubject(INFO_DETAILS, INFO_RECAP_FR)).toBe(
      'Demande d’information SEALSI SLS-20261104-INFO',
    )
    expect(buildInfoSubject(INFO_DETAILS, INFO_RECAP_AR)).toBe(
      'طلب معلومات SEALSI SLS-20261104-INFO',
    )
  })
})
