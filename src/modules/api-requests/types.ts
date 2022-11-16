import type { AxiosError } from 'axios';

export enum SortDirections {
  DESC = 'DESC',
  ASC = 'ASC',
}

export type SortDirectionsTypes = SortDirections.ASC | SortDirections.DESC;

export const mapTableSortToServer = {
  descend: SortDirections.DESC,
  ascend: SortDirections.ASC,
};

export interface ITableSettings {
  current: number;
  pageSize?: number;
  total?: number;
  sortBy?: string;
  sortDirection?: SortDirectionsTypes;
}

export interface IResponse<T> {
  data: T;
}

export interface IMetaResponse<T, M = unknown> extends IResponse<T> {
  meta: M;
}

export interface IAmazonError {
  message: string;
}

export interface IError extends IAmazonError {
  status: 'error';
  errorFields?: {
    field: string;
    error: string;
  }[];
}

export interface IMetaResponse<T, M = unknown> extends IResponse<T> {
  meta: M;
}

export interface ITableResponse<T> extends IResponse<T> {
  meta: ITableSettings;
}

export type IApiError = AxiosError | Error;

export interface IEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
