import { renderText, renderToggle } from 'components/table/renders';
import { RenderHistoryLink } from './render';

import type { ColumnProps } from 'antd/es/table';
import type { AppDispatch } from 'modules/store/types';
import type { IMembership } from 'models/course-management-membership/types';

export const getUserColumns = (dispatch: AppDispatch): ColumnProps<IMembership>[] => [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: renderText,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: renderText,
  },
  {
    title: 'E-Mail',
    dataIndex: 'email',
    key: 'email',
    render: renderText,
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
    key: 'phone',
    render: renderText,
  },
  {
    title: 'History',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: RenderHistoryLink(dispatch),
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    width: 200,
    align: 'center',
    render: renderToggle,
  },
];
