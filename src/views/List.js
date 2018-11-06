import React, { Component } from 'react'
import { view } from 'react-easy-state'
import containers from '../store/containers'

import ContainerLog from '../components/ContainerLog'
import Shortcuts from '../components/Shortcuts'
import Loading from '../components/Loading'
import loadingModal from '../store/loadingModal'

class App extends Component {
  render() {
    let logLabel = 'Container Log'

    if (containers.active) {
      logLabel += `: ${containers.active.name}`
    }

    const logContent = containers.noDaemon
      ? 'Waiting for Docker daemon...'
      : containers.activeLogs

    return (
      <>
        <ContainerLog label={logLabel} content={logContent} />
        <Shortcuts/>
        {loadingModal.active && <Loading/>}
      </>
    )
  }
}

export default view(App)
