import React from 'react'
import {
  isPlainObject,
  isIterable,
  isString,
  isMap,
  isSet,
} from '../utils/types'
import { customValue as Symbol_customValue } from '../symbols'

import { Node } from './Node'
import { Leaf } from './Leaf'

const isNode = ([, value]) => {
  return (
    isPlainObject(value) ||
    isMap(value) ||
    isSet(value) ||
    (isIterable(value) && !isString(value))
  )
}

export function Entry({ data, depth }) {
  return (
    <li>
      {data[1]?.[Symbol_customValue] ? (
        <Leaf data={data} />
      ) : isNode(data) ? (
        <Node depth={depth} data={data} />
      ) : (
        <Leaf data={data} />
      )}
    </li>
  )
}
