import React from 'react'
import { render } from 'react-blessed'
import blessed from 'blessed'
import App from './views/App'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'kitermatic'
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

render(<App />, screen)
