import styled from 'styled-components';

import { Checkbox } from '@/electron/renderer/components/Checkbox';

export const SettingsEntry = styled.div`
    display: flex;

    align-items: center;
    gap: 8px;

    > label {
        font-size: 16px;
    }
`;

export const SettingsCheckbox = styled(Checkbox)`
    height: 16px;
    width: 16px;

    .checkbox-indicator {
        font-size: 8px;
    }
`;

export const SettingsTextInput = styled.input`
    height: 100%;
    width: 45%;

    padding: 8px;

    border: none;
    border-radius: 8px;

    font-family: 'Inter';
    font-size: 0.9em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};

    background: ${({ theme }) => theme.colors.surface0};

    &::placeholder {
        color: ${({ theme }) => theme.colors.subtext1};
    }
`;

export const SettingsLabel = styled.label`
    font-size: 0.8em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    padding-right: 10px;
`;
