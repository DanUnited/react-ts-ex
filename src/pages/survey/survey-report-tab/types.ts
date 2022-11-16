import type { Moment } from 'moment/moment';

export interface ISurveyComment {
  userName: string;
  userEmail: string;
  submittedAt?: string;
  comments: string;
}

export interface ISurveyForm {
  subject: string;
  submittedDateRange: Moment[];
}
