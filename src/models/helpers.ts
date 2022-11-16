import { tableMetaActions } from './table-meta';
import { getSettings } from './table-meta/selectors';

import type { AnyAction } from '@reduxjs/toolkit';
import type { RootState } from 'modules/store/types';
import type { IListMeta, PendingAction } from 'models/types';
import type { IMetaResponse, ITableSettings } from 'modules/api-requests/types';

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending')
}

interface IPaginationRequest<R, P extends IListMeta> {
  thunkAPI: any;
  pagePath: string;
  asyncRequest: (param: P) => Promise<IMetaResponse<R, IListMeta>>;
  asyncRequestParams: P;
}

export async function returnPaginationRequest<R, P>({ thunkAPI, pagePath, asyncRequest, asyncRequestParams }: IPaginationRequest<R, P>): Promise<R> {
  const reservationSettings = getSettings(thunkAPI.getState() as RootState)(pagePath) as ITableSettings;
  const reservationResult = await asyncRequest({
    ...asyncRequestParams,
    page: reservationSettings?.current || 1,
    pageLimit: reservationSettings?.pageSize || 10,
  });

  const { meta } = reservationResult;

  thunkAPI.dispatch(tableMetaActions.setSettings({
    path: pagePath,
    data: {
      current: meta.page,
      total: meta.totalCount,
      pageSize: meta.pageLimit,
    },
  }));

  return reservationResult.data;
}
