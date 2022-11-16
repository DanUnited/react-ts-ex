import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const CalendarCell = styled.div`
  margin: 4px;
  display: flex;
  height: 112px;
  border-radius: 4px;
  padding: 4px 8px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.darkGrey};
  background-color: ${({ theme }) => theme.colors.white};
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;

  &.outDate {
    color: ${({ theme }) => theme.colors.grey};
  }
  
  &.currentDay {
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  
  >.popover-event-container {
    position: absolute;
    width: 95%;
    height: 90%;
    z-index: 1;
  }

  .popover-event-container {
    .ant-popover-inner {
      background-color: white;
      padding: 0;
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    height: 72px;
    padding: 4px;
  }
`;

export const CalendarEventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  overflow-y: auto;
  flex: 1;
  gap: 4px;
`;

export const CalendarWeatherContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    img {
      width: 22px;
      height: 22px;
    }
  }
`;

export const CalendarWeatherTemperature = styled.div`
  font-size: 18px;
  display: inline-flex;
  align-items: center;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const TopCellContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 4px;
  width: 100%;
`;
