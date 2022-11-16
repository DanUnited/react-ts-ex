import { renderPlayersCount } from '../renders';
import { renderTime } from 'components/table/renders';

import type { ColumnProps } from 'antd/es/table';
import type { ITeeTime } from 'modules/api-requests/tee-time/types';

export const selectedTeeTimeColumns: ColumnProps<ITeeTime>[] = [
  {
    title: 'Players',
    dataIndex: 'freeSlots',
    key: 'freeSlots',
    width: 90,
    render: renderPlayersCount,
  },
  {
    title: 'Time',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 100,
    align: 'center',
    render: renderTime,
  }
];
