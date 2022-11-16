import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Empty from 'antd/es/empty';
import Space from 'antd/es/space';
import Button from 'antd/es/button';
import { useMutation } from 'react-query';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import ConfigProvider from 'antd/es/config-provider';

import { WideTable } from 'components/table';
import { getColumnsWidth } from 'utils/table';
import { Plus } from 'components/icons/system/plus';
import { promoCodesDefaultColumns } from './columns';
import { tableMetaActions } from 'models/table-meta';
import { Delete } from 'components/icons/system/delete';
import { getTableColumns } from 'components/table/columns';
import { useTableData } from 'utils/hooks/use-table-data';
import { fetchCourseCouponsAction } from 'models/coupons';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { defaultSettings } from 'models/table-meta/constants';
import { DeleteIcon } from 'pages/pricing-management/elements';
import { PromoCodeFilters, PromoCodesContainer } from './elements';
import { getFilters, getSettings } from 'models/table-meta/selectors';
import { TableSummaryRecords } from 'components/table/table-summary-records';
import { courseCouponsLoadingSelector, getCouponsSelector } from 'models/coupons/selectors';
import { deleteCourseCouponsRequest, updateCourseCouponsActivityRequest } from 'modules/api-requests/coupons';

import type { Key } from 'react';
import type { MetaRecord } from 'models/table-meta/types';
import type { RowSelectionType } from 'antd/es/table/interface';
import type { ITableSettings } from 'modules/api-requests/types';
import type { TableRowSelection } from 'antd/es/table/interface';
import type {
  ICourseCouponsFilter,
  IDeleteCouponsRequest,
  IUpdateCouponActivityRequest,
} from 'modules/api-requests/coupons/types';

const scroll = {
  scrollToFirstRowOnChange: false,
  x: promoCodesDefaultColumns.reduce(getColumnsWidth, 0),
};

const renderEmpty = () => <Empty description="No coupon codes" />;
const pagePath = PathCreator[RoutePaths.LOYALTY_MANAGER].path;

export const PromoCodeManagerTab = () => {
  const dispatch = useAppDispatch();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const getCurrentSettings = useAppSelector(getSettings);
  const getCurrentFilters = useAppSelector(getFilters);
  const getCurrentCoupons = useAppSelector(getCouponsSelector);
  const isLoading = useAppSelector(courseCouponsLoadingSelector);
  const couponsList = useMemo(() => getCurrentCoupons(pagePath), [getCurrentCoupons]);
  const currentFilters = useMemo(() => getCurrentFilters<ICourseCouponsFilter>(pagePath), [getCurrentFilters]);

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const rowSelection: TableRowSelection<unknown> = {
    type: 'checkbox' as RowSelectionType,
    onChange: (selectedKeys: Key[]) => {
      setSelectedKeys(selectedKeys);
    },
    selectedRowKeys: selectedKeys,
  };

  const fetchCoupons = useCallback(() => {
    if (currentCourseId) {
      dispatch(fetchCourseCouponsAction(currentCourseId));
    }
  }, [dispatch, currentCourseId]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const onCreateCodeClick = () => {
    dispatch(push(PathCreator[RoutePaths.LOYALTY_MANAGER_PROMO_CREATION].getUrl()));
  };

  const onFilterChange = useCallback((filterData: MetaRecord) => {
    dispatch(tableMetaActions.setFilters({ data: filterData, path: pagePath }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(tableMetaActions.setSettings({
      data: {
        current: 1,
        sortBy: 'code',
        sortDirection: 'DESC',
      }, path: pagePath,
    }));
  }, [dispatch]);

  const {
    sortBy,
    sortOrder,
    handleChange,
  } = useTableData<ITableSettings, void>(pagePath, fetchCoupons);

  const tablePagination = useMemo(() => ({
    ...defaultSettings,
    ...getCurrentSettings<ITableSettings>(pagePath),
  }), [getCurrentSettings]);

  const getTableSummary = useCallback(() => {
    return <TableSummaryRecords total={tablePagination?.total} startIndex={1} />;
  }, [tablePagination?.total]);

  const { mutate: changeCouponVisibility, isLoading: isUpdating } = useMutation({
    mutationKey: ['updateCouponsActivity'],
    mutationFn: (data: IUpdateCouponActivityRequest) => updateCourseCouponsActivityRequest(data),
    onSuccess: () => {
      setSelectedKeys([]);
      notification.success({ message: 'Coupons status changed successfully!' });
      dispatch(fetchCourseCouponsAction(currentCourseId));
    },
  });

  const { mutate: deleteCoupons, isLoading: isDeleting } = useMutation({
    mutationKey: ['deleteCoupons'],
    mutationFn: (data: IDeleteCouponsRequest) => deleteCourseCouponsRequest(data),
    onSuccess: () => {
      setSelectedKeys([]);
      notification.success({ message: 'Coupons deleted successfully!' });
      dispatch(fetchCourseCouponsAction(currentCourseId));
    },
  });

  const isActiveFlag = useMemo(
    () => Boolean(couponsList.filter(item =>
      selectedKeys.includes(item.id))?.find(item => item.isActive)),
    [couponsList, selectedKeys]);

  const activeButtonText = isActiveFlag ? 'Turn off selected' : 'Turn on selected';

  const handleChangeVisibility = useCallback(() => {
    changeCouponVisibility({
      courseId: currentCourseId,
      data: {
        ids: couponsList
          .filter(item => selectedKeys.includes(item.id))
          .map(({ id }) => id),
        data: { isActive: !isActiveFlag },
      },
    });
  }, [selectedKeys, changeCouponVisibility, couponsList, currentCourseId, isActiveFlag]);

  const handleRemovingCoupons = useCallback(() => {
    deleteCoupons({
      courseId: currentCourseId,
      data: {
        ids: couponsList.filter(item => selectedKeys.includes(item.id)).map(item => item.id),
      },
    });
  }, [couponsList, currentCourseId, selectedKeys, deleteCoupons]);

  return (
    <PromoCodesContainer>
      <>
        <PromoCodeFilters
          searchProps={{
            placeholder: 'Search by code',
          }}
          onFilterChange={onFilterChange}
          currentFilters={currentFilters}
          addonAfter={(
            <Space align="end" direction="horizontal" wrap>
              <Button
                size="large"
                type="primary"
                loading={isUpdating}
                onClick={handleChangeVisibility}
                disabled={selectedKeys.length < 1}
              >
                {activeButtonText}
              </Button>

              <Button
                danger
                size="large"
                loading={isDeleting}
                onClick={handleRemovingCoupons}
                disabled={selectedKeys.length < 1}
                icon={<DeleteIcon $disabled={selectedKeys.length < 1}><Delete /></DeleteIcon>}
              >
                Delete selected
              </Button>

              <Button
                size="large"
                type="primary"
                onClick={onCreateCodeClick}
                icon={<Plus style={{ marginRight: 8 }} />}
              >
                Create new promo code
              </Button>
            </Space>
          )}
        />
      </>

      <div>
        <ConfigProvider renderEmpty={renderEmpty}>
          <WideTable
            sticky
            rowKey="id"
            scroll={scroll}
            tableLayout="fixed"
            dataSource={couponsList}
            onChange={handleChange}
            summary={getTableSummary}
            rowSelection={rowSelection}
            pagination={tablePagination}
            loading={isLoading || isUpdating || isDeleting}
            columns={getTableColumns(promoCodesDefaultColumns, sortBy, sortOrder)}
          />
        </ConfigProvider>
      </div>
    </PromoCodesContainer>
  );
};

export default PromoCodeManagerTab;
