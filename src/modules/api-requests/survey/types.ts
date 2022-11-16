import type { IEntity } from '../types';

export interface ISurveyRating {
  key: string;
  value: string;
  rating?: string;
}

export interface ISurveyRatingRange {
  key: string;
  value: string;
}

export interface ISurveyBody {
  key: string;
  value?: string;
  ratingRange: ISurveyRatingRange[];
  ratings: ISurveyRating[];
  comments?: string;
}

export interface ISurveySubjectQuestion {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISurveySubject {
  id: string;
  name: string;
  surveyId: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  questions: ISurveySubjectQuestion[];
}

export interface ISurvey extends IEntity {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  subjects: ISurveySubject[];
}

export interface ISurveySubmittedMeta {
  subjects: [
    {
      name: string;
    }
  ];
}

export interface ISurveyCourseParam {
  courseId: string;
}

export interface ISurveyDateParams {
  fromDate: string;
  toDate: string;
}

export interface ICertainSurveyRequest extends ISurveyCourseParam {
  surveyId: string;
}

export interface ISurveyReportRequest extends ICertainSurveyRequest {
  params: ISurveyDateParams;
}

export interface ISurveyReportResponse {
  results: Array<{
    date: string;
    createdAt: string;
    customerDate: string | null;
    customerEmail: string | null;
    customerName: string | null;
    comments: null;
    items: Array<{
      answerId: string;
      questionId: string;
    }>
  }>;
  answerOptions: Array<{
    id: string;
    text: string;
    rate: number | null;
  }>
}

export interface ICreateSurveyRequest extends ISurveyCourseParam {
  data: ISurvey & ISurveySubmittedMeta;
}

export interface IUpdateSurveyRequest extends ICreateSurveyRequest {
  surveyId: string;
}

export interface IUpdateSurveyStatusRequest extends ISurveyCourseParam {
  surveyId: string;
  isActive: boolean;
}
