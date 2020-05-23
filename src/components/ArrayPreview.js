import React from 'react'
import { useRecoilValue } from 'recoil'

import { optionsState } from '../options'
import { themeState } from '../theme'
import { truncate } from '../utils/truncate'

import { Value } from './Value'

export function ArrayPreview({ data }) {
  const {
    hideObjectSize,
    previewElementsMaxCount,
    previewStringMaxLength,
  } = useRecoilValue(optionsState)

  const theme = useRecoilValue(themeState)

  return (
    <i>
      {!hideObjectSize && (
        <>
          {'('}
          <span style={{ color: theme.valueNumberColor }}>{data.length}</span>
          {') '}
        </>
      )}
      <span>[</span>
      {data.slice(0, previewElementsMaxCount).map((v, i, arr) => (
        <span key={i}>
          <Value data={truncate(previewStringMaxLength)(v)} />
          {i + 1 < arr.length ? ', ' : ''}
        </span>
      ))}
      {data.length > previewElementsMaxCount && `, …`}
      <span>]</span>
    </i>
  )
}
