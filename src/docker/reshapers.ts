import Dockerode from 'dockerode'

import { Container, PortMapping, VolumeMapping } from '.'

export const entryPointReshaper = (
  dockerodeContainer: Dockerode.ContainerInspectInfo
) => {
  const entrypoint = dockerodeContainer.Config.Entrypoint

  if (!entrypoint) {
    return 'nil'
  }

  if (typeof entrypoint === 'string') {
    return entrypoint
  }

  return entrypoint.join(' ')
}

export const envReshaper = (
  dockerodeContainer: Dockerode.ContainerInspectInfo
): { [key: string]: string } => {
  const env = dockerodeContainer.Config.Env.map(env => env.split('=')).reduce(
    (acc, entry) => ({ ...acc, [entry[0]]: entry[1] }),
    {}
  )

  return env
}

export const portsReshaper = (
  dockerodeContainer: Dockerode.ContainerInspectInfo
): PortMapping[] => {
  const dockerodePorts = dockerodeContainer.NetworkSettings.Ports

  return Object.keys(dockerodePorts).map(dockerodePort => {
    const [containerPort, type] = dockerodePort.split('/')
    const port = dockerodePorts[dockerodePort]

    if (!port) {
      return {
        type: type as 'tcp' | 'udp',
        containerPort: parseInt(containerPort, 10)
      }
    }

    return {
      type: type as 'tcp' | 'udp',
      hostPort: parseInt(port[0].HostPort, 10),
      containerPort: parseInt(containerPort, 10)
    }
  })
}

export const volumesReshaper = (
  dockerodeContainer: Dockerode.ContainerInspectInfo
): VolumeMapping[] => {
  return dockerodeContainer.Mounts.map(mount => ({
    source: mount.Source,
    destination: mount.Destination
  }))
}

export const containerReshaper = (
  dockerodeContainer: Dockerode.ContainerInspectInfo
): Container => {
  return {
    name: dockerodeContainer.Name.slice(1),
    imageName: dockerodeContainer.Config.Image,
    isRunning: dockerodeContainer.State.Running,
    id: dockerodeContainer.Id,
    logs: null,
    hostname: dockerodeContainer.Config.Hostname,
    command: entryPointReshaper(dockerodeContainer),
    env: envReshaper(dockerodeContainer),
    ports: portsReshaper(dockerodeContainer),
    volumes: volumesReshaper(dockerodeContainer)
  }
}
