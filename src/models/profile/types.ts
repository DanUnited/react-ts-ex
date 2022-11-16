import type { ValueOf } from 'routing/constants';
import type { ICourse } from 'modules/api-requests/courses/types';
import type { IGetCurrentUserResponse } from 'modules/api-requests/auth/types';

export enum SystemRolesEnum {
  USER = 'users',
  ADMIN = 'admins',
  MANAGER = 'managers',
  TRADER = 'traders',
}

export type SystemRolesType = ValueOf<SystemRolesEnum>;

export interface IProfileState extends Partial<IGetCurrentUserResponse> {
  groups: SystemRolesType[];
  course?: ICourse;
}
