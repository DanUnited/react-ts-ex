import isNil from 'lodash/isNil';

import type { AxiosResponse } from 'axios';
import type { IAmazonError, IResponse, ITableResponse } from 'modules/api-requests/types';

function isTableResponse<T>(data: ITableResponse<T> | IResponse<T>): data is ITableResponse<T> {
  return !isNil((data as ITableResponse<T>)?.meta);
}

export const makeResponse = <T>(axiosResponse: AxiosResponse<IResponse<T> | ITableResponse<T>>) => {
  const { data } = axiosResponse;
  if (isTableResponse(data)) return data;

  return data.data || data;
}

export const handleAmazonMessage = (error: IAmazonError) => Promise.reject(error.message);
