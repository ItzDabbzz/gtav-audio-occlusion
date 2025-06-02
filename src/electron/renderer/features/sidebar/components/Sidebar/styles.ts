import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ISectionLinkProps {
    current: string;
}

type ContainerProps = {
    expanded?: boolean;
};

type SidebarTitleProps = {
    expanded?: boolean;
};

export const Container = styled.div<ContainerProps>`
    height: 100%;
    width: 100%;
    max-width: ${({ expanded }) => (expanded ? '190px' : '68px')};

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;

    padding: 16px 8px;

    background: ${({ theme }) => theme.colors.surface1};
    border-right: 2px solid ${({ theme }) => theme.colors.surface1};

    transition: all 0.2s;
`;

export const Section = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const TopSection = styled(Section)`
    gap: 16px;
`;

export const BottomSection = styled(Section)`
    margin-top: auto;
`;

export const SectionLink = styled(Link)<ISectionLinkProps>`
    width: 100%;
    height: 40px;

    min-width: 0;

    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;

    padding: 16px;

    border-radius: 4px;

    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;

    overflow: hidden;

    background: ${({ to, current, theme }) => (to === current ? theme.colors.surface0 : 'transparent')};

    transition: ease-in-out 0.1s;

    &:hover {
        background: ${({ theme }) => theme.colors.overlay0};
        cursor: pointer;

        opacity: 0.8;
    }

    & + & {
        margin-top: 8px;
    }

    > svg {
        flex-shrink: 0;
    }
`;

export const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; /* space between title & button */
    padding: 16px; /* optional, match your TopSection padding */
    justify-content: center;
`;

export const SidebarTitle = styled.h2<SidebarTitleProps>`
    min-width: 0px;
    margin: 0 auto;
    font-size: 1rem;
    font-weight: 600;
    justify-content: start;
    align-items: center;
    text-align: center;
    display: flex;
    color: ${({ theme }) => theme.colors.text};
    overflow: hidden;
    text-overflow: ellipsis;

    max-width: ${({ expanded }) => (expanded ? '100%' : '0')};
    opacity: ${({ expanded }) => (expanded ? 1 : 0)};
    visibility: ${({ expanded }) => (expanded ? 'visible' : 'hidden')};

    transition: all 0.2s ease;
`;
