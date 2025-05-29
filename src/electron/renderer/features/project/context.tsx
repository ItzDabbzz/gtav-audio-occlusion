import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { isErr, unwrapResult } from '@/electron/common';
import { ProjectAPI, SerializedProject, CreateProjectDTO } from '@/electron/common/types/project';
import type { CreateProjectModalState } from './types';
import { InteriorAPI } from '@/electron/common/types/interior';

const { API } = window;

export interface IProjectContext {
    state?: SerializedProject;
    createModalState: CreateProjectModalState;
    setCreateModalOpen: (open: boolean) => void;
    setCreateModalName: (name: string) => void;
    setCreateModalPath: (path: string) => void;
    setCreateModalInterior: (interior: string) => void;
    setCreateModalMapDataFile: (mapDataFile: string) => void;
    setCreateModalMapTypesFile: (mapTypesFile: string) => void;
    fetchProject: () => Promise<void>;
    createProject: () => Promise<void>;
    openProject: () => Promise<void>;
    reloadProject: () => Promise<void>;
    saveProject: () => Promise<void>;
    closeProject: () => Promise<void>;
    writeGeneratedFiles: () => Promise<void>;
}

const projectContext = createContext<IProjectContext>({} as any);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<SerializedProject>();
    const [createModalState, setCreateModalState] = useState<CreateProjectModalState>({
        open: false,
        name: '',
        path: '',
        interior: '',
        mapDataFilePath: '',
        mapTypesFilePath: '',
    });

    const loadInterior = useCallback(async (identifier: string) => {
        const result = await API.invoke(InteriorAPI.GET_INTERIOR, identifier);
        if (isErr(result)) {
            console.warn('failed loading interior', identifier, unwrapResult(result));
            return;
        }
    }, []);

    useEffect(() => {
        if (!state?.interiors) return;
        state.interiors.forEach(int => void loadInterior(int.identifier));
    }, [state, loadInterior]);

    const fetchProject = useCallback(async () => {
        const result = await API.invoke(ProjectAPI.GET_CURRENT_PROJECT);
        if (isErr(result)) {
            console.warn(unwrapResult(result));
            return;
        }
        const project = unwrapResult(result);
        setState(project || undefined);
    }, []);

    const createProject = useCallback(async () => {
        const dto: CreateProjectDTO = {
            name: createModalState.name,
            path: createModalState.path,
            interior: {
                name: createModalState.interior,
                mapDataFilePath: createModalState.mapDataFilePath,
                mapTypesFilePath: createModalState.mapTypesFilePath,
            },
        };
        const result = await API.invoke(ProjectAPI.CREATE_PROJECT, dto);
        if (isErr(result)) {
            console.warn(unwrapResult(result));
            return;
        }
        await fetchProject();
        setCreateModalState(s => ({ ...s, open: false }));
    }, [createModalState, fetchProject]);

    const openProject = useCallback(async () => {
        const dirResult = await API.invoke(ProjectAPI.SELECT_PROJECT_PATH);
        if (isErr(dirResult)) {
            console.warn(unwrapResult(dirResult));
            return;
        }
        const folder = unwrapResult(dirResult);
        const loadResult = await API.invoke(ProjectAPI.LOAD_PROJECT, folder);
        if (isErr(loadResult)) {
            console.warn(unwrapResult(loadResult));
            return;
        }
        setState(unwrapResult(loadResult));
    }, []);

    const reloadProject = useCallback(async () => {
        const loadResult = await API.invoke(ProjectAPI.LOAD_PROJECT);
        if (isErr(loadResult)) {
            console.warn(unwrapResult(loadResult));
            return;
        }
        setState(unwrapResult(loadResult));
    }, []);

    const saveProject = useCallback(async () => {
        const result = await API.invoke(ProjectAPI.SAVE_PROJECT);
        if (isErr(result)) console.warn(unwrapResult(result));
    }, []);

    const closeProject = useCallback(async () => {
        const result = await API.invoke(ProjectAPI.CLOSE_PROJECT);
        if (isErr(result)) {
            console.warn(unwrapResult(result));
        } else {
            setState(undefined);
        }
    }, []);

    const writeGeneratedFiles = useCallback(async () => {
        const result = await API.invoke(ProjectAPI.WRITE_GENERATED_FILES);
        if (isErr(result)) console.warn(unwrapResult(result));
    }, []);

    const setCreateModalOpen = (open: boolean) => setCreateModalState(s => ({ ...s, open }));
    const setCreateModalName = (name: string) => setCreateModalState(s => ({ ...s, name }));
    const setCreateModalPath = (path: string) => setCreateModalState(s => ({ ...s, path }));
    const setCreateModalInterior = (interior: string) => setCreateModalState(s => ({ ...s, interior }));
    const setCreateModalMapDataFile = (mapDataFile: string) =>
        setCreateModalState(s => ({ ...s, mapDataFilePath: mapDataFile }));
    const setCreateModalMapTypesFile = (mapTypesFile: string) =>
        setCreateModalState(s => ({ ...s, mapTypesFilePath: mapTypesFile }));

    return (
        <projectContext.Provider
            value={{
                state,
                createModalState,
                setCreateModalOpen,
                setCreateModalName,
                setCreateModalPath,
                setCreateModalInterior,
                setCreateModalMapDataFile,
                setCreateModalMapTypesFile,
                fetchProject,
                createProject,
                openProject,
                reloadProject,
                saveProject,
                closeProject,
                writeGeneratedFiles,
            }}
        >
            {children}
        </projectContext.Provider>
    );
};

export const useProject = () => {
    const ctx = useContext(projectContext);
    if (!ctx) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return ctx;
};
