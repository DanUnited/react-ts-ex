import { renderDisabledToggle, renderPercent } from './renders';
import { renderDate, renderMoney, renderNumber, renderText } from 'components/table/renders';

import type { ColumnProps } from 'antd/es/table';
import type { IPromoCode } from 'models/loyalties/types';

export const promoCodesDefaultColumns: ColumnProps<IPromoCode>[] = [
  {
    title: 'Coupon code',
    dataIndex: 'code',
    key: 'code',
    width: 160,
    sorter: true,
    render: renderText,
  },
  {
    title: 'Discount',
    dataIndex: 'discountAmount',
    key: 'discountAmount',
    width: 120,
    sorter: true,
    render: (value, row) => row.discountType === 'Dollar'
      ? renderMoney(value)
      : renderPercent(value),
  },
  {
    title: 'Used',
    dataIndex: 'usage',
    key: 'usage',
    width: 120,
    sorter: true,
    render: renderNumber,
  },
  {
    title: 'Max usage',
    dataIndex: 'maxUsage',
    key: 'maxUsage',
    width: 140,
    sorter: true,
    render: renderNumber,
  },
  {
    title: 'Start date',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 150,
    align: 'center',
    render: renderDate(),
  },
  {
    title: 'End date',
    dataIndex: 'endDate',
    key: 'endDate',
    width: 150,
    align: 'center',
    render: renderDate(),
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: 120,
    sorter: true,
    render: renderText,
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    width: 120,
    render: renderDisabledToggle,
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    sorter: true,
    render: renderText,
  },
];
