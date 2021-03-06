import React, { useEffect, useRef, useState } from 'react'

import { useSelector, useDispatch } from '../../hooks/useState'
import { getContainers } from '../../store/containers/selectors'
import { selectContainer } from '../../store/containers/actions'
import * as thunks from '../../store/containers/thunks'
import { env, KitermaticEnvironmentFlags } from '../../env'

import { getContainerName } from './getContainerName'

// FIXME: useEffect is called twice
let sidebarMounted = false;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const containers = useSelector(getContainers)
  const listenForLogs = () => dispatch(thunks.listenForLogs())
  const list = useRef<any>()

  useEffect(() => {
    if (!list.current || sidebarMounted) {
      return
    }

    sidebarMounted = true

    list.current.focus()

    list.current.on('keypress', (_: unknown, key: any) => {
      if (
        key.name === 'up' ||
        key.name === 'down'
      ) {
        list.current.enterSelected()
      }
    })
  }, [list])

  const themeBg = env[KitermaticEnvironmentFlags.ThemeBackground]
  const themeFg = env[KitermaticEnvironmentFlags.ThemeForeground]

  const onSelect = () => {
    if (!list.current) {
      return
    }

    dispatch(selectContainer(containers[list.current.selected].id))
    listenForLogs()
  }

  return (
    <blessed-list
      ref={list}
      label="Containers"
      top="0"
      left="0"
      onSelect={onSelect}
      width="25%"
      height="99%"
      mouse={true}
      keys={true}
      interactive={true}
      border={{ type: 'line' }}
      style={{
        border: { fg: themeBg },
        selected: { fg: themeFg, bg: themeBg },
        item: { height: 2 }
      }}
      tags={true}
      items={containers.map(getContainerName)}
    />
  )
}

export default Sidebar
