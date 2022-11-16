import React, { useMemo } from 'react';
import Row from 'antd/es/row';
import Layout from 'antd/es/layout';
import ConfigProvider from 'antd/es/config-provider';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import {
  AuthFormCol,
  AuthFormContainer,
} from '../elements';

import type { HTMLProps, ReactNode } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

interface IAuthWrapper extends Omit<HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as'> {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: IAuthWrapper) => {
  const breakpoints = useBreakpoint();
  const formSize: SizeType = useMemo(() => breakpoints.xxl ? 'large' : 'middle', [breakpoints.xxl]);

  return (
    <ConfigProvider componentSize={formSize}>
      <Layout>
        <Row>
          <AuthFormCol>
            <AuthFormContainer>
              {children}
            </AuthFormContainer>
          </AuthFormCol>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
