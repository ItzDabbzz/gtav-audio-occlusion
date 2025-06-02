import styled from 'styled-components';

export const Wrapper = styled.div<{ $expanded: boolean }>`
    position: relative;
    display: flex;
    justify-content: ${({ $expanded }) => ($expanded ? 'flex-start' : 'center')};
    align-items: center;

    font-size: 0.9em;
    width: 100%;
    height: 32px;
    padding: 0 4px;
    box-sizing: border-box;
    padding-bottom: 25px;
`;

export const Trigger = styled.button<{ $expanded: boolean }>`
    all: unset;
    box-sizing: border-box;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: ${({ $expanded }) => ($expanded ? 'space-between' : 'center')};

    width: ${({ $expanded }) => ($expanded ? '170px' : '32px')};
    height: 32px;
    padding: ${({ $expanded }) => ($expanded ? '0 12px' : '0')};

    background: ${({ theme }) => theme.colors.surface0};
    border: 1px solid ${({ theme }) => theme.colors.overlay1};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    > span {
        display: ${({ $expanded }) => ($expanded ? 'inline' : 'none')};
        color: ${({ theme }) => theme.colors.text};
        white-space: nowrap;
        font-weight: 500;
    }

    > svg {
        width: 0.8em;
        height: 0.8em;
        fill: ${({ theme }) => theme.colors.subtext0};
        position: ${({ $expanded }) => ($expanded ? 'static' : 'absolute')};
        left: 50%;
        top: 50%;
        transition: transform 0.2s;
        transform: ${({ $expanded }) => ($expanded ? 'none' : 'translate(-50%, -50%)')};
        pointer-events: none;
    }

    &:hover {
        border-color: ${({ theme }) => theme.colors.text};
        background: ${({ theme }) => theme.colors.surface1};
    }
`;

export const Dropdown = styled.div<{ $open?: boolean }>`
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 170px;
    max-height: 180px;
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.surface0};
    border: 1px solid ${({ theme }) => theme.colors.overlay1};
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;

    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(10px)')};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
`;

export const DropdownItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.overlay0};
    }
`;
