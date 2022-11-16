import styled, { css } from 'styled-components';
import { EXTRA_LARGE_VIEWPORT, LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

export const Header1CSS = css`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 24px;
    line-height: 32px;
  }

  @media (max-width: ${LARGE_VIEWPORT}px) {
    font-size: 20px;
    line-height: 1.3;
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const Header1 = styled.h1`
  ${Header1CSS};
`;

export const Header2 = styled.h2`
  font-size: 32px;
  line-height: 1.3;
  font-weight: 600;
  margin: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 24px;
  }
`;

export const Header3 = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.3;
  margin: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 20px;
  }
`;

export const Header4 = styled.h4`
  font-size: 20px;
  font-weight: 500;
  margin: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 18px;
  }
`;

export const Header5 = styled.h5`
  font-size: 18px;
  font-weight: 500;
  margin: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 16px;
  }
`;

export const Header6 = styled.h6`
  font-size: 16px;
  font-weight: 500;
  margin: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;
