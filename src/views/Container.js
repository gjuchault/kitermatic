import React, { Component } from 'react'
import { view } from 'react-easy-state'
import details from '../store/details'

import DetailedShortcuts from '../components/DetailedShortcuts'
import Tab from '../components/Tab'
import flex from '../utils/flex'

class Container extends Component {
  render() {
    return (
      <>
        <DetailedShortcuts />
        <layout left="25%" width="75%" height="10%" renderer={flex}>
          <Tab content="General" active={details.tab === 'general'} />
          <Tab content="Volumes" active={details.tab === 'volumes'} />
          <Tab content="Ports" active={details.tab === 'ports'} />
          <box
            shrink={false}
            fill={true}
            content=""
          />
          <box
            content={details.detailed.name + ' ' + details.tab}
          />
        </layout>
      </>
    )
  }
}

export default view(Container)
