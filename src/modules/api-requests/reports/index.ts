import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IReportTab, IReport, IReportSettings } from './types';

export const getCourseReportsRequest = (courseId: string) => {
  return axios
    .get<void, IReportTab[]>(`/admin/courses/${courseId}/reports`)
    .catch(handleAmazonMessage);
};

export const getCourseReportByIdRequest = (courseId: string, reportId: string) =>
  axios
    .get<void, IReport>(`/admin/courses/${courseId}/reports/${reportId}`)
    .catch(handleAmazonMessage);

export const getCourseReportSettingsRequest = () => {
  return axios
    .get<void, IReportSettings>(`/admin/config`)
    .catch(handleAmazonMessage);
}

export const saveCourseReportSettingsRequest = (data: IReportSettings) => {
  return axios
    .put<IReportSettings, IReportSettings>(`/admin/config`, data)
    .catch(handleAmazonMessage);
}
