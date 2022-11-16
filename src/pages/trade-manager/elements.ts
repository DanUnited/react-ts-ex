import Table from 'antd/es/table';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  .ant-table table .ant-table-tbody > tr.draft {
    background-color: #f7f6ec;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding-bottom: 12px;
  
  svg {
    height: 16px;
    width: 16px;
  }
`;

export const MoneyContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GraphWrapper = styled.div<{ $active?: boolean }>`
  margin-left: 16px;
  svg {
    fill: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.lightGrey};
  }
`;
