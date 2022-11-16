import set from 'lodash/set';
import { LoadingStatusEnum } from '../types';
import { getYieldsRequest } from 'modules/api-requests/yields';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import type { PropertyPath } from 'lodash';
import type { IYield } from 'modules/api-requests/yields/types';

interface IYieldsState {
  data: IYield;
  loading: LoadingStatusEnum;
  error: unknown;
}

export const initialYieldsState: IYieldsState = {
  data: {
    rateId: '',
    seasonId: '',
    timePeriodId: '',
    weekDays: [],
    daysOut: [],
  },
  loading: LoadingStatusEnum.IDLE,
  error: undefined,
};

export const fetchYieldsAction = createAsyncThunk('yields/get', getYieldsRequest);

export const yieldsActions = {
  resetState: createAction('yields/reset'),
  updateYieldValues: createAction<Partial<IYield>>('yields/updateValues'),
  setPathValues: createAction<{ path: PropertyPath, value: unknown }>('yields/setPathValues'),
  setYields: createAction<IYield>('yields/setYields'),
};

export const yieldsReducer = createReducer(
  initialYieldsState,
  (builder => {
    builder
      .addCase(yieldsActions.resetState, () => initialYieldsState)
      .addCase(yieldsActions.updateYieldValues, (state, { payload }) => {
        state.data = { ...state.data, ...payload };
      })
      .addCase(yieldsActions.setPathValues, (state, { payload }) => {
        const { value, path } = payload;
        set(state, path, value);
      })
      .addCase(yieldsActions.setYields, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(fetchYieldsAction.rejected, (state, { payload }) => ({
        ...state,
        loading: LoadingStatusEnum.FAILED,
        error: payload,
      }))
      .addCase(fetchYieldsAction.fulfilled, (state, { payload }) => ({
        ...state,
        data: payload,
        error: undefined,
        loading: LoadingStatusEnum.SUCCESS,
      }))
      .addCase(fetchYieldsAction.pending, (state) => ({
        ...state,
        loading: LoadingStatusEnum.LOADING,
      }));
  })
);
