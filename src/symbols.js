export const setEntry = (() =>
  (typeof Symbol === 'function' && Symbol.ROVSetEntry) ||
  Symbol('ROVSetEntry'))()

export const mapEntry = (() =>
  (typeof Symbol === 'function' && Symbol.ROVMapEntry) ||
  Symbol('ROVMapEntry'))()

export const customEntry = (() =>
  (typeof Symbol === 'function' && Symbol.ROVCustomEntry) ||
  Symbol('ROVCustomEntry'))()

export const customValue = (() =>
  (typeof Symbol === 'function' && Symbol.ROVCustomValue) ||
  Symbol('ROVCustomValue'))()

export const customPreview = (() =>
  (typeof Symbol === 'function' && Symbol.ROVCustomPreview) ||
  Symbol('ROVCustomPreview'))()
