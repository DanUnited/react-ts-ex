import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface IExtraMargin {
  $margin?: boolean;
}

export const HeaderContainer = styled.div<IExtraMargin>`
  margin-bottom: ${({ $margin }) => $margin ? '36px' : '16px'};
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const StyledHeader = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  margin-bottom: 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 16px;
  }
`;

export const DividerContainer = styled.div`
  .ant-divider-horizontal.ant-divider-with-text-left {
    &::before {
      display: none;
    }

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      margin: 8px 0;
    }
  }

  .ant-divider-inner-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    padding-left: 0;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      font-size: 16px;
    }
  }
`;
