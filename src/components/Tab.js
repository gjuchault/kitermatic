import React, { Component } from 'react'
import PropTypes from 'prop-types'
import env from '../env'

const bg = env.KTRM_UI_THEME_BG || 'cyan'
const fg = env.KTRM_UI_THEME_FG || 'black'

class Tab extends Component {
  render() {
    const style = this.props.active
      ? { border: { fg: bg }, bg, fg }
      : { border: { fg: bg }, bg: null, fg: null }

    return (
      <box
        shrink={true}
        border={{ type: 'line' }}
        left={this.props.left}
        top={this.props.top}
        style={style}
        content={`   ${this.props.content}   `}
      />
    )
  }
}

Tab.propTypes = {
  content: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  active: PropTypes.bool
}

export default Tab
