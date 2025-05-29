import { CreateInteriorDTO, SerializedInterior } from './interior';

export enum ProjectAPI {
    CREATE_PROJECT = 'project/create',
    GET_CURRENT_PROJECT = 'project/getCurrent',
    CLOSE_PROJECT = 'project/close',
    SELECT_PROJECT_PATH = 'project/selectPath',
    SELECT_MAP_DATA_FILE = 'project/selectMapDataFile',
    SELECT_MAP_TYPES_FILE = 'project/selectMapTypesFile',
    WRITE_GENERATED_FILES = 'project/writeGeneratedFiles',
    SAVE_PROJECT = 'project/save',
    LOAD_PROJECT = 'LOAD_PROJECT',
}

export type CreateProjectDTO = {
    name: string;
    path: string;
    interior: CreateInteriorDTO;
};

export type SerializedProject = {
    name: string;
    path: string;
    interiors: SerializedInterior[];
};
