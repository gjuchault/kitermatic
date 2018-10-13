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
    this.image = data.Image
    this.id = data.Id
  }
}

export const listenForLogs = async () => {
  const container = docker.getContainer(containers.active.id)

  if (logs) logs.removeAllListeners()
  if (logStream) logStream.destroy()
  if (containers.activeLogs) containers.activeLogs = ''

  logs = await container.logs({ follow: true, stdout: true, stderr: true, tail })

  logStream = new stream.PassThrough()
  logStream.destroy
  logStream.on('data', chunk => {
    containers.activeLogs += chunk.toString('utf8')
  })

  container.modem.demuxStream(logs, logStream, logStream)

  logs.on('end', () => {
    logStream.end()
  })
}

export const refreshContainers = async () => {
  const dContainers = await docker.listContainers()

  containers.list = dContainers.map(c => new Container(c))

  if (!containers.active) {
    containers.active = containers.list[0]
    listenForLogs()
  }
}

refreshContainers()
setInterval(refreshContainers, interval)

export default containers
