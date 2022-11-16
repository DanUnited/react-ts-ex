import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IMetaResponse } from '../types';
import type { ICourseTradeSettings } from './types';
import type { ITradeRound, ITradeRoundException, ITradeRoundsExceptionChange } from './types';

export const createTradeRoundsRequest = (courseId: string, data: ITradeRound) =>
  axios.post<ITradeRound, ITradeRound>(`/admin/courses/${courseId}/traderound`, data)
    .catch(handleAmazonMessage);

export const getTradeRoundRequest = (courseId: string) =>
  axios.get<void, IMetaResponse<ITradeRound[]>>(`/admin/courses/${courseId}/traderound`)
    .catch(handleAmazonMessage);

export const updateTradeRoundsRequest = ({ data, courseId }: { courseId: string, data: ITradeRound }) =>
  axios.put<ITradeRound, ITradeRound>(`/admin/courses/${courseId}/traderound/${data.id}`, data)
    .catch(handleAmazonMessage);

export const deleteTradeRoundsRequest = ({ tradeRoundId, courseId }: { courseId: string, tradeRoundId: string }) =>
  axios.delete(`/admin/courses/${courseId}/traderound/${tradeRoundId}`)
    .catch(handleAmazonMessage);

export const getTradeRoundExceptionsRequest = (courseId: string, date: string) =>
  axios.get<void, ITradeRoundException[]>(`/admin/courses/${courseId}/traderound/exceptions`, { params: { date } })
    .catch(handleAmazonMessage);

export const updateTradeRoundExceptionsRequest = (courseId: string, data: ITradeRoundsExceptionChange[]) =>
  axios.put<ITradeRoundsExceptionChange[], ITradeRoundException[]>(`/admin/courses/${courseId}/traderound/exceptions`, data)
    .catch(handleAmazonMessage);

export const getCourseTradeSettingsRequest = (courseId: string) =>
  axios.get<void, IMetaResponse<ICourseTradeSettings>>(`/admin/mycourses/${courseId}/trade`)
    .catch(handleAmazonMessage);

export const updateCourseTradeSettingsRequest = (courseId: string, data: ICourseTradeSettings) =>
  axios.put<void, ICourseTradeSettings>(`/admin/mycourses/${courseId}/trade`, data)
    .catch(handleAmazonMessage);
