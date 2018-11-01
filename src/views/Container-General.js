import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { view } from 'react-easy-state'
import env from '../env'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const key = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

class General extends Component {
  render() {
    const env = this.props.data.Config.Env.map(entry => entry.split('='))

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
          style={{border: { fg: theme }}}
        >
          <box
            shrink={true}
            tags={true}
            content={`${key('Id  :')} ${this.props.data.Id}`}
          />
          <box
            shrink={true}
            top="0%+1"
            tags={true}
            content={`${key('Name:')} ${this.props.data.Name.slice(1)}`}
          />
        </box>
        <box
          width="75%"
          shrink={true}
          left="25%"
          top="0%+8"
          height="100%-9"
          alwaysScroll={true}
          scrollable={true}
          mouse={true}
          label=" Environment variables "
          border={{ type: 'line' }}
          style={{ border: { fg: theme } }}
        >
          {env.map((entry, i) => (
            <box
              shrink={true}
              key={i}
              top={`0%+${i}`}
              tags={true}
              content={`${key(`${entry[0]}:`)} ${entry[1]}`}/>
          ))}
        </box>
      </>
    )
  }
}

General.propTypes = {
  data: PropTypes.object
}

export default view(General)
