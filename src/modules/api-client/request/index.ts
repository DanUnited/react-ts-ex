import axios from 'axios';
import { some } from 'lodash';
import { makeResponse } from '../response';
import { getCookie } from 'utils/cookie';

import type { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RequestOptions } from '@octokit/types/dist-types/RequestOptions';

export const serverHost = process.env.REACT_APP_SERVER_HOST;

const axiosInstance = axios.create({
  baseURL: serverHost,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  },
  withCredentials: false,
});

axiosInstance.interceptors.response.use(makeResponse, error => {
  if (typeof error.response === 'undefined') {
    return Promise.reject({ message: 'CORS Error' });
  } else {
    const { data } = error.response;
    if (data?.message) {
      return Promise.reject(data);
    }

    return Promise.reject(data?.data || data);
  }
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const TokenType = getCookie('TokenType');
    const AccessToken = getCookie('AccessToken');
    const idTokenCookie = getCookie('IdToken');

    config.headers = {
      ...config.headers,
      Authorization: `${TokenType} ${idTokenCookie}`,
    };

    if (some(['/customers/change-password', '/customers/update-attributes'],
      compareURL => config.url && config.url?.indexOf(compareURL) >= 0)) {
      config.headers.Authorization = `${TokenType} ${AccessToken}`;
    }

    return config;
  }
);

export interface IRequestOptions extends Omit<RequestOptions, 'headers'> {
  headers?: Record<string, string>;
}

const baseQuery = (): BaseQueryFn<IRequestOptions> => async (requestOpt) => {
  try {
    const result = await axiosInstance({ ...requestOpt, data: requestOpt.body });

    return { data: result }
  } catch (axiosError) {
    return { error: { status: 500, data: axiosError } };
  }
}

export const axiosBaseQuery = baseQuery();

export default axiosInstance;
