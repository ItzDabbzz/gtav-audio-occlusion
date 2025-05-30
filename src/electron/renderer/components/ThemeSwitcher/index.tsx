import React from 'react';
import { useAppTheme } from '../../styles/ThemeProvider';
import { themes } from '../../styles/themes';

import { Wrapper, Trigger, Select, Option } from './styles';
import { useSettings } from '../../features/settings/context';
export const ChevronDown = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
export const ThemeSwitcher = ({ expanded }: { expanded: boolean }): JSX.Element => {
    const { themeKey, setThemeKey, theme } = useAppTheme();
    const { updateSettings } = useSettings();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value as keyof typeof themes;
        setThemeKey(key);
        updateSettings({ savedTheme: key });
    };

    return (
        <Wrapper $expanded={expanded}>
            <Trigger $expanded={expanded}>
                <span>{theme.name}</span>
                <ChevronDown />
            </Trigger>
            <Select value={themeKey} onChange={onChange}>
                {Object.entries(themes).map(([key, t]) => (
                    <Option key={key} value={key}>
                        {t.name}
                    </Option>
                ))}
            </Select>
        </Wrapper>
    );
};
