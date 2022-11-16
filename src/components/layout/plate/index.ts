import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const Plate = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border-radius: 24px;
  padding: 32px;

  .ant-anchor-wrapper {
    overflow: visible;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    border-radius: 16px;
    padding: 16px 24px;
  }
`;

export const InlinePlate = styled(Plate)`
  display: inline-flex;
  flex-direction: column;
`;
