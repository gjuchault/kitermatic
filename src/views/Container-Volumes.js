import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { view } from 'react-easy-state'
import env from '../env'
import kbd from '../utils/emphasize'

const fg = env.KTRM_UI_THEME_BG

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
          style={{ border: { fg } }}
        >
          {mounts.map((entry, i) => {
            const content = `${entry[0]} ${kbd('→')} ${entry[1]}`
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
