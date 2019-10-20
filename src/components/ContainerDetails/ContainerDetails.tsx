import React from 'react'

import { useSelector } from '../../hooks/useState'

import { getActiveContainer } from '../../store/containers/selectors'
import { getDetailsTab } from '../../store/ui/selectors'

import ContainerDetailsGeneral from '../ContainerDetailsGeneral/ContainerDetailsGeneral'
import ContainerDetailsPorts from '../ContainerDetailsPorts/ContainerDetailsPorts'
import ContainerDetailsVolumes from '../ContainerDetailsVolumes/ContainerDetailsVolumes'
import Tab from '../Tab/Tab'

const ContainerDetails: React.FC = () => {
  const detailsTab = useSelector(getDetailsTab)

  const activeContainer = useSelector(getActiveContainer)

  if (!activeContainer) {
    return null
  }

  return (
    <>
      <Tab left="25%" isActive={detailsTab === 'general'}>
        General
      </Tab>
      <Tab left="25%+15" isActive={detailsTab === 'volumes'}>
        Volumes
      </Tab>
      <Tab left="25%+30" isActive={detailsTab === 'ports'}>
        Ports
      </Tab>
      {detailsTab === 'general' && (
        <ContainerDetailsGeneral container={activeContainer} />
      )}
      {detailsTab === 'volumes' && (
        <ContainerDetailsVolumes container={activeContainer} />
      )}
      {detailsTab === 'ports' && (
        <ContainerDetailsPorts container={activeContainer} />
      )}
    </>
  )
}

export default ContainerDetails
