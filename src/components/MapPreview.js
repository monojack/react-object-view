import React from 'react'
import { useRecoilValue } from 'recoil'

import { optionsState } from '../options'
import { themeState } from '../theme'
import { truncate } from '../utils/truncate'

import { Value } from './Value'
import { Name } from './Name'

export const MapPreview = function MapPreview({ data }) {
  const {
    hideDataTypes,
    hideObjectSize,
    previewPropertiesMaxCount,
    previewStringMaxLength,
  } = useRecoilValue(optionsState)

  const theme = useRecoilValue(themeState)

  return (
    <i>
      {!hideDataTypes && (
        <span style={{ color: theme.valueTypeColor }}>
          Map{hideObjectSize ? ' ' : ''}
        </span>
      )}
      {!hideObjectSize && (
        <>
          {'('}
          <span style={{ color: theme.valueNumberColor }}>{data.size}</span>
          {') '}
        </>
      )}
      <span>{`{`}</span>
      {data.size > 0 &&
        [...data].slice(0, previewPropertiesMaxCount).map(([k, v], i, arr) => (
          <span key={k}>
            <Name data={k} />
            <span>&nbsp;=>&nbsp;</span>
            <Value data={truncate(previewStringMaxLength)(v)} />
            {i + 1 < arr.length ? ', ' : ''}
          </span>
        ))}
      {data.size > previewPropertiesMaxCount && `, …`}
      <span>{`}`}</span>
    </i>
  )
}
