import { renderText } from 'components/table/renders';
import { renderUserActivityWrapper, renderUserGroups } from './renders';

import type { ColumnType } from 'antd/lib/table';
import type { IUser } from 'models/users/constants';

export interface IColumnType extends ColumnType<IUser> {
  minWidth?: number;
}

export const userDefaultColumns: IColumnType[] = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
    sorter: true,
    width: 100,
    minWidth: 85,
    render: renderUserActivityWrapper(renderText),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
    key: 'lastname',
    sorter: true,
    width: 200,
    minWidth: 85,
    render: renderUserActivityWrapper(renderText),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
    width: 200,
    minWidth: 85,
    render: renderUserActivityWrapper(renderText),
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    sorter: true,
    width: 200,
    minWidth: 85,
    render: renderUserActivityWrapper(renderText),
  },
  {
    title: 'Role',
    dataIndex: 'groups',
    key: 'groups',
    width: 100,
    minWidth: 85,
    render: renderUserActivityWrapper(renderUserGroups),
  },
];
