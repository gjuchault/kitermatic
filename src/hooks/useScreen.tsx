import React, { createContext, useContext } from 'react'

export const ScreenContext = createContext<any>(null)

type ScreenProviderParams = {
  screen: any
  children: React.ReactNode
}

export const ScreenProvider = ({ screen, children }: ScreenProviderParams) => (
  <ScreenContext.Provider value={screen}>{children}</ScreenContext.Provider>
)

export const useScreen = () => useContext(ScreenContext)
