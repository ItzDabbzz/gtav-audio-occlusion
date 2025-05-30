import React from 'react';

import { Container, Section, SectionHeader, Horizontal, Entry, Path } from './styles';
import { SerializedInterior } from '@/electron/common/types/interior';

type InteriorDetailsProps = {
    interior: SerializedInterior | undefined;
};

export const InteriorDetails = ({ interior }: InteriorDetailsProps): JSX.Element | null => {
    if (!interior) {
        return null;
    }

    const { mapDataFilePath, mapTypesFilePath, path } = interior;

    return (
        <Container>
            <Section>
                <SectionHeader>
                    <h2>Interior details</h2>
                </SectionHeader>
                <Horizontal>
                    <Entry>
                        <h3>Map data (#map)</h3>
                        <Path>{mapDataFilePath}</Path>
                    </Entry>
                    <Entry>
                        <h3>Map types (#typ)</h3>
                        <Path>{mapTypesFilePath}</Path>
                    </Entry>
                </Horizontal>
                <Entry>
                    <h3>Target path</h3>
                    <Path>{path}</Path>
                </Entry>
            </Section>
        </Container>
    );
};
