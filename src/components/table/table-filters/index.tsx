import React, { useCallback } from 'react';

import { SEARCH_INPUT_MAX_LENGTH } from 'utils/constants';
import { SearchIcon } from 'components/icons/inputs/search-icon';
import { AdditionalFilters, TableFiltersContainer, StyledInput } from './elements';

import type { ReactNode } from 'react';
import type { InputProps } from 'antd/es/input';
import type { MetaRecord } from 'models/table-meta/types';

interface ITableFilters<T extends MetaRecord> {
  onFilterChange: (filterData: MetaRecord) => void;
  currentFilters: T;
  addonAfter?: ReactNode;
  searchProps?: InputProps;
}

export const TableFilters = <T extends MetaRecord>({
  onFilterChange,
  currentFilters,
  addonAfter,
  searchProps,
  ...props
}: ITableFilters<T>) => {
  const { search, ...filters } = currentFilters;

  const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      onFilterChange({
        search: event.target.value,
        ...filters,
      })
    }, [onFilterChange, filters]);

  return (
    <TableFiltersContainer {...props}>
      <StyledInput
        prefix={<SearchIcon />}
        placeholder="Search by name or email"
        maxLength={SEARCH_INPUT_MAX_LENGTH}
        onChange={onSearchInputChange}
        value={search}
        {...searchProps}
      />
      <AdditionalFilters>
        {addonAfter}
      </AdditionalFilters>
    </TableFiltersContainer>
  )
};
