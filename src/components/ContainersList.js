import React, { Component } from 'react'
import { view } from 'react-easy-state'
import env from '../env'
import containers, { listenForLogs } from '../store/containers'

const theme = env.KTRM_UI_THEME_BG || 'cyan'
const themeFg = env.KTRM_UI_THEME_FG || 'black'

class ContainersList extends Component {
  constructor() {
    super()
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    this.refs.list.focus()
  }

  onSelect() {
    containers.active = containers.list[this.refs.list.selected]
    listenForLogs()
  }

  render() {
    return (
      <list
        ref="list"
        label=" Containers "
        top="0"
        left="0"
        onSelect={this.onSelect}
        width="25%"
        height="95%"
        interactive={true}
        border={{ type: 'line' }}
        mouse={true}
        keys={true}
        style={{
          border: { fg: theme },
          selected: { fg: themeFg, bg: theme },
          item: { height: 2 }
        }}
        items={containers.list.map(c => `${c.name}\n${c.image}`)}
      />
    )
  }
}

export default view(ContainersList)
