import { useQuery } from 'react-query';
import notification from 'antd/es/notification';

import { queryOptions } from '../constants';
import { getTeeTimesRequest } from './index';

import type { IMetaResponse } from '../types';
import type { UseQueryOptions } from 'react-query';
import type { ITeeTimeIndividual, ITableTeeTime, ITeeTime } from './types';

const initialTeeTimes =  [] as ITeeTime[];

export function useTeeTimeList(
  currentDate: string | null,
  courseId?: string,
  options?: UseQueryOptions<IMetaResponse<ITeeTime[]>, string, ITableTeeTime[]>,
) {
  return useQuery({
    queryKey: ['getTeeTimes', courseId, currentDate],
    queryFn: () => courseId && currentDate
      ? getTeeTimesRequest(courseId, currentDate)
      : Promise.reject(initialTeeTimes),
    enabled: Boolean(courseId) && Boolean(currentDate),
    initialData: { data: initialTeeTimes, meta: {} } as IMetaResponse<ITeeTime[]>,
    select: (data) => {
      return data.data.map(teeTime => ({
        ...teeTime,
        rates: teeTime.rates.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {}),
        individual: {
          yieldActive: teeTime.individual?.yieldActive === undefined ? true : teeTime.individual?.yieldActive,
          displayed: teeTime.individual?.displayed === undefined ? true : teeTime.individual?.displayed,
          ...(teeTime.individual || {}),
        } as ITeeTimeIndividual,
      }))
    },
    ...queryOptions,
    keepPreviousData: true,
    refetchInterval: 15 * 60 * 1000, // 15min
    onError: (error: string) => notification.error({ message: String(error) }),
    ...options,
  });
}
