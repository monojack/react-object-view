import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { optionsState } from '../options'
import { customPreview as Symbol_customPreview } from '../symbols'
import { isMap, isSet } from '../utils/types'

import { ExpandIcon } from './ExpandIcon'
import { Name } from './Name'
import { Value } from './Value'
import { Preview } from './Preview'
import { Tree } from './Tree'

function setCustomPreviews({
  hideDataTypes,
  hideObjectSize,
  previewElementsMaxCount,
  previewPropertiesMaxCount,
  previewStringMaxLength,
}) {
  return value => {
    if (isSet(value)) {
      return [...value].reduce((acc, v, i) => {
        acc[i] = {
          value: v,
          [Symbol_customPreview]() {
            return <Value data={v} />
          },
        }
        return acc
      }, {})
    } else if (isMap(value)) {
      return [...value].reduce((acc, [k, v], i) => {
        acc[i] = {
          key: k,
          value: v,
          [Symbol_customPreview]() {
            return (
              <>
                <Name data={`'${k}'`} />
                <span>&nbsp;=>&nbsp;</span>
                <Value data={v} />
              </>
            )
          },
        }
        return acc
      }, {})
    }

    return value
  }
}

export function Node({ data: [key, value], depth }) {
  const options = useRecoilValue(optionsState)
  const { expandLevel, hidePreviews } = options
  const [isExpanded, toggle] = useState(depth < expandLevel)

  useEffect(() => {
    toggle(depth < expandLevel)
  }, [depth, expandLevel])

  return (
    <>
      <div
        style={{ position: 'relative', display: 'flex' }}
        onClick={e => {
          e.stopPropagation()
          toggle(!isExpanded)
        }}
      >
        <ExpandIcon isExpanded={isExpanded} />
        <Name
          data={key}
          style={{ cursor: 'pointer', flex: 'none', userSelect: 'none' }}
        />
        <span style={{ flex: 'none' }}>:&nbsp;</span>
        {!hidePreviews && (
          <Preview
            data={value}
            hide={isExpanded}
            hidePlaceholder={
              isMap(value) || isSet(value) ? (
                <i style={{ opacity: 0.3 }}>[[Entries]]</i>
              ) : null
            }
          />
        )}
      </div>
      {isExpanded ? (
        <Tree data={setCustomPreviews(options)(value)} depth={depth + 1} />
      ) : null}
    </>
  )
}
