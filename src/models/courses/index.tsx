import { createAction, createReducer } from '@reduxjs/toolkit';

import type { ICourse } from 'modules/api-requests/courses/types'

export const coursesActions = {
  setCourses: createAction<ICourse[]>('courses/setCourses'),
};

export const coursesReducer = createReducer(
  [] as ICourse[],
  (builder => {
    builder.addCase(coursesActions.setCourses, (state, { payload }) => {
      return payload;
    })
  })
);
