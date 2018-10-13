import blessed from 'blessed'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'kitermatic'
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

export default screen
