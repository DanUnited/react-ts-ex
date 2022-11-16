import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type {
  IGetUsersRequest,
  ICreateUserRequest,
  ICreateUserResponse,
  ISetUserGroupRequest,
  IAttachUserToCourseRequest,
} from './types';

import type { IGetUserMeta } from './types';
import type { IMetaResponse } from '../types';
import type { IUser } from 'models/users/constants';

export const createUserRequest = (data: ICreateUserRequest): Promise<ICreateUserResponse> => {
  return axios.post<ICreateUserRequest, ICreateUserResponse>('/admin/users', data)
    .catch(handleAmazonMessage);
};

export const getUsersRequest = (params?: IGetUsersRequest) => {
  return axios.get<void, IMetaResponse<IUser[], IGetUserMeta>>('/admin/users', { params })
    .catch(handleAmazonMessage);
};

export const getUserByIdRequest = (userId: string) => {
  return axios.get<void, IUser>(`/admin/users/${userId}`)
    .catch(handleAmazonMessage);
};

export const getUserManagersRequest = () => {
  return axios.get<void, IUser[]>('/admin/users/managers')
    .catch(handleAmazonMessage);
};

export const setUserAccountActivity = (active: boolean, sub: string) => {
  return axios.put<void, IUser[]>(`/admin/users/${active ? 'enable' : 'disable'}`, { sub })
    .catch(handleAmazonMessage);
};

export const setUserGroupRequest = (data: ISetUserGroupRequest) => {
  return axios.put<void, IUser[]>('/admin/users/update-groups', data)
    .catch(handleAmazonMessage);
};

export const attachUserToCourseRequest = (data: IAttachUserToCourseRequest) => {
  return axios.put<IAttachUserToCourseRequest, void>('/admin/courses/attach-user', data)
    .catch(handleAmazonMessage);
};

export const detachUserToCourseRequest = (data: IAttachUserToCourseRequest) => {
  return axios.put<IAttachUserToCourseRequest, void>('/admin/courses/detach-user', data)
    .catch(handleAmazonMessage);
};

export const deleteUserRequest = (userId: string) => {
  return axios.delete<void, void>(`/admin/users/${userId}`)
    .catch(handleAmazonMessage);
};
