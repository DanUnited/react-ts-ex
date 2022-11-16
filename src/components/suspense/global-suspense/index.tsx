import React from 'react';
import Spin from 'antd/es/spin';

import { MiddleContainer } from './elements';

export const GlobalSuspense = () => (
  <MiddleContainer>
    <Spin size="large" />
  </MiddleContainer>
);
