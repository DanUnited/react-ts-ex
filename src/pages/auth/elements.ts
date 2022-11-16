import Col from 'antd/es/col';
import styled from 'styled-components';

import { Text18 } from 'components/layout/text';
import { Plate } from 'components/layout/plate';
import { PrimaryButton } from 'components/layout/button';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const AuthFormCol  = styled(Col)`
 &.ant-col {
  display: flex;
  padding: 20vh 0 72px 0;
  min-height: 100vh;
  width: 100%;
 }
`;

export const AuthFormContainer = styled.div`
  margin: 0 auto;

  .ant-input-affix-wrapper {
    border-color: ${({ theme }) => theme.colors.grey};
  }

  .ant-input-affix-wrapper > input.ant-input {
    border-radius: 0;
  }

  .ant-input-prefix {
    margin-right: 8px;
  }
`;

export const AuthTitle = styled.div`
  font-size: 36px;
  line-height: 48px;
  margin-bottom: 24px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 28px;
    line-height: 40px;
  }
`;

export const AuthDescriptionText = styled(Text18)`
  text-align: center;
  margin-bottom: 16px;
`;

export const AuthPlate = styled(Plate)`
  width: 464px;
  position: relative;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 368px;
    padding: 24px;

    .ant-row.ant-form-item {
      margin-bottom: 16px;
    }
  }
`;

export const WGMLogo = styled.div`
  background: url(/images/wgm-logo.png) no-repeat;
  width: 130px;
  height: 123px;
  position: absolute;
  top: -102px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  background-size: contain;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 100px;
    height: 96px;
    top: -78px;
  }
`;

export const SubmitButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: 8px;

  &.ant-btn-primary {
    border-radius: 12px;
    height: 32px;

    .ant-btn-lg {
      height: 40px;
    }
  }
`;
