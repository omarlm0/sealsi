import { describe, expect, it } from 'vitest'
import { PATHS, href, parseLocation } from './site'

describe('site routing', () => {
  it('maps readable paths to pages', () => {
    expect(parseLocation({ pathname: '/', hash: '' }).page).toBe('accueil')
    expect(parseLocation({ pathname: '/lessive/oceanic-5l', hash: '' }).page).toBe('accueil')
    expect(parseLocation({ pathname: '/selection', hash: '' }).page).toBe('selection')
    expect(parseLocation({ pathname: '/demande', hash: '' }).page).toBe('demande')
    expect(parseLocation({ pathname: '/professionnels', hash: '' }).page).toBe(
      'professionnels',
    )
  })

  it('maps legal pages', () => {
    expect(parseLocation({ pathname: '/mentions-legales', hash: '' }).page).toBe(
      'mentions-legales',
    )
    expect(parseLocation({ pathname: '/confidentialite', hash: '' }).page).toBe(
      'confidentialite',
    )
    expect(parseLocation({ pathname: '/conditions-de-vente', hash: '' }).page).toBe(
      'conditions-de-vente',
    )
  })

  it('reads section anchors and sends unknown paths to the 404 page', () => {
    expect(parseLocation({ pathname: '/', hash: '#univers' }).section).toBe('univers')
    expect(parseLocation({ pathname: '/professionnels', hash: '#faq' }).section).toBe('faq')
    expect(parseLocation({ pathname: '/inconnu', hash: '' }).page).toBe('introuvable')
    expect(parseLocation({ pathname: '/404', hash: '' }).page).toBe('introuvable')
  })

  it('builds canonical hrefs', () => {
    expect(href('accueil')).toBe(PATHS.accueil)
    expect(href('accueil', 'univers')).toBe('/#univers')
    expect(href('confidentialite')).toBe('/confidentialite')
  })
})
