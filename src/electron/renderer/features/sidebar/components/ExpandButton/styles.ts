import styled from 'styled-components';

export type ButtonProps = {
    expanded?: boolean;
};

export const Button = styled.button<ButtonProps>`
    height: 30px;

    display: flex;
    justify-content: ${({ expanded }) => (expanded ? 'flex-end' : 'flex-start')};
    align-items: center;

    margin-left: 0 auto auto auto;
    padding: 0px 16px;

    border-radius: 4px;
    border: none;

    color: ${({ expanded, theme }) => (expanded ? theme.colors.pink : '#cdd6f4')};
    font-weight: 600;

    background: none;

    transition: ease-in-out 0.1s;

    &:hover {
        opacity: 1;
    }
`;

export const ExpandButtonWrapper = styled.button<{ expanded?: boolean }>`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 16px;

    border-radius: 4px;
    border: none;

    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    background: ${({ expanded, theme }) => (expanded ? theme.colors.surface0 : 'transparent')};

    transition: ease-in-out 0.1s;

    span {
        display: ${({ expanded }) => (expanded ? 'inline' : 'none')};
    }
    &:hover {
        background: ${({ theme }) => theme.colors.overlay0};
        cursor: pointer;
        opacity: 0.8;
    }
    margin-bottom: 8px;
`;
