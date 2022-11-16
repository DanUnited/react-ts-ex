import { fromISOString } from 'utils/date';

import type { ISurveyComment } from './types';

export const sortSurvey = (a: ISurveyComment, b: ISurveyComment) => {
  if (!a.submittedAt || !b.submittedAt) {
    return 0;
  }

  const dateA = fromISOString(a.submittedAt);
  const dateB = fromISOString(b.submittedAt);
  return dateB.getTime() - dateA.getTime();
}
