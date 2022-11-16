import { useMutation, useQuery } from 'react-query';
import notification from 'antd/es/notification';

import { queryOptions } from '../constants';
import { getCourseReportSettingsRequest, getCourseReportsRequest, saveCourseReportSettingsRequest } from './index';

import type { IReportTab, IReportSettings } from './types';
import type { UseQueryOptions, UseMutationOptions } from 'react-query';

export function useCourseReports(
  courseId?: string,
  options?: UseQueryOptions<IReportTab[], string, IReportTab[]>,
) {
  return useQuery({
    queryKey: ['getCourseReports', courseId],
    queryFn: () => courseId ? getCourseReportsRequest(courseId) : Promise.reject(),
    enabled: Boolean(courseId),
    onError: message => notification.error({ message: String(message) }),
    ...queryOptions,
    ...options,
  });
}

export function useCourseReportSettings(
  options?: UseQueryOptions<IReportSettings, string, IReportSettings>,
) {
  return useQuery({
    queryKey: ['getCourseReports'],
    queryFn: () => getCourseReportSettingsRequest(),
    onError: message => notification.error({ message: String(message) }),
    ...queryOptions,
    ...options,
  });
}

export function useCourseReportSettingsMutation(
  options?: UseMutationOptions<IReportSettings, string, IReportSettings>,
) {
  return useMutation({
    mutationKey: ['saveCourseReports'],
    mutationFn: (data: IReportSettings) => saveCourseReportSettingsRequest(data),
    onError: message => notification.error({ message: String(message) }),
    ...options,
  });
}
