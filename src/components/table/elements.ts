import styled from 'styled-components';
import Input from 'antd/es/input';
import { NumberInput } from 'components/number-input';

export const DateContainer = styled.div`
  display: block;
  white-space: pre;
  text-align: center;
`;

export const StyledInput = styled(NumberInput)`
  &.ant-input {
    width: 104px;
  }
`;

export const SmallInput = styled(Input)`
  &.ant-input {
    width: 48px;
    padding: 8px;
    text-align: center;
  }
`;

export const UtilizationColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
