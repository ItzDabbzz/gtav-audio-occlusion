import { ipcMain, Event } from 'electron';

import { ok } from '@/electron/common';

import { SerializedSettings, SettingsAPI } from '@/electron/common/types/settings';

const hasStrangeProperty = <T>(object: T, properties: (keyof T)[]): boolean => {
    const keys = Object.keys(object);

    return keys.some(key => !properties.includes(key as keyof T));
};

const ALLOWED_SETTINGS: Array<keyof SerializedSettings> = [
    'bulkEditPortalEntities',
    'writeDebugInfoToXML',
    'savedTheme',
];

export class Settings {
    public bulkEditPortalEntities: boolean;
    public writeDebugInfoToXML: boolean;
    public savedTheme: string;

    constructor() {
        this.bulkEditPortalEntities = false;
        this.writeDebugInfoToXML = false;
        this.savedTheme = 'tailwind';

        ipcMain.handle(SettingsAPI.GET, this.serialize.bind(this));
        ipcMain.on(SettingsAPI.SET, (event: Event, data: Partial<SerializedSettings>) => this.update(data));
    }

    public update(data: Partial<SerializedSettings>): void {
        if (hasStrangeProperty(data, ALLOWED_SETTINGS)) {
            return console.warn(`Attempted to change a not allowed settings property ${data}`);
        }

        Object.assign(this, data);
    }

    public serialize(): Result<string, SerializedSettings> {
        const { bulkEditPortalEntities, writeDebugInfoToXML, savedTheme } = this;

        return ok({
            bulkEditPortalEntities,
            writeDebugInfoToXML,
            savedTheme,
        });
    }
}
