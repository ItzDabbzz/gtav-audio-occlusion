import styled from 'styled-components';

import { Input } from '@/electron/renderer/components/Input';

export const InputWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  height: 80%;
  background: ${({ theme }) => theme.colors.gray[950]};
`;

export const MediumInput = styled(StyledInput)`
  min-width: 88px;
`;

export const SmallInput = styled(StyledInput)`
  min-width: 56px;
`;

export const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
`;
