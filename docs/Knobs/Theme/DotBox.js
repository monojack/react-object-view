import React from 'react'
import Text from '@zeit-ui/react/esm/text'
import cn from 'classnames'

import styles from './styles.module.scss'

export function DotBox({ label, active, dotColor, ...props }) {
  return (
    <div {...props} className={cn(styles.dotBox, active && styles.active)}>
      <span
        className={styles.dot}
        style={{ backgroundColor: dotColor }}
        label={label}
      />
      <Text className={styles.label} small>
        {label}
      </Text>
    </div>
  )
}
