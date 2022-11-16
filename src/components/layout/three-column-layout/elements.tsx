import styled, { css } from 'styled-components';
import Layout from 'antd/es/layout/layout';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

import type { HTMLProps } from 'react';

interface IFixedColumnContainer extends Omit<HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as'> {
  $fixed?: boolean;
}

export const StyledLayout = styled(Layout)`
  &.ant-layout {
    display: flex;
    flex-direction: row;
  }
`;

export const FirstColumnContainer = styled.div`
  min-width: 384px;
  margin-right: 32px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    min-width: 264px;
  }
`;

export const ThirdColumnContainer = styled.div<IFixedColumnContainer>`
  width: ${({ $fixed }) => $fixed ? '436px' : '100%'};
  margin-left: 32px;
  
  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: ${({ $fixed }) => $fixed ? '264px' : '100%'};
    margin-left: 24px;
  }
`;

export const SecondColumnContainer = styled.div<IFixedColumnContainer>`
  flex: 1;
  width: 572px;
  min-height: calc(100vh - 176px);

  ${({ $fixed }) => {
    if ($fixed) {
      return css`
        flex: 1 0 436px;
      `;
    }
  }}
`;
