import get from 'lodash/get';
import * as DefaultMoment from 'moment';
import { extendMoment } from 'moment-range';
import { ServerTimeFormat } from 'utils/date';

import type { ValidatorRule, RuleRender, Rule } from 'rc-field-form/lib/interface';
import type { IPeriodForm, IServerRate, ISeasonForm } from 'modules/api-requests/rates/types';

const moment = extendMoment(DefaultMoment);

export const getRateNameValidators = (rateList?: IServerRate[], isEdit?: boolean): Rule[] => [
  { required: true, message: 'Enter rate name' },
  {
    validator: async (rule, value) => {
      if (rateList && rateList.length && !isEdit) {
        if (rateList.map(rate => rate.name).includes(String(value))) {
          return Promise.reject('Such a rate name already exist');
        }
      }

      return Promise.resolve();
    }
  }
]

export const SeasonsValidatorRules: ValidatorRule[] = [{
  validator: async (_, seasons?: ISeasonForm[]) => {
    if (!seasons || seasons.length < 1) {
      return Promise.reject('Select at least one season');
    }
  }
}];

export const TimePeriodsValidatorRules: Array<ValidatorRule | RuleRender> = [
  ({ getFieldValue }) => ({
    validateTrigger: 'onBlur',
    validator(rule, season?: ISeasonForm) {
      // avoid Object.preventExtensions(season) via a new object
      const tPeriods: IPeriodForm[] = Object.assign([...season?.timePeriods || []] );
      const allSeasons = (getFieldValue('seasons') || []) as ISeasonForm[];

      if (season && allSeasons.length > 0) {
        const currentSeasonRange = moment.range(
          moment(get(season, ['seasonDate', 0], get(season, 'startDate'))),
          moment(get(season, ['seasonDate', 1], get(season, 'endDate'))),
        );

        allSeasons.forEach(_season => {
          if (season.id !== _season.id) {
            const range = moment.range(
              moment(get(_season, ['seasonDate', 0], get(_season, 'startDate'))),
              moment(get(_season, ['seasonDate', 1], get(_season, 'endDate'))),
            );

            if (range.overlaps(currentSeasonRange)) {
              tPeriods.push(...(_season.timePeriods || []));
            }
          }
        });

        if (tPeriods.length > 0) {
          const periodRanges = tPeriods
            .map(period => moment.range(
              moment(period.startTime, ServerTimeFormat),
              moment(period.endTime, ServerTimeFormat),
            ));

          let hasOverlap = false;

          periodRanges.forEach(range => {
            const overlap = periodRanges?.some(currentRange => {
              return !currentRange.isSame(range) &&
                range.overlaps(currentRange, { adjacent: true });
            });

            if (overlap) {
              hasOverlap = true;
            }
          })

          return hasOverlap ? Promise.reject('Time overlap is forbidden') : Promise.resolve();
        } else {
          return Promise.reject('Each season must contain at least one time period');
        }
      } else {
        return Promise.reject('No seasons data for correct validation');
      }
    }
  })];
