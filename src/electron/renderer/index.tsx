import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './styles/ThemeProvider';
import { App } from './App';
import { SettingsProvider } from './features/settings/context';

ReactDOM.render(
    <SettingsProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </SettingsProvider>,
    document.getElementById('root'),
);
