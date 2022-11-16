import styled from 'styled-components';
import Tabs from 'antd/es/tabs';
import { Header4 } from 'components/layout/headers';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

import type { TabsProps } from 'antd/es/tabs'

export const WeatherTab = styled(Tabs)<TabsProps>`
  .ant-tabs-tab {
    border-radius: 12px;
    padding: 0;

    &.ant-tabs-tab-active {
      background-color: #F0F4FB;
    }
  }

  .ant-tabs-tab-btn {
    border-radius: 12px;
    padding: 12px 20px;
    text-align: center;
    min-width: 120px;
  }

  &.ant-tabs-top > .ant-tabs-nav::before {
    border: 0;
  }

  &.ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar {
    height: 0;
  }
  
  .ant-tabs-extra-content {
    padding: 0 24px;
    position: relative;
    
    .ant-picker {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      padding: 0;
      border: 0;
      width: 236px;

      * {
        height: 0;
        margin: 0;
        padding: 0;
      }
    }
  }
  
  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    .ant-tabs-tab-btn {
      min-width: 100px;
      padding: 8px;
    }
  }
`;

export const TabPane = styled(WeatherTab.TabPane)`
`;

export const WeatherDetails = styled.span`
  display: flex;
  align-items: baseline;
  justify-content: center;

  svg {
    margin: 0 4px 0 16px;
    align-self: center;
    position: relative;
    top: -4px;
  }
  
  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    svg {
      width: 16px;
      height: 16px;
      margin: 0 4px;
    }
  }
`;

export const WeekSelectorContainer = styled.div`
  svg {
    cursor: pointer;
    height: 100%;
    width: 48px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      width: 32px;
    }
  }  
`;

export const CalendarDay = styled(Header4)`
  text-align: center;
`;
