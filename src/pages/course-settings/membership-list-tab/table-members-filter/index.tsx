import React, { useCallback } from 'react';

import { TableFilters } from 'components/table/table-filters';
import { AlphaFilter } from 'pages/users-management/alpha-filter';

import type { MetaRecord } from 'models/table-meta/types';

interface ITableUserFilters<T extends MetaRecord> {
  onFilterChange: (filterData: MetaRecord) => void;
  currentFilters: T;
}

export const TableMembersFilter = ({ onFilterChange, currentFilters }: ITableUserFilters<any>) => {
  const { search, alphaSearch } = currentFilters;

  const onAlphaFilterChange = useCallback((letter: string) => {
    onFilterChange({
      alphaSearch: letter,
      search,
    })
  }, [onFilterChange, search]);

  return (
    <TableFilters
      onFilterChange={onFilterChange}
      currentFilters={currentFilters}
      addonAfter={
        <AlphaFilter activeLetter={alphaSearch} onChange={onAlphaFilterChange} />
      }
    />
  )
};
