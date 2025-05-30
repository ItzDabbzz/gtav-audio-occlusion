import React, { useEffect, useMemo } from 'react';
import { FaTimes, FaFileDownload, FaSave, FaFolderOpen, FaFolderPlus } from 'react-icons/fa';

import { Container, Header, Content } from '@/electron/renderer/components/Page';
import { Interior, InteriorDetails } from '@/electron/renderer/features/interior';
import { useProject } from '../../context';
import { CreateModal } from '../CreateModal';
import { ProjectFileImporter } from '../ProjectFileImporter';
import { AddInteriorModal } from '../AddInteriorModal';
import { useState } from 'react';
import { ProjectHistoryContainer, ProjectHistoryTitle, ProjectHistoryList, ProjectHistoryItem, ProjectHistoryPath, ProjectHistoryButton, ProjectHistoryName, ProjectHistoryRemoveButton, AddInteriorButton, RemoveInteriorButton } from './styles';
import { useSettings } from '../../../settings/context';

export const Project = (): JSX.Element => {
    const {
        state,
        fetchProject,
        saveProject,
        reloadProject,
        writeGeneratedFiles,
        closeProject,
        setCreateModalOpen,
        addInterior,
        removeInterior,
    } = useProject();
    const { projectHistory, removeProjectFromHistory } = useSettings();
    const [addInteriorOpen, setAddInteriorOpen] = useState(false);
    const handleRemoveHistory = async (path: string) => {
        await removeProjectFromHistory(path);
    };
    const handleOpenHistoryProject = async (projectPath: string) => {
        await window.API.invoke('LOAD_PROJECT', projectPath);
        await fetchProject();
    };
    const handleRemove = (identifier: string) => {
        removeInterior(identifier);
        fetchProject(); // Refresh project state after removal
    };

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const headerOptions = useMemo(() => {
        if (!state) {
            return [
                {
                    icon: <FaFolderPlus />,
                    label: 'New project',
                    onClick: async () => setCreateModalOpen(true),
                },
                {
                    icon: <FaFolderOpen />,
                    label: 'Load project',
                    onClick: async () => reloadProject(),
                },
            ];
        }
        return [
            { icon: <FaSave />, label: 'Save project', onClick: async () => saveProject() },
            { icon: <FaFolderOpen />, label: 'Load project', onClick: async () => reloadProject() },
            { icon: <FaFileDownload />, label: 'Write files', onClick: async () => writeGeneratedFiles() },
            { icon: <FaTimes />, label: 'Close project', onClick: async () => closeProject() },
        ];
    }, [state, saveProject, reloadProject, writeGeneratedFiles, closeProject, setCreateModalOpen]);

    return (
        <>
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
                {!state && projectHistory.length > 0 && (
                    <ProjectHistoryContainer>
                        <ProjectHistoryTitle>Recent Projects</ProjectHistoryTitle>
                        <ProjectHistoryList>
                            {projectHistory.map(({ name, path }) => (
                                <ProjectHistoryItem key={path} title={name}>
                                    <ProjectHistoryName title={name}>{name}</ProjectHistoryName>
                                    <ProjectHistoryPath title={path}>{path}</ProjectHistoryPath>
                                    <ProjectHistoryButton onClick={() => handleOpenHistoryProject(path)}>
                                        Open
                                    </ProjectHistoryButton>
                                    <ProjectHistoryRemoveButton
                                        title="Remove from history"
                                        onClick={() => handleRemoveHistory(path)}
                                    >
                                        <FaTimes />
                                    </ProjectHistoryRemoveButton>
                                </ProjectHistoryItem>
                            ))}
                        </ProjectHistoryList>
                    </ProjectHistoryContainer>
                )}
                {state ? (
                    <Content>
                        <AddInteriorButton onClick={() => setAddInteriorOpen(true)}>
                            + Add Interior
                        </AddInteriorButton>
                        {state.interiors.map((interior, index) => (
                            <Interior key={interior.identifier} index={index} name={interior.identifier} identifier={interior.identifier}>
                                <InteriorDetails interior={interior} />
                                <RemoveInteriorButton
                                    onClick={() => handleRemove(interior.identifier)}
                                >
                                    Remove Interior
                                </RemoveInteriorButton>
                            </Interior>
                        ))}
                    </Content>
                ) : (
                    <ProjectFileImporter />
                )}
            </Container>
            <AddInteriorModal open={addInteriorOpen} onClose={() => setAddInteriorOpen(false)} />
            <CreateModal />
        </>
    );
};
