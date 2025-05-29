import { ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { err, isErr, ok, unwrapResult } from '@/electron/common';

import { ProjectAPI } from '@/electron/common/types/project';
import type { CreateProjectDTO, SerializedProject } from '@/electron/common/types/project';
import type { CreateInteriorDTO } from '@/electron/common/types/interior';

import { isXMLFilePath, isMapDataFilePath, isMapTypesFilePath } from '@/electron/common/utils/files';

import type { Ymap, Ytyp } from '@/core/types/xml';
import { getCMloInstanceDef } from '@/core/game';

import type { Application } from './app';

import { Project } from './project';
import { Interior } from './interior';

import { forwardSerializedResult, sanitizePath, selectDirectory, selectFiles } from './utils';

const MAP_DATA_FILE_FILTERS = [{ name: '#map files', extensions: ['ymap.xml'] }];
const MAP_TYPES_FILE_FILTERS = [{ name: '#typ files', extensions: ['ytyp.xml'] }];

export class ProjectManager {
    private application: Application;

    public currentProject: Project | null;

    constructor(application: Application) {
        this.application = application;

        this.currentProject = null;

        ipcMain.handle(ProjectAPI.CREATE_PROJECT, this.createProject.bind(this));
        ipcMain.handle(ProjectAPI.GET_CURRENT_PROJECT, () => forwardSerializedResult(this.getCurrentProject()));
        ipcMain.handle(ProjectAPI.CLOSE_PROJECT, this.closeProject.bind(this));
        ipcMain.handle(ProjectAPI.SELECT_PROJECT_PATH, this.selectProjectPath.bind(this));
        ipcMain.handle(ProjectAPI.SELECT_MAP_DATA_FILE, this.selectMapDataFile.bind(this));
        ipcMain.handle(ProjectAPI.SELECT_MAP_TYPES_FILE, this.selectMapTypesFile.bind(this));
        ipcMain.handle(ProjectAPI.WRITE_GENERATED_FILES, this.writeGeneratedFiles.bind(this));
        ipcMain.handle(ProjectAPI.SAVE_PROJECT, this.saveProject.bind(this));
        ipcMain.handle(ProjectAPI.LOAD_PROJECT, this.loadProject.bind(this));
    }

    public getCurrentProject(): Result<string, Project> {
        return ok(this.currentProject);
    }

    /**
     * Serialize the current project and write it to disk as `project.json`
     */
    public async saveProject(): Promise<Result<string, boolean>> {
        if (!this.currentProject) {
            return err('NO_PROJECT_OPENED');
        }

        const data = this.currentProject.serialize();
        const projectFile = path.resolve(this.currentProject.path, 'project.json');

        try {
            const json = JSON.stringify(data, null, 2);
            await fs.promises.writeFile(projectFile, json, 'utf-8');
        } catch (e) {
            console.error('Failed to save project', e);
            return err('FAILED_SAVING_PROJECT');
        }

        return ok(true);
    }

    public async loadProject(_: Event, folder?: string): Promise<Result<string, SerializedProject>> {
        // 1) pick a folder if needed
        let projectDir = folder ?? this.currentProject?.path;
        if (!projectDir) {
            const [selected] = await selectDirectory();
            if (!selected) {
                return err('NO_PROJECT_SELECTED');
            }
            projectDir = selected;
        }

        // 2) read project.json
        const projectFile = path.resolve(projectDir, 'project.json');
        if (!fs.existsSync(projectFile)) {
            return err('PROJECT_FILE_NOT_FOUND');
        }

        try {
            const raw = await fs.promises.readFile(projectFile, 'utf-8');
            const data = JSON.parse(raw);

            // 2) Create an empty Project
            this.currentProject = new Project({ name: data.name, path: data.path });

            // 3) For each interior in the JSON, rehydrate it from its XML files
            for (const intData of data.interiors) {
                const result = await this.addInteriorToProject(this.currentProject, {
                    name: intData.identifier,
                    mapDataFilePath: intData.mapDataFilePath,
                    mapTypesFilePath: intData.mapTypesFilePath,
                });
                if (isErr(result)) {
                    // bubbling up any XML‐parsing error (e.g. FAILED_READING_#MAP_FILE, C_MLO_INSTANCE_DEF_NOT_FOUND, …)
                    return result as Err<string>;
                }
            }
            // return the serialized form back to renderer
            return ok(this.currentProject.serialize());
        } catch (e) {
            console.error('Failed loading project', e);
            return err('FAILED_LOADING_PROJECT');
        }
    }

    public async selectProjectPath(): Promise<Result<string, string>> {
        const [directoryPath] = await selectDirectory();

        return ok(directoryPath);
    }

    public async selectMapDataFile(): Promise<Result<string, string>> {
        const filePaths = await selectFiles(MAP_DATA_FILE_FILTERS);

        const filteredPaths = filePaths.filter(isXMLFilePath);

        const mapDataFilePath = filteredPaths.find(isMapDataFilePath);

        if (!mapDataFilePath) {
            return err('INVALID_FILE');
        }

        return ok(mapDataFilePath);
    }

    public async selectMapTypesFile(): Promise<Result<string, string>> {
        const filePaths = await selectFiles(MAP_TYPES_FILE_FILTERS);

        const filteredPaths = filePaths.filter(isXMLFilePath);

        const mapTypesFilePath = filteredPaths.find(isMapTypesFilePath);

        if (!mapTypesFilePath) {
            return err('INVALID_FILE');
        }

        return ok(mapTypesFilePath);
    }

    public async addInteriorToProject(
        project: Project,
        { name, mapDataFilePath, mapTypesFilePath }: CreateInteriorDTO,
    ): Promise<Result<string, boolean>> {
        let mapDataFile: Ymap;
        let mapTypesFile: Ytyp;

        try {
            mapDataFile = await this.application.codeWalkerFormat.readFile<Ymap>(mapDataFilePath);
        } catch {
            return err('FAILED_READING_#MAP_FILE');
        }

        try {
            mapTypesFile = await this.application.codeWalkerFormat.readFile<Ytyp>(mapTypesFilePath);
        } catch {
            return err('FAILED_READING_#TYP_FILE');
        }

        const mapData = this.application.codeWalkerFormat.parseCMapData(mapDataFile);
        const mapTypes = this.application.codeWalkerFormat.parseCMapTypes(mapTypesFile);

        const mloInstance = getCMloInstanceDef(mapData, mapTypes);

        if (!mloInstance) {
            return err('C_MLO_INSTANCE_DEF_NOT_FOUND');
        }

        const interiorPath = path.resolve(project.path, sanitizePath(name));

        const interior = new Interior({
            identifier: name,
            path: interiorPath,
            mapDataFilePath,
            mapTypesFilePath,
            mapData,
            mapTypes,
            mloInstance,
        });

        project.addInterior(interior);

        return ok(true);
    }

    public async createProject(_: Event, { name, path, interior }: CreateProjectDTO): Promise<Result<string, boolean>> {
        this.currentProject = new Project({ name, path });

        const result = await this.addInteriorToProject(this.currentProject, interior);

        if (isErr(result)) {
            return result;
        }

        return ok(true);
    }

    public closeProject(): Result<string, boolean> {
        this.currentProject = null;

        return ok(true);
    }

    public async writeInteriorsOcclusionMetadata(): Promise<Result<string, boolean>> {
        const projectResult = this.application.projectManager.getCurrentProject();

        if (isErr(projectResult)) {
            return projectResult;
        }

        const project = unwrapResult(projectResult);

        for (const interior of project.interiors) {
            const { naOcclusionInteriorMetadata, path } = interior;

            naOcclusionInteriorMetadata.refresh();

            let filePath: string;

            try {
                filePath = await this.application.codeWalkerFormat.writeNaOcclusionInteriorMetadata(
                    path,
                    naOcclusionInteriorMetadata,
                    this.application.settings.writeDebugInfoToXML,
                );
            } catch {
                return err('FAILED_TO_WRITE_NA_OCCLUSION_INTERIOR_METADATA_FILE');
            }

            interior.naOcclusionInteriorMetadataPath = filePath;
        }

        return ok(true);
    }

    public async writeDat151(): Promise<Result<string, string>> {
        const projectResult = this.application.projectManager.getCurrentProject();

        if (isErr(projectResult)) {
            return projectResult;
        }

        const project = unwrapResult(projectResult);

        const audioGameData = project.interiors.flatMap(interior => interior.getAudioGameData());

        let filePath: string;

        try {
            filePath = await this.application.codeWalkerFormat.writeDat151(project.path, audioGameData);
        } catch {
            return err('FAILED_TO_WRITE_DAT_151_FILE');
        }

        // biome-ignore lint/complexity/noForEach: <explanation>
        project.interiors.forEach(interior => {
            interior.audioGameDataPath = filePath;
        });

        return ok(filePath);
    }
    public async writeDat15(): Promise<Result<string, string>> {
        const projectResult = this.application.projectManager.getCurrentProject();

        if (isErr(projectResult)) {
            return projectResult;
        }

        const project = unwrapResult(projectResult);

        const audioGameData = project.interiors.map(interior => interior.getInteriorName()).join('\n');

        let filePath: string;

        try {
            filePath = await this.application.codeWalkerFormat.writeDat15(project.path, audioGameData);
        } catch {
            return err('FAILED_TO_WRITE_DAT_15_FILE');
        }

        // biome-ignore lint/complexity/noForEach: <explanation>
        project.interiors.forEach(interior => {
            interior.audioMixDataPath = filePath;
        });

        return ok(filePath);
    }
    public async writeGeneratedFiles(): Promise<Result<string, boolean>> {
        const [interiorsMetadataResult, dat151Result, dat15Result] = await Promise.all([
            this.writeInteriorsOcclusionMetadata(),
            this.writeDat151(),
            this.writeDat15(),
        ]);

        if (isErr(interiorsMetadataResult)) {
            return interiorsMetadataResult;
        }

        if (isErr(dat151Result)) {
            return dat151Result;
        }

        if (isErr(dat15Result)) {
            return dat15Result;
        }

        return ok(true);
    }
}
