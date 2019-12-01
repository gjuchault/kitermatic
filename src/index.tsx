/// <reference types="./typings/neo-blessed" />
/// <reference types="./typings/react-blessed" />

import React from 'react'
import blessed from 'neo-blessed'
import { createBlessedRenderer } from 'react-blessed'

import { screen } from './screen'
import { store } from './store'

import App from './components/App/App'

const render = createBlessedRenderer(blessed)

export const renderApp = () =>
  render(
    <App screen={screen} state={store.getState()} dispatch={store.dispatch} />,
    screen
  )

renderApp()
