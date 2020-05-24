/* eslint-disable no-new-func */
import { atom } from 'recoil'

export const defaultCode = `{
  string: 'Every stop I make, I make a new friend.',
  integer: 42,
  map: new Map([ ['foo', 1], ['bar', { baz: null }] ]),
  url: 'http://localhost:3000',
  array: [ 
    ['a', 1],
    1,
    Symbol('sym'),
    'Mutley, you snickering, floppy eared hound.',
    { foo: 'nested' },
    null,
  ],
  float: 3.14159,
  object: {
    boolTrue: true,
    emptySet: new Set(),
  },
  boolFalse: false,
  set: new Set([1, 'string', { foo: 1 }]),
  date: new Date(),
  reg: /^pattern\\d+/gi,
  async *asyncGenerator() {},
  arrow: () => {},
  anon: function() {},
  undef: undefined,
  baz: null,
  sym: Symbol('sym'),
}`

export const dataState = atom({
  key: 'demoDataState',
  default: {
    data: Function(`"use strict"; return (${defaultCode})`)(),
    code: defaultCode,
  },
})
