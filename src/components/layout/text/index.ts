import styled, { css } from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const TextCSS = css`
  font-size: 16px;
  margin: 8px 0 16px 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
  }
`;

export const Text = styled.p`
  ${TextCSS};
`;

export const Text18CSS = css`
  font-size: 18px;
  margin: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 16px;
  }
`;

export const Text18 = styled.p`
  ${Text18CSS};
`;
