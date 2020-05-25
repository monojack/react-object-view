import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { customValue as Symbol_customValue } from '../symbols'

import { themeState } from '../theme'
import { optionsState } from '../options'
import {
  getTypeOf,
  typeNames,
  isAnonymousFunction,
  isArrowFunction,
} from '../utils/types'

function FunctionValue({
  data,
  nameColor,
  typeColor,
  arrowColor,
  hideDataTypes,
}) {
  const type = getTypeOf(data)

  const isAsyncFn = [
    typeNames.AsyncFunction,
    typeNames.AsyncGeneratorFunction,
  ].includes(type)

  const isGeneratorFn = [
    typeNames.GeneratorFunction,
    typeNames.AsyncGeneratorFunction,
  ].includes(type)

  const isAnonFn = isAnonymousFunction(data)

  const isArrowFn = isArrowFunction(data)

  return (
    <i>
      {!hideDataTypes && (
        <span
          style={{
            color: typeColor,
          }}
        >
          {isAsyncFn ? 'async ' : ''}
          <b>ƒ</b>
          {isGeneratorFn ? <b style={{ color: arrowColor }}>{'* '}</b> : ' '}
        </span>
      )}
      <span>
        {isAnonFn ? (
          '()'
        ) : isArrowFn ? (
          <>
            {'()'}
            <span style={{ color: arrowColor }}>&nbsp;=>&nbsp;</span>
            {'{}'}
          </>
        ) : (
          <>
            <span style={{ color: nameColor }}>{data.name}</span>
            {' ()'}
          </>
        )}
      </span>
    </i>
  )
}

export function Value({ data, ...props }) {
  const theme = useRecoilValue(themeState)
  const { hideDataTypes } = useRecoilValue(optionsState)

  const nullOrUndefinedStyle = {
    textTransform: 'uppercase',
    fontWeight: 'bolder',
    fontSize: `${theme.fontSize - 3}px`,
    lineHeight: `${theme.fontSize}px`,
    padding: '2px 4px',
    borderRadius: 2,
    alignSelf: 'center',
  }

  const vdom = useMemo(() => {
    if (data?.[Symbol_customValue]) {
      return <span>{data?.[Symbol_customValue]()}</span>
    }

    switch (getTypeOf(data)) {
      case typeNames.URL:
        return (
          <a
            href={data}
            style={{
              color: theme.valueURLColor,
              fontStyle: 'italic',
              ...props.style,
            }}
          >
            {data}
          </a>
        )

      case typeNames.string:
        return (
          <span style={{ color: theme.valueStringColor, ...props.style }}>
            '{data}'
          </span>
        )

      case typeNames.bigint:
        return (
          <span style={{ color: theme.valueNumberColor, ...props.style }}>
            {data}n
          </span>
        )

      case typeNames.number:
        return (
          <span style={{ color: theme.valueNumberColor, ...props.style }}>
            {data}
          </span>
        )

      case typeNames.boolean:
        return (
          <span style={{ color: theme.valueBooleanColor, ...props.style }}>
            {String(data)}
          </span>
        )

      case typeNames.symbol:
        return (
          <i style={props.style}>
            <span style={{ color: theme.valueTypeColor }}>Symbol</span>
            {`(`}
            <span style={{ color: theme.valueStringColor }}>
              {data.description}
            </span>
            {`)`}
          </i>
        )

      case typeNames.undefined:
        return (
          <span
            style={{
              color: theme.valueUndefinedColor,
              backgroundColor: theme.valueUndefinedBackgroundColor,
              ...nullOrUndefinedStyle,
              ...props.style,
            }}
          >
            {String(data)}
          </span>
        )
      case typeNames.null:
        return (
          <span
            style={{
              color: theme.valueNullColor,
              backgroundColor: theme.valueNullBackgroundColor,
              ...nullOrUndefinedStyle,
              ...props.style,
            }}
          >
            {String(data)}
          </span>
        )

      case typeNames.Function:
      case typeNames.AsyncFunction:
      case typeNames.AsyncGeneratorFunction:
      case typeNames.GeneratorFunction:
        return (
          <FunctionValue
            data={data}
            typeColor={theme.valueTypeColor}
            nameColor={theme.valueFunctionColor}
            arrowColor={theme.valueFunctionArrowColor}
            hideDataTypes={hideDataTypes}
            style={props.style}
          />
        )

      case typeNames.Date:
        return (
          <i style={{ color: theme.valueDateColor, ...props.style }}>
            {data.toString()}
          </i>
        )

      case typeNames.RegExp:
        return (
          <i style={{ color: theme.valueRegExpColor, ...props.style }}>
            {data.toString()}
          </i>
        )

      case typeNames.Map:
      case typeNames.Set:
      case typeNames.Array:
        return (
          <span style={props.style}>
            <span style={{ color: theme.valueTypeColor }}>
              {getTypeOf(data)}
            </span>
            {`(`}
            <span style={{ color: theme.valueNumberColor }}>
              {data.size ?? data.length}
            </span>
            {`)`}
          </span>
        )

      case typeNames.Object:
        return (
          <span style={{ color: theme.valueColor, ...props.style }}>
            {`{`}
            <span style={{ color: theme.color }}>
              {Object.keys(data).length > 1 ? '…' : ''}
            </span>
            {`}`}
          </span>
        )

      default:
        return (
          <span style={{ color: theme.valueColor, ...props.style }}>
            {(() => {
              try {
                return String(data)
              } catch (e) {
                console.error(e)
                return null
              }
            })()}
          </span>
        )
    }
  }, [data, hideDataTypes, theme])

  return vdom ?? null
}
