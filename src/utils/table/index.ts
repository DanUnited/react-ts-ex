import { get as _get } from 'lodash';
import { defaultSettings } from 'models/table-meta/constants';
import { mapTableSortToServer, SortDirectionsTypes } from 'modules/api-requests/types';

import type { ITableSettings } from 'modules/api-requests/types';
import type { ColumnType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

export const getColumnsWidth = <T>(prev: number, current: ColumnType<T>) => prev + (Number(current.width) || 200);

export const getOnChangeTableAdapter = (onChange: (_: ITableSettings) => void, settings: ITableSettings) => (
  config: TablePaginationConfig,
  _filters: Record<string, FilterValue | null>,
  sortResult: SorterResult<any> | SorterResult<any>[],
) => {
  const { field, order }: SorterResult<any> = Array.isArray(sortResult)
    ? sortResult[0]
    : sortResult;

  const sortBy = field as string;
  const sortDirection = order && (mapTableSortToServer as any)[order];

  const current = (config.current || 1);
  const pageSize = config.pageSize || defaultSettings.pageSize;

  onChange({ ...settings, pageSize, current, sortBy, sortDirection });
};

export const getSortFromSettings = (
  settings: ITableSettings,
): [string | undefined, SortDirectionsTypes | undefined] => {
  const sortBy = _get(settings, ['sortBy']);
  const sortOrder = _get(settings, ['sortDirection']);

  return [sortBy, sortOrder];
};
