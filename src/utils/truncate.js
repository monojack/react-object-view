import { getTypeOf, typeNames } from './types'

export function truncate(maxLength) {
  return value => {
    if (getTypeOf(value) === typeNames.string) {
      return value.trim().length > maxLength
        ? value.slice(0, maxLength).trim() + '…'
        : value
    }
    return value
  }
}
