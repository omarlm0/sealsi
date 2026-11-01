import { describe, expect, it } from 'vitest'
import { PATHS, href, parseLocation } from './site'

describe('site routing', () => {
  it('maps readable paths to pages', () => {
    expect(parseLocation({ pathname: '/', hash: '' }).page).toBe('accueil')
    expect(parseLocation({ pathname: '/lessive/oceanic-5l', hash: '' }).page).toBe('produit')
    expect(parseLocation({ pathname: '/selection', hash: '' }).page).toBe('selection')
    expect(parseLocation({ pathname: '/demande', hash: '' }).page).toBe('demande')
    expect(parseLocation({ pathname: '/professionnels', hash: '' }).page).toBe(
      'professionnels',
    )
  })

  it('reads section anchors and ignores unknown paths', () => {
    expect(parseLocation({ pathname: '/', hash: '#univers' }).section).toBe('univers')
    expect(parseLocation({ pathname: '/professionnels', hash: '#faq' }).section).toBe('faq')
    expect(parseLocation({ pathname: '/inconnu', hash: '' }).page).toBe('accueil')
  })

  it('builds canonical hrefs', () => {
    expect(href('accueil')).toBe(PATHS.accueil)
    expect(href('produit')).toBe('/lessive/oceanic-5l')
    expect(href('produit', 'conseils')).toBe('/lessive/oceanic-5l#conseils')
    expect(href('accueil', 'univers')).toBe('/#univers')
  })
})
