import React from 'react'
import { useRecoilState } from 'recoil'

import Spacer from '@zeit-ui/react/esm/spacer'
import Input from '@zeit-ui/react/esm/input'
import Toggle from '@zeit-ui/react/esm/toggle'
import Text from '@zeit-ui/react/esm/text'
import Row from '@zeit-ui/react/esm/row'
import Col from '@zeit-ui/react/esm/col'

import { defaultOptions } from '../../../'
import { optionsState } from '../../state/options'

import styles from './styles.module.scss'

const additionalProps = {
  previewOpacity: { step: 0.05 },
}

export function Options() {
  const [options, setOptions] = useRecoilState(optionsState)

  const optionsEntries = Object.entries({
    ...options,
    ...defaultOptions,
  }).sort(([a], [b]) => (a < b ? -1 : 1))

  const toggles = optionsEntries.filter(([, v]) => typeof v === 'boolean')
  const inputs = optionsEntries.filter(([, v]) =>
    ['string', 'number'].includes(typeof v),
  )

  function setOption([k, v]) {
    setOptions(opts => ({
      ...opts,
      [k]: v,
    }))
  }

  return (
    <div className={styles.options}>
      <Row justify="space-between">
        <Col span={4}>
          {toggles.map(([k, v]) => (
            <label key={k}>
              <Text small>{k}</Text>
              <Toggle
                initialChecked={options[k]}
                onChange={({ target: { checked } }) => setOption([k, checked])}
              ></Toggle>
            </label>
          ))}
        </Col>
        <Spacer />
        <Col span={10}>
          {inputs.slice(0, 3).map(([k, v]) => (
            <Input
              key={k}
              className={styles.input}
              label={k}
              type={typeof v === 'number' ? 'number' : 'text'}
              min={0}
              value={options[k] !== undefined ? options[k] : v}
              onChange={({ target: { value } }) => setOption([k, +value])}
              {...additionalProps[k]}
            />
          ))}
        </Col>
        <Spacer />
        <Col span={10}>
          {inputs.slice(3, 6).map(([k, v]) => (
            <Input
              key={k}
              className={styles.input}
              label={k}
              type={typeof v === 'number' ? 'number' : 'text'}
              min={0}
              value={options[k] !== undefined ? options[k] : v}
              onChange={({ target: { value } }) => setOption([k, +value])}
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}
