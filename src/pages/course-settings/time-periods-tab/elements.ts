import styled from 'styled-components';
import Select from 'antd/es/select';

export const DividerContainer = styled.div`
  .ant-divider-horizontal.ant-divider-with-text-left::before {
    display: none;
  }

  .ant-divider-inner-text {
    font-size: 20px;
    padding-left: 0;
    font-weight: 500;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const HeaderContainer = styled.div`
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const TimePeriodContainer = styled.div`
  margin-bottom: 16px;
  
  :last-child {
    margin-bottom: 0;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-dropdown {
    border-radius: 20px;
  }
  
  .ant-select-selection-overflow-item.ant-select-selection-overflow-item-suffix {
    display: none;
  }
  
  .ant-select-selection-overflow-item:not(:nth-last-child(-n+2)) {
    .ant-select-selection-item-content::after {
      content: ' ,';
    }
  }

  .ant-select-selector .ant-select-selection-item {
    background-color: white;
    border: none;
  }
  
  .ant-select-selector .ant-select-selection-item-remove {
    display: none;
  }
  
  .ant-select-selector .ant-select-selection-item-content {
    margin-right: 0;
  }
  
  .ant-select-selector .ant-select-item-option-selected {
    background-color: white;
  }
  
  .ant-select-selector .ant-select-item-option-state {
    display: none;
  }
`;
