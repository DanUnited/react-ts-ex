import styled from 'styled-components';
import Table from 'components/table/resizeble-table';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const WideTable = styled(Table)`
  .ant-spin-blur {
    overflow: visible;
  }

  .ant-table {
    margin: 0 -32px;
    position: relative;
    z-index: 10;

    table {
      border-radius: 0;

      .ant-table-tbody {
        > tr:last-child, tr:first-child {
          > td:first-child {
            border-bottom-left-radius: 0;
          }

          > td:last-child {
            border-bottom-right-radius: 0;
          }
        }
      }
    }

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      margin: 0 -16px;
    }
  }
`;
