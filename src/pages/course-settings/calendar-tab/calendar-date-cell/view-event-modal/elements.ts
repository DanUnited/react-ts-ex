import styled from 'styled-components';
import Tooltip from 'antd/es/tooltip';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const Container = styled.div`
  position: relative;
  z-index: 2;
  margin: 8px 12px;
  width: 282px;
`;

export const NarrowButton = styled.div`
  width: 96px;
`;

export const WideButton = styled.div`
  width: 170px
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const Label = styled.div`
  margin-top: 4px;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const TitleContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeleteLink = styled.div`
  font-size: 14px;
  line-height: 24px;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
`;

export const Event = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(56, 165, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 20px;
    height: 20px;
  }
`;

export const CloseEvent = styled(Event)`
  background: rgba(255, 105, 96, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.red};
`;

export const StyledTooltip = styled(Tooltip)`
  position: relative;
  z-index: 2;
`;
