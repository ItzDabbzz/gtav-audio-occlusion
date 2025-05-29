import styled, { StyledComponentPropsWithRef } from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';

export const Root = styled(Checkbox.Root)`
    height: 24px;
    width: 24px;

    border: 2px solid ${({ theme }) => theme.colors.pink};
    border-radius: 4px;

    background: none;

    &[data-state='checked'] {
        background: ${({ theme }) => theme.colors.pink};
    }
`;

export const Indicator = styled(Checkbox.Indicator)`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.surface0};
`;

export type RootProps = StyledComponentPropsWithRef<typeof Root>;

export type IndicatorProps = StyledComponentPropsWithRef<typeof Indicator>;
