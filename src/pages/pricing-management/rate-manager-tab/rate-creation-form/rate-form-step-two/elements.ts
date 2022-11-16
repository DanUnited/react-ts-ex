import styled from 'styled-components';
import { PlateFullHeight } from 'components/layout/page-layout/elements';

import type { FC } from 'react';

export const ContentContainer: FC = styled(PlateFullHeight)`
  width: 100%;
  
  .ant-form-item-explain.ant-form-item-explain-error {
    position: absolute;
    bottom: -18px;
  }
`;
