import React from 'react'
import { useRecoilValue } from 'recoil'

import { optionsState } from '../options'
import { themeState } from '../theme'
import { truncate } from '../utils/truncate'

import { Value } from './Value'

export function SetPreview({ data }) {
  const {
    hideDataTypes,
    hideObjectSize,
    previewElementsMaxCount,
    previewStringMaxLength,
  } = useRecoilValue(optionsState)

  const theme = useRecoilValue(themeState)

  return (
    <i>
      {!hideDataTypes && (
        <span style={{ color: theme.valueTypeColor }}>
          Set{hideObjectSize ? ' ' : ''}
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
        [...data].slice(0, previewElementsMaxCount).map((v, i, arr) => (
          <span key={i}>
            <Value data={truncate(previewStringMaxLength)(v)} />
            {i + 1 < arr.length ? ', ' : ''}
          </span>
        ))}
      {data.size > previewElementsMaxCount && `, …`}
      <span>{`}`}</span>
    </i>
  )
}
