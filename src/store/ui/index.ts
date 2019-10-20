import { AnyAction } from 'redux'

import {
  SET_LOADING_MODAL_CONTENT,
  TOGGLE_MODE,
  SET_DETAILS_TAB
} from './actions'

export type State = {
  mode: 'list' | 'details'
  detailsTab: 'general' | 'volumes' | 'ports'
  loadingModalContent: string | null
}

const initialState: State = {
  mode: 'list',
  detailsTab: 'general',
  loadingModalContent: null
}

export const reducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case SET_LOADING_MODAL_CONTENT:
      return {
        ...state,
        loadingModalContent: action.payload
      }
    case TOGGLE_MODE:
      const mode: State['mode'] = state.mode === 'details' ? 'list' : 'details'
      return {
        ...state,
        mode
      }
    case SET_DETAILS_TAB:
      return {
        ...state,
        detailsTab: action.payload
      }
    default:
      return state
  }
}
