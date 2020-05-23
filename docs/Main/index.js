import React from 'react'
import { RecoilRoot } from 'recoil'
import ZeitProvider from '@zeit-ui/react/esm/zeit-provider'
import Text from '@zeit-ui/react/esm/text'
import Link from '@zeit-ui/react/esm/link'
import Row from '@zeit-ui/react/esm/row'
import Github from '@zeit-ui/react-icons/github'

import { View } from '../View'
import { Knobs } from '../Knobs'

import styles from './styles.module.scss'

export function Main() {
  return (
    <RecoilRoot>
      <ZeitProvider>
        <main className={styles.main}>
          <header>
            <Row
              justify="space-between"
              align="middle"
              style={{ padding: '0 16px' }}
            >
              <Text h3>React-Object-View</Text>
              <Link
                size="small"
                href="https://github.com/monojack/react-object-view"
              >
                <Github size={20} />
              </Link>
            </Row>
          </header>
          <View className={styles.view} />
          <Knobs className={styles.knobs} />
        </main>

        {/* <main className={styles.main}> */}
        {/* </main> */}
      </ZeitProvider>
    </RecoilRoot>
  )
}
