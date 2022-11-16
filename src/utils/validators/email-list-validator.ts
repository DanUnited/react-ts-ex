import type { RuleObject } from 'rc-field-form/lib/interface';

export const emailListValidator = (rule: RuleObject, value: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const inputsArr = value.split(',');
  let isInvalidEmail = false;

  inputsArr.forEach((input) => {
    const email = input.replace(/\s/g, '');
    if (!emailPattern.test(email)) {
      isInvalidEmail = true;
      return;
    }
  });
  return isInvalidEmail ? Promise.reject('Not valid email') : Promise.resolve();
};
