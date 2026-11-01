import { describe, expect, it } from 'vitest'
import {
  bottlesFor,
  clampCartons,
  litresFor,
  parseCartons,
  quantityError,
} from './cart'

describe('carton calculations', () => {
  it('converts 10 cartons to 30 bottles and 150 litres', () => {
    expect(bottlesFor(10)).toBe(30)
    expect(litresFor(10)).toBe(150)
  })

  it('accepts whole positive quantities only', () => {
    expect(parseCartons('10')).toBe(10)
    expect(parseCartons(' 5 ')).toBe(5)
    expect(parseCartons('1')).toBe(1)
    expect(parseCartons('999')).toBe(999)
  })

  it('rejects zero, fractions, out-of-range and non-numeric values', () => {
    expect(parseCartons('0')).toBeNull()
    expect(parseCartons('1.5')).toBeNull()
    expect(parseCartons('-2')).toBeNull()
    expect(parseCartons('1000')).toBeNull()
    expect(parseCartons('')).toBeNull()
    expect(parseCartons('abc')).toBeNull()
    expect(quantityError('0')).toContain('entier')
    expect(quantityError('4')).toBe('')
  })

  it('clamps stepper values to the demonstration range', () => {
    expect(clampCartons(0)).toBe(1)
    expect(clampCartons(1000)).toBe(999)
    expect(clampCartons(7)).toBe(7)
  })
})
