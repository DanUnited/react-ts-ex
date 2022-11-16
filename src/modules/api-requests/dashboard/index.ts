import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type { IDashboardResponse } from './types';

export const getDashboardRequest = (courseId: string) =>
  axios.get<void, IDashboardResponse>(`/admin/courses/${courseId}/dashboard`)
    .catch(handleAmazonMessage);
