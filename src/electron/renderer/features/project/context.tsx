import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { isErr, unwrapResult } from '@/electron/common';
import { ProjectAPI, SerializedProject, CreateProjectDTO } from '@/electron/common/types/project';
import type { CreateProjectModalState } from './types';

const { API } = window;

interface IProjectContext {
  // the project loaded into React
  state?: SerializedProject;

  // “New project” modal state + setters
  createModalState: CreateProjectModalState;
  setCreateModalOpen: (open: boolean) => void;
  setCreateModalName: (name: string) => void;
  setCreateModalPath: (path: string) => void;
  setCreateModalInterior: (interior: string) => void;
  setCreateModalMapDataFile: (mapDataFile: string) => void;
  setCreateModalMapTypesFile: (mapTypesFile: string) => void;

  // RPC calls
  fetchProject: () => Promise<void>;
  createProject: () => Promise<void>;
  openProject: () => Promise<void>;
  reloadProject: () => Promise<void>;
  saveProject: () => Promise<void>;
  closeProject: () => Promise<void>;
  writeGeneratedFiles: () => Promise<void>;
}

const projectContext = createContext<IProjectContext>({} as IProjectContext);

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

  // fetch “current” from main
  const fetchProject = useCallback(async () => {
    const result = await API.invoke(ProjectAPI.GET_CURRENT_PROJECT);
    if (isErr(result)) {
      console.warn(unwrapResult(result));
      return;
    }
    const project = unwrapResult(result);
    if (!project) {
      setState(undefined);
    } else {
      setState(project as SerializedProject);
    }
  }, []);

  // create a new project from modal form
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
    // reload React state + close modal
    await fetchProject();
    setCreateModalState(s => ({ ...s, open: false }));
  }, [createModalState, fetchProject]);

  // pick a folder & then load that project.json
  const openProject = useCallback(async () => {
    // ask main for a directory
    const dirResult = await API.invoke(ProjectAPI.SELECT_PROJECT_PATH);
    if (isErr(dirResult)) {
      console.warn(unwrapResult(dirResult));
      return;
    }
    const folder = unwrapResult(dirResult);

    // now load
    const loadResult = await API.invoke(ProjectAPI.LOAD_PROJECT, folder);
    if (isErr(loadResult)) {
      console.warn(unwrapResult(loadResult));
      return;
    }

    setState(unwrapResult(loadResult));
  }, []);

  // reload the same one
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
    if (isErr(result)) {
      console.warn(unwrapResult(result));
    }
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
    if (isErr(result)) {
      console.warn(unwrapResult(result));
    }
  }, []);

  // modal setters
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
