import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IListMeta } from 'models/types';
import type { IMetaResponse } from '../types';
import type { ICourseReservation, ICourseReservationRequest } from './types';

export const getCourseReservationRequest = ({ courseId, ...params }: ICourseReservationRequest) => {
  return axios
    .get<ICourseReservationRequest, IMetaResponse<ICourseReservation[], IListMeta>>(`/admin/courses/${courseId}/bookings/latest`, { params })
    .catch(handleAmazonMessage);
};

export const cancelCourseReservationRequest = (courseId: string, bookingId: string) => {
  return axios
    .post<void, void>(`admin/courses/${courseId}/booking/${bookingId}/cancel`)
    .catch(handleAmazonMessage);
};
