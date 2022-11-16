import type { IListMeta } from 'models/types';

export interface IMetaState<T> {
  [key: string]: {
    settings?: T;
    filters?: T;
    meta?: IListMeta;
  };
}

export interface IMetaAction<T> {
  path: string;
  data: T;
}

export type MetaRecord = Record<string, any>;
