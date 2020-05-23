import React, { useState, useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import cn from 'classnames'
import Row from '@zeit-ui/react/esm/row'
import Input from '@zeit-ui/react/esm/input'
import { defaultPalette, defaultStyles } from '../../../'

import { themeState } from '../../state/theme'

import { DotBox } from './DotBox'
import { ColorPicker } from './ColorPicker'
import styles from './styles.module.scss'

export function Theme(props) {
  const setTheme = useSetRecoilState(themeState)

  // palette
  const [active, setActive] = useState(null)
  const [color, setColor] = useState({})
  const [palette, setPalette] = useState(defaultPalette)

  // styles
  const [fontSize, setFontSize] = useState(defaultStyles.fontSize)
  const [fontFamily, setFontFamily] = useState(defaultStyles.fontFamily)
  const [lineHeight, setLineHeight] = useState(defaultStyles.lineHeight)
  const [tabWidth, setTabWidth] = useState(defaultStyles.tabWidth)

  const toggleActive = useCallback(
    function toggleActive([k, v]) {
      if (active != k) {
        setActive(k)
        setColor({ hex: v })
      }
    },
    [active],
  )

  useEffect(() => {
    if (active) {
      setPalette(palette => ({ ...palette, [active]: color.hex }))
    }
  }, [active, color.hex])

  useEffect(() => {
    setTheme(t => ({
      ...t,
      styles: {
        ...t.styles,
        fontSize: fontSize,
      },
    }))
  }, [fontSize])

  useEffect(() => {
    setTheme(t => ({
      ...t,
      styles: {
        ...t.styles,
        fontFamily: fontFamily,
      },
    }))
  }, [fontFamily])

  useEffect(() => {
    setTheme(t => ({
      ...t,
      styles: {
        ...t.styles,
        lineHeight: lineHeight,
      },
    }))
  }, [lineHeight])

  useEffect(() => {
    setTheme(t => ({
      ...t,
      styles: {
        ...t.styles,
        tabWidth: tabWidth,
      },
    }))
  }, [tabWidth])

  useEffect(() => {
    setTheme(t => ({
      ...t,
      palette,
    }))
  }, [palette])

  const paletteEntries = Object.entries(palette)

  return (
    <section className={cn(styles.theme, props.className)}>
      <div className={styles.themeStyles}>
        <Input
          className={styles.input}
          size="small"
          type="number"
          value={fontSize}
          label="fontSize"
          onChange={({ target: { value } }) => setFontSize(+value)}
        />
        <Input
          className={styles.input}
          size="small"
          type="number"
          value={lineHeight}
          label="lineHeight"
          onChange={({ target: { value } }) => setLineHeight(+value)}
        />
        <Input
          className={styles.input}
          size="small"
          type="number"
          value={tabWidth}
          label="tabWidth"
          onChange={({ target: { value } }) => setTabWidth(+value)}
        />
        <Input
          // className={styles.input} // no margin-bottom here
          size="small"
          type="text"
          value={fontFamily}
          label="fontFamily"
          onChange={({ target: { value } }) => setFontFamily(value)}
        />
      </div>
      <div className={styles.palette}>
        <Row justify="center" style={{ marginBottom: '0.5rem' }}>
          {paletteEntries.slice(0, 4).map(([k, v]) => (
            <DotBox
              key={k}
              label={k}
              dotColor={v}
              active={k === active}
              onClick={() => toggleActive([k, v])}
            />
          ))}
        </Row>
        <Row justify="center" style={{ marginBottom: '0.5rem' }}>
          {paletteEntries.slice(4, 8).map(([k, v]) => (
            <DotBox
              key={k}
              label={k}
              dotColor={v}
              active={k === active}
              onClick={() => toggleActive([k, v])}
            />
          ))}
        </Row>
        <Row justify="center" style={{ marginBottom: '0.5rem' }}>
          {paletteEntries.slice(8, 12).map(([k, v]) => (
            <DotBox
              key={k}
              label={k}
              dotColor={v}
              active={k === active}
              onClick={() => toggleActive([k, v])}
            />
          ))}
        </Row>
        <Row justify="center">
          {paletteEntries.slice(12).map(([k, v]) => (
            <DotBox
              key={k}
              label={k}
              dotColor={v}
              active={k === active}
              onClick={() => toggleActive([k, v])}
            />
          ))}
        </Row>
      </div>
      <ColorPicker
        color={color}
        onChange={color => setColor(color)}
        disabled={!active}
      />
    </section>
  )
}
