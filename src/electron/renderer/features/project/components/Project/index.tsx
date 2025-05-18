import React, { useEffect, useMemo } from 'react';
import { FaTimes, FaFileDownload, FaSave, FaFolderOpen, FaFolderPlus } from 'react-icons/fa';

import { Container, Header, Content } from '@/electron/renderer/components/Page';
import { Interior, InteriorDetails } from '@/electron/renderer/features/interior';
import { useProject } from '../../context';
import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';

export const Project = (): JSX.Element => {
  const {
    state,
    fetchProject,
    saveProject,
    reloadProject,
    writeGeneratedFiles,
    closeProject,
    setCreateModalOpen,
  } = useProject();

  // Reload the in-memory state on mount
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // Build two different button sets: one for “no project” and one for “project open”
  const headerOptions = useMemo(() => {
    if (!state) {
      return [
        {
          icon: <FaFolderPlus />,
          label: 'New project',
          onClick: () => setCreateModalOpen(true),
        },
        {
          icon: <FaFolderOpen />,
          label: 'Open project',
          onClick: reloadProject,
        },
      ];
    }
    return [
      { icon: <FaSave />, label: 'Save project', onClick: saveProject },
      { icon: <FaFolderOpen />, label: ':oad project', onClick: reloadProject },
      { icon: <FaFileDownload />, label: 'Write files', onClick: writeGeneratedFiles },
      { icon: <FaTimes />, label: 'Close project', onClick: closeProject },
    ];
  }, [state, saveProject, reloadProject, writeGeneratedFiles, closeProject, setCreateModalOpen]);

  return (
    <>
      {/** This Header is always rendered **/}

      <Container>
        <Header
          title={state ? `"${state.name}"` : 'gtav-audio-occlusion'}
          optionalText={
            state
              ? `${state.interiors.length} ${state.interiors.length > 1 ? 'Interiors' : 'Interior'} added`
              : 'Create a new project or open an existing one'
          }
          options={headerOptions}
        />
        {state ? (
          <Content>
            {state.interiors.map((interior, index) => (
              <Interior key={interior.identifier} index={index} name={interior.identifier}>
                <InteriorDetails />
              </Interior>
            ))}
          </Content>
        ) : (
          <ProjectFileImporter />
        )}
      </Container>

      <CreateModal />
    </>
  );
};
