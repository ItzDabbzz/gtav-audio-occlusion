import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';

import { Interior, useInterior } from '@/electron/renderer/features/interior';
import { useProject, NoProject } from '@/electron/renderer/features/project';

import { PortalInfoList } from '../PortalInfoList';

const HEADER_TITLE = 'Portals';

export const Portals = (): JSX.Element => {
    const { state } = useProject();
    const { interiors, fetchInterior } = useInterior();

    if (!state) {
        return <NoProject />;
    }

    const headerOptionalText = `"${state.name}"`;

    return (
        <Container>
            <Header title={HEADER_TITLE} optionalText={headerOptionalText} />
            <Content>
                {state.interiors.map((interior, index) => {
                    const { identifier } = interior;

                    return (
                        <Interior key={identifier} index={index} name={identifier} identifier={identifier}>
                            <PortalInfoList
                                interior={interior}
                                fetchInterior={() => fetchInterior(identifier)}/>
                        </Interior>
                    );
                })}
            </Content>
        </Container>
    );
};
