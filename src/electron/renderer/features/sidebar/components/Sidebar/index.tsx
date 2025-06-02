import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getActiveRoutes, RouteSidebarPosition } from '../../../../routes';

import { ExpandButton } from '../ExpandButton';

import { Container, TopSection, BottomSection, SectionLink, HeaderRow, SidebarTitle } from './styles';
import { ThemeSwitcher } from '@/electron/renderer/components/ThemeSwitcher';
import { expand } from '../../../../../../../jest.config';

type Routes = ReturnType<typeof getActiveRoutes>;

const renderRoutes = (routes: Routes, currentPath: string): JSX.Element[] =>
    routes.map(route => (
        <SectionLink key={route.path} to={route.path} current={currentPath}>
            <route.icon size={18} />
            <p>{route.label}</p>
        </SectionLink>
    ));

export const Sidebar = (): JSX.Element => {
    const [expanded, setExpanded] = useState(true);

    const { pathname } = useLocation();

    const routes = getActiveRoutes();

    const top = routes.filter(route => route.sidebarPosition === RouteSidebarPosition.Top);
    const bottom = routes.filter(route => route.sidebarPosition === RouteSidebarPosition.Bottom);

    return (
        <Container expanded={expanded}>
            <TopSection>
                <HeaderRow>
                    <SidebarTitle expanded={expanded}>Audio Occlusion Tool</SidebarTitle>
                </HeaderRow>

                {renderRoutes(top, pathname)}
            </TopSection>

            <BottomSection>
                <ThemeSwitcher expanded={expanded} />
                <ExpandButton expanded={expanded} onClick={() => setExpanded(e => !e)} />
                {renderRoutes(bottom, pathname)}
            </BottomSection>
        </Container>
    );
};
