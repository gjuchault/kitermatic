import blessed from 'neo-blessed'

export const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  dockBorders: true,
  title: 'kitermatic'
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))
