import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const HeadBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 150px;

  h3 {
    margin-right: 8px;
  }
`;

export const CurrentDay = styled.div`
  font-weight: 500;
  font-size: 64px;
  line-height: 1;
  margin-top: 24px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 48px;
  }
`;

export const WeatherBlock = styled.div`
  font-size: 36px;
  line-height: 1.3;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 24px;
  }
`;

export const TemperatureBlock = styled.div`;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 8px 0;
  
  img {
    height: 56px;
    width: 56px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin: 12px 0 6px 0;
  }
`;
