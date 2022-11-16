import { useCallback, useMemo } from 'react';

import useEventCallback from './use-event-callback';
import { tableMetaActions } from 'models/table-meta';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getFilters, getSettings } from 'models/table-meta/selectors';
import { getOnChangeTableAdapter, getSortFromSettings } from 'utils/table';

import type { ITableSettings } from 'modules/api-requests/types';

export function useTableData<SettingType extends ITableSettings, FiltersType>(path: string, fetchAction: (path: string) => void) {
  const dispatch = useAppDispatch();
  const getCurrentSettings = useAppSelector(getSettings);
  const getCurrentFilters = useAppSelector(getFilters);

  const settings = useMemo(() => getCurrentSettings<SettingType>(path), [getCurrentSettings, path]);
  const filters = useMemo(() => getCurrentFilters<FiltersType>(path), [getCurrentFilters, path]);

  const getList = useCallback(() => {
    fetchAction(path);
  }, [path, fetchAction]);

  const setSettings = useCallback(async (settings: ITableSettings) => {
    await dispatch(tableMetaActions.setSettings({
      path,
      data: settings,
    }));

    getList();
  }, [dispatch, path, getList]);

  const setFilters = useCallback(async (filters: FiltersType) => {
    await dispatch(tableMetaActions.setFilters({
      path,
      data: filters,
    }));

    getList();
  }, [dispatch, path, getList]);

  const [sortBy, sortOrder] = getSortFromSettings(settings);

  const handleChange = useEventCallback(getOnChangeTableAdapter(setSettings, settings));

  return {
    filters,
    setFilters,
    sortBy,
    sortOrder,
    handleChange,
  }
}
