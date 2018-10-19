import React, { Component } from 'react'
import { view } from 'react-easy-state'
import screen from '../screen'
import details from '../store/details'
import env from '../env'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const kbd = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

class DetailedShortcuts extends Component {
  componentDidMount() {
    screen.key('g', () => {
      details.tab = 'general'
      screen.render()
    })

    screen.key('v', () => {
      details.tab = 'volumes'
      screen.render()
    })

    screen.key('p', () => {
      details.tab = 'ports'
      screen.render()
    })

    screen.key('enter', () => {
      details.detailed = null

      screen.unkey('g')
      screen.unkey('v')
      screen.unkey('p')
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
