import React from 'react';
import { LeftMenu } from 'components/layout/left-menu';
import { ContentLayout, LayoutWrapper, Content, VersionContainer } from './elements';

interface IGlobalLayout {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: IGlobalLayout) => {
  const appVersion = process.env.REACT_APP_VERSION ?? 0;

  return (
    <LayoutWrapper>
      <LeftMenu />
      <ContentLayout>
        <Content>
          {children}
        </Content>
      </ContentLayout>
      <VersionContainer>Version: 1.0.{appVersion}</VersionContainer>
    </LayoutWrapper>
  );
}
