import React from 'react'

type Props = {
  content: string
}

const Modal: React.FC<Props> = ({ content }) => {
  return (
    <>
      <blessed-box
        top="center"
        left="center"
        border={{ type: 'line' }}
        shrink={true}
        valign="center"
        align="center"
        content={` ${content} `}
      />
    </>
  )
}

export default Modal
