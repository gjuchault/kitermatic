import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { view } from 'react-easy-state'
import env from '../env'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const key = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

class Ports extends Component {
  render() {
    const NS = this.props.data.NetworkSettings.Ports

    const ports = Object.keys(NS)
      .map((from) => [
        from.slice(0, from.indexOf('/')),
        `${NS[from][0].HostIp}:${NS[from][0].HostPort}`
      ])

    return (
      <>
        <box
          width="75%"
          shrink={true}
          scroll={true}
          left="25%"
          top="0%+3"
          label=" General "
          border={{ type: 'line' }}
          style={{ border: { fg: theme } }}
        >
          <box
            shrink={true}
            tags={true}
            content={`${key('Hostname:')} ${this.props.data.Config.Hostname}`}
          />
        </box>
        <box
          width="75%"
          shrink={true}
          left="25%"
          top="0%+7"
          height="100%-8"
          alwaysScroll={true}
          scrollable={true}
          mouse={true}
          label=" Ports Mapping "
          border={{ type: 'line' }}
          style={{ border: { fg: theme } }}
        >
          {ports.map((entry, i) => (
            <box
              shrink={true}
              key={i}
              top={`0%+${i}`}
              tags={true}
              content={`{bold}${entry[0]}{/bold} → ${entry[1]}`} />
          ))}
        </box>
      </>
    )
  }
}

Ports.propTypes = {
  data: PropTypes.object
}

export default view(Ports)
