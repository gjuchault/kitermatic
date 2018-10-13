import React, { Component } from 'react'
import { view } from 'react-easy-state'
import screen from '../screen'
import docker from '../docker'
import env from '../env'
import { isLocked, lock, unlock } from '../lock'
import containers, { refreshContainers } from '../store/containers'
import loadingModal from '../store/loadingModal'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const kbd = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

class Shortcuts extends Component {
  componentDidMount() {
    screen.key(['s'], async () => {
      if (isLocked) {
        return
      }

      lock()
      loadingModal.message = `Stopping container ${containers.active.name}`
      loadingModal.active = true

      const container = await docker.getContainer(containers.active.id)

      if (containers.active.running) {
        containers.active.running = false
        await container.stop()
      } else {
        containers.active.running = true
        await container.start()
      }

      await refreshContainers()

      loadingModal.active = false
      unlock()
    })

    screen.key(['r'], async () => {
      if (isLocked) {
        return
      }

      lock()
      loadingModal.message = `Restarting container ${containers.active.name}`
      loadingModal.active = true

      const container = await docker.getContainer(containers.active.id)

      await container.restart()
      await refreshContainers()

      loadingModal.active = false
      unlock()
    })

    screen.key(['e'], async () => {
      lock()
      loadingModal.message = `Starting sh in container ${containers.active.name}`
      loadingModal.active = true

      await screen.exec('docker', ['exec', '-it', containers.active.name, 'sh'])

      loadingModal.active = false
      unlock()
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
        content={`${kbd('S')}: Start/Stop | ${kbd('R')}: Reload | ${kbd('E')}: Exec | ${kbd('Q')}: Quit`}
      />
    )
  }
}

export default view(Shortcuts)
