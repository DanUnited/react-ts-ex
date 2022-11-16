import { renderText } from 'components/table/renders';

import type { ColumnProps } from 'antd/es/table';

export const historyColumns: ColumnProps<any>[] = [
  {
    title: 'Order number',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    render: renderText,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    render: renderText,
  },
  {
    title: 'Players',
    dataIndex: 'players',
    key: 'players',
    width: 200,
    align: 'center',
    render: renderText,
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    align: 'center',
    render: renderText,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: renderText,
  }
];
