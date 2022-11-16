import { get as _get } from 'lodash';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { defaultSettings } from './constants';

import type { IMetaAction, IMetaState, MetaRecord } from './types';

export interface ITableMetaState extends IMetaState<MetaRecord> {
}

export const tableMetaInitState: ITableMetaState = {}

export const tableMetaActions = {
  resetTableMeta: createAction('table-meta/resetMeta'),
  setFilters: createAction<IMetaAction<MetaRecord>>('table-meta/setFilters'),
  setSettings: createAction<IMetaAction<MetaRecord>>('table-meta/setSettings'),
  resetSettingsMeta: createAction<IMetaAction<MetaRecord>>('table-meta/resetSettingsMeta'),
}

export const tableMetaReducer = createReducer(
  tableMetaInitState,
  (builder) => {
    builder
      .addCase(tableMetaActions.setSettings, (state, { payload }) => {
        const { path, data } = payload;
        const existMeta = _get(state, [path], {});
        const existSettings = _get(state, [path, 'settings'], state);

        return {
          ...state,
          [path]: {
            ...existMeta,
            settings: {
              pageSize: defaultSettings.pageSize,
              ...existSettings,
              ...data,
            },
          },
        }
      })
      .addCase(tableMetaActions.setFilters, (state, { payload }) => {
        const { path, data } = payload;
        const existMeta = _get(state, [path], {});

        return {
          ...state,
          [path]: {
            ...existMeta,
            filters: data,
          },
        }
      })
      .addCase(tableMetaActions.resetTableMeta, () => tableMetaInitState)
      .addCase(tableMetaActions.resetSettingsMeta, (state, { payload }) => {
        const { path } = payload;
        const existMeta = _get(state, [path], {});
        const currentSettings = _get(existMeta, ['settings']);

        return {
          ...state,
          [path]: {
            ...existMeta,
            settings: {
              ...currentSettings,
              sortBy: undefined,
              sortDirection: undefined,
            },
          },
        };
      });
  }
);
