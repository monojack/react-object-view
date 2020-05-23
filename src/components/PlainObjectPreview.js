import React from 'react'
import { useRecoilValue } from 'recoil'

import { optionsState } from '../options'
import { truncate } from '../utils/truncate'

import { Value } from './Value'
import { Name } from './Name'

export function PlainObjectPreview({ data }) {
  const { previewPropertiesMaxCount, previewStringMaxLength } = useRecoilValue(
    optionsState,
  )

  return (
    <>
      <i>{`{`}</i>
      {Object.keys(data)
        .slice(0, previewPropertiesMaxCount)
        .map((k, i, arr) => (
          <i key={k}>
            <Name data={k} />
            <span>:&nbsp;</span>
            <Value data={truncate(previewStringMaxLength)(data[k])} />
            {i + 1 < arr.length ? ', ' : ''}
          </i>
        ))}
      {Object.keys(data).length > previewPropertiesMaxCount && `, …`}
      <i>{`}`}</i>
    </>
  )
}
