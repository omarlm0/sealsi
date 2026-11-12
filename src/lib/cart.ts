import { PRODUCT } from '../data/site'

export const CARTONS_STORAGE_KEY = 'sealsi-cartons'

/** Parses a raw input value into a whole number of cartons, or null. */
export function parseCartons(raw: string): number | null {
  const trimmed = raw.trim()
  if (!/^\d+$/.test(trimmed)) return null
  const value = Number(trimmed)
  if (!Number.isInteger(value)) return null
  if (value < PRODUCT.minimumCartons || value > PRODUCT.maximumCartons) return null
  return value
}

export function quantityError(raw: string, message: string): string {
  return parseCartons(raw) === null ? message : ''
}

export function bottlesFor(cartons: number): number {
  return cartons * PRODUCT.bottlesPerCarton
}

export function litresFor(cartons: number): number {
  return cartons * PRODUCT.litresPerCarton
}

export function clampCartons(value: number): number {
  return Math.min(PRODUCT.maximumCartons, Math.max(PRODUCT.minimumCartons, value))
}

export function readCartons(): number {
  if (typeof window === 'undefined') return 0
  try {
    const stored = Number(window.localStorage.getItem(CARTONS_STORAGE_KEY) ?? 0)
    if (!Number.isInteger(stored) || stored < 0) return 0
    return stored === 0 ? 0 : clampCartons(stored)
  } catch {
    return 0
  }
}

export function writeCartons(cartons: number): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CARTONS_STORAGE_KEY, String(cartons))
  } catch {
    // Storage can be unavailable (private mode); the in-memory state still works.
  }
}
