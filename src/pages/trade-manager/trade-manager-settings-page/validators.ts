import groupBy from 'lodash/groupBy';
import * as DefaultMoment from 'moment';
import { extendMoment } from 'moment-range';

import { ServerTimeFormat, TimeFormat } from 'utils/date';

import type { ValidatorRule, FormInstance } from 'rc-field-form/lib/interface';
import type { ITradeRoundForm } from 'modules/api-requests/trade-rounds/types';

const moment = extendMoment(DefaultMoment);

const displayTime = (time: string) => moment(time, ServerTimeFormat).format(TimeFormat);

export const tradeRoundValidatorRules: ValidatorRule[] = [{
  validator: async (_, tradeRounds?: ITradeRoundForm[]) => {
    let error: null | string = null;
    const applyError = (message: string) => error = message;

    if (tradeRounds && tradeRounds?.length > 0) {
      const groupedTradeRounds = groupBy(tradeRounds, item => item.rateId);

      for (const [, tradeRoundsCollection] of Object.entries(groupedTradeRounds)) {
        if (tradeRoundsCollection.length > 1) {
          tradeRoundsCollection.forEach((item, index) => {
            tradeRoundsCollection.forEach((_item, _index) => {
              if (index !== _index) {
                const currentSeasonRange = moment.range(
                  moment(_item.startTime, ServerTimeFormat),
                  moment(_item.endTime, ServerTimeFormat)
                );

                const range = moment.range(
                  moment(item.startTime, ServerTimeFormat),
                  moment(item.endTime, ServerTimeFormat)
                );

                if (range.overlaps(currentSeasonRange)) {
                  applyError(`Time overlap is forbidden! Time overlapping: ${displayTime(_item.startTime)} - ${displayTime(_item.endTime)} and ${displayTime(item.startTime)} - ${displayTime(item.endTime)}`);
                }
              }
            })
          });
        }
      }
    }

    return error === null ? Promise.resolve() : Promise.reject(error);
  }
}];

export const getLimitValueValidator = ({ getFieldsValue }: FormInstance) => ({
  validator() {
    const { tradeMonthLimit = 0, tradeWeekLimit = 0, tradeDayLimit = 0 } = getFieldsValue();
    let isLimitRight = (tradeMonthLimit >= tradeWeekLimit) && (tradeWeekLimit >= tradeDayLimit);

    if (tradeMonthLimit + tradeWeekLimit + tradeDayLimit === 0) {
      return Promise.reject('At least one field is required');
    }

    if(!tradeMonthLimit) {
      isLimitRight = tradeWeekLimit >= tradeDayLimit;

      if(!tradeWeekLimit) {
        isLimitRight = tradeDayLimit >= 0;
      }
    }

    return isLimitRight ? Promise.resolve() : Promise.reject('Wrong field value');
  },
});
