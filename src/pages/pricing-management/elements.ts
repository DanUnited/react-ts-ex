import styled from 'styled-components';

import { InlinePlate } from 'components/layout/plate';
import { EXTRA_LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

export const PagePlate = styled(InlinePlate)`
  padding: 24px 32px 32px 32px;
  width: 100%;
  min-height: 820px;
`;

export const HeaderMargin = styled.div`
  margin-top: 16px;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 20px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ActionContainer = styled.div`
  display: inline-flex;
  align-items: center;
  text-align: right;
  margin-right: 16px;
  gap: 16px;

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    width: 120px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-right: 8px;
  }
`;

export const RateBlockContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
`;

export const StyledButton = styled.div`
  button {
    &.ant-btn.ant-btn-default {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
      height: 40px;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &.ant-btn.ant-btn-default:first-child {
      border-bottom-left-radius: 12px;
      border-top-left-radius: 12px;
      padding: 0 16px;
    }

    &.ant-btn.ant-btn-default:last-child {
      border-bottom-right-radius: 12px;
      border-top-right-radius: 12px;
    }

    &.ant-btn:not(:first-child) {
      margin-top: 0;
    }

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      &.ant-btn.ant-btn-default {
        font-size: 12px;
        height: 24px;

        svg {
          height: 12px;
          width: 12px;
        }
      }

      &.ant-btn.ant-btn-default:first-child {
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
        padding: 6px 12px;
      }

      &.ant-btn.ant-btn-default:last-child {
        border-bottom-right-radius: 6px;
        border-top-right-radius: 6px;
      }
    }
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

interface IDeleteIcon {
  $disabled?: boolean;
}

export const DeleteIcon = styled.div<IDeleteIcon>`
  display: flex;
  align-items: center;
  margin-right: 8px;

  svg {
    fill: ${({ theme, $disabled }) => $disabled ? theme.colors.disabledText : 'red'};
  }
`;

export const DropdownButton = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 12px;
    padding: 4px 14px;
    border-radius: 6px;
    line-height: 1.3;
  }
`;
