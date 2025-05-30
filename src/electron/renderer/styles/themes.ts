/* eslint-disable @typescript-eslint/ban-types */
import merge from 'lodash/merge';

export interface CatppuccinPalette {
    rosewater: string;
    flamingo: string;
    pink: string;
    mauve: string;
    red: string;
    maroon: string;
    peach: string;
    yellow: string;
    green: string;
    teal: string;
    sky: string;
    sapphire: string;
    blue: string;
    lavender: string;
    text: string;
    subtext1: string;
    subtext0: string;
    overlay2: string;
    overlay1: string;
    overlay0: string;
    surface2: string;
    surface1: string;
    surface0: string;
    base: string;
    mantle: string;
    crust: string;
}

import { theme as tailwind } from './theme';

const catppuccin = {
    latte: {
        name: 'catppuccin-latte',
        colors: {
            // semantic/text colors
            rosewater: '#dc8a78',
            flamingo: '#dd7878',
            pink: '#ea76cb',
            mauve: '#8839ef',
            red: '#d20f39',
            maroon: '#e64553',
            peach: '#fe640b',
            yellow: '#df8e1d',
            green: '#40a02b',
            teal: '#179299',
            sky: '#04a5e5',
            sapphire: '#209fb5',
            blue: '#1e66f5',
            lavender: '#7287fd',
            // text/subtext/overlays
            text: '#4c4f69',
            subtext1: '#5c5f77',
            subtext0: '#6c6f85',
            overlay2: '#7c7f93',
            overlay1: '#8c8fa1',
            overlay0: '#9ca0b0',
            // surfaces
            surface2: '#acb0be',
            surface1: '#bcc0cc',
            surface0: '#ccd0da',
            // backgrounds
            base: '#eff1f5',
            mantle: '#e6e9ef',
            crust: '#dce0e8',
        } as CatppuccinPalette,
    },

    frappe: {
        name: 'catppuccin-frappe',
        colors: {
            rosewater: '#f2d5cf',
            flamingo: '#eebebe',
            pink: '#f4b8e4',
            mauve: '#ca9ee6',
            red: '#e78284',
            maroon: '#ea999c',
            peach: '#ef9f76',
            yellow: '#e5c890',
            green: '#a6d189',
            teal: '#81c8be',
            sky: '#99d1db',
            sapphire: '#85c1dc',
            blue: '#8caaee',
            lavender: '#babbf1',
            text: '#c6d0f5',
            subtext1: '#b5bfe2',
            subtext0: '#a5adce',
            overlay2: '#949cbb',
            overlay1: '#838ba7',
            overlay0: '#737994',
            surface2: '#626880',
            surface1: '#51576d',
            surface0: '#414559',
            base: '#303446',
            mantle: '#292c3c',
            crust: '#232634',
        } as CatppuccinPalette,
    },

    macchiato: {
        name: 'catppuccin-macchiato',
        colors: {
            rosewater: '#f4dbd6',
            flamingo: '#f0c6c6',
            pink: '#f5bde6',
            mauve: '#c6a0f6',
            red: '#ed8796',
            maroon: '#ee99a0',
            peach: '#f5a97f',
            yellow: '#eed49f',
            green: '#a6da95',
            teal: '#8bd5ca',
            sky: '#91d7e3',
            sapphire: '#7dc4e4',
            blue: '#8aadf4',
            lavender: '#b7bdf8',
            text: '#cad3f5',
            subtext1: '#b8c0e0',
            subtext0: '#a5adcb',
            overlay2: '#939ab7',
            overlay1: '#8087a2',
            overlay0: '#6e738d',
            surface2: '#5b6078',
            surface1: '#494d64',
            surface0: '#363a4f',
            base: '#24273a',
            mantle: '#1e2030',
            crust: '#181926',
        } as CatppuccinPalette,
    },

    mocha: {
        name: 'catppuccin-mocha',
        colors: {
            rosewater: '#f5e0dc',
            flamingo: '#f2cdcd',
            pink: '#f5c2e7',
            mauve: '#cba6f7',
            red: '#f38ba8',
            maroon: '#eba0ac',
            peach: '#fab387',
            yellow: '#f9e2af',
            green: '#a6e3a1',
            teal: '#94e2d5',
            sky: '#89dceb',
            sapphire: '#74c7ec',
            blue: '#89b4fa',
            lavender: '#b4befe',
            text: '#cdd6f4',
            subtext1: '#bac2de',
            subtext0: '#a6adc8',
            overlay2: '#9399b2',
            overlay1: '#7f849c',
            overlay0: '#6c7086',
            surface2: '#585b70',
            surface1: '#45475a',
            surface0: '#313244',
            base: '#1e1e2e',
            mantle: '#181825',
            crust: '#11111b',
        } as CatppuccinPalette,
    },
};

export const themes = {
    tailwind,
    latte: merge<{}, typeof tailwind, { name: string; colors: CatppuccinPalette }>({}, tailwind, {
        name: catppuccin.latte.name,
        colors: catppuccin.latte.colors,
    }),
    frappe: merge({}, tailwind, { name: catppuccin.frappe.name, colors: catppuccin.frappe.colors }),
    macchiato: merge({}, tailwind, { name: catppuccin.macchiato.name, colors: catppuccin.macchiato.colors }),
    mocha: merge({}, tailwind, { name: catppuccin.mocha.name, colors: catppuccin.mocha.colors }),
};

export type ThemeKey = keyof typeof themes;
export type AppTheme = (typeof themes)[ThemeKey];
