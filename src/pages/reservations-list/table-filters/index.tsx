import React from 'react';
import { TableFilters } from 'components/table/table-filters';

import type { MetaRecord } from 'models/table-meta/types';
import type { IUserFilters } from 'models/users/constants';

interface ITableReservationFilters<T extends MetaRecord> {
  onFilterChange: (filterData: MetaRecord) => void;
  currentFilters: T;
}

export const TableReservationFilters = ({ onFilterChange, currentFilters }: ITableReservationFilters<IUserFilters>) => (
  <TableFilters currentFilters={currentFilters} onFilterChange={onFilterChange} />
);
