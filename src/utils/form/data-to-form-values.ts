import isEmpty from 'lodash/isEmpty';

import type { FieldData } from 'rc-field-form/lib/interface';

export const dataToFormValues = <T extends Record<string, any>>(data: T, excludes: string[] = [], subKey: string[] = []) => {
  const values: FieldData[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key) && !excludes.includes(key)) {
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        values.push(...dataToFormValues(data[key], undefined, [key]));
      } else {
        values.push({
          name: [...subKey, key],
          value: isEmpty(data[key]) && !(typeof data[key] == 'boolean') && !(typeof data[key] == 'number')
            ? undefined
            : data[key],
          touched: false,
        });
      }
    }
  }

  return values;
};
