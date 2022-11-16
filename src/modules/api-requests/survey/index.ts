import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IUpdateSurveyRequest, IUpdateSurveyStatusRequest } from './types';
import type { ISurvey, ISurveySubmittedMeta, ISurveyReportResponse } from './types';
import type { ICertainSurveyRequest, ICreateSurveyRequest, ISurveyCourseParam, ISurveyReportRequest } from './types';

export const getAllSurveysRequest = ({ courseId }: ISurveyCourseParam) => {
  return axios
    .get<void, ISurvey[]>(`/admin/courses/${courseId}/survey`)
    .catch(handleAmazonMessage);
};

export const getSurveyByIdRequest = ({ surveyId, courseId }: ICertainSurveyRequest) => {
  return axios
    .get(`/admin/courses/${courseId}/survey/${surveyId}`)
    .catch(handleAmazonMessage);
};

export const getSurveyReportRequest = ({ surveyId, courseId, params }: ISurveyReportRequest) =>
  axios
    .get<ISurveyReportRequest, ISurveyReportResponse>(`/admin/courses/${courseId}/survey/${surveyId}/report`, { params })
    .catch(handleAmazonMessage);

export const createSurveyRequest = ({ courseId, data }: ICreateSurveyRequest) => {
  return axios
    .post<ISurvey & ISurveySubmittedMeta, ISurvey>(`/admin/courses/${courseId}/survey`, data)
    .catch(handleAmazonMessage);
};

export const updateSurveyRequest = ({ courseId, surveyId, data }: IUpdateSurveyRequest) => axios
  .put<ISurvey & ISurveySubmittedMeta, ISurvey>(`/admin/courses/${courseId}/survey/${surveyId}`, data)
  .catch(handleAmazonMessage);

export const updateSurveyStatusRequest = ({ courseId, surveyId, isActive }: IUpdateSurveyStatusRequest) => axios
  .put<IUpdateSurveyStatusRequest, ISurvey>(`/admin/courses/${courseId}/survey/${surveyId}/status`, { isActive })
  .catch(handleAmazonMessage);
