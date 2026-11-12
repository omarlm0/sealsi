import { describe, expect, it } from 'vitest'
import { COPY } from './copy'

/**
 * Guards the two ways a bilingual site drifts: a missing key in one language,
 * and a key that was copied from French without being translated.
 */

type Shape = string | Shape[] | { [key: string]: Shape }

function shape(value: unknown): Shape {
  if (typeof value === 'function') return 'function'
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, shape(child)]),
    )
  }
  return typeof value
}

/** Calls functions with sample arguments so their output can be compared. */
function sample(value: unknown): string {
  if (typeof value === 'function') return String(value(3, 15, 45))
  return String(value)
}

function leaves(value: unknown, path = ''): Array<[string, string]> {
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, path ? `${path}.${key}` : key),
    )
  }
  return [[path, sample(value)]]
}

/** Values that are intentionally identical in both languages. */
const SHARED_VALUES = new Set([
  'SEALSI',
  'Oceanic Scent',
  'WhatsApp',
  'FR',
  'AR',
  '[À COMPLÉTER]',
  '06 XX XX XX XX',
  'contact@sealsi.com',
  '+212 657 567 876',
  '© 2026 SEALSI. Tous droits réservés.',
])

describe('bilingual copy', () => {
  it('has the same structure in French and Arabic', () => {
    expect(shape(COPY.ar)).toEqual(shape(COPY.fr))
  })

  it('has no empty strings or empty function output', () => {
    for (const lang of ['fr', 'ar'] as const) {
      for (const [path, value] of leaves(COPY[lang])) {
        expect(value.trim(), `${lang}.${path}`).not.toBe('')
      }
    }
  })

  it('translates every request and legal string', () => {
    const french = new Map(leaves(COPY.fr.request))
    const frenchLegal = new Map(leaves(COPY.fr.legal))

    for (const [path, value] of leaves(COPY.ar.request)) {
      if (SHARED_VALUES.has(value)) continue
      expect(value, `request.${path} is still French`).not.toBe(french.get(path))
    }

    for (const [path, value] of leaves(COPY.ar.legal)) {
      if (SHARED_VALUES.has(value)) continue
      expect(value, `legal.${path} is still French`).not.toBe(frenchLegal.get(path))
    }
  })

  it('localizes the quantity error and the recap labels', () => {
    expect(COPY.ar.stepper.error(1, 999)).not.toBe(COPY.fr.stepper.error(1, 999))
    expect(COPY.ar.request.recap.selection(3, 9, 45)).not.toBe(
      COPY.fr.request.recap.selection(3, 9, 45),
    )
    expect(COPY.ar.request.recap.subject('SLS-1', 3)).not.toContain('Demande')
  })
})
