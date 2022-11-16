import styled from 'styled-components';
import { PrimaryButton } from 'components/layout/button';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const SquareButton = styled(PrimaryButton)`
 &.ant-btn-primary {
  height: 40px;
  width: 40px;
  font-size: 20px;
  line-height: 1.1;
  font-weight: 600;
  border-radius: 4px;
  border: 0;
  box-shadow: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: capitalize;
  font-feature-settings: 'pnum' on, 'lnum' on;

  &:active, &:focus {
    color: ${({ theme }) => theme.colors.text};
    background-color: transparent;
  }

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
  }

   @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
     &.ant-btn-primary {
       height: 24px;
       width: 24px;
       font-size: 12px;
       padding: 0 8px;
     }
   }
 }
`;
