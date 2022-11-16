import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Space from 'antd/es/space';
import Select from 'antd/es/select';

import { ControlText } from './elements';
import { tableMetaActions } from 'models/table-meta';
import { ServerTimeFormat, TimeFormat } from 'utils/date';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { fetchYieldsAction, yieldsActions } from 'models/yields';
import { useRateList } from 'modules/api-requests/rates/queries';
import { useSeasonsList } from 'modules/api-requests/seasons/queries';
import { useTimePeriodsList } from 'modules/api-requests/time-period/queries';

import type { SelectValue } from 'antd/es/select';
import type { FormInstance } from 'antd/es/form/Form';

const { Option } = Select;

interface IYieldManagerFilters {
  form: FormInstance;
}

export const YieldManagerFilters = ({ form }: IYieldManagerFilters) => {
  const dispatch = useAppDispatch();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [currentRate, setCurrentRate] = useState<SelectValue>();
  const [currentSeason, setCurrentSeason] = useState<SelectValue>();
  const [currentTPeriod, setCurrentTPeriod] = useState<SelectValue>();

  useEffect(() => {
    dispatch(yieldsActions.updateYieldValues({ courseId: currentCourseId }));
  }, [currentCourseId, dispatch]);

  useEffect(() => {
    if (currentCourseId && currentSeason && currentRate && currentTPeriod) {
      dispatch(yieldsActions.updateYieldValues({
        id: undefined,
        rateId: currentRate as string,
        seasonId: currentSeason as string,
        timePeriodId: currentTPeriod as string,
        weekDays: [],
        daysOut: [],
      }));

      dispatch(fetchYieldsAction({
        courseId: currentCourseId,
        seasonId: currentSeason as string,
        rateId: currentRate as string,
        timePeriodId: currentTPeriod as string,
      }));
    }
  }, [currentCourseId, dispatch, currentSeason, currentRate, currentTPeriod]);

  const { data: rateList, isFetching: isRateListLoading } = useRateList(currentCourseId);

  const { data: seasonList, isFetching: isSeasonListLoading } = useSeasonsList(currentCourseId);

  const seasonIds = useMemo(() => currentRate && rateList
    ? rateList.find(rate => rate.id === currentRate)?.prices.map(price => price.seasonId)
    : [], [currentRate, rateList]);

  const { data: timePeriodList, isLoading: isTimePeriodsLoading } = useTimePeriodsList(currentCourseId);

  const onSelectRateChange = useCallback((value: SelectValue) => {
    setCurrentRate(value);
    setCurrentSeason(undefined);
    setCurrentTPeriod(undefined);

    dispatch(tableMetaActions.setFilters({
      path: PathCreator[RoutePaths.PRESETS_MANAGER_YIELD].path,
      data: {},
    }));

    form.resetFields();
  }, [dispatch, form]);

  const setYieldFilters = useCallback((timePeriodValue: SelectValue) => {
    setCurrentTPeriod(timePeriodValue);

    dispatch(tableMetaActions.setFilters({
      path: PathCreator[RoutePaths.PRESETS_MANAGER_YIELD].path,
      data: {
        rate: currentRate,
        season: currentSeason,
        timePeriod: timePeriodValue,
      },
    }));
  }, [dispatch, currentRate, currentSeason]);

  const onSelectSeasonChange = useCallback((value: SelectValue) => {
    setCurrentSeason(value);
    setCurrentTPeriod(undefined);

    dispatch(tableMetaActions.setFilters({
      path: PathCreator[RoutePaths.PRESETS_MANAGER_YIELD].path,
      data: {},
    }));

    form.resetFields();
  }, [dispatch, form]);

  useEffect(() => {
    if (currentCourseId) {
      setCurrentRate(undefined);
      setCurrentSeason(undefined);
      setCurrentTPeriod(undefined);

      dispatch(tableMetaActions.setFilters({
        path: PathCreator[RoutePaths.PRESETS_MANAGER_YIELD].path,
        data: {},
      }));

      form.resetFields();
    }
  }, [currentCourseId, dispatch, form]);

  const timePriodIds = useMemo(() => {
    const seasonTimePeriods = currentSeason && timePeriodList
      ? timePeriodList.filter(period => period.seasonId === currentSeason).map(period => period.id)
      : [];
    const rateTimePeriods = rateList
      ?.find(rate => rate.id === currentRate)
      ?.prices
      ?.map(price => price?.timePeriodId) || [];
    return seasonTimePeriods.filter(x => rateTimePeriods.includes(x))
  }, [currentRate, currentSeason, rateList, timePeriodList]);

  return (
    <Space wrap>
      <ControlText>Rate:</ControlText>
      <Select
        placeholder="Select rate"
        loading={isRateListLoading}
        onChange={onSelectRateChange}
        value={currentRate}
        style={{ width: 100 }}
      >
        {rateList && rateList.map(rate =>
          <Option value={rate.id} key={rate.id}>{rate.name}</Option>
        )}
      </Select>

      <ControlText>Season:</ControlText>
      <Select
        loading={isSeasonListLoading}
        disabled={!Boolean(currentRate)}
        placeholder="Select season"
        onChange={onSelectSeasonChange}
        value={currentSeason}
        style={{ width: 150 }}
      >
        {seasonIds && seasonList && seasonList
          .filter(season => seasonIds.includes(season.id))
          .map(season => (
            <Option value={season.id} key={season.id}>{season.name}</Option>
          ))}
      </Select>

      <ControlText>Time period:</ControlText>
      <Select
        loading={isTimePeriodsLoading}
        placeholder="Select time period"
        onChange={setYieldFilters}
        value={currentTPeriod}
        disabled={!Boolean(currentSeason)}
        style={{ width: 150 }}
      >
        {timePriodIds && seasonList && timePeriodList && timePeriodList
          .filter(period => timePriodIds.includes(period.id))
          .map(period => (
            <Option value={period.id} key={period.id}>
              {moment(period.startTime, ServerTimeFormat).format(TimeFormat)} -
              {moment(period.endTime, ServerTimeFormat).format(TimeFormat)}
            </Option>
          ))
        }
      </Select>
    </Space>
  );
};
