export enum KitermaticEnvironmentFlags {
  ThemeBackground = 'KTRM_UI_THEME_BG',
  ThemeForeground = 'KTRM_UI_THEME_FG',
  RefreshInterval = 'KTRM_REFRESH_INTERVAL',
  LogsTail = 'KTRM_LOGS_TAIL'
}

export type KitermaticEnvironment = {
  [KitermaticEnvironmentFlags.ThemeBackground]: string
  [KitermaticEnvironmentFlags.ThemeForeground]: string
  [KitermaticEnvironmentFlags.RefreshInterval]: number
  [KitermaticEnvironmentFlags.LogsTail]: number
}

const defaultReshaper = (input: any) => input

export const getOrDefault = <T>(
  key: string,
  defaultValue: T,
  reshaper: (input: any) => T = defaultReshaper
) => {
  if (!process.env.hasOwnProperty(key)) {
    return defaultValue
  }

  return reshaper(process.env[key])
}

export const getNumberOrDefault = (key: string, defaultValue: number) =>
  getOrDefault<number>(key, defaultValue, input => parseInt(input, 10))

export const env: KitermaticEnvironment = {
  [KitermaticEnvironmentFlags.ThemeBackground]: getOrDefault(
    KitermaticEnvironmentFlags.ThemeBackground,
    'cyan'
  ),
  [KitermaticEnvironmentFlags.ThemeForeground]: getOrDefault(
    KitermaticEnvironmentFlags.ThemeForeground,
    'black'
  ),
  [KitermaticEnvironmentFlags.RefreshInterval]: getNumberOrDefault(
    KitermaticEnvironmentFlags.RefreshInterval,
    3000
  ),
  [KitermaticEnvironmentFlags.LogsTail]: getNumberOrDefault(
    KitermaticEnvironmentFlags.LogsTail,
    2000
  )
}
