import isNil from 'lodash/isNil';
import { createSelector } from 'reselect';

import type { RootState } from 'modules/store/types';

export const getProfileState = (state: RootState) => state.profile;

export const getProfileName = createSelector(
  getProfileState,
  (profileState) =>
    profileState.sub
      ? `${profileState.firstname} ${profileState.lastname}`
      : undefined
);

export const getProfileCourse = createSelector(
  getProfileState,
  (profileState) => profileState.course
);

export const isCourseUseYieldSelector = createSelector(
  getProfileCourse,
  course => isNil(course?.yieldActive) ? true : Boolean(course?.yieldActive),
)

export const courseWeatherActiveSelector = createSelector(
  getProfileCourse,
  course => Boolean(course?.weatherActive),
);

export const getCurrentCourseId = createSelector(
  getProfileState,
  (profileState) => profileState.course?.id as string
);

export const getProfileRoles = createSelector(
  getProfileState,
  (profileState) => profileState.groups,
);
