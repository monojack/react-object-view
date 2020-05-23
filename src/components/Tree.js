import React from 'react'
import { useRecoilValue } from 'recoil'

import { themeState } from '../theme'
import { Entry } from './Entry'

const style = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

export function Tree({ data, depth, ...props }) {
  const { fontSize, tabWidth } = useRecoilValue(themeState)

  return (
    <ol
      {...props}
      style={{
        ...style,
        marginLeft: fontSize * (depth === 0 ? 2 : tabWidth),
        ...props.style,
      }}
    >
      {Object.entries(data ?? {}).map(([k, v]) => (
        <Entry key={k} data={[k, v]} depth={depth} />
      ))}
    </ol>
  )
}
