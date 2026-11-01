import { useState } from 'react'
import { clampCartons, parseCartons, quantityError } from '../lib/cart'

/**
 * Keeps the raw input text so an empty or partial value can be shown while
 * typing, while exposing the last valid carton count.
 */
export function useCartonInput(initial: number) {
  const [text, setText] = useState(String(initial))
  const value = parseCartons(text)
  const error = quantityError(text)

  const setCartons = (next: number) => {
    setText(String(clampCartons(next)))
  }

  const step = (delta: 1 | -1) => {
    setCartons((value ?? initial) + delta)
  }

  return { text, setText, value, error, setCartons, step }
}
