import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { ITimePeriodRequest, IServerTimePeriod, ITimePeriod } from './types';

export const createTimerPeriodRequest = (courseId: string, data: ITimePeriodRequest): Promise<IServerTimePeriod> => {
  return axios.post<ITimePeriodRequest, IServerTimePeriod>(`/admin/courses/${courseId}/pricing/time-period`, data)
    .catch(handleAmazonMessage);
};

export const getTimePeriodsRequest = (courseId: string) => {
  return axios.get<string, IMetaResponse<IServerTimePeriod[]>>(`/admin/courses/${courseId}/pricing/time-period`)
    .catch(() => ({ data: [], meta: {} } as IMetaResponse<IServerTimePeriod[]>));
};

export const removeTimePeriodRequest = (courseId: string, timePeriodId: string): Promise<void> => {
  return axios.delete<undefined, void>(`/admin/courses/${courseId}/pricing/time-period/${timePeriodId}`)
    .catch(handleAmazonMessage);
};

export const editTimePeriodRequest = (
  courseId: string,
  timePeriodId: string,
  data: ITimePeriod,
): Promise<void> => {
  return axios
    .put<ITimePeriod, void>(`/admin/courses/${courseId}/pricing/time-period/${timePeriodId}`, data)
    .catch(handleAmazonMessage);
};
