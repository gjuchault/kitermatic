import Dockerode, { Volume } from 'dockerode'
import { containerReshaper } from './reshapers'

export type Container = {
  id: string
  name: string
  imageName: string
  isRunning: boolean
  command: string
  hostname: string
  env: {
    [key: string]: string
  }
  ports: PortMapping[]
  volumes: VolumeMapping[]
  logs: string | null
}

export type PortMapping = {
  type: 'tcp' | 'udp'
  hostPort?: number
  containerPort: number
}

export type VolumeMapping = {
  source: string
  destination: string
}

export const listContainers = async (engine: Dockerode) => {
  const dockerodeContainers = await engine.listContainers({
    all: true
  })

  return Promise.all(
    dockerodeContainers.map(async container => {
      const inspected = await engine.getContainer(container.Id).inspect()

      return containerReshaper(inspected)
    })
  )
}

export const startContainer = async (engine: Dockerode, id: string) => {
  return engine.getContainer(id).start()
}

export const stopContainer = async (engine: Dockerode, id: string) => {
  return engine.getContainer(id).stop()
}

export const restartContainer = async (engine: Dockerode, id: string) => {
  return engine.getContainer(id).restart()
}

export const fetchLogsFromContainer = async (
  engine: Dockerode,
  id: string,
  tail: number
) => {
  const container = engine.getContainer(id)
  let logs: NodeJS.ReadableStream

  try {
    logs = await container.logs({
      stdout: true,
      stderr: true,
      tail,
      follow: false,
      timestamps: true
    })
  } catch (err) {
    return ''
  }

  return logs.toString()
}

export const createLogStreamFromContainer = async (
  engine: Dockerode,
  id: string
): Promise<NodeJS.ReadableStream | null> => {
  const container = engine.getContainer(id)
  let logs: NodeJS.ReadableStream

  try {
    logs = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
      tail: 0,
      timestamps: true
    })
  } catch (err) {
    // FIXME: handle Error response from daemon: configured logging driver does not support reading
    return null
  }

  logs.setEncoding('utf8')

  return logs
}

export const createEngine = () => {
  return new Dockerode()
}
