import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { themes, ThemeKey } from './themes';
import { useSettings } from '@/electron/renderer/features/settings/context';

interface ThemeCtx {
    themeKey: ThemeKey;
    setThemeKey: (k: ThemeKey) => void;
    theme: (typeof themes)[ThemeKey];
}

const ThemeContext = createContext<ThemeCtx>({} as any);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { settings, updateSettings } = useSettings();
    const defaultKey = (settings?.savedTheme as ThemeKey) ?? ('tailwind' as ThemeKey);

    const [themeKey, setThemeKey] = useState<ThemeKey>(defaultKey);
    const theme = themes[themeKey];

    useEffect(() => {
        if (settings?.savedTheme) setThemeKey(settings.savedTheme as ThemeKey);
    }, [settings?.savedTheme]);

    // Persist theme changes
    const handleSetThemeKey = (k: ThemeKey) => {
        setThemeKey(k);
        updateSettings({ savedTheme: k });
    };

    return (
        <ThemeContext.Provider value={{ themeKey, setThemeKey: handleSetThemeKey, theme }}>
            <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useAppTheme = () => useContext(ThemeContext);
