import React from 'react'

import { env, KitermaticEnvironmentFlags } from '../../env'

type Props = {
  left?: string
  top?: string
  isActive: boolean
}

const Tab: React.FC<Props> = ({ left, top, isActive, children }) => {
  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]
  const themeFg = env[KitermaticEnvironmentFlags.ThemeForeground]

  const style = isActive
    ? { border: { fg: themeBg }, bg: themeBg, fg: themeFg }
    : { border: { fg: themeBg }, bg: null, fg: null }

  return (
    <blessed-box
      shrink={true}
      border={{ type: 'line' }}
      left={left}
      top={top}
      style={style}
      content={`   ${children}   `}
    />
  )
}

export default Tab
