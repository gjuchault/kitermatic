import { Container } from '../../docker'

export const REFRESH_CONTAINERS_SUCCESS = 'REFRESH_CONTAINERS_SUCCESS'
export const REFRESH_CONTAINERS_FAILURE = 'REFRESH_CONTAINERS_FAILURE'
export const SELECT_CONTAINER = 'SELECT_CONTAINER'
export const SET_CONTAINER_RUNNING = 'SET_CONTAINER_RUNNING'
export const SET_LOG_STREAM = 'SET_LOG_STREAM'
export const SET_ACTIVE_CONTAINER_LOGS = 'SET_ACTIVE_CONTAINER_LOGS'
export const APPEND_ACTIVE_CONTAINER_LOGS = 'APPEND_ACTIVE_CONTAINER_LOGS'

export const refreshContainersSuccess = (containers: {
  [key: string]: Container
}) => ({
  type: REFRESH_CONTAINERS_SUCCESS,
  payload: containers
})

export const refreshContainersFailure = (err: any) => ({
  type: REFRESH_CONTAINERS_FAILURE,
  payload: err
})

export const selectContainer = (id: string) => ({
  type: SELECT_CONTAINER,
  payload: id
})

export const setContainerRunning = (id: string, isRunning: boolean) => ({
  type: SET_CONTAINER_RUNNING,
  payload: { id, isRunning }
})

export const setLogStream = (logStream: NodeJS.ReadableStream) => ({
  type: SET_LOG_STREAM,
  payload: logStream
})

export const setActiveContainerLogs = (logs: string) => ({
  type: SET_ACTIVE_CONTAINER_LOGS,
  payload: logs
})

export const appendActiveContainerLogs = (logs: string) => ({
  type: APPEND_ACTIVE_CONTAINER_LOGS,
  payload: logs
})
