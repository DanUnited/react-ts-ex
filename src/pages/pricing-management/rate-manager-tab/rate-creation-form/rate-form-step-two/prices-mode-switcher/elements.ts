import styled from 'styled-components';
import Group from 'antd/es/radio/group';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const PricesRadioGroup = styled(Group)`
    border-radius: 16px;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    margin: 16px 0;

    .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
      border-radius: 12px;
    }

    .ant-radio-button-wrapper {
      border: 0;
      font-weight: 500;

      &:last-child, &:first-child {
        border: 0;
        border-radius: 12px;
        margin-right: 4px;
      }

      &:not(:first-child)::before {
        background-color: transparent;
      }
      
      &:not([class*='ant-radio-button-wrapper-checked']){
        background-color: transparent;
        color: ${({ theme }) => theme.colors.darkGrey};
      }
    }

    .ant-radio-button + span {
      padding: 8px 16px;
    }

    &.ant-radio-group-large .ant-radio-button-wrapper {
      height: 44px;
      line-height: 44px;
    }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    .ant-radio-button-wrapper {
      &:last-child, &:first-child {
        border-radius: 8px;
      }
    }

    .ant-radio-button + span {
      padding: 4px 8px;
    }

    &.ant-radio-group-large .ant-radio-button-wrapper {
      height: 32px;
      line-height: 32px;
    }
  }
`;
