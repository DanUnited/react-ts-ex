import { Input } from 'antd';
import styled from 'styled-components';
import { SMALL_VIEWPORT } from 'modules/theme/config';

export const TableFiltersContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  
  @media (max-width: ${SMALL_VIEWPORT}px) {
    .ant-row {
      flex-direction: column;
    }
  }
`;

export const StyledInput = styled(Input)`
  max-width: 308px;
  
  &.ant-input {
    min-width: 208px;
    height: 40px;
  }
`;

export const AdditionalFilters = styled.div`
  margin-left: 24px;
`;
