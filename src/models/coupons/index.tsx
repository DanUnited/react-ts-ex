import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { LoadingStatusEnum } from 'models/types';
import { PathCreator, RoutePaths } from 'routing/constants';
import { isPendingAction, returnPaginationRequest } from '../helpers';
import { getCourseCouponsRequest } from 'modules/api-requests/coupons';

import type { ICoupon, IGetCouponsRequest } from 'modules/api-requests/coupons/types';

const pagePath = PathCreator[RoutePaths.LOYALTY_MANAGER].path;

export const fetchCourseCouponsAction = createAsyncThunk('coupons/get', async (courseId: string, thunkAPI) => {
  return returnPaginationRequest<ICoupon[], IGetCouponsRequest>({
    asyncRequest: (request) => getCourseCouponsRequest(request),
    asyncRequestParams: { courseId },
    thunkAPI,
    pagePath,
  });
});

interface ICourseCouponsState {
  items: ICoupon[];
  loading: LoadingStatusEnum;
  error?: string;
}

const courseCouponsInitState: ICourseCouponsState = {
  items: [],
  loading: LoadingStatusEnum.IDLE,
  error: undefined,
};

export const courseCouponsReducer = createReducer(
  courseCouponsInitState,
  (builder) => {
    builder
      .addCase(fetchCourseCouponsAction.rejected, (state, { payload }) => ({
        ...state,
        loading: LoadingStatusEnum.FAILED,
        error: payload as string,
      }))
      .addCase(fetchCourseCouponsAction.fulfilled, (state, { payload }) => ({
        items: payload,
        error: undefined,
        loading: LoadingStatusEnum.SUCCESS,
      }))
      .addMatcher(isPendingAction, (state) => ({
        ...state,
        loading: LoadingStatusEnum.LOADING,
      }));
  },
);
