import { useAppTheme } from '../../styles/ThemeProvider';
import { themes } from '../../styles/themes';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Wrapper, Trigger, Dropdown, DropdownItem } from './styles';
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

export const ChevronUp = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="6 15 12 9 18 15" />
    </svg>
);

export const ThemeSwitcher = ({ expanded }: { expanded: boolean }): JSX.Element => {
    const { themeKey, setThemeKey, theme } = useAppTheme();
    const { updateSettings } = useSettings();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // 🔒 Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (key: string) => {
        setThemeKey(key as keyof typeof themes);
        updateSettings({ savedTheme: key });
        setOpen(false);
    };

    return (
        <Wrapper $expanded={expanded} ref={ref}>
            <Trigger $expanded={expanded} onClick={() => setOpen(prev => !prev)}>
                <span>{theme.name}</span>
                {open ? <ChevronUp /> : <ChevronDown />}
            </Trigger>
            <Dropdown $open={open}>
                {Object.entries(themes).map(([key, t]) => (
                    <DropdownItem key={key} onClick={() => handleSelect(key)}>
                        {t.name}
                    </DropdownItem>
                ))}
            </Dropdown>
        </Wrapper>
    );
};
