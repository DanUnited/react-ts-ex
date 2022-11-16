import { useQuery } from 'react-query';
import notification from 'antd/es/notification';

import { getDashboardRequest } from './index';

import type { IDashboardResponse } from './types';
import type { UseQueryOptions } from 'react-query';

export const useDashboard = (
  courseId: string,
  options?: UseQueryOptions<IDashboardResponse, string, IDashboardResponse>,
) =>
  useQuery({
    queryKey: ['getDashboard', courseId],
    enabled: Boolean(courseId),
    queryFn: () => getDashboardRequest(courseId),
    initialData: {
      utilization: { current: { amount: 0, totalAmount: 0, name: '', noData: true }, items: [] },
      revenue: { current: { name: '', amount: 0, subitems: [] }, items: [] },
      visitors: { current: { name: '', amount: 0, subitems: [] }, items: [] },
    } as IDashboardResponse,
    onError: (error) => notification.error({ message: String(error) }),
    ...options,
  });
