import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { view } from 'react-easy-state'
import env from '../env'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

const key = str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`

const lineNb = str => Math.ceil(str.length / ((process.stdout.columns * 3 / 4) - 2))

class Volumes extends Component {
  render() {
    const mounts = this.props.data.Mounts
      .map(entry => ([ entry.Source, entry.Destination ]))

    let currentHeight = 0

    return (
      <>
        <box
          width="75%"
          shrink={true}
          left="25%"
          top="0%+3"
          height="100%-4"
          alwaysScroll={true}
          scrollable={true}
          mouse={true}
          label=" Volumes "
          border={{ type: 'line' }}
          style={{ border: { fg: theme } }}
        >
          {mounts.map((entry, i) => {
            const content = `${entry[0]} ${key('→')} ${entry[1]}`
            const envHeight = lineNb(content)

            currentHeight += envHeight

            return (
              <box
                shrink={true}
                key={i}
                top={`0%+${currentHeight - envHeight}`}
                height={`0%+${envHeight}`}
                tags={true}
                content={content} />
            )
          })}
        </box>
      </>
    )
  }
}

Volumes.propTypes = {
  data: PropTypes.object
}

export default view(Volumes)
