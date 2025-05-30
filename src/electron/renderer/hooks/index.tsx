import React from 'react';

import { ProjectProvider } from '@/electron/renderer/features/project';
import { SettingsProvider } from '@/electron/renderer/features/settings';
import { ThemeProvider } from '../styles/ThemeProvider';

export const AppProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <SettingsProvider>
        <ThemeProvider>
            <ProjectProvider>{children}</ProjectProvider>
        </ThemeProvider>
    </SettingsProvider>
);
