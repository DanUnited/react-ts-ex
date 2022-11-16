import React, { useCallback, useMemo } from 'react';
import Empty from 'antd/es/empty';
import ConfigProvider from 'antd/es/config-provider';

import { getUserColumns } from './columns';
import { WideTable } from 'components/table';
import { tableMetaActions } from 'models/table-meta';
import { getFilters } from 'models/table-meta/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { TableMembersFilter } from './table-members-filter';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { TableSummaryRecords } from 'components/table/table-summary-records';
import { getMembersSelector } from 'models/course-management-membership/selectors';

import type { MetaRecord } from 'models/table-meta/types';

const pagePath = PathCreator[RoutePaths.COURSE_MANAGEMENT].path;
const renderEmpty = () => <Empty description="No members data yet" />;

export const MembershipListTab = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const getCurrentFilters = useAppSelector(getFilters);
  const getCurrentMembers = useAppSelector(getMembersSelector);
  const currentFilters = useMemo(() => getCurrentFilters(pagePath), [getCurrentFilters]);
  const membersList = useMemo(() => getCurrentMembers(pagePath), [getCurrentMembers]);

  const getTableSummary = useCallback(() => {
    return <TableSummaryRecords total={membersList?.length} />;
  }, [membersList?.length]);

  const onFilterChange = useCallback((filterData: MetaRecord) => {
    dispatch(tableMetaActions.setFilters({ data: filterData, path: pagePath }));
  }, [dispatch]);

  return (
    <div>
      <TableMembersFilter onFilterChange={onFilterChange} currentFilters={currentFilters} />

      <ConfigProvider renderEmpty={renderEmpty}>
        <WideTable
          sticky
          rowKey="id"
          tableLayout="fixed"
          dataSource={membersList}
          summary={getTableSummary}
          columns={getUserColumns(dispatch)}
        />
      </ConfigProvider>
    </div>
  )
};

export default MembershipListTab;
