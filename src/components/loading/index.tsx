import React from 'react';
import Spin from 'antd/es/spin';

import { SpinContainer } from './elements';

export const Loading = () => (
  <SpinContainer>
    <Spin size="large" />
  </SpinContainer>
);
