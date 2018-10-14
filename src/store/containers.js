import stream from 'stream'
import { store } from 'react-easy-state'
import docker from '../docker'
import env, { number } from '../env'

const tail = number(env.KTRM_LOGS_TAIL, 100)

let logs
let logStream

const containers = store({
  active: null,
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
  const container = docker.getContainer(containers.active.id)
  let shouldClear = false

  if (logs) logs.removeAllListeners()
  if (logStream) logStream.destroy()
  if (containers.activeLogs) {
    shouldClear = true
    containers.activeLogs = 'Loading ...'
  }

  logs = await container.logs({ follow: true, stdout: true, stderr: true, tail })

  logStream = new stream.PassThrough()
  logStream.destroy
  logStream.on('data', chunk => {
    if (shouldClear) {
      shouldClear = false
      containers.activeLogs = chunk.toString('utf8')
      return
    }

    containers.activeLogs += chunk.toString('utf8')
  })

  container.modem.demuxStream(logs, logStream, logStream)

  logs.on('end', () => {
    logStream.end()
  })
}

export const refreshContainers = async () => {
  const dContainers = await docker.listContainers({ all: true })

  containers.list = dContainers.map(parseContainer)

  if (!containers.active) {
    containers.active = containers.list[0]
    listenForLogs()
  }
}

export default containers
