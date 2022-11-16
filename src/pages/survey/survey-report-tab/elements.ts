import Form from 'antd/es/form';
import styled from 'styled-components';

export const SelectReportForm: typeof Form = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  .ant-select-selector {
    min-width: 140px;
  }
`;
