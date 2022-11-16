import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface IEditable {
  $isEdit: boolean;
}

interface IIcon {
  $isEdit?: boolean;
  $backgroundless?: boolean;
}

export const CardContainer = styled.div`
  margin-bottom: 16px;
`;

export const CardWrapper = styled.div<IEditable>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${({ $isEdit, theme }) => $isEdit ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${({ $isEdit, theme }) => $isEdit ? theme.colors.primary : theme.colors.grey};
  border-radius: 8px;
  user-select: none;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 8px 12px;
  }
`;

export const Name = styled.div<IEditable>`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.4;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ $isEdit, theme }) => $isEdit ? theme.colors.white : theme.colors.mako};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const Date = styled.div<IEditable>`
  margin-left: 8px;
  font-size: 16px;
  line-height: 1.5;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ $isEdit, theme }) => $isEdit ? theme.colors.white : theme.colors.darkGrey};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
  }
`;

export const Icon = styled.div<IIcon>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ $isEdit, theme }) => $isEdit ? theme.colors.white : 'inherit'};
  
  svg {
    fill: ${({ $isEdit, $backgroundless, theme }) => $isEdit ? theme.colors.primary : $backgroundless ? theme.colors.white : theme.colors.darkGrey};
  }

  .ant-spin-spinning {
    display: inline-flex;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 16px;
    height: 16px;

    svg {
      height: 12px;
      width: 12px;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const DateContainer = styled.div<IEditable>`
  display: flex;
  align-items: center;
  text-align: center;
  
  svg {
    fill: ${({ $isEdit, theme }) => $isEdit ? theme.colors.white : theme.colors.darkGrey};
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    svg {
      height: 12px;
      width: 12px;
    }
  }
`;
