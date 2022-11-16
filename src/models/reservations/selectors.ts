import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import orderBy from 'lodash/orderBy';

import { LoadingStatusEnum } from '../types';
import { getFilters, getSettings } from 'models/table-meta/selectors';

import type { RootState } from 'modules/store/types';
import type { ITableSettings } from 'modules/api-requests/types';

export const getCourseReservationsState = (state: RootState) => state.reservations;

export const courseReservationsLoadingSelector = createSelector(
  getCourseReservationsState,
  state => state.loading === LoadingStatusEnum.LOADING,
);

export const getReservationsSelector = createSelector(
  getCourseReservationsState,
  getFilters,
  getSettings,
  ({ items }, getFilterFunc, getSettingFunc) =>
    memoize((path: string) => {
      const { sortBy, sortDirection } = getSettingFunc<ITableSettings>(path);

      return sortBy && sortDirection
        ? orderBy(items, [sortBy], [String(sortDirection).toLowerCase() as 'asc' | 'desc'])
        : items;
    })
);
