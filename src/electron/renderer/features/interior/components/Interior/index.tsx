import React from 'react';

import { InteriorProvider } from '../../context';

import { Container, Header, Title } from './styles';

type InteriorProps = {
    identifier: string;
    index: number;
    name: string;
    children: React.ReactNode;
};

export const Interior = ({ identifier, index, name, children }: InteriorProps): JSX.Element => {
    return (
        <InteriorProvider identifiers={[identifier]}>
            <Container>
                <Header>
                    <Title>
                        <span>{index + 1}.</span>"{name}"
                    </Title>
                </Header>
                {children}
            </Container>
        </InteriorProvider>
    );
};
