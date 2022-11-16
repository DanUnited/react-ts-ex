import type { IAmazonError } from '../types';
import type { ValueOf } from 'routing/constants';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  AccessToken: string;
  IdToken: string;
  RefreshToken: string;
  ExpiresIn: number; // default is 3600
  TokenType: string; // default is "Bearer"
}

export enum ILoginErrorCodeEnum {
  UserNotConfirmedException = 'UserNotConfirmedException',
}

export type ILoginErrorCodeType = ValueOf<ILoginErrorCodeEnum>;

export interface ILoginError extends IAmazonError {
  code: ILoginErrorCodeType;
}

export enum ILoginChallengeNameEnum {
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
}

export type ChallengeNameType = ValueOf<ILoginChallengeNameEnum>;

export interface ILoginUpdatePasswordError extends IAmazonError {
  ChallengeName: ChallengeNameType;
  RequiredAttriutes: string[];
}

export interface IGetCurrentUserResponse {
  sub: string;
  email: string;
  emailVerified: boolean;
  lastname: string;
  firstname: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface IUpdatePasswordRequest {
  username: string;
  password: string;
  new_password: string;
  given_name: string;
  family_name: string;
}

export interface IUpdatePasswordResponse {
  AuthenticationResult: ILoginResponse;
  ChallengeParameters: Record<string, unknown>;
}

export interface IEmailConfirmRequest {
  username: string;
  code: string;
}

export interface IChangePasswordRequest {
  newPassword: string;
  oldPassword: string;
}

export interface IChangePasswordResponse {
  message: 'Done';
}

export interface IChangePasswordError extends IAmazonError {
  code: 'NotAuthorizedException';
}

export interface IUpdateProfileAttributesRequest {
  lastname: string;
  firstname: string;
  phoneNumber: string;
  city: string;
  buildingAddress: string;
  state: string;
  postalCode: string;
}

export interface IUpdateProfileAttributesResponse extends IGetCurrentUserResponse {
}

export interface IRecoveryPasswordRequest {
  email: string;
}

export interface IRecoveryPasswordResponse {
  CodeDeliveryDetails: {
    AttributeName: 'email',
    DeliveryMedium: 'EMAIL',
    Destination: string;
  }
}

export interface IConfirmRecoveryPasswordRequest extends IRecoveryPasswordRequest {
  newPassword: string;
  code: string;
}

export interface IConfirmRecoveryPasswordResponse {
  message: string;
}
