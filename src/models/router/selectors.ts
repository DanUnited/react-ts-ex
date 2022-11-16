import { createSelector } from 'reselect';

import type { RootState } from 'modules/store/types';
import type { IRouterState } from './index';

export const getRouterState = (state: RootState): IRouterState => state.router;

export const getLocationState = createSelector(
  getRouterState,
  (routerState) => routerState.location,
);
