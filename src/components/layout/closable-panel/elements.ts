import styled from 'styled-components';
import { FlexBlock } from '../flex-block';

export const ClosablePanelContainer = styled(FlexBlock)`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
  &:hover path {
    fill: ${({ theme }) => theme.colors.primary};
  }  
`;
