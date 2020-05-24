import React from 'react'
import { useRecoilValue } from 'recoil'
import { stringify } from 'javascript-stringify'

import { Editor } from '../Editor'
import { optionsState } from '../../state/options'
import { themeState } from '../../state/theme'

import styles from './styles.module.scss'

export function Code() {
  const options = useRecoilValue(optionsState)
  const theme = useRecoilValue(themeState)

  const code = `
import { ObjectView } from 'react-object-view'
  
const options = ${stringify(options, null, 2)}
const palette = ${stringify(theme.palette, null, 2)}
const styles = ${stringify(theme.styles, null, 2)}
const data = {/** copy this from the \`Data\` tab */}
  
function App() {
  return (
    <ObjectView
      data={data}
      options={options}
      styles={styles}
      palette={palette}
    />
  )
}
`

  return (
    <div className={styles.codeEditor}>
      <Editor readOnly value={code} />
    </div>
  )
}
