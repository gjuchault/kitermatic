import React, { useEffect, useRef } from 'react'

import { useScreen } from '../../hooks/useScreen'
import { useSelector, useDispatch } from '../../hooks/useState'
import { getMode, getLoadingModalContent } from '../../store/ui/selectors'
import * as thunks from '../../store/containers/thunks'

import Sidebar from '../Sidebar/Sidebar'
import ContainerLog from '../ContainerLog/ContainerLog'
import ContainerDetails from '../ContainerDetails/ContainerDetails'
import Modal from '../Modal/Modal'
import Shortcuts from '../Shortcuts/ShortcutsContainer'

const Kitermatic: React.FC = () => {
  const logsRef = useRef<any>()
  const screen = useScreen()
  const dispatch = useDispatch()
  const refreshContainers = () => dispatch(thunks.refreshContainers())

  const mode = useSelector(getMode)
  const loadingContent = useSelector(getLoadingModalContent)

  useEffect(() => {
    refreshContainers()
  }, [])

  const handleScrollDownLogs = () => {
    const scrollAmount = Math.round(screen.height / 3)
    logsRef.current.scroll(scrollAmount)
  }

  const handleScrollUpLogs = () => {
    const scrollAmount = -1 * Math.round(screen.height / 3)
    logsRef.current.scroll(scrollAmount)
  }

  return (
    <>
      <Sidebar />
      {loadingContent && <Modal content={loadingContent} />}
      {mode === 'list' && <ContainerLog logsRef={logsRef} />}
      {mode === 'details' && <ContainerDetails />}
      <Shortcuts
        scrollDownLogs={handleScrollDownLogs}
        scrollUpLogs={handleScrollUpLogs}
      />
    </>
  )
}

export default Kitermatic
