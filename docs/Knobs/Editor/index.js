import React from 'react'
import CodeEditor from 'react-simple-code-editor'

import highlightJS from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/ascetic.css'
// import 'highlight.js/styles/color-brewer.css'
// import 'highlight.js/styles/github-gist.css'

import styles from './styles.module.scss'

highlightJS.registerLanguage('javascript', javascript)
export function Editor(props) {
  return (
    <CodeEditor
      highlight={code => highlightJS.highlight('javascript', code).value}
      textareaClassName={styles.textarea}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      {...props}
    />
  )
}
