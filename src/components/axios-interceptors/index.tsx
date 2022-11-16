import React, { useEffect } from 'react';
import moment from 'moment';
import some from 'lodash/some';
import { useMutation } from 'react-query';
import { push } from 'connected-react-router';

import { getCookie } from 'utils/cookie';
import { useAppDispatch } from 'utils/hooks';
import axiosInstance from 'modules/api-client/request';
import { PathCreator, RoutePaths } from 'routing/constants';
import { setAuthCookies } from 'pages/auth/set-auth-cookies';
import { refreshTokenRequest } from 'modules/api-requests/auth';

import type { AxiosError, AxiosRequestConfig } from 'axios';

export const AxiosInterceptors = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation('refreshToken', refreshTokenRequest, {
    onSuccess: data => {
      setAuthCookies(data);
    },
    onError: () => {
      dispatch(push(PathCreator[RoutePaths.AUTH_LOGOUT].getUrl()));
    },
  });

  // check token time every request
  useEffect(() => {
    axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const expiredCookie = getCookie('ExpiresIn');
        const refreshTokenCookie = getCookie('RefreshToken');

        if (expiredCookie && refreshTokenCookie && config.url !== '/customers/signin') {
          const expired = moment(expiredCookie);

          if (moment().utc().diff(expired) > 0) {
            const refreshData = await mutateAsync({ refreshToken: refreshTokenCookie });
            const { TokenType, IdToken, AccessToken } = refreshData;

            config.headers = {
              ...config.headers,
              Authorization: `${TokenType} ${IdToken}`,
            };

            if (some(['/customers/change-password', '/customers/update-attributes'],
              compareURL => config.url && config.url?.indexOf(compareURL) >= 0)) {
              config.headers.Authorization = `${TokenType} ${AccessToken}`;
            }
          }
        }

        return config;
      }
    );

    axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if ((typeof error.response === 'undefined') && !error.message) {
          return Promise.reject({ message: 'CORS Error' });
        }

        if (
          error.response?.status === 401 ||
          error.response?.data?.message === 'Access Token has expired' ||
          error.response?.data?.message === 'Invalid Access Token' ||
          error.response?.data?.message === 'Invalid Refresh Token'
        ) {
          dispatch(push(PathCreator[RoutePaths.AUTH_LOGOUT].getUrl()));
        }

        return Promise.reject(error);
      }
    )
  }, [dispatch, mutateAsync]);

  return <React.Fragment />;
};
