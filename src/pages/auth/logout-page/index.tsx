import React, { useEffect } from 'react';
import { push } from 'connected-react-router';

import { deleteCookie } from 'utils/cookie';
import { useAppDispatch } from 'utils/hooks';
import { profileActions } from 'models/profile';
import { PathCreator, RoutePaths } from 'routing/constants';

export const LogoutPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    deleteCookie('ExpiresIn');
    deleteCookie('AccessToken');
    deleteCookie('RefreshToken');
    deleteCookie('IdToken');

    dispatch(profileActions.resetFields());
    dispatch(push(PathCreator[RoutePaths.AUTH_LOGIN].getUrl()));
  }, [dispatch]);

  return <></>
};

export default LogoutPage;
