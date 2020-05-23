import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import cn from 'classnames'
import CodeEditor from 'react-simple-code-editor'

import highlightJS from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/ascetic.css'
// import 'highlight.js/styles/color-brewer.css'
// import 'highlight.js/styles/github-gist.css'
import { dataState, defaultCode } from '../../state/data'

import styles from './styles.module.scss'

highlightJS.registerLanguage('javascript', javascript)
export function Editor() {
  const setData = useSetRecoilState(dataState)
  const [error, setError] = useState('')
  const [code, setCode] = useState(defaultCode)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      try {
        /* eslint-disable no-new-func */
        const data = Function(`"use strict"; return (${code})`)
        setError('')
        setData(data)
        /* eslint-enable no-new-func */
      } catch (error) {
        console.log(error)
        setError(`${error}`.split('\n')[0])
      }
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [code.replace(/\s+/gm, '')])

  return (
    <div className={styles.editor}>
      <div className={styles.codeEditor}>
        {/* <code>{`{`}</code> */}
        {/* <div className={styles.inputWrapper}> */}
        <CodeEditor
          value={code}
          onValueChange={setCode}
          highlight={code => highlightJS.highlight('javascript', code).value}
          textareaClassName={styles.textarea}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        {/* </div> */}
        {/* <code>{`}`}</code> */}
      </div>
      <footer className={cn(styles.error, error && styles.hasError)}>
        {error}
      </footer>
    </div>
  )
}
