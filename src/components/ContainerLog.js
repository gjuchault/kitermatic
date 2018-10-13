import React, { Component } from 'react'
import { view } from 'react-easy-state'
import env from '../env'
import containers from '../store/containers'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

class ContainerLog extends Component {
  render() {
    let label = 'Container Log'

    if (containers.active) {
      label += `: ${containers.active.name}`
    }

    return (
      <box
        label={` ${label} `}
        top="0"
        left="25%"
        width="75%"
        height="95%"
        keys={true}
        interactive={true}
        alwaysScroll={true}
        border={{ type: 'line' }}
        scrollable={true}
        scrollbar={{ style: { bg: theme } }}
        mouse={true}
        style={{ border: { fg: theme } }}
        content={containers.activeLogs}
      />
    )
  }
}

export default view(ContainerLog)
