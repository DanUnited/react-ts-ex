import Row from 'antd/es/row';
import Radio from 'antd/es/radio';
import styled from 'styled-components';
import { Trash } from 'components/icons';

export const TrashModalIcon = styled(Trash)`
  height: 26px;
  vertical-align: bottom;
  fill: #FF6960;
`;

export const FeeControlsRadio = styled(Radio.Group)`
`;

export const RoundRow = styled(Row)`
  margin-bottom: 8px;
`;
