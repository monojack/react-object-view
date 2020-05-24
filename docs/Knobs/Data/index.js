import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import cn from 'classnames'
import { dataState, defaultCode } from '../../state/data'

import styles from './styles.module.scss'
import { Editor } from '../Editor'

export function Data() {
  const setData = useSetRecoilState(dataState)
  const [error, setError] = useState('')
  const [code, setCode] = useState(defaultCode)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      try {
        /* eslint-disable no-new-func */
        const data = Function(`"use strict"; return (${code})`)()
        setError('')
        setData({ code, data })
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
        <Editor value={code} onValueChange={setCode} />
      </div>
      <footer className={cn(styles.error, error && styles.hasError)}>
        {error}
      </footer>
    </div>
  )
}
