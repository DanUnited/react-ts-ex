import type { IUser } from './constants';
import type { LoadingStatusType } from '../types';

export interface IUsersState {
  list: IUser[],
  loading: LoadingStatusType;
}

export interface ISetUserActivityAction {
  active: boolean;
  sub: string;
}

export interface IDeleteUserAction {
  sub: string;
}
