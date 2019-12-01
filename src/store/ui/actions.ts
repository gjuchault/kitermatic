export const SET_LOADING_MODAL_CONTENT = 'SET_LOADING_MODAL_CONTENT'
export const TOGGLE_MODE = 'TOGGLE_MODE'
export const SET_DETAILS_TAB = 'SET_DETAILS_TAB'

export const setLoadingModalContent = (content: string | null) => ({
  type: SET_LOADING_MODAL_CONTENT,
  payload: content
})

export const toggleMode = () => ({
  type: TOGGLE_MODE,
  payload: null
})

export const setDetailsTab = (tab: 'general' | 'volumes' | 'ports') => ({
  type: SET_DETAILS_TAB,
  payload: tab
})
