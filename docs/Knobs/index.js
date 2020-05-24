import React from 'react'
import cn from 'classnames'

import Tabs from '@zeit-ui/react/esm/tabs'

import { Data } from './Data'
import { Options } from './Options'
import { Theme } from './Theme'
import { Code } from './Code'

import styles from './styles.module.scss'

export function Knobs(props) {
  return (
    <section {...props} className={cn(props.className, styles.knobs)}>
      <Tabs initialValue="1" className={styles.tabs}>
        <Tabs.Item label="data" value="1">
          <Data />
        </Tabs.Item>
        <Tabs.Item label="options" value="2">
          <Options />
        </Tabs.Item>
        <Tabs.Item label="theme" value="3">
          <Theme />
        </Tabs.Item>
        <Tabs.Item label="code" value="4">
          <Code />
        </Tabs.Item>
      </Tabs>
    </section>
  )
}
