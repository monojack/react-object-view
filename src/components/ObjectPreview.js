import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { themeState } from '../theme'
import { truncate } from '../utils/truncate'

import { Value } from './Value'
import { Name } from './Name'

export const ObjectPreview = memo(function ObjectPreview({
  data,
  type,
  size,
  maxKeysCount,
  maxStringLength,
  openToken,
  closeToken,
}) {
  const theme = useRecoilValue(themeState)

  return (
    <i>
      {!type && (
        <span style={{ color: theme.valueTypeColor }}>
          Map{size != null ? ' ' : ''}
        </span>
      )}
      {!size != null && (
        <>
          {'('}
          <span style={{ color: theme.valueNumberColor }}>{data.size}</span>
          {') '}
        </>
      )}
      <span>{`{`}</span>
      {data.size > 0 &&
        [...data].slice(0, maxKeysCount).map(([k, v], i, arr) => (
          <span key={k}>
            <Name data={k} />
            <span>&nbsp;=>&nbsp;</span>
            <Value data={truncate(maxStringLength)(v)} />
            {i + 1 < arr.length ? ', ' : ''}
          </span>
        ))}
      {data.size > maxKeysCount && `, …`}
      <span>{`}`}</span>
    </i>
  )
})
