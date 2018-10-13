import React, { Component } from 'react'
import { view } from 'react-easy-state'
import screen from '../screen'
import docker from '../docker'
import env from '../env'
import containers from '../store/containers'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const kbd = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

class Shortcuts extends Component {
  componentDidMount() {
    screen.key(['s'], async () => {
      const container = await docker.getContainer(containers.active.id)

      await container.stop()
    })

    screen.key(['r'], async () => {
      const container = await docker.getContainer(containers.active.id)

      await container.restart()
    })

    screen.key(['e'], async () => {
      await screen.exec('docker', ['exec', '-it', containers.active.name, 'sh'])
    })
  }

  render() {
    return (
      <text
        left="0%"
        top="95%"
        width="100%"
        height="4%"
        valign="middle"
        tags={true}
        content={`${kbd('S')}: Stop | ${kbd('R')}: Reload | ${kbd('E')}: Exec | ${kbd('Q')}: Quit`}
      />
    )
  }
}

export default view(Shortcuts)
