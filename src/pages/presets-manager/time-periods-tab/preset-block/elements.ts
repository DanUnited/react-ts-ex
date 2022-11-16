import styled from 'styled-components';

import { InlinePlate } from 'components/layout/plate';
import { Header4 } from 'components/layout/headers';

export const PresetBlockContainer = styled(InlinePlate)`
  min-width: 400px;
  background-color: ${({ theme }) => theme.colors.light};
  
  h4 {
    margin: 0;
  }
`;

export const PresetButton = styled.div`
  button {
    width: 176px;
  }
`;

export const PresetHeader = styled(Header4)`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DuplicateLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  margin-right: 16px;
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-between;
`;

export const PeriodBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
`;
