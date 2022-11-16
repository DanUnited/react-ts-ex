import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface ISelected {
  $selected?: boolean;
}

export const PeriodContainer = styled.div<ISelected>`
  display: flex;
  cursor: pointer;
  user-select: none;
  justify-content: space-between;
  background-color: ${({ $selected, theme }) => $selected ? theme.colors.primary : theme.colors.white};
  border: 1px solid ${({ $selected, theme }) => $selected ? theme.colors.primary : theme.colors.grey};
  border-radius: 8px;
  padding: 11px 16px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 8px 12px;
  }
`;

export const Name = styled.div<ISelected>`
  font-size: 16px;
  line-height: 1.5;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ $selected, theme }) => $selected ? theme.colors.white : theme.colors.mako};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const Date = styled(Name)<ISelected>`
  color: ${({ $selected, theme }) => $selected ? theme.colors.white : theme.colors.darkGrey};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.div<ISelected>`
  display: flex;
  margin-right: 8px;
  
  svg {
    fill: ${({ theme, $selected }) => $selected ? theme.colors.white : theme.colors.darkGrey};

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 12px;
      width: 12px;
    }
  }
`;

export const CloseIcon = styled.div`
  margin: auto 0;
  cursor: pointer;
  display: flex;

  svg {
    fill: ${({ theme }) => theme.colors.darkGrey};
  }
`;

export const EditIcon = styled.div`
  margin: auto 0;
  cursor: pointer;
  display: flex;
  margin-right: 8px;

  svg {
    fill: ${({ theme }) => theme.colors.darkGrey};
  }
`;

export const VectorIcon = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    svg {
      height: 12px;
      width: 12px;
    }
  }
`;

export const TimePeriodBlockContainer = styled.div`
  .period-container {
    margin-bottom: 16px;
  }

  .ant-divider-horizontal.ant-divider-with-text {
    margin: 0 0 16px 0;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    .period-container {
      margin-bottom: 8px;
    }

    .ant-divider-horizontal.ant-divider-with-text {
      margin: 0 0 8px 0;
    }
  }
`;

export const PeriodControl = styled.div`
  display: flex;
`
