export const number = (value, defaultValue = 0) => {
  value = parseInt(value, 10)

  return Number.isFinite(value) ? value : defaultValue
}

export default {
  KTRM_UI_THEME_BG: process.env.KTRM_UI_THEME_BG || 'cyan',
  KTRM_UI_THEME_FG: process.env.KTRM_UI_THEME_FG || 'black',
  KTRM_REFRESH_INTERVAL: number(process.env.KTRM_REFRESH_INTERVAL, 3000),
  KTRM_LOGS_TAIL: number(process.env.KTRM_LOGS_TAIL, 100)
}
