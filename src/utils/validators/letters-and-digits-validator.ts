import type { RuleObject } from 'rc-field-form/lib/interface';

export const lettersAndDigitsValidator = (rule: RuleObject, value: string) => {
  const charsRegex = new RegExp(/^[A-Za-z0-9 ]*[A-Za-z]+[A-Za-z0-9 ]*$/);

  return charsRegex.test(value) ? Promise.resolve() : Promise.reject('Only letters and digits allowed');
};

export const alphaNumExtendedValidator = (rule: RuleObject, value: string) => {
  const charsRegex = new RegExp(/^[A-Za-z0-9,.\- ]*[A-Za-z]+[A-Za-z0-9,.\- ]*$/);

  return charsRegex.test(value) ? Promise.resolve() : Promise.reject('Allowed letters, digits, punctuation marks only');
};
