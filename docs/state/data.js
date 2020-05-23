/* eslint-disable no-new-func */
import { atom } from 'recoil'

export const defaultCode = `{
  map: new Map([
    ['foo', 1],
    ['obj', { bar: null }],
  ]),
  url: 'http://localhost:3000',
  string: 'Every stop I make, I make a new friend.',
  integer: 42,
  array: [
    {},
    ['a', 1],
    1,
    Symbol('sym'),
    'Mutley, you snickering, floppy eared hound. When courage is needed, you’re never around. Those medals you wear on your moth-eaten chest should be there for bungling at which you are best. So, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him, jab him, tab him, grab him, stop that pigeon now.',
    'http://localhost:3000',
    { foo: 'nested' },
    [],
    null,
  ],
  float: 3.14159,
  object: {
    emap: new Map(),
    boolTrue: true,
    eset: new Set(),
    boolFalse: false,
    key: null,
  },
  boolTrue: true,
  boolFalse: false,
  set: new Set([1, 'string', { foo: 1 }]),
  date: new Date(),
  stringNumber: '1234',
  async *asyncGenerator() {},
  generator: function* generator() {},
  anonGen: function*() {},
  asyncArrow: async () => {},
  asyncAnon: async function() {},
  asyncAnonGen: async function*() {},
  arrow: () => {},
  named: function foo() {},
  anon: function() {},
  undef: undefined,
  baz: null,
  sym: Symbol('sym'),
  reg: /^pattern\\d+/gi,
}`

export const dataState = atom({
  key: 'demoDataState',
  default: Function(`"use strict"; return (${defaultCode})`)(),
})
