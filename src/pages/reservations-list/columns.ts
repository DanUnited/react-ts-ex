import {
  renderDate,
  renderText,
  renderMoney,
  renderNumber,
  renderBoolean,
  renderPaymentType,
} from 'components/table/renders';
import { DateFormat, DateTimeFormat, TimeFormat } from 'utils/date';

import type { ColumnProps } from 'antd/es/table'
import type { ICourseReservation } from 'modules/api-requests/reservations/types';

export const reservationDefaultColumns: ColumnProps<ICourseReservation>[] = [
  {
    title: 'Player name',
    dataIndex: 'userCreated',
    key: 'userCreated',
    sorter: true,
    width: 250,
    render: renderText,
  },
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    sorter: true,
    width: 150,
    render: renderText,
  },
  {
    title: 'Tee date',
    dataIndex: 'teeTimeDate',
    key: 'teeTimeDate',
    sorter: true,
    width: 200,
    align: 'center',
    render: renderDate(`${DateFormat} ${TimeFormat}`, DateTimeFormat),
  },
  {
    title: 'Order date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    width: 200,
    align: 'center',
    render: renderDate(DateTimeFormat, DateTimeFormat),
  },
  {
    title: 'Players',
    dataIndex: 'players',
    key: 'players',
    sorter: true,
    width: 200,
    align: 'center',
    render: renderNumber,
  },
  {
    title: 'Total price',
    dataIndex: 'price',
    key: 'price',
    width: 120,
    align: 'center',
    render: renderMoney,
  },
  {
    title: 'Promo',
    dataIndex: 'promo',
    key: 'promo',
    width: 100,
    align: 'center',
    render: renderBoolean,
  },
  {
    title: 'Payment type',
    dataIndex: 'paymentType',
    key: 'paymentType',
    width: 150,
    align: 'center',
    render: renderPaymentType,
  },
  {
    title: 'Trade round',
    dataIndex: 'isTradeRound',
    key: 'isTradeRound',
    sorter: true,
    width: 120,
    align: 'center',
    render: renderBoolean,
  },
];
