import React from 'react'

export function ExpandIcon({ isExpanded }) {
  return (
    <b
      style={{
        position: 'absolute',
        left: 0,
        transform: `scale(1.3) translate(${
          isExpanded ? '-140%, 0' : '-110%, 4%'
        }) rotate(${isExpanded ? 90 : 0}deg)`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      &#8227;
    </b>
  )
}
