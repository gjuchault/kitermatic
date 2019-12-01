import React from 'react'

import { createKbd } from '../../utils/createKbd'
import { Container } from '../../docker'
import { env, KitermaticEnvironmentFlags } from '../../env'

const lineNb = (str: string) =>
  Math.ceil(str.length / ((process.stdout.columns * 3) / 4 - 2))

type Props = {
  container: Container
}

const ContainerDetailsGeneral: React.FC<Props> = ({ container }) => {
  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]
  const kbd = createKbd(themeBg)

  let currentHeight = 0

  const containerEnv = Object.entries(container.env).map((entry, i) => {
    const content = `${kbd(`${entry[0]}:`)} ${entry[1]}`
    const envHeight = lineNb(`${entry[0]}: ${entry[1]}`)

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
  })

  return (
    <>
      <blessed-box
        width="75%"
        shrink={true}
        left="25%"
        top="0%+3"
        label=" General "
        border={{ type: 'line' }}
        style={{ border: { fg: themeBg } }}
      >
        <blessed-box
          shrink={true}
          tags={true}
          content={`${kbd('Id  :')} ${container.id}`}
        />
        <blessed-box
          shrink={true}
          top="0%+1"
          tags={true}
          content={`${kbd('Name:')} ${container.name}`}
        />
        <blessed-box
          shrink={true}
          top="0%+2"
          tags={true}
          content={`${kbd('Image:')} ${container.imageName}`}
        />
        <blessed-box
          shrink={true}
          top="0%+3"
          tags={true}
          content={`${kbd('Command:')} ${container.command}`}
        />
      </blessed-box>
      <blessed-box
        width="75%"
        shrink={true}
        left="25%"
        top="0%+9"
        height="100%-10"
        alwaysScroll={true}
        scrollable={true}
        mouse={true}
        label=" Environment variables "
        border={{ type: 'line' }}
        style={{ border: { fg: themeBg } }}
      >
        {containerEnv}
      </blessed-box>
    </>
  )
}

export default ContainerDetailsGeneral
