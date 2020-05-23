import React from 'react'
import cn from 'classnames'

import Tabs from '@zeit-ui/react/esm/tabs'

import { Editor } from './Editor'
import { Options } from './Options'
import { Theme } from './Theme'

import styles from './styles.module.scss'

export function Knobs(props) {
  return (
    <section {...props} className={cn(props.className, styles.knobs)}>
      <Tabs initialValue="3" className={styles.tabs}>
        <Tabs.Item label="data" value="1">
          <Editor />
        </Tabs.Item>
        <Tabs.Item label="options" value="2">
          <Options />
        </Tabs.Item>
        <Tabs.Item label="theme" value="3">
          <Theme />
        </Tabs.Item>
      </Tabs>
    </section>
  )
}
