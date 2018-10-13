import { store } from 'react-easy-state'

const loadingModal = store({
  active: false,
  message: ''
})

export default loadingModal
