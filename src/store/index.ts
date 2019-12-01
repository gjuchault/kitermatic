import fs from 'fs'
import { inspect } from 'util'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
  AnyAction
} from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { reducer as containers, State as Containers } from './containers'
import { reducer as ui, State as Ui } from './ui'
import { renderApp } from '../index'

export type AppState = {
  containers: Containers
  ui: Ui
}

const reducer = combineReducers({
  containers,
  ui
})

// non-optimized alternative to react-redux which depends on react-dom
// and non compatible with react-blessed
const render: Middleware<{}, AppState> = () => next => action => {
  renderApp()

  next(action)

  setImmediate(renderApp)
}

if (process.env.DEBUG) {
try {
  fs.unlinkSync('store.log')
} catch (_) {}
}

const logger: Middleware<
  {},
  AppState,
  ThunkDispatch<AppState, {}, AnyAction>
> = store => next => async action => {
  if (!process.env.DEBUG) {
    return next(action)
  }

  fs.appendFileSync(
    'store.log',
    inspect({
      ...action,
      payload:
        action.payload && action.payload.length && action.payload > 1000
          ? action.payload.slice(0, 20)
          : action.payload
    }) + '\n'
  )

  await next(action)

  const state = store.getState() as AppState

  fs.appendFileSync(
    'store.log',
    inspect({
      ...state,
      containers: {
        ...state.containers,
        engine: state.containers.engine ? '[engine]' : '[falsy]',
        logStream: state.containers.logStream ? '[logStream]' : '[falsy]'
      }
    }) + '\n=====\n\n'
  )

  setImmediate(renderApp)
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk, render, logger)
)
