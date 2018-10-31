import React, { Component } from 'react'
import { view } from 'react-easy-state'
import details from '../store/details'
import docker from '../docker'

import ContainerGeneral from './Container-General'
import ContainerVolumes from './Container-Volumes'
import ContainerPorts from './Container-Ports'
import DetailedShortcuts from '../components/DetailedShortcuts'
import Tab from '../components/Tab'
import flex from '../utils/flex'

class Container extends Component {
  render() {
    return (
      <>
        <DetailedShortcuts />
        <Tab left="25%" content="General" active={details.tab === 'general'} />
        <Tab left="25%+15" content="Volumes" active={details.tab === 'volumes'} />
        <Tab left="25%+30" content="Ports" active={details.tab === 'ports'} />
        {details.tab === 'general' && <ContainerGeneral data={details.detailed} />}
        {details.tab === 'volumes' && <ContainerVolumes data={details.detailed} />}
        {details.tab === 'ports' && <ContainerPorts data={details.detailed} />}
      </>
    )
  }
}

export default view(Container)
