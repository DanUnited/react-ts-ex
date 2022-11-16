import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const EventContainer = styled.div`
  margin: 8px 12px;
  width: 282px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px
`;

export const NarrowButton = styled.div`
  width: 88px;
`;

export const WideButton = styled.div`
  width: 170px;
`;

export const RadioWrapper = styled.div`
  margin-top: 8px;
`;

export const CalendarCellDay = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.3;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 16px;
  }
`;
