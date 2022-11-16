import Button from 'antd/lib/button';
import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

import type { ReactNode, FC } from 'react';
import type { ButtonProps } from 'antd/es/button';

interface IPrimaryButton extends ButtonProps {
  children: ReactNode;
}

export const PrimaryButton: FC<IPrimaryButton> = styled(Button).attrs(() => ({ type: 'primary' }))`
  &.ant-btn-primary,
  &.ant-btn-default {
    font-weight: 500;
    border-radius: 12px;
    height: ${({ size }) => size === 'small' ? 40 : 48 }px;
    padding: ${({ size }) => size === 'small' ? '8px 16px' : '12px 24px' };
    font-size: ${({ size }) => size === 'small' ? 14 : 16 }px;
    svg + span {
      margin-left: 8px;
      line-height: 1.5;
      vertical-align: text-bottom;
    }

    &[disabled],
    &[disabled]:hover,
    &[disabled]:focus {
      border-color: transparent;
      color: ${({ theme }) => theme.colors.disabledText};
      
      svg {
        fill: ${({ theme }) => theme.colors.disabledText};
      }
    }

    &.w-100 {
      width: 100%;
    }

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: ${({ size }) => size === 'small' ? 24 : 32 }px;
      font-size: ${({ size }) => size === 'small' ? 12 : 14 }px;
      padding: ${({ size }) => size === 'small' ? '4px 16px' : '8px 16px' };
      border-radius: 8px;

      &.ant-btn-sm {
        height: 24px;
        padding: 6px 12px;
        line-height: 1.5;

        svg {
          height: 12px;
        }
      }
    }

    @media (max-width: ${MOBILE_VIEWPORT}px){
      width: 100%;
    }
  }
`;

export const TransparentButton = styled(PrimaryButton).attrs(() => ({ type: 'default' }))<any>`
  &.ant-btn {
    box-shadow: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DefaultButton = styled(PrimaryButton).attrs(() => ({ type: 'default' }))<any>`
  &.ant-btn-default {
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.base};
  }
`;

// TODO: delete GreyButton with old background-color
export const GreyButton = styled(PrimaryButton).attrs(() => ({ type: 'default' }))<any>`
  &.ant-btn-default {
    font-weight: 600;
    border-color: transparent;
    color: ${({ theme }) => theme.colors.white};
    background-color: #C0D4E3; 
  }
`;

export const SecondaryButton = styled(Button)`
  &.ant-btn-primary {
    border-color: ${({ theme }) => theme.colors.mediumDarkGrey};
    background-color: ${({ theme }) => theme.colors.mediumDarkGrey};
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkGrey};
      background-color: ${({ theme }) => theme.colors.darkGrey};
    }
    &[disabled] svg {
      fill: ${({ theme }) => theme.colors.disabledText};
    }
  }
`;
