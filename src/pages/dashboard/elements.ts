import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface IElementMargin {
  extraMargin?: string;
}

interface ITitle extends IElementMargin {
  isSmall?: boolean;
}

export const StatsContainer = styled.div`
  padding: 16px 24px 24px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: -2px 2px 2px rgba(209, 219, 231, 0.6);
  border-radius: 8px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 12px 16px 16px 16px;
    border-radius: 6px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  grid-gap: 32px 28px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    grid-gap: 24px 16px;
  }
`;

export const InfoContainer = styled.div<IElementMargin>`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.extraMargin || '0'};
`;

export const CircleParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div<ITitle>`
  line-height: 1.5;
  font-size: ${(props) => props.isSmall ? '18px' : '24px'};
  margin-top: ${(props) => props.extraMargin};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: ${(props) => props.isSmall ? '12px' : '16px'};
  }
`;

export const NumbersBlock = styled.div<IElementMargin>`
  font-weight: 600;
  font-size: 48px;
  line-height: 1.2;
  gap: 16px;
  display: flex;
  align-items: center;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 32px;
  }
`;

export const NumbersBlock2 = styled.div<IElementMargin>`
  font-weight: 600;
  font-size: 32px;
  line-height: 1.2;
  margin-top: ${(props) => props.extraMargin};
  gap: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f2f5;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 24px;
  }
`;

export const NumberBlock3 = styled.div<IElementMargin>`
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  margin-top: ${(props) => props.extraMargin};
  gap: 8px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGrey};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const Text = styled.span`
  font-size: 14px;
  line-height: 1.1;
  font-weight: 400;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
  }
`;

export const CalendarText = styled.div`
  display: inline-flex;
  font-size: 14px;
  line-height: 1.1;
  gap: 4px;
  flex-direction: column;
  width: 130px;
  align-items: center;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
  }
  
  span {
    display: inline-flex;
    gap: 4px;
  }
`;

export const CalendarTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const UtilizationWrapper = styled.div<IElementMargin>`
  height: 64px;
  margin-top: ${(props) => props.extraMargin};
  display: flex;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    height: 48px;
  }
`;

export const CalendarContainer = styled.div`
  margin: auto 0;
  margin-left: 16px;
`;

export const TodayWrapper = styled.div`
  text-align: center;
`;

export const RevenueItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 280px;
`;

export const RevenueItem = styled.div`
  width: 100%;
  display: inline-flex;
  flex: 1 0 100%;
  flex-direction: column;
`;
