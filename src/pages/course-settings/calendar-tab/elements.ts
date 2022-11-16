import styled  from 'styled-components';
import { Calendar } from 'antd';

export const StyledCalendar = styled(Calendar)`
  &.ant-picker-body {
    outline: none;
  }

  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-body th {
    height: 48px;
    padding: 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryWhite}
  }
  
  &.ant-picker-calendar .ant-picker-panel .ant-picker-date-panel {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 16px;
  }

  &.ant-picker-calendar-full {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 16px;
  }
  
  &.ant-picker-date-panel {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
  
  &.ant-picker-calendar .ant-picker-panel .ant-picker-body {
    padding: 8px 16px 16px 16px;
  }
  
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
    height: 112px;
    background-color: ${({ theme }) => theme.colors.white};
  }
  
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
    display: flex;
    justify-content: space-between;
    border-top: 8px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 16px 16px 16px 20px;
  }
  
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
    display: flex;
    justify-content: space-between;
    border-top: 8px solid ${({ theme }) => theme.colors.lightGrey};
  }
  
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-value {
    color: ${({ theme }) => theme.colors.darkGrey};
    text-align: left;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  }
  
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected  .ant-picker-calendar-date-value {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    color: red;
  }
  
  .ant-picker-cell-selected {
    z-index: 2;
  }
`;
