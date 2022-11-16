import { UserGroupEnum } from './constants';

import type { IListMeta } from 'models/types';
import type { ValueOf } from 'routing/constants';

export type ICreateUserRequest = {
  email: string;
  phoneNumber: string;
  password: string;
  firstname: string;
  lastname: string;
  courseIds?: string[];
};

export type IUserGroupType = ValueOf<UserGroupEnum>

export interface ICreateUserResponse extends ICreateUserRequest {
  sub: string;
}

export interface IGetUsersRequest extends IListMeta {
  paginationToken?: string;
}

export interface IGetUserMeta {
  pageLimit?: number;
  paginationToken?: string;
}

export interface ISetUserGroupRequest {
  sub: string;
  groups: IUserGroupType[];
}

export interface IAttachUserToCourseRequest {
  courseId: string;
  userSub: string;
}

export interface IUsersSettings {
  token?: string | null;
  pageSize?: number;
}
