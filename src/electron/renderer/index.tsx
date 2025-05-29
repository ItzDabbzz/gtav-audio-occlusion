import React from 'react';
import ReactDOM from 'react-dom';
import { AppThemeProvider } from './styles/ThemeProvider';
import { App } from './App';

ReactDOM.render(
    <AppThemeProvider>
        <App />
    </AppThemeProvider>,
    document.getElementById('root'),
);
