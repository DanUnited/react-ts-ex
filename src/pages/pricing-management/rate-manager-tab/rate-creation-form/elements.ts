import styled from 'styled-components';
import Col from 'antd/es/col';
import Space from 'antd/es/space';
import Layout from 'antd/es/layout';
import AntButton from 'antd/es/button';
import { Plate } from 'components/layout/plate';
import { EXTRA_LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

import type { FC } from 'react';
import type { ButtonProps } from 'antd/es';

export const RateFormContainer = styled(Layout)`
  display: flex;
  flex-direction: row;
  flex: 1;

  .ant-row {
    width: 100%;
  }
`;

export const FormCol = styled(Col)`
  display: block;
  min-width: 400px;
  max-width: 468px;

  &:not(:last-child) {
    padding-right: 32px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    min-width: 280px;

    &:not(:last-child) {
      padding-right: 24px;
    }
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    min-width: 320px;
  }
`;

export const FormBigCol = styled(FormCol)`
  flex: 1 1 66.66666666%;
  max-width: none;
`;

export const FormPlate = styled(Plate)`
  padding: 32px;
  height: 100%;

  h3 {
    margin-bottom: 24px;
  }
`;

export const ActionsSpace = styled(Space)`
  margin-right: 32px;
`;

export const Button: FC<ButtonProps> = styled(AntButton).attrs(() => ({ type: 'primary' }))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &.ant-btn-primary {
    padding: 8px 32px;
    border-radius: 12px;
  }

  &.ant-btn-lg {
    height: 48px;
  }

  svg {
    margin-left: 8px;
    vertical-align: baseline;
    position: relative;
    top: 1px;
  }
`;

export const AvailableDaysTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 1.5;
  margin: 24px 0 16px 0;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 18px;
    margin: 16px 0 8px 0;
  }
`;
