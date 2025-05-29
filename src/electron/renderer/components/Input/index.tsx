import styled from 'styled-components';

export const Input = styled.input`
    height: 100%;
    width: 100%;

    padding: 8px;

    border: none;
    border-radius: 8px;

    font-family: 'Inter';
    font-size: 0.9em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.surface2};

    background: ${({ theme }) => theme.colors.surface0};

    &::placeholder {
        color: ${({ theme }) => theme.colors.surface1};
    }
`;
