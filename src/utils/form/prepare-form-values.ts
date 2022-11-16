import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';

type AnyObjectType = Record<string | number, unknown>;

export function prepareFormValues<T extends AnyObjectType>(formValues: T): T {
  return mapValues(formValues, value => {
    if (typeof value === 'object') {
      return prepareFormValues(value as AnyObjectType);
    }

    if (value === undefined) {
      return undefined;
    }

    if (typeof value === 'boolean' || typeof value === 'number') return value;

    return isEmpty(value) ? null : value;
  }) as T;
}
