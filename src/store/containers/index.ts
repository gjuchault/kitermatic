import { AnyAction } from 'redux'
import Dockerode from 'dockerode'

import { createEngine, Container } from '../../docker'

import {
  REFRESH_CONTAINERS_SUCCESS,
  REFRESH_CONTAINERS_FAILURE,
  SELECT_CONTAINER,
  SET_CONTAINER_RUNNING,
  SET_LOG_STREAM,
  SET_ACTIVE_CONTAINER_LOGS,
  APPEND_ACTIVE_CONTAINER_LOGS
} from './actions'

export type State = {
  byId: {
    [key: string]: Container
  }
  active: string | null
  engine: Dockerode
  logStream: NodeJS.ReadableStream | null
  isRunning: boolean
}

const initialState: State = {
  byId: {},
  active: null,
  engine: createEngine(),
  logStream: null,
  isRunning: false
}

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REFRESH_CONTAINERS_FAILURE:
      return {
        ...state,
        byId: {},
        active: null,
        isRunning: false
      }
    case REFRESH_CONTAINERS_SUCCESS:
      return {
        ...state,
        byId: action.payload,
        active: null,
        isRunning: true
      }
    case SELECT_CONTAINER:
      return {
        ...state,
        active: action.payload
      }
    case SET_CONTAINER_RUNNING:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            isRunning: action.payload.isRunning
          }
        }
      }
    case SET_LOG_STREAM:
      return {
        ...state,
        logStream: action.payload
      }
    case SET_ACTIVE_CONTAINER_LOGS:
      if (!state.active) {
        return state
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [state.active]: {
            ...state.byId[state.active],
            logs: action.payload
          }
        }
      }
    case APPEND_ACTIVE_CONTAINER_LOGS:
      if (!state.active) {
        return state
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [state.active]: {
            ...state.byId[state.active],
            logs: state.byId[state.active].logs + action.payload
          }
        }
      }
    default:
      return state
  }
}
