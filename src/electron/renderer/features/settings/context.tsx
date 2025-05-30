import React, { createContext, useState, useEffect, useContext } from 'react';
import { isErr, unwrapResult } from '@/electron/common';
import { ProjectHistoryEntry, SerializedSettings, SettingsAPI } from '@/electron/common/types/settings';

type SettingsProviderProps = {
    children: React.ReactNode;
};

type SettingsContext = {
    settings: SerializedSettings | undefined;
    fetchSettings: () => Promise<void>;
    updateSettings: (data: Partial<SerializedSettings>) => Promise<void>;
    projectHistory: ProjectHistoryEntry[];
    removeProjectFromHistory: (path: string) => Promise<void>;
};

const { API } = window;

const settingsContext = createContext<SettingsContext>({} as SettingsContext);

const useSettingsProvider = (): SettingsContext => {
    const [settings, setSettings] = useState<SerializedSettings>();
    const [projectHistory, setProjectHistory] = useState<ProjectHistoryEntry[]>([]);

    const fetchSettings = async (): Promise<void> => {
        const result: Result<string, SerializedSettings | undefined> = await API.invoke(SettingsAPI.GET);
        if (isErr(result)) return console.warn(unwrapResult(result));
        const settings = unwrapResult(result);
        if (!settings) return;
        setSettings(settings);
        setProjectHistory(settings.projectHistory ?? []);
    };

    const removeProjectFromHistory = async (path: string) => {
        setProjectHistory(prev => prev.filter(p => p.path !== path));
        API.send('settings/removeProjectFromHistory', path);
        await fetchSettings();
    };

    const updateSettings = async (data: Partial<SerializedSettings>): Promise<void> => {
        API.send(SettingsAPI.SET, data);
        await fetchSettings();
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return { settings, fetchSettings, updateSettings, projectHistory, removeProjectFromHistory  };
};

export const SettingsProvider = ({ children }: SettingsProviderProps): JSX.Element => {
    const settings = useSettingsProvider();
    return <settingsContext.Provider value={settings}>{children}</settingsContext.Provider>;
};

export const useSettings = (): SettingsContext => {
    const context = useContext(settingsContext);
    if (!context) throw new Error('useSettings must be used within an SettingsProvider');
    return context;
};
