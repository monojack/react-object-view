import React from 'react'
import { useRecoilValue } from 'recoil'

import { themeState } from '../theme'

export function Name({ data, ...props }) {
  const theme = useRecoilValue(themeState)

  return (
    <label
      {...props}
      style={{
        // fontWeight: 'bolder',
        color: theme.keyColor,
        ...props.style,
      }}
    >
      {String(data)}
    </label>
  )
}
