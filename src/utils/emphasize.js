import env from '../env'

const theme = env.KTRM_UI_THEME_BG

export default str => `{${theme}-fg}{bold}${str}{/bold}{/${theme}-fg}`
