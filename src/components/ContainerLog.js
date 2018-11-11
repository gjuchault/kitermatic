import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { view } from 'react-easy-state'
import env from '../env'

const theme = env.KTRM_UI_THEME_BG || 'cyan'

class ContainerLog extends Component {
  render() {
    return (
      <box
        label={` ${this.props.label} `}
        top="0"
        left="25%"
        width="75%"
        height="99%"
        border={{ type: 'line' }}
        scrollable={true}
        mouse={true}
        scrollbar={{ style: { bg: theme } }}
        style={{ border: { fg: theme } }}
        content={this.props.content}
      />
    )
  }
}

ContainerLog.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string
}

export default view(ContainerLog)
