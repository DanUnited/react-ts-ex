import React, { useCallback, useEffect, useMemo } from 'react';
import Space from 'antd/es/space';
import Empty from 'antd/es/empty';
import { push } from 'connected-react-router';
import ConfigProvider from 'antd/es/config-provider';

import { WideTable } from 'components/table';
import { getColumnsWidth } from 'utils/table';
import { userDefaultColumns } from './columns';
import { TableActions } from './render-actions';
import { fetchUsersAction } from 'models/users';
import { PaginationContainer } from './elements';
import { TableUserFilters } from './table-filters';
import { Plus } from 'components/icons/system/plus';
import { tableMetaActions } from 'models/table-meta';
import { TABLE_ACTION_WIDTH } from 'utils/constants';
import { CursorPagination } from './cursor-pagination';
import { PrimaryButton } from 'components/layout/button';
import { useTableData } from 'utils/hooks/use-table-data';
import { PathCreator, RoutePaths } from 'routing/constants';
import { PageLayout } from 'components/layout/page-layout';
import { getTableColumns } from 'components/table/columns';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getFilters, getSettings } from 'models/table-meta/selectors';
import { getUsersSelector, isUsersLoading } from 'models/users/selectors';
import TableExportCsvButton from 'components/table/table-export-csv-button';
// import { TableSummaryRecords } from 'components/table/table-summary-records';

import type { IColumnType } from './columns';
import type { MetaRecord } from 'models/table-meta/types';
import type { IUserFilters } from 'models/users/constants';
import type { ITableSettings } from 'modules/api-requests/types';
import type { IUsersSettings } from 'modules/api-requests/users/types';

const scroll = {
  scrollToFirstRowOnChange: false,
  x: userDefaultColumns.reduce(getColumnsWidth, 0),
};

const pagePath = PathCreator[RoutePaths.USERS_MANAGEMENT].path;
const renderEmpty = () => <Empty description="No users data yet" />;

const EXPORT_CSV_COLUMNS = [
  { key: 'firstname', label: 'First Name' },
  { key: 'lastname', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone number' },
  { key: 'groups', label: 'Role' },
];

export const UsersManagementPage = () => {
  const dispatch = useAppDispatch();
  const getCurrentFilters = useAppSelector(getFilters);
  const usersLoading = useAppSelector(isUsersLoading);
  const getCurrentUsers = useAppSelector(getUsersSelector);
  const currentFilters = useMemo(() => getCurrentFilters<IUserFilters>(pagePath), [getCurrentFilters]);
  const userList = useMemo(() => getCurrentUsers(pagePath), [getCurrentUsers]);
  const getCurrentSettings = useAppSelector(getSettings);
  const currentSettings = useMemo(() => getCurrentSettings<IUsersSettings>(pagePath), [getCurrentSettings]);

  const onFilterChange = useCallback(
    (filterData: MetaRecord) => {
      dispatch(tableMetaActions.setFilters({ data: filterData, path: pagePath }));
      dispatch(fetchUsersAction());
    }, [dispatch]);

  const { sortBy, sortOrder, handleChange } = useTableData<ITableSettings, IUserFilters>(pagePath, getCurrentUsers);

  const goToCreateUser = (): void => {
    dispatch(push(PathCreator[RoutePaths.USERS_MANAGEMENT_CREATION].path));
  };

  // const getTableSummary = useCallback(() => {
  //   return <TableSummaryRecords total={userList?.length || 0} />;
  // }, [userList?.length]);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const onPaginationChange = ({ pageSize, token }: IUsersSettings) => {
    dispatch(tableMetaActions.setSettings({ data: { token, pageSize }, path: pagePath }));
    dispatch(fetchUsersAction());
  };

  const columns = useMemo(() => {
    return [
      ...getTableColumns(userDefaultColumns, sortBy, sortOrder),
      {
        fixed: 'right',
        align: 'center',
        title: 'Actions',
        width: TABLE_ACTION_WIDTH,
        render: TableActions(dispatch),
      } as IColumnType,
    ]
  }, [sortBy, sortOrder, dispatch]);

  return (
    <>
      <PageLayout
        title="Users Management"
        fullHeight
        actions={
          <Space>
            <PrimaryButton icon={<Plus />} onClick={goToCreateUser}>
              Add user
            </PrimaryButton>
            <TableExportCsvButton tableName="Users" headers={EXPORT_CSV_COLUMNS} data={userList} />
          </Space>
        }
      >
        <TableUserFilters onFilterChange={onFilterChange} currentFilters={currentFilters} />

        <div>
          <ConfigProvider renderEmpty={renderEmpty}>
            <WideTable
              sticky
              rowKey="email"
              columns={columns}
              pagination={false}
              tableLayout="fixed"
              dataSource={userList}
              loading={usersLoading}
              onChange={handleChange}
              // summary={getTableSummary}
              scroll={userList.length ? scroll : undefined}
            />

            <PaginationContainer>
              <CursorPagination
                onChange={onPaginationChange}
                search={currentFilters.search}
                paginationData={currentSettings}
              />
            </PaginationContainer>
          </ConfigProvider>
        </div>
      </PageLayout>
    </>
  );
};

export default UsersManagementPage;
