import { ipcMain, Event } from 'electron';
import Store from 'electron-store';

import { ok } from '@/electron/common';
import { SerializedSettings, SettingsAPI } from '@/electron/common/types/settings';

const schema = {
    bulkEditPortalEntities: { type: 'boolean', default: false },
    writeDebugInfoToXML: { type: 'boolean', default: false },
    savedTheme: { type: 'string', default: 'tailwind' },
    primaryColor: { type: 'string', default: '#ff69b4' },
    projectHistory: {
        type: 'array',
        default: [],
        items: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                path: { type: 'string' },
            },
        },
    },
};

const store = new Store<SerializedSettings>({ schema });

export class Settings {
    constructor() {
        ipcMain.handle(SettingsAPI.GET, this.serialize.bind(this));
        ipcMain.on(SettingsAPI.SET, (event: Event, data: Partial<SerializedSettings>) => this.update(data));
        ipcMain.on('settings/removeProjectFromHistory', (event, path: string) => this.removeProjectFromHistory(path));

    }

    public update(data: Partial<SerializedSettings>): void {
        Object.entries(data).forEach(([key, value]) => {
            store.set(key as keyof SerializedSettings, value);
        });
    }

    public serialize(): Result<string, SerializedSettings> {
        return ok(store.store);
    }

    // Optionally, add methods for project history
    public addProjectToHistory(project: { name: string; path: string }): void {
        const history = store.get('projectHistory') || [];
        // Remove if already present, then add to front
        const filtered = history.filter((p: any) => p.path !== project.path);
        const newHistory = [project, ...filtered].slice(0, 10);
        store.set('projectHistory', newHistory);
    }

public removeProjectFromHistory(projectPath: string): void {
    const history = store.get('projectHistory') || [];
    const newHistory = history.filter((p: any) => p.path !== projectPath);
    store.set('projectHistory', newHistory);
}

}
