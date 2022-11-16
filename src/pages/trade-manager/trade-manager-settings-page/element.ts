import Button from 'antd/es/button';
import styled from 'styled-components';
import { Skeleton } from 'components/skeleton';
import { Delete } from 'components/icons/system/delete';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';
import { HeaderContainer } from 'components/layout/headers/header-container';

export const TradeSettingsContainer = styled.div`
`;

export const TimeSlotHeaderContainer = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;

  h3 {
    display: inline-flex;
    gap: 8px;
    align-items: center;
  }
`;

export const ActionButton = styled(Button).attrs({ type: 'text', size: 'large' })`
  &.ant-btn.ant-btn-lg {
    height: 32px;
    padding: 0;
  }

  svg {
    height: 24px;
    width: 24px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    svg {
      height: 16px;
      width: 16px;
    }

    &.ant-btn.ant-btn-lg {
      height: 28px;
      padding: 0;
    }
  }
`;

export const TimeSlotSkeleton = styled(Skeleton).attrs({ $height: '28px', $width: '90px' })`
  width: 90px;
  height: 28px;
  margin: 0 16px;
`;

export const DeleteModalIcon = styled(Delete)`
  height: 24px;
  vertical-align: bottom;
  margin-right: 8px;
  fill: red;
`;

export const TradeSettingsFormBody = styled.div`
  .trade-rounds-errors {
    margin-bottom: 16px;
  }
`;
