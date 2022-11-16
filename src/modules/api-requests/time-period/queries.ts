import { useQuery } from 'react-query';

import { queryOptions } from '../constants';
import { getTimePeriodsRequest } from './index';

import type { IMetaResponse } from '../types';
import type { IServerTimePeriod } from './types';
import type { UseQueryOptions } from 'react-query';

export function useTimePeriodsList(
  courseId?: string,
  options?: UseQueryOptions<IMetaResponse<IServerTimePeriod[]>, string, IServerTimePeriod[]>,
) {
  return useQuery({
    queryKey: ['getTimePeriods', courseId],
    queryFn: () => courseId ? getTimePeriodsRequest(courseId) : Promise.reject(),
    enabled: Boolean(courseId),
    select: tableData => tableData.data,
    ...queryOptions,
    ...options,
  });
}
