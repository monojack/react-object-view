import React, { useEffect, useMemo, memo } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { themeState, buildTheme, defaultPalette, defaultStyles } from '../theme'
import { optionsState, defaultOptions } from '../options'

import { Tree } from './Tree'
import { isPlainObject } from '../utils/types'
import { mergeStrict } from '../utils/mergeStrict'

const EMPTY_OBJ = {}

export const Main = memo(function Main({
  data = EMPTY_OBJ,
  palette = EMPTY_OBJ,
  styles = EMPTY_OBJ,
  options = EMPTY_OBJ,
}) {
  const [theme, setTheme] = useRecoilState(themeState)
  const setOptions = useSetRecoilState(optionsState)

  const mergedStyles = useMemo(
    () => Object.values(mergeStrict(defaultStyles, styles)),
    [styles],
  )
  const mergedPalette = useMemo(
    () => Object.values(mergeStrict(defaultPalette, palette)),
    [palette],
  )
  const mergedOptions = useMemo(
    () => Object.values(mergeStrict(defaultOptions, options)),
    [options],
  )

  useEffect(() => {
    setTheme(buildTheme({ palette, styles }))
  }, mergedStyles.concat(mergedPalette))

  useEffect(() => {
    isPlainObject(options) && setOptions(opts => ({ ...opts, ...options }))
  }, mergedOptions)

  const { backgroundColor, color, fontSize, fontFamily, lineHeight } = theme

  return (
    <main
      style={{
        backgroundColor,
        color,
        fontSize,
        fontFamily,
        lineHeight,
      }}
    >
      <Tree depth={0} data={data} />
    </main>
  )
})
