import stream from 'stream'
import { store } from 'react-easy-state'
import docker from '../docker'
import env, { number } from '../env'

const tail = number(env.KTRM_LOGS_TAIL, 100)
const interval = number(env.KTRM_REFRESH_INTERVAL, 3000)

let logs
let logStream

const containers = store({
  active: null,
  activeLogs: '',
  list: []
})

class Container {
  constructor(data) {
    this.name = data.Names[0].slice(1)
    this.running = data.State === 'running'
    this.image = Container.parseImage(data.Image)
    this.id = data.Id
  }

  static parseImage(str) {
    const parsed = require('url').parse(str).path

    return parsed && parsed.startsWith('/') ? parsed.slice(1) : str
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

  containers.list = dContainers.map(c => new Container(c))

  if (!containers.active) {
    containers.active = containers.list[0]
    listenForLogs()
  }
}

refreshContainers()
setInterval(refreshContainers, interval)

export default containers
