import { createAction, createReducer } from '@reduxjs/toolkit';

import type { IAuthState, ISetFieldsAction } from './types';

export const authInitState: IAuthState = {
  username: '',
};

export const authActions = {
  setFields: createAction<ISetFieldsAction>('auth/setFields'),
  resetFields: createAction('auth/resetFields'),
};

export const authReducer = createReducer(
  authInitState,
  (builder) => {
    builder
      .addCase(authActions.setFields, (state, { payload }) => ({
        ...state,
        ...payload,
      }))
      .addCase(authActions.resetFields, () => authInitState)
  },
);
