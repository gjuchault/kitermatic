import { store } from 'react-easy-state'
import docker from '../docker'
import env, { number } from '../env'

const tail = number(env.KTRM_LOGS_TAIL, 1000)

let logs
let logStream

const containers = store({
  active: null,
  noDaemon: false,
  activeLogs: '',
  list: []
})

export const parseContainer = (container) => {
  const urlImage = require('url').parse(container.Image).path
  const image = urlImage && urlImage.startsWith('/') ? urlImage.slice(1) : container.Image

  return {
    name: container.Names[0].slice(1),
    running: container.State === 'running',
    image,
    id: container.Id
  }
}

export const listenForLogs = async () => {
  if (!containers.active) {
    return
  }

  const container = docker.getContainer(containers.active.id)
  let shouldClear = false

  if (logs) logs.removeAllListeners()
  if (logStream) logStream.destroy()
  if (containers.activeLogs) {
    shouldClear = true
    containers.activeLogs = 'Loading ...'
  }

  logs = await container.logs({ follow: true, stdout: true, stderr: true, tail })

  logs.setEncoding('utf8')

  logs.on('data', chunk => {
    if (shouldClear) {
      shouldClear = false
      containers.activeLogs = chunk
      return
    }

    containers.activeLogs += chunk
  })
}

export const refreshContainers = async () => {
  let dContainers

  try {
    dContainers = await docker.listContainers({ all: true })
  } catch (err) {
    containers.list = []
    containers.noDaemon = true

    return
  }

  containers.noDaemon = false

  const newList = []

  for (let dContainer of dContainers) {
    const container = parseContainer(dContainer)
    container.data = await docker.getContainer(container.id).inspect()

    newList.push(container)
  }
  containers.list = newList

  if (!containers.active) {
    containers.active = containers.list[0]
    listenForLogs()
  }
}

export default containers
