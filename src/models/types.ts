import { ValueOf } from '../routing/constants';
import { AsyncThunk } from '@reduxjs/toolkit';

export interface IListMeta {
  search?: string;
  totalCount?: number;
  pageLimit?: number;
  page?: number;
}

export enum LoadingStatusEnum {
  SUCCESS = 'fulfilled',
  FAILED = 'rejected',
  LOADING = 'pending',
  IDLE = 'idle',
}

export type LoadingStatusType = ValueOf<LoadingStatusEnum>

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
