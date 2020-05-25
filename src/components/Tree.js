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
  const { displayEntriesMaxCount } = useRecoilValue(optionsState)
  const [truncate, toggleTruncate] = useState(true)

  const entries = useMemo(() => {
    const list = Object.entries(data ?? {})
    return displayEntriesMaxCount > 0 &&
      truncate &&
      list.length > displayEntriesMaxCount
      ? list.slice(0, displayEntriesMaxCount)
      : list
  }, [data, truncate, displayEntriesMaxCount])

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
      {displayEntriesMaxCount > 0 && truncate && size > displayEntriesMaxCount && (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => toggleTruncate(false)}
        >
          {'('}
          <ins>{size - displayEntriesMaxCount} more...</ins>
          {')'}
        </span>
      )}
    </ol>
  )
}
