import sortBy from 'lodash/sortBy';

import type { IWeekDay } from 'modules/api-requests/yields/types';
import type { RuleObject } from 'rc-field-form/lib/interface';

export const DaysValidator = (rule: RuleObject, values: IWeekDay[]) => {
  const sortedValues: IWeekDay[] = sortBy(values, record => record.from);
  let success = true;

  sortedValues.forEach((record, index, source) => {
    if (index > 0) {
      if ((record.from || 102) >= (record.to || 101)) {
        success = false;
      }
    }

    if (index < sortedValues.length - 1) {
      if ((record.to || 101) >= (source[index + 1].from || 102)) {
        success = false;
      }
    }
  })

  return success ? Promise.resolve() : Promise.reject('Utilization intervals should not overlap!');
}
