import React, { useState, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import cn from 'classnames'
import Row from '@zeit-ui/react/esm/row'
import Input from '@zeit-ui/react/esm/input'
import { defaultPalette, defaultStyles } from '../../../'

import { themeState } from '../../state/theme'

import { DotBox } from './DotBox'
import { ColorPicker } from './ColorPicker'
import styles from './styles.module.scss'

const toNumber = v => +v
const identity = v => v
const styleValueProjectionFnsMap = {
  fontSize: toNumber,
  lineHeight: toNumber,
  tabWidth: toNumber,
  fontFamily: identity,
}

export function Theme(props) {
  const [theme, setTheme] = useRecoilState(themeState)

  const [active, setActive] = useState(null)
  const [color, setColor] = useState({})

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
      setTheme(t => ({ ...t, palette: { ...t.palette, [active]: color.hex } }))
    }
  }, [active, color.hex])

  const setStyle = useCallback(function setStyle([k, v]) {
    setTheme(t => ({
      ...t,
      styles: {
        ...t.styles,
        [k]: (styleValueProjectionFnsMap[k] ?? identity)(v),
      },
    }))
  }, [])

  const paletteEntries = Object.entries({
    ...defaultPalette,
    ...theme.palette,
  }).sort(([a], [b]) => (a < b ? -1 : 1))

  const stylesEntries = [
    'fontSize',
    'lineHeight',
    'tabWidth',
    'fontFamily',
  ].map(k => [k, theme.styles[k] ?? defaultStyles[k]])

  return (
    <section className={cn(styles.theme, props.className)}>
      <div className={styles.themeStyles}>
        {stylesEntries.map(([k, v], i) => (
          <Input
            key={k}
            className={i < stylesEntries.length - 1 ? styles.input : ''} // no className for the last entry
            size="small"
            type={typeof v === 'number' ? 'number' : 'text'}
            value={v}
            label={k}
            onChange={({ target: { value } }) => setStyle([k, value])}
          />
        ))}
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
