import React, { Component } from 'react'
import { view } from 'react-easy-state'
import screen from '../screen'
import containers from '../store/containers'
import env from '../env'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const kbd = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

class DetailedShortcuts extends Component {
  componentDidMount() {
    screen.key('enter', () => {
      containers.detailed = null

      // screen.unkey('s')
      // screen.unkey('r')
      // screen.unkey('e')
      screen.unkey('enter')
      // fixme: `view(App)` on `src/views/App.js` should handle this render
      screen.render()
    })
  }

  render() {
    const bindings = [
      [kbd('G'), 'General'],
      [kbd('V'), 'Volumes'],
      [kbd('P'), 'Ports'],
      [kbd('↵') + ' ', 'Logs view']
    ].map(entry => entry.join(': ')).join(' | ')

    return (
      <text
        left="0%"
        top="99%"
        width="100%"
        height="1"
        valign="middle"
        tags={true}
        content={bindings}
      />
    )
  }
}

export default view(DetailedShortcuts)
