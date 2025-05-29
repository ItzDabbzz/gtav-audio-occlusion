import React, { createContext, type ReactNode, useContext, useState, useEffect } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { themes, ThemeKey } from './themes';
import { GlobalStyle } from './global';

interface Ctx {
    themeKey: ThemeKey;
    setThemeKey: (t: ThemeKey) => void;
    theme: (typeof themes)[ThemeKey];
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ThemeCtx = createContext<Ctx>(null!);

export const AppThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [themeKey, setThemeKey] = useState<ThemeKey>('tailwind');

    // hydrate from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('app-theme') as ThemeKey;
        if (stored && themes[stored]) setThemeKey(stored);
    }, []);

    // persist on change
    useEffect(() => {
        localStorage.setItem('app-theme', themeKey);
    }, [themeKey]);

    const theme = themes[themeKey];

    return (
        <ThemeCtx.Provider value={{ themeKey, setThemeKey, theme }}>
            <SCThemeProvider theme={theme as any}>
                <GlobalStyle />
                {children}
            </SCThemeProvider>
        </ThemeCtx.Provider>
    );
};

export function useAppTheme(): Ctx {
    const ctx = useContext(ThemeCtx);
    if (!ctx) throw new Error('`useAppTheme` must be inside `<AppThemeProvider>`');
    return ctx;
}
