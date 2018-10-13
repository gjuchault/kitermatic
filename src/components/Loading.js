import React, { Component } from 'react'
import loadingModal from '../store/loadingModal'

class Loading extends Component {
  render() {
    return (
      <box
        top="center"
        left="center"
        border={{ type: 'line' }}
        shrink={true}
        valign="center"
        align="center"
        content={` ${loadingModal.message} `}
      />
    )
  }
}

export default Loading
