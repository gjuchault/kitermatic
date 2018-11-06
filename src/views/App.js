import React, { Component } from 'react'
import { view } from 'react-easy-state'
import List from './List'
import Container from './Container'
import ContainersList from '../components/ContainersList'
import details from '../store/details'

class App extends Component {
  render() {
    return (
      <>
        <ContainersList />
        {!details.detailed && <List />}
        {details.detailed && <Container />}
      </>
    )
  }
}

export default view(App)
