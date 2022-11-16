import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const ArrowsWrapper = styled.div`
  display: flex;
  
  svg {
    height: 20px;
    width: 9px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 12px;
      width: 6px;
    }
  }
`;

export const RightArrow = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  border-radius: 12px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 24px;
    height: 24px;
    border-radius: 8px;
  }
`;

export const LeftArrow = styled(RightArrow)`
  margin-right: 16px;

  svg {
    transform: rotate(180deg);
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-right: 8px;
  }
`;

export const DateContainer = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 18px;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 24px 0;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 8px 0 16px 0;
  }
`;
