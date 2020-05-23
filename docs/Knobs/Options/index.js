import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import Spacer from '@zeit-ui/react/esm/spacer'
import Input from '@zeit-ui/react/esm/input'
import Toggle from '@zeit-ui/react/esm/toggle'
import Text from '@zeit-ui/react/esm/text'
import Row from '@zeit-ui/react/esm/row'
import Col from '@zeit-ui/react/esm/col'

import { optionsState } from '../../state/options'

import styles from './styles.module.scss'

export function Options() {
  const [options, setOptions] = useRecoilState(optionsState)

  const [expandLevel, setExpandLevel] = useState(options.expandLevel)
  const [previewOpacity, setPreviewOpacity] = useState(options.previewOpacity)
  const [hidePreviews, setHidePreviews] = useState(options.hidePreviews)
  const [previewPropertiesMaxCount, setPreviewPropertiesMaxCount] = useState(
    options.previewPropertiesMaxCount,
  )
  const [previewElementsMaxCount, setPreviewElementsMaxCount] = useState(
    options.previewElementsMaxCount,
  )
  const [previewStringMaxLength, setPreviewStringMaxLength] = useState(
    options.previewStringMaxLength,
  )
  const [hideDataTypes, setHideDataTypes] = useState(options.hideDataTypes)
  const [hideObjectSize, setHideObjectSize] = useState(options.hideObjectSize)

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      expandLevel,
    }))
  }, [expandLevel])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      previewOpacity,
    }))
  }, [previewOpacity])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      hidePreviews,
    }))
  }, [hidePreviews])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      previewPropertiesMaxCount,
    }))
  }, [previewPropertiesMaxCount])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      previewElementsMaxCount,
    }))
  }, [previewElementsMaxCount])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      previewStringMaxLength,
    }))
  }, [previewStringMaxLength])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      hideDataTypes,
    }))
  }, [hideDataTypes])

  useEffect(() => {
    setOptions(opts => ({
      ...opts,
      hideObjectSize,
    }))
  }, [hideObjectSize])

  return (
    <div className={styles.options}>
      <Row justify="space-between">
        <Col span={4}>
          <label>
            <Text small>hidePreviews</Text>
            <Toggle
              initialChecked={options.hidePreviews}
              onChange={({ target: { checked } }) => setHidePreviews(checked)}
            ></Toggle>
          </label>
          <label>
            <Text small>hideDataTypes</Text>
            <Toggle
              initialChecked={options.hideDataTypes}
              onChange={({ target: { checked } }) => setHideDataTypes(checked)}
            ></Toggle>
          </label>
          <label>
            <Text small>hideObjectSize</Text>
            <Toggle
              initialChecked={options.hideObjectSize}
              onChange={({ target: { checked } }) => setHideObjectSize(checked)}
            ></Toggle>
          </label>
        </Col>
        <Spacer />
        <Col span={11}>
          <Input
            className={styles.input}
            label="previewPropertiesMaxCount"
            type="number"
            min={0}
            value={options.previewPropertiesMaxCount}
            onChange={({ target: { value } }) =>
              setPreviewPropertiesMaxCount(+value)
            }
          />
          <Input
            className={styles.input}
            label="previewElementsMaxCount"
            type="number"
            min={0}
            value={options.previewElementsMaxCount}
            onChange={({ target: { value } }) =>
              setPreviewElementsMaxCount(+value)
            }
          />
          <Input
            className={styles.input}
            label="previewStringMaxLength"
            type="number"
            min={0}
            value={options.previewStringMaxLength}
            onChange={({ target: { value } }) =>
              setPreviewStringMaxLength(+value)
            }
          />
        </Col>
        <Spacer />
        <Col span={9}>
          <Input
            className={styles.input}
            label="expandLevel"
            type="number"
            min={0}
            value={options.expandLevel}
            onChange={({ target: { value } }) => setExpandLevel(+value)}
          />
          <Input
            className={styles.input}
            label="previewOpacity"
            type="number"
            min={0}
            step={0.05}
            value={options.previewOpacity}
            onChange={({ target: { value } }) => setPreviewOpacity(+value)}
          />
        </Col>
      </Row>
    </div>
  )
}
