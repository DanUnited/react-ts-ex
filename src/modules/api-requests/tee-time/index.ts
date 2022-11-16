import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { ITeeTime, IUpdateTeeTime } from './types';

export const getTeeTimesRequest = (courseId: string, date: string) => {
  return axios
    .get<undefined, IMetaResponse<ITeeTime[]>>(`/admin/courses/${courseId}/tee-times`, { params: { date } })
    .catch(handleAmazonMessage);
};

export const updateTeeTimesRequest = (courseId: string, teeTimes: IUpdateTeeTime[]): Promise<ITeeTime[]> => {
  return axios
    .post<IUpdateTeeTime[], ITeeTime[]>(`admin/courses/${courseId}/individual-tee-times`, teeTimes)
    .catch(handleAmazonMessage);
};
