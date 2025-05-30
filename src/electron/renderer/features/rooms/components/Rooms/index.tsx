import React from 'react';

import { Container, Content, Header } from '@/electron/renderer/components/Page';

import { Interior } from '@/electron/renderer/features/interior';
import { useProject, NoProject } from '@/electron/renderer/features/project';

import { InteriorRoomAudioGameDataList } from '../InteriorRoomAudioGameDataList';
import { useInterior } from '@/electron/renderer/features/interior';

const HEADER_TITLE = 'Rooms';

export const Rooms = (): JSX.Element => {
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
                            <InteriorRoomAudioGameDataList
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
