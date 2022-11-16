import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { IRemoveRates, IRate, IServerRate, IRateOption } from './types';

export const getRatesList = (courseId: string) =>
  axios
    .get<undefined, IMetaResponse<IServerRate[]>>(`/admin/courses/${courseId}/pricing/rates`)
    .catch(handleAmazonMessage);

export const getRateOptionsRequest = (): Promise<IRateOption[]> => {
  return axios.get<undefined, IRateOption[]>('/admin/rate-option');
};

export const updateRateRequest = (courseId: string, rateId: string, data: Partial<IRate>): Promise<IServerRate> => {
  return axios.put<Partial<IRate>, IServerRate>(`/admin/courses/${courseId}/pricing/rates/${rateId}`, data);
};

export const createRateRequest = (courseId: string, data: IServerRate): Promise<IServerRate> => {
  return axios.post<IRate, IServerRate>(`/admin/courses/${courseId}/pricing/rates`, data);
};

export const removeRatesRequest = (courseId: string, data: IRemoveRates): Promise<void> => {
  return axios.delete<IRemoveRates, void>(`/admin/courses/${courseId}/pricing/rates`, { data: data });
};

export const getRateRequest = (courseId: string, rateId: string) =>
  axios.get<void, IServerRate>(`/admin/courses/${courseId}/pricing/rates/${rateId}`).catch(handleAmazonMessage);
