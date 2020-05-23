const { hasOwnProperty } = Object.prototype

export function mergeStrict(left, right) {
  return Object.keys(left).reduce((acc, k) => {
    acc[k] = k in right && hasOwnProperty.call(right, k) ? right[k] : left[k]
    return acc
  }, {})
}
