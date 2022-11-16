import { Col } from 'antd';
import styled from 'styled-components';
import { SMALL_VIEWPORT } from 'modules/theme/config';

export const TableFiltersContainer = styled.div`
  margin-bottom: 24px;
  @media (max-width: ${SMALL_VIEWPORT}px) {
    .ant-row {
      flex-direction: column;
    }
  }
`;

export const FiltersCol = styled(Col)`
  flex: 0 0 240px;
  @media (max-width: ${SMALL_VIEWPORT}px) {
    flex: 1;
  }
`;
