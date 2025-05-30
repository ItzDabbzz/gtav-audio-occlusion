import { BrowserWindow } from 'electron';

import { CodeWalkerFormat } from '@/core/formats/codewalker';

import { Settings } from './settings';

import { ProjectManager } from './project-manager';
import { InteriorManager } from './interior-manager';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export class Application {
    private mainWindow: BrowserWindow;

    public codeWalkerFormat: CodeWalkerFormat;

    public settings: Settings;

    public projectManager: ProjectManager;
    public interiorManager: InteriorManager;

    constructor() {}

    public init(): void {
        if (this.mainWindow) {
            return;
        }

        this.codeWalkerFormat = new CodeWalkerFormat();

        this.settings = new Settings();

        this.projectManager = new ProjectManager(this);
        this.interiorManager = new InteriorManager(this);

        this.mainWindow = new BrowserWindow({
            height: 800,
            width: 1200,
            title: 'gtav-audio-occlusion',
            backgroundColor: '#212121',
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });

        this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        this.mainWindow.on('page-title-updated', e => {
            e.preventDefault();
        });

        this.mainWindow.webContents.on('did-finish-load', () => {
            console.log('Finished loading main window');
        });
    }
}
