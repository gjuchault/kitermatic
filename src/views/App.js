import React, { Component } from 'react'
import ContainerList from '../components/ContainersList'
import ContainerLog from '../components/ContainerLog'

class App extends Component {
  render() {
    return (
      <>
        <ContainerList/>
        <ContainerLog />
      </>
    )
  }
}

export default App
