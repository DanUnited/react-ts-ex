import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const HeaderContainer = styled.div`
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.lightGrey};

  h1, h2, h3, h4, h5, h6 {
    display: inline-block;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 8px 16px;
    margin-bottom: 8px;
  }
`;

interface IPagePlate {
  $width?: string;
}

export const PageHeaderContainer = styled.div<IPagePlate>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: ${({ $width }) => $width};
  margin-bottom: 24px;

  h1, h2 {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-bottom: 16px;
  }
`;
