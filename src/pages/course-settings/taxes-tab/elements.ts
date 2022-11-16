import styled from 'styled-components';
import Button from 'antd/es/button';
import Table from 'antd/es/table';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface ITitleContainer {
  $flexAlign: 'start' | 'end' | 'center',
}

export const TitleContainer = styled.div<ITitleContainer>`
  display: flex;
  align-items: center;
  justify-content: ${({ $flexAlign }) => $flexAlign};
  
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Container = styled.div`
  margin-left: 48px;
`;

export const Title = styled.span`
  display: inline-flex;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: 'liga' off;
`;

export const InputLabel = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #68717B;
  margin: 8px 0 16px 0;
`;

export const CircleIcon = styled.span`
  height: 32px;
  width: 32px;
  margin-right: 16px;
  background: rgba(56, 165, 255, 0.3);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div`
  margin-left: 8px;
  cursor: pointer;
  
  svg {
    fill: ${({ theme }) => theme.colors.darkGrey}
  }
`;

export const DividerContainer = styled.div`
  .ant-divider-inner-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  }
  
  .ant-divider-horizontal.ant-divider-with-text::after {
    border-top: 1px solid ${({ theme }) => theme.colors.grey};
  }

  .ant-divider-horizontal.ant-divider-with-text-left::before {
    display: none;
  }
  
  .ant-divider-inner-text {
    padding-left: 0;
  }
`;

export const FeeSwitcherTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.5;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 18px;
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 16px;
  
  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
    font-feature-settings: 'pnum' on, 'lnum' on;
  }
  
  &.ant-btn-default {
    span {
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-left: 8px;

    span {
      font-size: 16px;
    }
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-tbody > tr > td {
    vertical-align: baseline;
  }
`;

export const FeesTable = styled(StyledTable)`
  .ant-table-cell {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
