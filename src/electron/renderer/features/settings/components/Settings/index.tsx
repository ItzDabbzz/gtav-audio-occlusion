import React from 'react';

import { Container, Header, Content } from '@/electron/renderer/components/Page';

import { useSettings } from '../../context';

import { SettingsEntry, SettingsCheckbox, SettingsTextInput, SettingsLabel } from './styles';

const HEADER_TITLE = 'Settings';

export const Settings = (): JSX.Element => {
    const { settings, updateSettings } = useSettings();

    if (!settings) {
        return null;
    }

    const { bulkEditPortalEntities, writeDebugInfoToXML, savedTheme } = settings;

    return (
        <Container>
            <Header title={HEADER_TITLE} />
            <Content>
                <SettingsEntry>
                    <SettingsCheckbox
                        checked={bulkEditPortalEntities}
                        onClick={() => updateSettings({ bulkEditPortalEntities: !bulkEditPortalEntities })}
                    />
                    <SettingsLabel>Bulk edit portal entities</SettingsLabel>
                </SettingsEntry>
                <SettingsEntry>
                    <SettingsCheckbox
                        checked={writeDebugInfoToXML}
                        onClick={() => updateSettings({ writeDebugInfoToXML: !writeDebugInfoToXML })}
                    />
                    <SettingsLabel>Write debug information to the generated XML</SettingsLabel>
                </SettingsEntry>
                <SettingsEntry>
                    <SettingsLabel>Saved Theme</SettingsLabel>
                    <SettingsTextInput
                        value={savedTheme}
                        onChange={e => updateSettings({ savedTheme: e.target.value })}
                    ></SettingsTextInput>
                </SettingsEntry>
            </Content>
        </Container>
    );
};
