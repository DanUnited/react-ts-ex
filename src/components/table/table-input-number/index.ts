import styled from 'styled-components';

import { NumberInput } from 'components/number-input';

import type { FC } from 'react';
import type { InputNumberProps } from 'antd/es/input-number';

export const TableInputNumber: FC<InputNumberProps> = styled(NumberInput)`
  &.ant-input-number {
    width: 100%;
  }
`;
