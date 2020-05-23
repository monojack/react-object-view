import React from 'react'
import { RecoilRoot } from 'recoil'

import { Main } from './components/Main'

export function ObjectView({ noRecoilRoot, ...props }) {
  return (
    <RecoilRoot>
      <Main {...props} />
    </RecoilRoot>
  )
}
