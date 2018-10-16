import React, { Component } from 'react'
import { view } from 'react-easy-state'
import env from '../env'

import ContainerList from '../components/ContainersList'
import DetailedShortcuts from '../components/DetailedShortcuts'
import flex from '../utils/flex'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

class Container extends Component {
  render() {
    return (
      <>
        <ContainerList/>
        <DetailedShortcuts />
        <layout left="25%" width="75%" height="10%" renderer={flex}>
          <box
            shrink={true}
            border={{ type: 'line' }}
            style={{ border: { fg: theme } }}
            content="   General   "
          />
          <box
            shrink={true}
            border={{ type: 'line' }}
            style={{ border: { fg: theme } }}
            content="   Volumes   "
          />
          <box
            shrink={true}
            border={{ type: 'line' }}
            style={{ border: { fg: theme } }}
            content="   Ports   "
          />
          <box
            shrink={false}
            fill={true}
            content="space"
          />
          <box
            content="Hello"
          />
        </layout>
      </>
    )
  }
}

export default view(Container)
