import React from 'react'

import { createKbd } from '../../utils/createKbd'
import { Container } from '../../docker'
import { env, KitermaticEnvironmentFlags } from '../../env'

type Props = {
  container: Container
}

const ContainerDetailsPorts: React.FC<Props> = ({ container }) => {
  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]
  const kbd = createKbd(themeBg)

  return (
    <>
      <blessed-box
        width="75%"
        shrink={true}
        scroll={true}
        left="25%"
        top="0%+3"
        label=" General "
        border={{ type: 'line' }}
        style={{ border: { fg: themeBg } }}
      >
        <blessed-box
          shrink={true}
          tags={true}
          content={`${kbd('Hostname:')} ${container.hostname}`}
        />
      </blessed-box>
      <blessed-box
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
        style={{ border: { fg: themeBg } }}
      >
        {container.ports.map((port, i) => (
          <blessed-box
            shrink={true}
            key={i}
            top={`0%+${i}`}
            tags={true}
            content={`${kbd(port.type.toUpperCase())} {bold}${port.hostPort ||
              'none'}{/bold} → ${port.containerPort}`}
          />
        ))}
      </blessed-box>
    </>
  )
}

export default ContainerDetailsPorts
