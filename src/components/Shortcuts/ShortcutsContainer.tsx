import React, { useEffect } from 'react'

import { useSelector, useDispatch } from '../../hooks/useState'
import * as thunks from '../../store/containers/thunks'
import { toggleMode, setDetailsTab } from '../../store/ui/actions'
import { getMode } from '../../store/ui/selectors'
import { getContainers } from '../../store/containers/selectors'
import { useScreen } from '../../hooks/useScreen'

import Shortcuts from './Shortcuts'

type Props = {
  scrollDownLogs: () => void
  scrollUpLogs: () => void
}

const ShortcutsContainer: React.FC<Props> = ({
  scrollDownLogs,
  scrollUpLogs
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(getMode)
  const containers = useSelector(getContainers)
  const screen = useScreen()
  const startStopActiveContainer = () =>
    dispatch(thunks.startStopActiveContainer())
  const restartActiveContainer = () => dispatch(thunks.restartActiveContainer())
  const listenForLogs = () => dispatch(thunks.listenForLogs())
  const execShInContainer = () => {}

  useEffect(() => {
    if (!screen) {
      return
    }

    if (mode === 'list') {
      screen.key('s', startStopActiveContainer)
      screen.key('r', restartActiveContainer)
      screen.key('e', execShInContainer)
      screen.key('j', scrollDownLogs)
      screen.key('k', scrollUpLogs)
    } else {
      screen.key('g', () => dispatch(setDetailsTab('general')))
      screen.key('v', () => dispatch(setDetailsTab('volumes')))
      screen.key('p', () => dispatch(setDetailsTab('ports')))
    }

    screen.key('enter', () => {
      dispatch(toggleMode())
      listenForLogs()
    })

    return () => {
      screen.unkey('s')
      screen.unkey('r')
      screen.unkey('e')
      screen.unkey('j')
      screen.unkey('k')
      screen.unkey('g')
      screen.unkey('v')
      screen.unkey('p')
      screen.unkey('enter')
    }
  }, [screen, containers])

  return <Shortcuts />
}

export default ShortcutsContainer
