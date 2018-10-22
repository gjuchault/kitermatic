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
    })

    screen.key('v', () => {
      details.tab = 'volumes'
    })

    screen.key('p', () => {
      details.tab = 'ports'
    })

    screen.key('enter', () => {
      screen.unkey('g')
      screen.unkey('v')
      screen.unkey('p')
      screen.unkey('enter')

      // fixme: when not using setTimeout, we get warning :
      // Can only update a mounted or mounting component
      setTimeout(() => {
        details.detailed = null
      }, 1)
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
