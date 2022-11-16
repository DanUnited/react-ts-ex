import type { RuleObject } from 'rc-field-form/lib/interface';

export const zipcodeValidator = (rule: RuleObject, value: string) => {
  const digitsRegex = new RegExp(/\d/);
  if(!digitsRegex.test(value)) {
    return Promise.reject('Only digits allowed');
  } else if (value.length > 7) {
    return Promise.reject('Maximum 7 characters');
  }
  return Promise.resolve();
};
