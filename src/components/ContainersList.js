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
    this.list.focus()
    this.list.on('keypress', (_, key) => {
      if (key.name === 'up' || key.name === 'down') {
        this.list.enterSelected()
      }
    })
  }

  onSelect() {
    containers.active = containers.list[this.list.selected]
    listenForLogs()
  }

  containerStr(c) {
    const name = c.running ? c.name : `[stopped] ${c.name}`
    const maxWidth = (process.stdout.columns / 4) - 2

    const separator = (maxWidth < name.length)
    ? ' '
    : '\n'

    return [
      name,
      `{grey-fg}${c.image}{/grey-fg}`
    ].join(separator)
  }

  render() {
    return (
      <list
        ref={c => { this.list = c }}
        label=" Containers "
        top="0"
        left="0"
        onSelect={this.onSelect}
        width="25%"
        height="99%"
        interactive={true}
        border={{ type: 'line' }}
        keys={true}
        style={{
          border: { fg: theme },
          selected: { fg: themeFg, bg: theme },
          item: { height: 2 }
        }}
        tags={true}
        items={containers.list.map(this.containerStr)}
      />
    )
  }
}

export default view(ContainersList)
