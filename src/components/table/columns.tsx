import React from 'react';
import Column from 'antd/es/table/Column';
import { SortDirections } from 'modules/api-requests/types';

import type { ColumnType } from 'antd/lib/table';
import type { SortDirectionsTypes } from 'modules/api-requests/types';

export function renderColumns<RecordType>(
  customColumns: ColumnType<RecordType>[] = [],
  sortBy?: string,
  sortDirection?: SortDirectionsTypes,
) {
  return customColumns.map(({ dataIndex, fixed, ...item }: ColumnType<RecordType>, index) => {
    const sortOrder = sortBy === dataIndex && sortDirection
      ? (sortDirection === SortDirections.ASC ? 'ascend' : 'descend')
      : undefined;

    return (
      <Column
        {...item}
        render={item.render}
        dataIndex={dataIndex}
        key={String(dataIndex) ?? String(index)}
        sortOrder={sortOrder}
      />
    );
  });
}

export function getTableColumns<RecordType>(
  customColumns: ColumnType<RecordType>[] = [],
  sortBy?: string,
  sortDirection?: SortDirectionsTypes,
) {
  return customColumns.map(({ dataIndex, fixed, ...item }: ColumnType<RecordType>, index) => {
    const sortOrder = sortBy === dataIndex && sortDirection
      ? (sortDirection === SortDirections.ASC ? 'ascend' : 'descend')
      : undefined;

    return { ...item, sortOrder, dataIndex, fixed, key: String(dataIndex) ?? String(index) } as ColumnType<RecordType>;
  });
}
