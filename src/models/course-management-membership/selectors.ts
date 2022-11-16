import { createSelector } from 'reselect';
import { memoize, orderBy } from 'lodash';

import { usersFixture } from './constants';
import { getFilters, getSettings } from 'models/table-meta/selectors';

import type { IMemberFilters } from './types';
import type { ITableSettings } from 'modules/api-requests/types';

export const getMembersSelector = createSelector(
  getFilters,
  getSettings,
  (getFilterFunc, getSettingFunc) => memoize((path: string) => {
    const { search = '', alphaSearch = '' } = getFilterFunc<IMemberFilters>(path);
    const { sortBy, sortDirection } = getSettingFunc<ITableSettings>(path);

    const searchRegExp = new RegExp(search, 'gi');

    const usersBySearch = usersFixture.filter((item) => {
      if (search === '') return true;

      return Object
        .values(item).filter(field => String(field).search(searchRegExp) >= 0)
        .length > 0
    });

    const usersByAlpha = (alphaSearch === '' || alphaSearch === 'all')
      ? usersBySearch
      : usersBySearch.filter(user => user.firstName.toLowerCase().startsWith(alphaSearch));

    return sortBy && sortDirection
      ? orderBy(usersByAlpha, [sortBy], [String(sortDirection).toLowerCase() as 'asc' | 'desc'])
      : usersByAlpha;
  })
);
