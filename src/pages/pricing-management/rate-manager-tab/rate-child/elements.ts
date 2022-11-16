import styled from 'styled-components';
import Layout from 'antd/es/layout';

import { PageLayout } from 'components/layout/page-layout';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const PageContainer = styled(Layout)`
  width: 900px;
  padding: 32px;
  box-shadow: 0 8px 16px rgba(104, 113, 123, 0.07);
  border-radius: 24px;
  
  &.ant-layout {
    background: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    border-radius: 16px;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 24px;
`;

export const ParentRate = styled.div`
  padding: 8px 12px 12px 12px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 12px;
  margin-bottom: 16px;
  
  .ant-row.ant-form-item {
    margin-bottom: 0;
  }
`;

export const ButtonMargin = styled.div`
  margin-left: 16px;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const ChildRatePageLayout = styled(PageLayout)`
  max-width: 900px;
`;
