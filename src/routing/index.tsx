import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { PathCreator, RoutePaths } from './constants';
import { lazyWithRetry } from 'utils/lazy-with-reload';
import { GlobalSuspense } from 'components/suspense/global-suspense';

const LoginPage = lazyWithRetry(() => import('pages/auth/login-page'));
const AdminRoutes = lazyWithRetry(() => import('routing/admin-routes'));
const LogoutPage = lazyWithRetry(() => import('pages/auth/logout-page'));
const ChangePasswordPage = lazyWithRetry(() => import('pages/auth/change-password-page'));
const RecoveryPasswordPage = lazyWithRetry(() => import('pages/auth/password-recovery-page'));

export const Routing = () => (
  <Suspense fallback={<GlobalSuspense />}>
    <Switch>
      <Route path={PathCreator[RoutePaths.AUTH_LOGIN].path} component={LoginPage} exact />
      <Route path={PathCreator[RoutePaths.AUTH_LOGOUT].path} component={LogoutPage} exact />
      <Route path={PathCreator[RoutePaths.AUTH_CHANGE_PASSWORD].path} component={ChangePasswordPage} exact />
      <Route path={PathCreator[RoutePaths.AUTH_RECOVERY_PASSWORD].path} component={RecoveryPasswordPage} exact />
      <Route path={PathCreator[RoutePaths.DASHBOARD].path} component={AdminRoutes} />
    </Switch>
  </Suspense>
);
