import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { view } from 'react-easy-state'
import env from '../env'
import kbd from '../utils/emphasize'

const fg = env.KTRM_UI_THEME_BG

const lineNb = str => Math.ceil(str.length / ((process.stdout.columns * 3 / 4) - 2))

class General extends Component {
  render() {
    const env = (this.props.data.Config.Env || []).map(entry => entry.split('='))
    const cmd = this.props.data.Config.Cmd || this.props.data.Config.Entrypoint || [ 'nil' ]

    let currentHeight = 0

    return (
      <>
        <box
          width="75%"
          shrink={true}
          left="25%"
          top="0%+3"
          label=" General "
          border={{ type: 'line' }}
          style={{border: { fg }}}
        >
          <box
            shrink={true}
            tags={true}
            content={`${kbd('Id  :')} ${this.props.data.Id}`}
          />
          <box
            shrink={true}
            top="0%+1"
            tags={true}
            content={`${kbd('Name:')} ${this.props.data.Name.slice(1)}`}
          />
          <box
            shrink={true}
            top="0%+2"
            tags={true}
            content={`${kbd('Command:')} ${cmd.join(' ')}`}
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
          style={{ border: { fg } }}
        >
          {env.map((entry, i) => {
            const content = `${kbd(`${entry[0]}:`)} ${entry[1]}`
            const envHeight = lineNb(content)

            currentHeight += envHeight

            return (
              <box
                shrink={true}
                key={i}
                top={`0%+${currentHeight - envHeight}`}
                height={`0%+${envHeight}`}
                tags={true}
                content={content}/>
            )
          })}
        </box>
      </>
    )
  }
}

General.propTypes = {
  data: PropTypes.object
}

export default view(General)
