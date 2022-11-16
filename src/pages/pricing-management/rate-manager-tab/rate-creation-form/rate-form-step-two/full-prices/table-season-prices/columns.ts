import { renderTimePeriodDate } from './renders';

export const timePeriodsColumns = [
  {
    title: 'Time Period',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 150,
    render: renderTimePeriodDate,
  },
];
