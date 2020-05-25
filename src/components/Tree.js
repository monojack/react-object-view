import React, { useState, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { themeState } from '../theme'
import { optionsState } from '../options'
import { Entry } from './Entry'

const style = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

export function Tree({ data, depth, ...props }) {
  const { fontSize, tabWidth } = useRecoilValue(themeState)
  const { displayPropertiesMaxCount } = useRecoilValue(optionsState)
  const [truncate, toggleTruncate] = useState(true)

  const entries = useMemo(() => {
    const list = Object.entries(data ?? {})
    return truncate && list.length > displayPropertiesMaxCount
      ? list.slice(0, displayPropertiesMaxCount)
      : list
  }, [data, truncate, displayPropertiesMaxCount])

  const size = Object.keys(data ?? {}).length ?? 0

  return (
    <ol
      {...props}
      style={{
        ...style,
        marginLeft: fontSize * (depth === 0 ? 2 : tabWidth),
        ...props.style,
      }}
    >
      {entries.map(([k, v]) => (
        <Entry key={k} data={[k, v]} depth={depth} />
      ))}
      {truncate && size > displayPropertiesMaxCount && (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => toggleTruncate(false)}
        >
          {'('}
          <ins>{size - displayPropertiesMaxCount} more...</ins>
          {')'}
        </span>
      )}
    </ol>
  )
}
