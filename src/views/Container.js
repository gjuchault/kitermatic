import React, { Component } from 'react'
import { view } from 'react-easy-state'
import containers from '../store/containers'
import details from '../store/details'

import ContainerGeneral from './Container-General'
import ContainerVolumes from './Container-Volumes'
import ContainerPorts from './Container-Ports'
import DetailedShortcuts from '../components/DetailedShortcuts'
import Tab from '../components/Tab'

class Container extends Component {
  render() {
    return (
      <>
        <DetailedShortcuts />
        <Tab left="25%" content="General" active={details.tab === 'general'} />
        <Tab left="25%+15" content="Volumes" active={details.tab === 'volumes'} />
        <Tab left="25%+30" content="Ports" active={details.tab === 'ports'} />
        {details.tab === 'general' && <ContainerGeneral data={containers.active.data} />}
        {details.tab === 'volumes' && <ContainerVolumes data={containers.active.data} />}
        {details.tab === 'ports' && <ContainerPorts data={containers.active.data} />}
      </>
    )
  }
}

export default view(Container)
