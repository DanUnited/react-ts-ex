import Layout from 'antd/es/layout';
import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

export const LayoutWrapper = styled(Layout)`
  &.ant-layout {
    position: relative;
    padding: 24px;
    min-height: 100vh;

    .ant-layout-sider {
      background: transparent;
    }
  }
`;

export const ContentLayout = styled(Layout)`
  padding-left: 40px;
  margin-bottom: 96px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding-left: 32px;
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    padding-left: 0;
  }
`;

export const Content = styled(Layout.Content)`
  flex-direction: column;
  min-height: 0;
  display: flex;
  align-items: stretch;
  height: 100%;
`;

export const VersionContainer = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;
