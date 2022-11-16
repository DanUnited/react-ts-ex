import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { Route, Redirect } from 'react-router';
import notification from 'antd/es/notification';

import { getCookie } from 'utils/cookie';
import { PathCreator, RoutePaths } from '../constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { useCourseList } from 'modules/api-requests/courses/queries';
import { GlobalSuspense } from 'components/suspense/global-suspense';
import { useCurrentProfile } from 'modules/api-requests/auth/queries';
import { getProfileName, getProfileRoles, getProfileState } from 'models/profile/selectors';

import type { RouteProps } from 'react-router';
import type { SystemRolesType } from 'models/profile/types';

interface IPermissionRouteProps extends RouteProps {
  permissions?: SystemRolesType[];
  auth?: boolean;
}

export const PermissionRoute: React.FC<IPermissionRouteProps> = (
  {
    permissions,
    auth = true,
    ...routeProps
  }: IPermissionRouteProps,
) => {
  const profileName = useAppSelector(getProfileName);
  const currentUser = useAppSelector(getProfileState);
  const profileRoles = useAppSelector(getProfileRoles);
  const correctAuth = auth && currentUser.sub;
  const correctPermission = permissions
    ? permissions?.some(requiredPermission => profileRoles.includes(requiredPermission))
    : true;

  const dispatch = useAppDispatch();
  const refreshToken = getCookie('RefreshToken');

  const { data: profile, isFetching, refetch } = useCurrentProfile({
    enabled: !profileName && Boolean(refreshToken),
    onSuccess: () => {
      refetchCourses();
    },
  });

  const { refetch: refetchCourses } = useCourseList({
    enabled: Boolean(profile || currentUser),
    onError: () => {
      dispatch(push(PathCreator[RoutePaths.AUTH_LOGOUT].getUrl()));
      notification.error({ message: 'Current session is expired.' });
    },
  });

  useEffect(() => {
    if (!profileName && Boolean(refreshToken)) {
      refetch();
    }
  }, [profileName, refreshToken, refetch]);

  useEffect(() => {
    if (!correctPermission && profileName) {
      notification.warn({
        message: 'You are not authorized or there is no access!',
        placement: 'topRight',
      });
    }
  }, [correctPermission, profileName]);

  const Component = (!(auth || permissions) ||
    (correctPermission && !auth) ||
    (correctAuth && !permissions) ||
    (correctAuth && correctPermission))
    ? <Route {...routeProps} />
    : (isFetching || (!profileName && Boolean(refreshToken)))
      ? <GlobalSuspense />
      : <Redirect to={PathCreator[RoutePaths.DASHBOARD].path} />;

  return <>{Component}</>;
};
