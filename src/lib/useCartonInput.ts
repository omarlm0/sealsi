import { useState } from 'react'
import { clampCartons, parseCartons, quantityError } from '../lib/cart'

/**
 * Keeps the raw input text so an empty or partial value can be shown while
 * typing, while exposing the last valid carton count.
 */
export function useCartonInput(initial: number) {
  // Zero means "nothing chosen yet": keep the field empty instead of forcing
  // a demonstration quantity on production visitors.
  const [text, setText] = useState(initial > 0 ? String(initial) : '')
  const value = parseCartons(text)
  const error = quantityError(text)

  const setCartons = (next: number) => {
    setText(String(clampCartons(next)))
  }

  const step = (delta: 1 | -1) => {
    if (value === null) {
      if (delta === 1) setCartons(1)
      return
    }
    setCartons(value + delta)
  }

  return { text, setText, value, error, setCartons, step }
}
