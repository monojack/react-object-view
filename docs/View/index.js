import React from 'react'
import { useRecoilValue } from 'recoil'
import cn from 'classnames'

import { dataState } from '../state/data'
import { optionsState } from '../state/options'
import { themeState } from '../state/theme'
import { Controls } from './Controls'
import { ObjectView, defaultPalette, customValue } from '../../'

import styles from './styles.module.scss'

// eslint-disable-next-line no-unused-vars
const diffData = {
  diff: customValue(() => (
    <span>
      <del
        style={{
          padding: '2px 4px',
          backgroundColor: defaultPalette.base0E,
          borderRadius: 5,
          textDecoration: 'line-through',
          color: '#fff',
        }}
      >
        Hello
      </del>
      &nbsp;
      <span
        style={{
          padding: '2px 4px',
          flex: 'none',
          fontWeight: 'bolder',
          color: defaultPalette.base0E,
        }}
      >
        =>
      </span>
      &nbsp;
      <ins
        style={{
          padding: '2px 4px',
          backgroundColor: 'rgba(101, 198, 89, 0.4)',
          textDecoration: 'none',
          borderRadius: 5,
          color: '#fff',
        }}
      >
        World
      </ins>
    </span>
  )),
}

export function View(props) {
  const data = useRecoilValue(dataState)
  const options = useRecoilValue(optionsState)
  const theme = useRecoilValue(themeState)

  return (
    <section
      {...props}
      className={cn(props.className, styles.view)}
      style={{
        backgroundColor: (theme.palette || {}).base00 || defaultPalette.base00,
        ...props.styles,
      }}
    >
      <header className={styles.header}>
        <Controls />
      </header>
      <main className={styles.main}>
        <ObjectView
          data={data}
          // data={{ diffData }}
          options={options}
          styles={theme.styles}
          palette={theme.palette}
        />
      </main>
    </section>
  )
}
