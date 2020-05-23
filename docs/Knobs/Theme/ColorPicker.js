import React from 'react'
import CustomPicker from 'react-color/lib/Custom'
import Saturation from 'react-color/lib/components/common/Saturation'
import Hue from 'react-color/lib/components/common/Hue'
import cn from 'classnames'

import styles from './styles.module.scss'

export const ColorPicker = CustomPicker(function ColorPicker({
  disabled,
  ...props
}) {
  return (
    <div className={cn(styles.colorPicker, disabled && styles.disabled)}>
      <div className={styles.saturation}>
        <Saturation {...props} />
      </div>
      <div className={styles.hue}>
        <Hue {...props} />
      </div>
      <span className={styles.hexValue}>{props.color.hex}</span>
    </div>
  )
})
