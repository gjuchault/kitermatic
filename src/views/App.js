import React, { Component } from 'react'
import { view } from 'react-easy-state'
import List from './List'
import Container from './Container'
import containers from '../store/containers'

class App extends Component {
  render() {
    return (
      <>
        {!containers.detailed && <List />}
        {containers.detailed && <Container />}
      </>
    )
  }
}

export default view(App)
