import isNil from 'lodash/isNil';
import uniqBy from 'lodash/uniqBy';
import mapValues from 'lodash/mapValues';
import { sortTimePeriods } from 'utils/sort';

import type { ISeasonResponse } from 'modules/api-requests/seasons/types';
import type { IServerTimePeriod } from 'modules/api-requests/time-period/types';
import type { IRatePrice, OverrideDaysType } from 'modules/api-requests/rates/types';
import type { IChildRate, IServerRate, IRateTableForm, ISeasonForm, IRate } from 'modules/api-requests/rates/types';

export class RateTableAdaptor {
  public static toServerRate(data: IRateTableForm & {
    courseId: string,
    seasons: ISeasonForm[],
  }): IServerRate {
    const ratePrices: IRatePrice[] = [];

    data.seasons.forEach(season => {
      season.timePeriods.forEach(period => {
        ratePrices.push({
          rateId: data.id as string,
          seasonId: season.id as string,
          timePeriodId: period.id as string,
          pricesWeekDay: period.overrideDays,
        })
      })
    });

    return {
      id: data.id as string,
      isActive: data.isActive === undefined ? true : data.isActive,
      availableDays: data.availableDays,
      options: (data.options || []).filter(option => option?.id),
      description: data.description,
      name: data.name,
      prices: ratePrices,
      holes: data.holes,
      useTransactionFee: Boolean(data.useTransactionFee),
    };
  }

  private static calculateOverrideDays(days: OverrideDaysType, childRate?: IChildRate) {
    if (!childRate) {
      return days;
    }

    const { discountType, discount } = childRate;
    const returnPositiveValue = (value: number) => value >= 0 ? value : 0;

    return mapValues(days, item => {
      if (isNil(item)) {
        return item;
      }

      if (discountType === 'Dollar') {
        return returnPositiveValue(item + discount);
      }

      if (discountType === 'Percent') {
        if (discount === 0) {
          return item;
        }

        return returnPositiveValue(item * discount / 100);
      }
    });
  }

  public static toRateTableForm(
    data: IRate,
    _seasons: ISeasonResponse[],
    _timePeriods: IServerTimePeriod[],
    childRate?: IChildRate,
  ): IRateTableForm {
    return {
      id: data.id,
      name: data.name,
      holes: data.holes,
      options: data.options,
      isActive: data.isActive,
      description: data.description,
      availableDays: data.availableDays,
      useTransactionFee: data.useTransactionFee,
      seasons: uniqBy(data.prices
        .filter(price => _seasons.find(_season => _season.id === price.seasonId))
        .map(price => {
          const rateTimePeriods = data.prices
            .filter(_price => _price.seasonId === price.seasonId)
            .map(price => price.timePeriodId);

          const originalSeason = _seasons.find(_season => _season.id === price.seasonId) as ISeasonResponse;

          return {
            id: price.seasonId as string,
            seasonName: originalSeason.name,
            seasonDate: [originalSeason.startDate, originalSeason.endDate],
            timePeriods: _timePeriods
              .filter(tPeriod => rateTimePeriods.includes(tPeriod.id))
              .map(period => {
                const periodWeekDays = data.prices.find(price => price.timePeriodId === period.id)?.pricesWeekDay as OverrideDaysType;

                return {
                  id: period.id as string,
                  seasonId: price.seasonId,
                  endTime: period?.endTime,
                  startTime: period?.startTime,
                  timePeriodName: period?.name,
                  overrideDays: this.calculateOverrideDays(periodWeekDays, childRate),
                };
              })
              .sort(sortTimePeriods),
          };
        })
        , 'id'),
    };
  }
}
