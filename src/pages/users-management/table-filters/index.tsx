import React, { useCallback } from 'react';

import { AlphaFilter } from '../alpha-filter';
import { TableFilters } from 'components/table/table-filters';

import type { MetaRecord } from 'models/table-meta/types';
import type { IUserFilters } from 'models/users/constants';

interface ITableUserFilters<T extends MetaRecord> {
  onFilterChange: (filterData: MetaRecord) => void;
  currentFilters: T;
}

export const TableUserFilters = ({ onFilterChange, currentFilters }: ITableUserFilters<IUserFilters>) => {
  const { search, alphaSearch } = currentFilters;

  const onAlphaFilterChange = useCallback((letter: string) => {
    onFilterChange({
      alphaSearch: letter,
      search,
    })
  }, [onFilterChange, search])

  return (
    <TableFilters
      searchProps={{
        placeholder: 'Search by name',
      }}
      onFilterChange={onFilterChange}
      currentFilters={currentFilters}
      addonAfter={<AlphaFilter activeLetter={alphaSearch} onChange={onAlphaFilterChange} />}
    />
  )
};
