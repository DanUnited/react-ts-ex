import { useQuery } from 'react-query';
import notification from 'antd/es/notification';

import { queryOptions } from '../constants';
import { getWeatherForecastRequest, getWeatherRequest } from './index';

import type { IMetaResponse } from '../types';
import type { UseQueryOptions } from 'react-query';
import type { IWeatherResponse, IWeatherForecastItem } from './types';

export function useWeatherQuery(
  currentCourseId?: string | null,
  options?: UseQueryOptions<IMetaResponse<IWeatherResponse>, string, IWeatherResponse>,
) {
  return useQuery({
    queryKey: ['getWeather', currentCourseId],
    queryFn: () => currentCourseId
      ? getWeatherRequest({ courseId: currentCourseId })
      : Promise.reject(),
    enabled: Boolean(currentCourseId),
    select: data => data?.data,
    initialData: { data: {}, meta: {} } as IMetaResponse<IWeatherResponse>,
    onError: error => notification.error({ message: 'Cannot get weather information', description: String(error) }),
    ...queryOptions,
    ...options,
  });
}

export function useWeatherForecastQuery(
  currentCourseId?: string | null,
  options?: UseQueryOptions<IMetaResponse<IWeatherForecastItem[]>, string, IWeatherForecastItem[]>,
) {
  return useQuery({
    queryKey: ['getWeatherForecast', currentCourseId],
    queryFn: () => currentCourseId
      ? getWeatherForecastRequest({ courseId: currentCourseId })
      : Promise.reject(),
    enabled: Boolean(currentCourseId),
    select: data => data?.data,
    initialData: { data: [], meta: {} } as IMetaResponse<IWeatherForecastItem[]>,
    onError: error => notification.error({ message: 'Cannot get weather information', description: String(error) }),
    ...queryOptions,
    ...options,
  });
}
