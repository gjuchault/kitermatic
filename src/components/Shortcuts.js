import React, { Component } from 'react'
import { view } from 'react-easy-state'
import screen from '../screen'
import docker from '../docker'
import env from '../env'
import { isLocked, lock, unlock } from '../lock'
import containers, { refreshContainers } from '../store/containers'
import details from '../store/details'
import loadingModal from '../store/loadingModal'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const kbd = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

const lockModal = (message) => {
  lock()
  loadingModal.message = message
  loadingModal.active = true

  return () => {
    loadingModal.active = false
    unlock()
  }
}

class Shortcuts extends Component {
  componentDidMount() {
    screen.key('s', async () => {
      if (isLocked || !containers.active) {
        return
      }

      const unlockModal = lockModal(`Stopping container ${containers.active.name}`)

      const container = await docker.getContainer(containers.active.id)

      if (containers.active.running) {
        containers.active.running = false
        await container.stop()
      } else {
        containers.active.running = true
        await container.start()
      }

      await refreshContainers()

      unlockModal()
    })

    screen.key('r', async () => {
      if (isLocked || !containers.active) {
        return
      }

      const unlockModal = lockModal(`Restarting container ${containers.active.name}`)

      const container = await docker.getContainer(containers.active.id)
      await container.restart()
      await refreshContainers()

      unlockModal()
    })

    screen.key('e', async () => {
      if (!containers.active) {
        return
      }

      // fixme: mouse listening screws screen.exec
      const unlockModal = lockModal(`Starting sh in container ${containers.active.name}`)

      await screen.exec('docker', ['exec', '-it', containers.active.name, 'sh'])

      unlockModal()
    })

    screen.key('enter', async () => {
      if (!containers.active) {
        return
      }

      screen.unkey('s')
      screen.unkey('r')
      screen.unkey('e')
      screen.unkey('enter')

      details.detailed = true
    })
  }

  render() {
    const bindings = [
      [kbd('S'), 'Start/Stop'],
      [kbd('R'), 'Reload'],
      [kbd('E'), 'Exec'],
      [kbd('↵') + ' ', 'Detailed view']
    ].map(entry => entry.join(': ')).join(' | ')

    return (
      <text
        left="0%"
        top="99%"
        width="100%"
        height="1"
        valign="middle"
        tags={true}
        content={bindings}
      />
    )
  }
}

export default view(Shortcuts)
