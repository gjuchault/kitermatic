import { Container } from '../../docker'

export const getContainerName = (container: Container) => {
  const name = container.isRunning
    ? container.name
    : `[stopped] ${container.name}`
  const maxWidth = process.stdout.columns / 4 - 2

  const separator = maxWidth < name.length ? ' ' : '\n'

  return [name, `{grey-fg}${container.imageName}{/grey-fg}`].join(separator)
}
