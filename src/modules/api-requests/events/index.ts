import omit from 'lodash/omit';
import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { ICalendarEvent, ICalendarEventResponse } from './types';

export const getCalendarEvents = (courseId: string, params?: { fromDate: string, toDate: string }) => {
  return axios
    .get<void, IMetaResponse<ICalendarEventResponse[]>>(`/admin/courses/${courseId}/calendar`, { params })
    .catch(handleAmazonMessage);
}

export const createCalendarEvent = (courseId: string, calendarEvent: ICalendarEvent) => {
  return axios
    .post<void, ICalendarEvent[]>(`/admin/courses/${courseId}/calendar`, calendarEvent)
    .catch(handleAmazonMessage);
}

export const updateCalendarEvent = (courseId: string, calendarEvent: ICalendarEvent) => {
  return axios
    .put<void, ICalendarEvent[]>(`/admin/courses/${courseId}/calendar/${calendarEvent.id}`, omit(calendarEvent, 'id'))
    .catch(handleAmazonMessage);
}

export const deleteCalendarEvent = (courseId: string, eventId: string) => {
  return axios
    .delete<void, ICalendarEvent[]>(`/admin/courses/${courseId}/calendar/${eventId}`)
    .catch(handleAmazonMessage);
}
