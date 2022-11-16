import styled from 'styled-components';
import Table from 'antd/es/table';
import Space from 'antd/es/space';

export const HeaderButtonsContainer = styled.div`
  display: flex;
  
  button {
    margin: 0 16px 16px 0;
    
    &.ant-btn-primary,
    &.ant-btn-default {
      height: 56px;
    }

    span {
      font-size: 20px;
    }
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

export const LeftSide = styled.div`
  flex: 0 0 376px;
  padding: 16px 32px 32px 0;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

export const RightSide = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 16px 32px 32px 32px;
`;

export const PresetTab = styled.div`
  height: 48px;
  margin-top: 16px;
  padding: 12px;
  font-size: 16px;
  line-height: 1.3;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  cursor: pointer;
`;

export const StyledTable = styled(Table)`
  margin-top: 24px;

  .ant-table-cell {
    text-align: center;
  }
  
  .ant-table-thead > tr > th {
    height: 40px;
  }
  
  .ant-table-tbody > tr > td {
    padding: 16px 12px;
  }
  
  .ant-table-thead > tr > th {
    font-weight: normal;
  }
`;

export const ButtonSpace = styled(Space)`
  width: 100%;
  margin-top: 24px;
  justify-content: right;
`;
