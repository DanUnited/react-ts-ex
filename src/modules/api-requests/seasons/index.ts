import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { ISeasonResponse, ISeason } from './types';

export const getSeasonsRequest = (courseId: string) => {
  return axios.get<undefined, IMetaResponse<ISeasonResponse[]>>(`/admin/courses/${courseId}/seasons`);
};

export const createSeasonRequest = (courseId: string, data: ISeason): Promise<ISeasonResponse> => {
  return axios.post<ISeason, ISeasonResponse>(`/admin/courses/${courseId}/seasons`, data);
};

export const removeSeasonRequest = (courseId: string, seasonsId: string): Promise<void> => {
  return axios
    .delete<undefined, void>(`/admin/courses/${courseId}/seasons/${seasonsId}`)
    .catch(handleAmazonMessage);
};

export const editSeasonRequest = (courseId: string, seasonsId: string, data: ISeason): Promise<void> => {
  return axios.put<ISeason, void>(`/admin/courses/${courseId}/seasons/${seasonsId}`, data);
};
