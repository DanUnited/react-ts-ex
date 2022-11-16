import notification from 'antd/es/notification';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { LoadingStatusEnum } from '../types';
import { tableMetaActions } from '../table-meta';
import { asyncDebounce } from 'utils/async-debounce';
import { PathCreator, RoutePaths } from 'routing/constants';
import { getFilters, getSettings } from '../table-meta/selectors';
import { deleteUserRequest, getUsersRequest, setUserAccountActivity } from 'modules/api-requests/users';

import type { IUser } from './constants';
import type { PendingAction } from '../types';
import type { AnyAction } from '@reduxjs/toolkit';
import type { RootState } from 'modules/store/types';
import type { IUsersState, ISetUserActivityAction, IDeleteUserAction } from './types';

const pagePath = PathCreator[RoutePaths.USERS_MANAGEMENT].path;

const fetchUsersHandler = asyncDebounce(
  async (args, thunkAPI) => {
    const { search } = getFilters(thunkAPI.getState() as RootState)(pagePath);
    const { token, pageSize } = getSettings(thunkAPI.getState() as RootState)(pagePath);

    const tableData = await getUsersRequest({
      pageLimit: pageSize,
      search: search || undefined,
      paginationToken: !search ? (token || undefined) : undefined,
    });

    const { meta } = tableData;

    thunkAPI.dispatch(tableMetaActions.setSettings({
      path: pagePath,
      data: {
        token: meta.paginationToken,
        pageSize: meta.pageLimit,
      },
    }));

    return tableData.data;
  }, 250);

export const fetchUsersAction = createAsyncThunk<IUser[]>('users/getList', fetchUsersHandler);

export const setUserActivityAction = createAsyncThunk<void, ISetUserActivityAction>(
  'users/fetchByIdStatus',
  ({ active, sub }, thunkAPI) => {
    setUserAccountActivity(active, sub).then(() => {
      thunkAPI.dispatch(fetchUsersAction());

      if (active) {
        notification.success({
          message: 'User was successfully activated!',
          placement: 'topRight',
        });
      } else {
        notification.success({
          message: 'User was blocked!',
          placement: 'topRight',
        });
      }
    });
  },
);

export const deleteUserAction = createAsyncThunk<void, IDeleteUserAction>(
  'users/deleteById',
  ({ sub }, thunkAPI) => {
    deleteUserRequest(sub).then(() => {
      thunkAPI.dispatch(fetchUsersAction());

      notification.success({
        message: 'User was successfully deleted!',
        placement: 'topRight',
      });
    });
  },
);

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

const usersInitState: IUsersState = {
  list: [],
  loading: LoadingStatusEnum.IDLE,
};

export const usersReducer = createReducer(
  usersInitState,
  (builder) => {
    builder
      .addCase(fetchUsersAction.rejected, (state) => ({
        ...state,
        list: [],
        loading: LoadingStatusEnum.FAILED,
      }))
      .addCase(fetchUsersAction.fulfilled, (state, { payload }) => ({
        ...state,
        list: payload,
        loading: LoadingStatusEnum.SUCCESS,
      }))
      .addMatcher(isPendingAction, (state) => ({
        ...state,
        loading: LoadingStatusEnum.LOADING,
      }));
  },
);
