import styled from 'styled-components';

import { Input } from '@/electron/renderer/components/Input';

export const SmallInput = styled(Input)`
    height: 80%;
    width: 20%;
    min-width: fit-content;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.overlay1};
`;
