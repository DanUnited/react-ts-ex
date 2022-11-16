import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from 'antd/es/button';
import { useMutation } from 'react-query';
import notification from 'antd/es/notification';

import { WideTable } from 'components/table';
import { getColumnsWidth } from 'utils/table';
import { tableMetaActions } from 'models/table-meta';
import { reservationDefaultColumns } from './columns';
import { ModalTitle } from 'components/modal/elements';
import { getTableColumns } from 'components/table/columns';
import { TableReservationFilters } from './table-filters';
import { useTableData } from 'utils/hooks/use-table-data';
import { PageLayout } from 'components/layout/page-layout';
import { getConfirmAction } from 'components/modal/confirm';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { defaultSettings } from 'models/table-meta/constants';
import { fetchCourseReservationAction } from 'models/reservations';
import { getFilters, getSettings } from 'models/table-meta/selectors';
import TableExportCsvButton from 'components/table/table-export-csv-button';
import { TableSummaryRecords } from 'components/table/table-summary-records';
import { TrashModalIcon } from 'pages/course-management/course-form/elements';
import { cancelCourseReservationRequest } from 'modules/api-requests/reservations';
import { getCurrentCourseId, getProfileCourse, getProfileState } from 'models/profile/selectors';
import { courseReservationsLoadingSelector, getReservationsSelector } from 'models/reservations/selectors';

import type { ColumnType } from "antd/es/table";
import type { MetaRecord } from 'models/table-meta/types';
import type { ITableSettings } from 'modules/api-requests/types';
import type { ICourseReservationFilter } from 'modules/api-requests/reservations/types';

const scroll = {
  scrollToFirstRowOnChange: false,
  x: reservationDefaultColumns.reduce(getColumnsWidth, 0),
};

const pagePath = PathCreator[RoutePaths.RESERVATIONS_LIST].path;

const EXPORT_CSV_COLUMNS = [
  { key: 'userCreated', label: 'Player name' },
  { key: 'reference', label: 'Reference' },
  { key: 'teeTimeDate', label: 'Tee date' },
  { key: 'createdAt', label: 'Order date' },
  { key: 'players', label: 'Players' },
  { key: 'price', label: 'Total price' },
  { key: 'promo', label: 'Promo' },
  { key: 'paymentType', label: 'Payment type' },
  { key: 'isTradeRound', label: 'Trade round' },
];

export const ReservationListPage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfileState);
  const profileCourse = useAppSelector(getProfileCourse);
  const getCurrentFilters = useAppSelector(getFilters);
  const getCurrentReservations = useAppSelector(getReservationsSelector);
  const isLoading = useAppSelector(courseReservationsLoadingSelector);
  const reservationsList = useMemo(() => getCurrentReservations(pagePath), [getCurrentReservations]);
  const getCurrentSettings = useAppSelector(getSettings);
  const currentCourse = useAppSelector(getProfileCourse);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const currentFilters = useMemo(() => getCurrentFilters<ICourseReservationFilter>(pagePath), [getCurrentFilters]);
  const [queryBookingId, setQueryBookingId] = useState<string | undefined>(undefined);

  const getReservationAction = useCallback(() => {
    if (currentCourse && currentCourse.timeZone) {
      dispatch(fetchCourseReservationAction({ courseId: currentCourseId, timeZone: currentCourse.timeZone }));
    }
  }, [dispatch, currentCourseId, currentCourse]);

  useEffect(() => {
    getReservationAction();
  }, [getReservationAction]);

  const tablePagination = useMemo(() => ({
    ...defaultSettings,
    ...getCurrentSettings<ITableSettings>(pagePath),
  }), [getCurrentSettings]);

  const onFilterChange = useCallback((filterData: MetaRecord) => {
    dispatch(tableMetaActions.setSettings({ data: { ...tablePagination, current: 1 }, path: pagePath }));
    dispatch(tableMetaActions.setFilters({ data: filterData, path: pagePath }));
    getReservationAction();
  }, [dispatch, getReservationAction, tablePagination]);

  const {
    sortBy,
    sortOrder,
    handleChange,
  } = useTableData<ITableSettings, void>(pagePath, getReservationAction);

  const getTableSummary = useCallback(() => {
    return <TableSummaryRecords total={tablePagination?.total} />;
  }, [tablePagination?.total]);

  const hasCourseRights = useMemo(() => {
    if (profileCourse && profile.sub) {
      return (profileCourse?.users?.map(item => item.id) || []).includes(profile.sub);
    }

    return false;
  }, [profile, profileCourse]);

  const { mutate: cancelBooking, isLoading: isCancelling } = useMutation({
    mutationKey: ['cancelBooking', currentCourseId],
    mutationFn: (bookingId: string) => {
      return cancelCourseReservationRequest(currentCourseId, bookingId);
    },
    onSuccess: () => {
      getReservationAction();
      notification.success({ message: 'Reservation was cancelled!' });
    },
    onError: (error) => notification.error({ message: String(error) }),
  });

  const onCancelBookingClick = useCallback((bookingId: string) => () => {
    setQueryBookingId(bookingId);

    getConfirmAction(
      {
        action: () => cancelBooking(bookingId),
        icon: <TrashModalIcon />,
        okText: 'Confirm',
        cancelText: 'Cancel',
        title: <ModalTitle>Are you sure, you want to cancel this reservation?</ModalTitle>,
      });
  }, [cancelBooking]);

  const columns = useMemo(() => {
    return [
      ...getTableColumns(reservationDefaultColumns, sortBy, sortOrder),
      {
        render: (bookingId: string) => {
          return (
            <Button
              type="primary"
              disabled={!hasCourseRights}
              onClick={onCancelBookingClick(bookingId)}
              loading={isCancelling && queryBookingId === bookingId}
            >
              Cancel reservation
            </Button>
          );
        },
        dataIndex: 'id',
        fixed: 'right',
        align: 'center',
        title: 'Actions',
        width: 200,
      } as ColumnType<any>,
    ]
  }, [hasCourseRights, isCancelling, onCancelBookingClick, queryBookingId, sortOrder, sortBy]);

  return (
    <>
      <PageLayout
        title="List of reservations"
        fullHeight
        actions={<TableExportCsvButton tableName="Reservations" headers={EXPORT_CSV_COLUMNS} data={reservationsList} />}
      >
        <TableReservationFilters onFilterChange={onFilterChange} currentFilters={currentFilters} />

        <div>
          <WideTable
            sticky
            rowKey="id"
            scroll={scroll}
            columns={columns}
            tableLayout="fixed"
            loading={isLoading}
            onChange={handleChange}
            summary={getTableSummary}
            pagination={tablePagination}
            dataSource={reservationsList}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default ReservationListPage;
