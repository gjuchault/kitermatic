import React from 'react'

import { AppState } from '../../store'
import { ScreenProvider } from '../../hooks/useScreen'
import { StateProvider } from '../../hooks/useState'

import Kitermatic from '../Kitermatic/Kitermatic'
import { Dispatch } from 'redux'

type Props = {
  screen: any
  state: AppState
  dispatch: Dispatch
}

const App: React.FC<Props> = ({ screen, state, dispatch }) => {
  return (
    <StateProvider state={state} dispatch={dispatch}>
      <ScreenProvider screen={screen}>
        <Kitermatic />
      </ScreenProvider>
    </StateProvider>
  )
}

export default App
