import type { SerializedProject } from '@/electron/common/types/project';

export type ProjectState = SerializedProject;

export type CreateProjectModalInterior = {
    identifier: string;
    name: string;
    mapDataFilePath: string;
    mapTypesFilePath: string;
};

export type CreateProjectModalState = {
    open: boolean;
    name: string;
    path: string;
    interiors: CreateProjectModalInterior[];
};
