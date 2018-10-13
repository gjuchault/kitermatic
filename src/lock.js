export let isLocked = false

export const lock = () => {
  isLocked = true
}

export const unlock = () => {
  isLocked = false
}
