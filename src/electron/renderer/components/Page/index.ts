import styled from 'styled-components';

export { Header } from './Header';

export const Container = styled.div`
    height: 100%;
    width: 100%;

    min-width: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 16px;
    background-color: ${({ theme }) => theme.colors.base};
    color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 16px;

    padding: 0 24px 0 0;

    overflow-y: auto;
    background-color: ${({ theme }) => theme.colors.base};
    color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.h1`
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.text};
`;
