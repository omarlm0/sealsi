import { describe, expect, it } from 'vitest'
import { PATHS, href, isLegalPage, parseLocation, withLang } from './site'

describe('site routing', () => {
  it('maps readable paths to pages', () => {
    expect(parseLocation({ pathname: '/', hash: '' }).page).toBe('accueil')
    expect(parseLocation({ pathname: '/lessive/oceanic-5l', hash: '' }).page).toBe('accueil')
    expect(parseLocation({ pathname: '/selection', hash: '' }).page).toBe('selection')
    expect(parseLocation({ pathname: '/demande', hash: '' }).page).toBe('demande')
    expect(parseLocation({ pathname: '/revendeurs', hash: '' }).page).toBe('revendeurs')
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

  it('prefixes Arabic URLs with /ar', () => {
    expect(href('accueil', undefined, 'ar')).toBe('/ar')
    expect(href('accueil', 'univers', 'ar')).toBe('/ar#univers')
    expect(href('demande', undefined, 'ar')).toBe('/ar/demande')
    expect(withLang('/', 'ar')).toBe('/ar')
    expect(withLang('/demande', 'ar')).toBe('/ar/demande')
    expect(withLang('/demande', 'fr')).toBe('/demande')
  })

  it('reads the language from the path and strips it from the route', () => {
    expect(parseLocation({ pathname: '/ar', hash: '' })).toEqual({
      page: 'accueil',
      section: null,
      lang: 'ar',
    })
    expect(parseLocation({ pathname: '/ar/', hash: '#faq' })).toEqual({
      page: 'accueil',
      section: 'faq',
      lang: 'ar',
    })
    expect(parseLocation({ pathname: '/ar/demande', hash: '' }).page).toBe('demande')
    expect(parseLocation({ pathname: '/ar/revendeurs', hash: '' }).lang).toBe('ar')
    expect(parseLocation({ pathname: '/demande', hash: '' }).lang).toBe('fr')
    expect(parseLocation({ pathname: '/ar/lessive/oceanic-5l', hash: '' })).toEqual({
      page: 'accueil',
      section: null,
      lang: 'ar',
    })
    expect(parseLocation({ pathname: '/ar/inconnu', hash: '' }).page).toBe('introuvable')
    expect(parseLocation({ pathname: '/arabe', hash: '' }).page).toBe('introuvable')
  })

  it('keeps legal pages out of the generic router branch', () => {
    expect(isLegalPage('mentions-legales')).toBe(true)
    expect(isLegalPage('confidentialite')).toBe(true)
    expect(isLegalPage('conditions-de-vente')).toBe(true)
    expect(isLegalPage('demande')).toBe(false)
    expect(isLegalPage('introuvable')).toBe(false)
  })
})
