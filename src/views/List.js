import React, { Component } from 'react'
import { view } from 'react-easy-state'

import ContainerList from '../components/ContainersList'
import ContainerLog from '../components/ContainerLog'
import Shortcuts from '../components/Shortcuts'
import Loading from '../components/Loading'
import loadingModal from '../store/loadingModal'

class App extends Component {
  render() {
    return (
      <>
        <ContainerList/>
        <ContainerLog />
        <Shortcuts/>
        {loadingModal.active && <Loading/>}
      </>
    )
  }
}

export default view(App)
