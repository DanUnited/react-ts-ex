import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import orderBy from 'lodash/orderBy';

import { LoadingStatusEnum } from '../types';
import { getFilters, getSettings } from 'models/table-meta/selectors';

import type { RootState } from 'modules/store/types';
import type { ITableSettings } from 'modules/api-requests/types';
import type { ICourseCouponsFilter } from 'modules/api-requests/coupons/types';

export const getCourseCouponsState = (state: RootState) => state.coupons;

export const courseCouponsLoadingSelector = createSelector(
  getCourseCouponsState,
  state => state.loading === LoadingStatusEnum.LOADING,
);

export const getCouponsSelector = createSelector(
  getCourseCouponsState,
  getFilters,
  getSettings,
  ({ items }, getFilterFunc, getSettingFunc) =>
    memoize((path: string) => {
      const { search = '' } = getFilterFunc<ICourseCouponsFilter>(path);
      const { sortBy, sortDirection } = getSettingFunc<ITableSettings>(path);

      const searchRegExp = new RegExp(search, 'gi');

      const itemsBySearch = items.filter((item) => {
        if (search === '') return true;

        return Object
          .values(item).filter(field => String(field).search(searchRegExp) >= 0)
          .length > 0
      });

      return sortBy && sortDirection
        ? orderBy(itemsBySearch, [sortBy], [String(sortDirection).toLowerCase() as 'asc' | 'desc'])
        : itemsBySearch;
    })
);
