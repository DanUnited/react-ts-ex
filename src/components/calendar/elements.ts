import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

interface IDayBlock {
  $size: 'large' | 'medium'
  $active?: boolean;
}

export const CalendarContainer = styled.div`
  display: flex;
  @media (max-width: ${MOBILE_VIEWPORT}px) {
    margin-top: 16px;
  }
  
  .ant-row {
    width: 44px;
  }
  
  .ant-form-large .ant-form-item-control-input {
    min-height: 32px;
  }
  
  .ant-row.ant-form-item {
    margin-bottom: 0;
  }
`;

export const DayBlock = styled.div<IDayBlock>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: ${({ $size }) => $size === 'large' ? '40px' : '32px'};
  width: ${({ $size }) => $size === 'large' ? '40px' : '32px'};
  margin-right: 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  background-color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.mediumDarkGrey};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  user-select: none;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 10px;
    margin-right: 6px;
    height: ${({ $size }) => $size === 'large' ? '32px' : '20px'};
    width: ${({ $size }) => $size === 'large' ? '32px' : '20px'};
  }
`;
