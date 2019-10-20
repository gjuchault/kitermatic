import React from 'react'

import { createKbd } from '../../utils/createKbd'
import { getMode } from '../../store/ui/selectors'
import { useSelector } from '../../hooks/useState'
import { env, KitermaticEnvironmentFlags } from '../../env'

const Shortcuts: React.FC = () => {
  const mode = useSelector(getMode)
  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]

  const kbd = createKbd(themeBg)

  let bindings

  if (mode === 'list') {
    bindings = [
      [kbd('S'), 'Start/Stop'],
      [kbd('R'), 'Reload'],
      [kbd('E'), 'Exec'],
      [kbd('J'), 'Scroll down'],
      [kbd('K'), 'Scroll up'],
      [kbd('↵') + ' ', 'Detailed view']
    ]
      .map(entry => entry.join(' '))
      .join(' ')
  } else {
    bindings = [
      [kbd('G'), 'General'],
      [kbd('V'), 'Volumes'],
      [kbd('P'), 'Ports'],
      [kbd('↵') + ' ', 'List view']
    ]
      .map(entry => entry.join(' '))
      .join(' ')
  }

  return (
    <blessed-text
      left="0%"
      top="99%"
      width="100%"
      height="1"
      valign="middle"
      tags={true}
      content={bindings}
    />
  )
}

export default Shortcuts
