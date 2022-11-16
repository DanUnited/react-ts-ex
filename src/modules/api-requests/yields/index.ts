import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IYield, IGetYieldsRequest } from './types';

export const getYieldsRequest = ({ courseId, ...params }: IGetYieldsRequest): Promise<IYield> => {
  return axios.get<void, IYield>(`/admin/courses/${courseId}/yield`, { params })
    .catch(handleAmazonMessage);
};

export const saveYieldsRequest = (courseId: string, data: IYield): Promise<IYield> => {
  return axios.post<IYield, IYield>(`/admin/courses/${courseId}/yield`, data)
    .catch(handleAmazonMessage);
};

export const updateYieldsRequest = (courseId: string, yieldId: string, data: IYield): Promise<IYield> => {
  return axios.put<IYield, IYield>(`/admin/courses/${courseId}/yield/${yieldId}`, data)
    .catch(handleAmazonMessage);
};
