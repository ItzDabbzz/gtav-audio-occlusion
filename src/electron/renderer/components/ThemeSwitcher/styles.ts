import styled from 'styled-components';

export const Wrapper = styled.div<{ expanded: boolean }>`
    position: relative;
    display: inline-block;
    font-size: 0.9em;
    width: ${({ expanded }) => (expanded ? 'auto' : '32px')};
    height: 32px;
`;

export const Trigger = styled.button<{ expanded: boolean }>`
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: ${({ expanded }) => (expanded ? 'space-between' : 'center')};

    width: ${({ expanded }) => (expanded ? '170px' : '32px')};
    height: 32px;
    padding: ${({ expanded }) => (expanded ? '0 12px' : '0')};

    background: ${({ theme }) => theme.colors.surface0};
    border: 1px solid ${({ theme }) => theme.colors.overlay1};
    border-radius: 6px;
    cursor: pointer;

    > span {
        display: ${({ expanded }) => (expanded ? 'inline' : 'none')};
        color: ${({ theme }) => theme.colors.text};
    }

    > svg {
        width: 0.8em;
        height: 0.8em;
        fill: ${({ theme }) => theme.colors.subtext0};
    }

    &:hover {
        border-color: ${({ theme }) => theme.colors.text};
    }
`;

export const Select = styled.select`
    all: unset;
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
`;

export const Option = styled.option`
    background: ${({ theme }) => theme.colors.surface0};
    color: ${({ theme }) => theme.colors.text};
`;
