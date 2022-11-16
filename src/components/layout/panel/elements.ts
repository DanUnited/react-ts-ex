import styled from 'styled-components';
import { Header6 } from '../headers';

export const PanelContainer = styled.div`
  position: relative;
  margin-top: 16px;
  padding: 16px 0 16px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGrey};
  &.empty {
    padding: 0;
  }
`;

export const PanelHeader = styled(Header6)`
  position: absolute;
  top: -16px;
  background: ${({ theme }) => theme.colors.white};
  display: inline-block;
  padding-right: 8px;
`;

export const AddonRightPanel = styled.div`
  position: absolute;
  top: -16px;
  right: 0;
`;
