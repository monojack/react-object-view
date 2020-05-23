import React from 'react'

import { Name } from './Name'
import { Value } from './Value'

export function Leaf({ data: [key, value] }) {
  return (
    <span style={{ display: 'flex' }}>
      <Name data={key} style={{ flex: 'none' }} />
      <span style={{ flex: 'none' }}>:&nbsp;</span>
      <Value data={value} />
    </span>
  )
}
