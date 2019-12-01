import React, { createContext, useContext } from 'react'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../store'

export const StateContext = createContext<any>(null)

type StateProviderParams = {
  state: AppState
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
  children: React.ReactNode
}

type Store = {
  state: AppState
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
}

export const StateProvider = ({
  state,
  dispatch,
  children
}: StateProviderParams) => (
  <StateContext.Provider value={{ state, dispatch }}>
    {children}
  </StateContext.Provider>
)

export const useStore = () => useContext<Store>(StateContext)

export const useDispatch = () => {
  const { dispatch } = useStore()
  return dispatch
}

export function useSelector<T>(selector: (state: AppState) => T): T {
  const { state } = useStore()

  return selector(state)
}
