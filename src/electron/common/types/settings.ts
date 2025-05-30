export enum SettingsAPI {
    GET = 'settings/get',
    SET = 'settings/set',
}

export type ProjectHistoryEntry = { name: string; path: string };
export type SerializedSettings = {
    bulkEditPortalEntities: boolean;
    writeDebugInfoToXML: boolean;
    savedTheme: string;
    primaryColor?: string;
    projectHistory?: ProjectHistoryEntry[];
};
