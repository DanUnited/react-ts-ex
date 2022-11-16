import { useQuery } from 'react-query';

import { getSeasonsRequest } from './index';
import { queryOptions } from '../constants';

import type { IMetaResponse } from '../types';
import type { ISeasonResponse } from './types';
import type { UseQueryOptions } from 'react-query';

export function useSeasonsList(
  courseId?: string,
  options?: UseQueryOptions<IMetaResponse<ISeasonResponse[]>, string, ISeasonResponse[]>,
) {
  return useQuery(
    {
      queryKey: ['getSeasons', courseId],
      enabled: Boolean(courseId),
      queryFn: () => courseId ? getSeasonsRequest(courseId) : Promise.reject(),
      select: tableData => tableData.data,
      ...queryOptions,
      ...options,
    },
  );
}
