import type { IUserGroupType } from 'modules/api-requests/users/types';

export interface IUser {
  sub: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  groups: IUserGroupType[];
  enabled: boolean;
  courses: Array<{ id: string; name: string }>;
  courseIds?: string[];
}

export interface IUserFilters {
  search?: string;
  alphaSearch?: string;
}
