import React from 'react'

import { createKbd } from '../../utils/createKbd'
import { Container } from '../../docker'
import { env, KitermaticEnvironmentFlags } from '../../env'

const lineNb = (str: string) =>
  Math.ceil(str.length / ((process.stdout.columns * 3) / 4 - 2))

type Props = {
  container: Container
}

const ContainerDetailsVolumes: React.FC<Props> = ({ container }) => {
  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]
  const kbd = createKbd(themeBg)

  let currentHeight = 0

  return (
    <>
      <blessed-box
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
        style={{ border: { fg: themeBg } }}
      >
        {container.volumes.map((volume, i) => {
          const content = `${volume.source} ${kbd('→')} ${volume.destination}`
          const envHeight = lineNb(content)

          currentHeight += envHeight

          return (
            <blessed-box
              shrink={true}
              key={i}
              top={`0%+${currentHeight - envHeight}`}
              height={`0%+${envHeight}`}
              tags={true}
              content={content}
            />
          )
        })}
      </blessed-box>
    </>
  )
}

export default ContainerDetailsVolumes
