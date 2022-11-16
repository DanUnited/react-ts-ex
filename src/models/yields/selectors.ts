import { createSelector } from 'reselect';
import { LoadingStatusEnum } from '../types';

import type { RootState } from 'modules/store/types';

export const getYieldsState = (state: RootState) => state.yields;

export const yieldDateSelector = createSelector(getYieldsState, state => state.data);

export const yieldsLoadingSelector = createSelector(getYieldsState, state => state.loading === LoadingStatusEnum.LOADING);
