import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface IEditable {
  $selected?: boolean;
}

export const CardWrapper = styled.div<IEditable>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${({ $selected, theme }) => $selected ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${({ $selected, theme }) => $selected ? theme.colors.primary : theme.colors.grey};
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  margin-bottom: 16px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-bottom: 8px;
    padding: 8px 12px;
  }
`;

export const DateContainer = styled.div<IEditable>`
  display: flex;
  align-items: center;
  text-align: center;
  
  svg {
    fill: ${({ $selected, theme }) => $selected ? theme.colors.white : theme.colors.darkGrey};

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 12px;
      width: 12px;
    }
  }
`;

export const Name = styled.div<IEditable>`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ $selected, theme }) => $selected ? theme.colors.white : theme.colors.mako};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const Date = styled.div<IEditable>`
  margin-left: 8px;
  font-size: 16px;
  line-height: 1.5;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ $selected, theme }) => $selected ? theme.colors.white : theme.colors.darkGrey};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
  }
`;

export const CheckContainer = styled.div`
  svg {
    height: 24px;
    width: 24px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 12px;
      width: 12px;
    }
  }
`;
