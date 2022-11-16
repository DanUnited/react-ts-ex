import axios from 'modules/api-client/request';

import { handleAmazonMessage } from 'modules/api-client/response';

import type {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenRequest,
  IUpdatePasswordRequest,
  IChangePasswordRequest,
  IGetCurrentUserResponse,
  IChangePasswordResponse,
  IUpdatePasswordResponse,
  IRecoveryPasswordRequest,
  IRecoveryPasswordResponse,
  ILoginUpdatePasswordError,
  IUpdateProfileAttributesRequest,
  IConfirmRecoveryPasswordRequest,
  IConfirmRecoveryPasswordResponse,
  IUpdateProfileAttributesResponse,
} from './types';

export const loginRequest = (data: ILoginRequest): Promise<ILoginResponse | ILoginUpdatePasswordError> => {
  return axios.post<ILoginRequest, ILoginResponse | ILoginUpdatePasswordError>('/admin/signin', data);
};

export function isChangePasswordSuccess(response: IUpdatePasswordResponse | ILoginUpdatePasswordError): response is IUpdatePasswordResponse {
  return (response as IUpdatePasswordResponse).AuthenticationResult !== undefined;
}

export const updatePasswordRequest = (data: IUpdatePasswordRequest) => {
  return axios.post<IUpdatePasswordRequest, IUpdatePasswordResponse | ILoginUpdatePasswordError>('/customers/signin', data)
    .catch(handleAmazonMessage)
    .catch(error => {
      return error === 'Incorrect username or password.'
        ? Promise.reject('Incorrect current password')
        : Promise.reject(error);
    });
}

export const getCurrentUserRequest = (): Promise<IGetCurrentUserResponse> => {
  return axios.get<void, IGetCurrentUserResponse>('/customers/me')
    .catch(handleAmazonMessage);
};

export const refreshTokenRequest = (data: IRefreshTokenRequest) => {
  return axios.post<IRefreshTokenRequest, ILoginResponse>('/customers/signin', data)
    .catch(handleAmazonMessage);
};

export const changePasswordRequest = (data: IChangePasswordRequest) => {
  return axios.post<IChangePasswordRequest, IChangePasswordResponse>('/customers/change-password', data)
    .catch(handleAmazonMessage);
}

export const updateProfileAttributesRequest = (data: IUpdateProfileAttributesRequest) => {
  return axios.put<IUpdateProfileAttributesRequest, IUpdateProfileAttributesResponse>('/customers/update-attributes', data)
    .catch(handleAmazonMessage);
};

export const recoveryPasswordRequest = (data: IRecoveryPasswordRequest) => {
  return axios.post<IRecoveryPasswordRequest, IRecoveryPasswordResponse>('/customers/forgot-password', data)
    .catch(handleAmazonMessage);
}

export const confirmRecoveryPasswordRequest = (data: IConfirmRecoveryPasswordRequest) => {
  return axios.post<IConfirmRecoveryPasswordRequest, IConfirmRecoveryPasswordResponse>('/customers/confirm-password', data)
    .catch(handleAmazonMessage);
}
