import { createSelector } from 'reselect';
import { memoize, orderBy } from 'lodash';

import { LoadingStatusEnum } from '../types';
import { getFilters, getSettings } from 'models/table-meta/selectors';

import type { Key } from 'react';
import type { IUserFilters } from './constants';
import type { RootState } from 'modules/store/types';
import type { ITableSettings } from 'modules/api-requests/types';

export const getUsersState = (state: RootState) => state.users;

export const isUsersLoading = createSelector(getUsersState, state => state.loading === LoadingStatusEnum.LOADING);

export const getUsersSelector = createSelector(
  getUsersState,
  getFilters,
  getSettings,
  (usersState, getFilterFunc, getSettingFunc) => memoize((path: string) => {
    const { alphaSearch = '' } = getFilterFunc<IUserFilters>(path);
    const { sortBy, sortDirection } = getSettingFunc<ITableSettings>(path);
    const usersBySearch = usersState.list;

    const usersByAlpha = (alphaSearch === '' || alphaSearch === 'all')
      ? usersBySearch
      : usersBySearch.filter(user => user.firstname?.toLowerCase().startsWith(alphaSearch));

    return sortBy && sortDirection
      ? orderBy(usersByAlpha, [sortBy], [String(sortDirection).toLowerCase() as 'asc' | 'desc'])
      : usersByAlpha;
  })
);

export const getUserByIdSelector = createSelector(
  getUsersState,
  usersState => memoize((id: Key) => usersState.list.find(user => user.sub === id))
);
