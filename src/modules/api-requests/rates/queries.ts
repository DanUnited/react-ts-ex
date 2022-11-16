import { useQuery } from 'react-query';
import notification from 'antd/es/notification';

import { getRatesList } from './index';
import { queryOptions } from '../constants';

import type { IServerRate } from './types';
import type { IMetaResponse } from '../types';
import type { UseQueryOptions } from 'react-query';

export function useRateList(
  courseId?: string,
  options?: UseQueryOptions<IMetaResponse<IServerRate[]>, string, IServerRate[]>,
) {
  return useQuery({
    queryKey: ['getCourseRates', courseId],
    queryFn: () => courseId ? getRatesList(courseId) : { data: [], meta: {} },
    enabled: Boolean(courseId),
    initialData: { data: [], meta: {} },
    select: (data) => data.data.filter(rate => rate.isActive),
    onError: (error) => notification.error({ message: String(error) }),
    ...queryOptions,
    ...options,
  });
}
