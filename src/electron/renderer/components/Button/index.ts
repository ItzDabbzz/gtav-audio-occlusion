import styled from 'styled-components';

export const Button = styled.button`
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 8px;

    border-radius: 8px;
    border: none;

    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;

    background: ${({ theme }) => theme.colors.surface0};

    transition: background 0.2s;

    &:hover {
        background: ${({ theme }) => theme.colors.overlay0};
    }

    > svg {
        margin-right: 8px;
    }
`;
