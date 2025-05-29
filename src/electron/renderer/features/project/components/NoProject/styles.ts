import styled from 'styled-components';

import { Container } from '@/electron/renderer/components/Page';
import { hexToRgba } from '@/electron/renderer/utils';

export const StyledContainer = styled(Container)`
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => hexToRgba(theme.colors.text, 0.75)};

    a {
        text-decoration: none;
        color: ${({ theme }) => hexToRgba(theme.colors.pink, 0.55)};
        font-weight: 600;

        transition: 0.1s;

        &:hover {
            color: ${({ theme }) => hexToRgba(theme.colors.text, 0.75)};
        }
    }
`;

export const Image = styled.img`
    object-fit: cover;

    filter: grayscale(1);

    opacity: 0.2;
`;

export const Text = styled.p`
    font-size: 1.2rem;
`;
