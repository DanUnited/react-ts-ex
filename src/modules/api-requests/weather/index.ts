import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { IWeatherForecastItem } from './types';
import type { IWeatherResponse, IWeatherRequest } from './types';

export const getWeatherRequest = ({ courseId }: IWeatherRequest) => {
  return axios.get<void, IMetaResponse<IWeatherResponse>>(`/course/${courseId}/weather`).catch(handleAmazonMessage);
};

export const getWeatherForecastRequest = ({ courseId }: IWeatherRequest) => {
  return axios
    .get<void, IMetaResponse<IWeatherForecastItem[]>>(`/course/${courseId}/weather/forecast`)
    .catch(handleAmazonMessage);
};
