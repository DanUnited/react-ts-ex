import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { ICourseResponse, ICourse } from './types';

export const defaultCourse: ICourse = {
  id: '0',
  name: '',
  address: '',
  isActive: false,
  city: '',
  confirmationEmails: '',
  subdomain: '',
  zip: '',
  timeZone: '',
  state: '',
  phone: '',
  website: '',
  policy: null,
  yieldActive: true,
  weatherActive: false,
  taxesAndFeesPerPlayer: false,
  transactionFeePerPlayer: false,
  transactionFeeTradePerPlayer: false,
  holes: 9,
  publicInfo: null,
  isPublicInfoEnabled: true,
  nineHolesDuration: 90,
};

export const createCourseRequest = (data: ICourse) => {
  return axios.post<ICourse, ICourseResponse>('/admin/courses', data)
    .catch(handleAmazonMessage);
};

export const getCoursesRequest = () =>
  axios
    .get<void, ICourse[]>('/admin/courses')
    .catch(handleAmazonMessage);

export const getCourseByIdRequest = (courseId: string) =>
  axios
    .get<void, ICourse>(`/admin/courses/${courseId}`)
    .catch(() => defaultCourse);

export const updateCourseRequest = (id: string, data: ICourse) => {
  return axios
    .put<ICourse, void>(`/admin/courses/${id}`, data)
    .catch(handleAmazonMessage);
};

export const updateCourseSettingsRequest = (id: string, data: Partial<ICourse>) => {
  return axios
    .put<Partial<ICourse>, void>(`/admin/mycourses/${id}`, data)
    .catch(handleAmazonMessage);
};

export const deleteCourseRequest = (id: string) => {
  return axios
    .delete(`/admin/courses/${id}`)
    .catch(() => null);
};
