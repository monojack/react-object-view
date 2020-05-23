/* eslint-disable no-new */
/* eslint-disable valid-typeof */

/**
 * Shamefully copied from https://github.com/sindresorhus/is
 * because I don't want the assertions and some other stuff
 */

export const typeNames = {
  null: 'null',
  boolean: 'boolean',
  undefined: 'undefined',
  string: 'string',
  number: 'number',
  bigint: 'bigint',
  symbol: 'symbol',

  Function: 'Function',

  Object: 'Object',
  Generator: 'Generator',
  AsyncGenerator: 'AsyncGenerator',
  GeneratorFunction: 'GeneratorFunction',
  AsyncGeneratorFunction: 'AsyncGeneratorFunction',
  AsyncFunction: 'AsyncFunction',
  Observable: 'Observable',
  Array: 'Array',
  Buffer: 'Buffer',
  RegExp: 'RegExp',
  Date: 'Date',
  Error: 'Error',
  Map: 'Map',
  Set: 'Set',
  WeakMap: 'WeakMap',
  WeakSet: 'WeakSet',
  DataView: 'DataView',
  Promise: 'Promise',
  URL: 'URL',
}

export const isOfType = type => value => typeof value === type
export const getObjectType = value =>
  Object.prototype.toString.call(value).slice(8, -1) || undefined
export const isObjectOfType = type => value => getObjectType(value) === type

export const getTypeOf = value => {
  if (value === null) return typeNames.null

  if (isUrl(value)) {
    return typeNames.URL
  }

  switch (typeof value) {
    case 'undefined':
      return typeNames.undefined

    case 'string':
      return typeNames.string

    case 'number':
      return typeNames.number

    case 'boolean':
      return typeNames.boolean

    case 'bigint':
      return typeNames.bigint

    case 'symbol':
      return typeNames.symbol

    default:
  }

  if (isArray(value)) {
    return typeNames.Array
  }

  if (isBuffer(value)) {
    return typeNames.Buffer
  }

  if (isObservable(value)) {
    return typeNames.Observable
  }

  const tagType = getObjectType(value)
  if (tagType) {
    return tagType
  }

  if (isFunction(value)) {
    return typeNames.function
  }

  return typeNames.Object
}

export const isString = isOfType('string')
export const isNumber = isOfType('number')
export const isBoolean = isOfType('boolean')
export const isBigint = isOfType('bigint')
export const isUndefined = isOfType('undefined')
export const isSymbol = isOfType('symbol')
export const isFunction = isOfType('function')

export const isArrowFunction = value =>
  isFunction(value) &&
  RegExp('^[^{]+?=>').test(Function.prototype.toString.call(value))

export const isAnonymousFunction = value =>
  isFunction(value) &&
  !isArrowFunction(value) &&
  RegExp('^(async)?\\s*(function)\\*?\\s*\\(.*\\)\\s*\\{').test(
    Function.prototype.toString.call(value),
  )

export const isAsyncFunction = value =>
  getObjectType(value) === typeNames.AsyncFunction

export const isClass = value =>
  isFunction(value) && value.toString().startsWith('class ')

export const isNull = value => value === null
export const isNaN = value => Number.isNaN(value)
export const isInteger = value => Number.isInteger(value)

export const isArray = Array.isArray
export const isObject = value => !isNull(value) && typeof value === 'object'
export const isPlainObject = value => {
  if (getObjectType(value) !== typeNames.Object) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.getPrototypeOf({})
}

export const isBuffer = value => value?.constructor?.isBuffer?.(value) ?? false
export const isNil = value => value == null

export const isIterable = value => isFunction(value?.[Symbol.iterator])
export const isAsyncIterable = value =>
  isFunction(value?.[Symbol.asyncIterator])

export const isGenerator = value =>
  isIterable(value) && isFunction(value.next) && isFunction(value.throw)
export const isAsyncGenerator = value =>
  isAsyncIterable(value) && isFunction(value.next) && isFunction(value.throw)

export const isPromise = value =>
  isObjectOfType(typeNames.Promise)(value) ||
  (isFunction(value?.then) && isFunction(value?.catch))

export const isGeneratorFunction = isObjectOfType(typeNames.GeneratorFunction)
export const isAsyncGeneratorFunction = value =>
  getObjectType(value) === typeNames.AsyncGeneratorFunction

export const isRegExp = isObjectOfType(typeNames.RegExp)
export const isDate = isObjectOfType(typeNames.Date)
export const isError = isObjectOfType(typeNames.Error)

export const isMap = value => isObjectOfType(typeNames.Map)(value)
export const isSet = value => isObjectOfType(typeNames.Set)(value)

export const isWeakMap = value => isObjectOfType(typeNames.WeakMap)(value)
export const isWeakSet = value => isObjectOfType(typeNames.WeakSet)(value)

export const isPrimitive = value =>
  isNull(value) ||
  ['undefined', 'string', 'number', 'bigint', 'boolean', 'symbol'].includes(
    typeof value,
  )

export const isObservable = value =>
  !value &&
  (value === value[Symbol.observable]?.() ||
    value === value['@@observable']?.())

export const isArrayLike = value =>
  !isNil(value) && !isFunction(value) && Number.isSafeInteger(value.length)

export const isEmptyString = value => isString(value) && value.length === 0
export const isWhitespace = value =>
  isEmptyString(value) || (isString(value) && !/\S/.test(value))

export const isEmptyArray = value => isArray(value) && value.length === 0
export const isEmptyObject = value =>
  isObject(value) &&
  !isMap(value) &&
  !isSet(value) &&
  Object.keys(value).length === 0

export const isEmptySet = value => isSet(value) && value.size === 0
export const isEmptyMap = value => isMap(value) && value.size === 0

export const isURLObject = value => isObjectOfType(typeNames.URL)(value)
export const isUrl = value => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
