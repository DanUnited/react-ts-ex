import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const ControlsContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 12px;
  margin: 8px 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 6px 16px;
  }
`;
