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
    const { settings } = useSettings();
    const defaultKey = (settings?.savedTheme as ThemeKey) ?? ('tailwind' as ThemeKey);

    const [themeKey, setThemeKey] = useState<ThemeKey>(defaultKey);
    const theme = themes[themeKey];

    // sync whenever settings.savedTheme changes
    useEffect(() => {
        if (settings?.savedTheme) {
            setThemeKey(settings.savedTheme as ThemeKey);
        }
    }, [settings?.savedTheme]);

    return (
        <ThemeContext.Provider value={{ themeKey, setThemeKey, theme }}>
            <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useAppTheme = () => useContext(ThemeContext);
