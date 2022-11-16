import axios from 'modules/api-client/request';

import type { ITax } from './types';

export const getTaxRequest = (courseId: string): Promise<ITax[]> => {
  return axios.get<void, ITax[]>(`admin/courses/${courseId}/tax`);
};

export const createTaxRequest = (courseId: string, data: ITax): Promise<ITax> => {
  return axios.post<undefined, ITax>(`admin/courses/${courseId}/fee`, data);
};
