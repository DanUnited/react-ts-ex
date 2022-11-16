import { createSelector } from 'reselect';
import { get as _get, memoize } from 'lodash';
import { defaultSettings } from './constants';

import type { RootState } from 'modules/store/types';

export const getMetaState = (state: RootState) => state.tableMeta;

export const getFilters = createSelector(
  getMetaState,
  (state) =>  memoize(<T>(path: string) => {
    const filters = _get(state, [path, 'filters'], {});

    return filters as T;
  }),
);

export const getMeta = createSelector(
  getMetaState,
  (state) => memoize((path: string) => _get(state, [path, 'meta'], {})),
);

export const getSettings = createSelector(
  getMetaState,
  (state) => memoize(<T>(path: string) => _get(state, [path, 'settings'], defaultSettings) as T),
);
