import React, { Component } from 'react'
import ContainerList from '../components/ContainersList'
import ContainerLog from '../components/ContainerLog'
import Shortcuts from '../components/Shortcuts'

class App extends Component {
  render() {
    return (
      <>
        <ContainerList/>
        <ContainerLog />
        <Shortcuts/>
      </>
    )
  }
}

export default App
