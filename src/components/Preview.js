import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { optionsState } from '../options'

import { customPreview as Symbol_customPreview } from '../symbols'
import { isArray, isPlainObject, isMap, isSet } from '../utils/types'

import { ArrayPreview } from './ArrayPreview'
import { PlainObjectPreview } from './PlainObjectPreview'
import { SetPreview } from './SetPreview'
import { MapPreview } from './MapPreview'

export function Preview({ data, hide, hidePlaceholder = null }) {
  const { previewOpacity } = useRecoilValue(optionsState)

  const vdom = useMemo(
    function getPreview() {
      if (data[Symbol_customPreview]) {
        return data[Symbol_customPreview]()
      } else if (isSet(data)) {
        return <SetPreview data={data} />
      } else if (isMap(data)) {
        return <MapPreview data={data} />
      } else if (isArray(data)) {
        return <ArrayPreview data={data} />
      } else if (isPlainObject(data)) {
        return <PlainObjectPreview data={data} />
      }

      return null
    },
    [data, previewOpacity],
  )

  return !hide ? (
    <div style={{ opacity: previewOpacity }}>{vdom}</div>
  ) : (
    hidePlaceholder
  )
}
