import Col from 'antd/es/col';
import styled from 'styled-components';
import { Text18 } from 'components/layout/text';

export const PickerCol = styled(Col)`
  flex: 1 0 33.33%;
  margin: -16px;
  max-width: 530px;
  padding: 32px 16px 32px 32px;
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const MainCol = styled(Col)`
  margin: -16px 16px -16px 0;
  padding: 32px 32px 32px 42px;
  flex: 1 1 66.66%;
`;

export const SelectListLabel = styled(Text18)`
  margin: 8px 0 25px 0;
`;

export const ButtonsContainer = styled.div`
  text-align: center;
  margin-top: 12px;

  .ant-btn {
    margin: 0 12px;
    min-width: 252px;
  }
`;
