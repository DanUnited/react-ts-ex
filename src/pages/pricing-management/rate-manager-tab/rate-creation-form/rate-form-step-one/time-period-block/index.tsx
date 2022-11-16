import React, { useMemo } from 'react';
import xor from 'lodash/xor';
import Divider from 'antd/es/divider';

import { TimePeriod } from './time-period';
import { useAppSelector } from 'utils/hooks';
import { DividerContainer } from '../elements';
import { TimePeriodBlockContainer } from './elements';
import { RateTableAdaptor } from '../../rate-table-adaptor';
import { childRateSelector, rateEntitySelector } from 'models/rates/selectors';
import { sortTimePeriods } from 'utils/sort';

import type { ISeasonForm } from 'modules/api-requests/rates/types';
import type { ISeasonResponse } from 'modules/api-requests/seasons/types';
import type { IServerTimePeriod } from 'modules/api-requests/time-period/types';

interface ITimePeriodBlockProps {
  value?: ISeasonForm;
  seasonList?: ISeasonResponse[];
  timePeriodsList?: IServerTimePeriod[];
  onTimePeriodsChange?: (values: IServerTimePeriod[]) => void;
}

export const TimePeriodBlock = ({
  value,
  onTimePeriodsChange,
  seasonList = [],
  timePeriodsList = [],
}: ITimePeriodBlockProps) => {
  const childRate =  useAppSelector(childRateSelector);
  const currentRateEntity = useAppSelector(rateEntitySelector);
  const currentSeason = seasonList?.find(season => season.id === value?.id);

  const timePeriodsIds = useMemo(() => {
    if (value && value?.timePeriods) {
      return value?.timePeriods.map(period => String(period.id));
    }

    return []
  }, [value]);

  const onTimePeriodCallback = (periodId: string) => () => {
    const updatedPeriodIds = xor(timePeriodsIds, [periodId]);

    if (onTimePeriodsChange) {
      const convertedRate = currentRateEntity && RateTableAdaptor.toRateTableForm(currentRateEntity, seasonList, timePeriodsList, childRate);

      onTimePeriodsChange(timePeriodsList
        ?.filter(timePeriod => updatedPeriodIds.includes(timePeriod.id))
        ?.map(period => ({
          ...period,
          overrideDays: convertedRate?.seasons
            ?.find(s => s.id === currentSeason?.id)
            ?.timePeriods
            ?.find(p => p.id === period.id)
            ?.overrideDays,
        })));
    }
  }

  return (
    <TimePeriodBlockContainer>
      <DividerContainer>
        <Divider orientation="left">{currentSeason?.name}</Divider>
      </DividerContainer>

      {currentSeason && timePeriodsList
        ?.filter(period => period.seasonId === currentSeason.id)
        ?.sort(sortTimePeriods)
        ?.map(period => (
          <TimePeriod
            value={period}
            key={period.id}
            onClickCallback={onTimePeriodCallback(period.id)}
            selected={timePeriodsIds.includes(period.id)}
          />
        ))}
    </TimePeriodBlockContainer>
  );
};
