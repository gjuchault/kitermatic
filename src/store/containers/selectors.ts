import { AppState } from '../index'

export const getEngine = (state: AppState) => state.containers.engine

export const getContainers = (state: AppState) =>
  Object.values(state.containers.byId)

export const getActiveContainer = (state: AppState) => {
  if (!state.containers.active) {
    return null
  }

  return state.containers.byId[state.containers.active]
}

export const getIsDockerDaemonRunning = (state: AppState) =>
  state.containers.isRunning

export const getLogStream = (state: AppState) => state.containers.logStream
