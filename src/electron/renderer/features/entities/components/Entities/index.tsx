import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';

import { Interior } from '@/electron/renderer/features/interior';
import { useProject, NoProject } from '@/electron/renderer/features/project';

import { PortalInfoEntityList } from '../PortalInfoEntityList';
import { useInterior } from '@/electron/renderer/features/interior';

const HEADER_TITLE = 'Entities';

export const Entities = (): JSX.Element => {
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
                {state.interiors.map((interiorMeta, index) => {
                    const { identifier } = interiorMeta;
                    
                    if (!interiorMeta) return null;

                    return (
                        <Interior key={identifier} identifier={identifier} index={index} name={identifier}>
                            <PortalInfoEntityList
                                interior={interiorMeta}
                                fetchInterior={() => fetchInterior(identifier)}
                            />
                        </Interior>
                    );
                })}
            </Content>
        </Container>
    );
};
