import { useMutation, useQuery } from 'react-query';

import { queryOptions } from '../constants';
import { getCourseTradeSettingsRequest, updateCourseTradeSettingsRequest } from './index';

import type { IMetaResponse } from '../types';
import type { UseQueryOptions } from 'react-query';
import type { ICourseTradeSettings } from './types';
import type { UseMutationOptions } from 'react-query';

export function useCourseTradeSettings(
  courseId?: string,
  options?: UseQueryOptions<IMetaResponse<ICourseTradeSettings>, string, ICourseTradeSettings>,
) {
  return useQuery({
    queryKey: ['getCourseTradeSettings', courseId],
    queryFn: () => courseId ? getCourseTradeSettingsRequest(courseId) : Promise.reject(),
    enabled: Boolean(courseId),
    select: data => data?.data,
    ...queryOptions,
    ...options,
  });
}

export function useChangeCourseTradeSettings(
  courseId?: string,
  options?: UseMutationOptions<ICourseTradeSettings, string, ICourseTradeSettings>,
) {
  return useMutation({
    mutationKey: ['updateCourseTradeSettings', courseId],
    mutationFn: (data: ICourseTradeSettings) => courseId ? updateCourseTradeSettingsRequest(courseId, data) : Promise.reject(),
    ...options,
  });
}
