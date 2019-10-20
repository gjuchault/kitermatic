import React from 'react'

import { useSelector } from '../../hooks/useState'

import {
  getActiveContainer,
  getIsDockerDaemonRunning
} from '../../store/containers/selectors'

import { env, KitermaticEnvironmentFlags } from '../../env'

type Props = {
  logsRef: React.MutableRefObject<any>
}

const ContainerLog: React.FC<Props> = ({ logsRef }) => {
  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]

  const activeContainer = useSelector(getActiveContainer)
  const isDockerDaemonRunning = useSelector(getIsDockerDaemonRunning)

  const label = activeContainer
    ? `Container log: ${activeContainer.name}`
    : 'Container log'

  let content = isDockerDaemonRunning ? '' : 'Waiting for Docker daemon...'

  if (activeContainer && activeContainer.logs) {
    content = activeContainer.logs
  }

  return (
    <blessed-box
      ref={logsRef}
      label={` ${label} `}
      top="0"
      left="25%"
      width="75%"
      height="99%"
      border={{ type: 'line' }}
      scrollable={true}
      mouse={false}
      keys={false}
      scrollbar={{ style: { bg: themeBg } }}
      style={{ border: { fg: themeBg } }}
      content={content}
    />
  )
}

export default ContainerLog
