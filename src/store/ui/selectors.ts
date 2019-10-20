import { AppState } from '../index'

export const getMode = (state: AppState) => state.ui.mode

export const getDetailsTab = (state: AppState) => state.ui.detailsTab

export const getLoadingModalContent = (state: AppState) =>
  state.ui.loadingModalContent
