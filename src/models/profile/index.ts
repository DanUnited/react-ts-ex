import { createAction, createReducer } from '@reduxjs/toolkit';
import { SystemRolesEnum } from './types';

import type { IProfileState } from './types';
import type { ICourse } from 'modules/api-requests/courses/types';

export const profileInitState: IProfileState = {
  groups: [SystemRolesEnum.USER],
};

export const profileActions = {
  setFields: createAction<Partial<IProfileState>>('auth/setFields'),
  resetFields: createAction('auth/resetFields'),
  setCourse: createAction<ICourse>('auth/setCourse'),
};

export const profileReducer = createReducer(
  profileInitState,
  (builder) => {
    builder
      .addCase(profileActions.setFields, (state, { payload }) => ({
        ...state,
        ...payload,
      }))
      .addCase(profileActions.resetFields, () => profileInitState)
      .addCase(profileActions.setCourse, (state, { payload }) => ({
        ...state,
        course: payload,
      }))
  },
);
