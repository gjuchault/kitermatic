import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { env, KitermaticEnvironmentFlags } from '../../env'

import {
  listContainers,
  Container,
  stopContainer,
  startContainer,
  restartContainer,
  createLogStreamFromContainer,
  fetchLogsFromContainer
} from '../../docker'

import {
  refreshContainersSuccess,
  refreshContainersFailure,
  selectContainer,
  setContainerRunning,
  setLogStream,
  setActiveContainerLogs,
  appendActiveContainerLogs
} from './actions'

import { getActiveContainer, getEngine, getLogStream } from './selectors'

import { AppState } from '../index'

import { setLoadingModalContent } from '../ui/actions'
import { getLoadingModalContent } from '../ui/selectors'

export const refreshContainers = (): ThunkAction<
  Promise<void>,
  AppState,
  {},
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState()
    const engine = getEngine(state)

    let containers: Container[]

    try {
      containers = await listContainers(engine)
    } catch (err) {
      dispatch(refreshContainersFailure(err))

      return
    }

    dispatch(
      refreshContainersSuccess(
        containers.reduce(
          (acc, container) => ({ ...acc, [container.id]: container }),
          {}
        )
      )
    )

    const activeContainer = getActiveContainer(state)

    if (!activeContainer && containers.length > 0) {
      dispatch(selectContainer(containers[0].id))
      listenForLogs()(dispatch, getState, {})
    }
  }
}

export const startStopActiveContainer = (): ThunkAction<
  Promise<void>,
  AppState,
  {},
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState()

    const engine = getEngine(state)
    const activeContainer = getActiveContainer(state)
    const loadingModalContent = state.ui.loadingModalContent

    if (loadingModalContent || !activeContainer) return

    const verb = activeContainer.isRunning ? 'Stopping' : 'Starting'
    dispatch(
      setLoadingModalContent(`${verb} container ${activeContainer.name}`)
    )

    if (activeContainer.isRunning) {
      dispatch(setContainerRunning(activeContainer.id, false))
      await stopContainer(engine, activeContainer.id)
    } else {
      dispatch(setContainerRunning(activeContainer.id, true))
      await startContainer(engine, activeContainer.id)
      await listenForLogs()(dispatch, getState, {})
    }

    dispatch(setLoadingModalContent(null))
  }
}

export const restartActiveContainer = (): ThunkAction<
  Promise<void>,
  AppState,
  {},
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState()

    const engine = getEngine(state)
    const activeContainer = getActiveContainer(state)
    const loadingModalContent = getLoadingModalContent(state)

    if (loadingModalContent || !activeContainer) return

    dispatch(
      setLoadingModalContent(`Restarting container ${activeContainer.name}`)
    )

    await restartContainer(engine, activeContainer.id)
    await refreshContainers()(dispatch, getState, {})
    dispatch(selectContainer(activeContainer.id))
    await listenForLogs()(dispatch, getState, {})

    dispatch(setLoadingModalContent(null))
  }
}

export const listenForLogs = (): ThunkAction<
  Promise<void>,
  AppState,
  {},
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState()

    const activeContainer = getActiveContainer(state)
    const engine = getEngine(state)
    const currentLogStream = getLogStream(state)
    const tail = env[KitermaticEnvironmentFlags.LogsTail]

    if (!activeContainer) {
      return
    }

    if (currentLogStream) {
      currentLogStream.removeAllListeners()
      dispatch(setLogStream(null));
    }

    const initialLogs = await fetchLogsFromContainer(
      engine,
      activeContainer.id,
      tail
    )

    dispatch(setActiveContainerLogs(initialLogs))

    const logStream = await createLogStreamFromContainer(
      engine,
      activeContainer.id
    )

    if (!logStream) {
      return
    }

    dispatch(setLogStream(logStream))

    logStream.on('data', (chunk: string) => {
      dispatch(appendActiveContainerLogs(chunk))
    })
  }
}
