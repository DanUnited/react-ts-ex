import type { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

export const CouponValidator = (rule: RuleObject, value: StoreValue) => {
  const preparedValue = String(value ?? '').trim();

  if (preparedValue === '') return Promise.resolve();

  return (
    (preparedValue.match(/[a-zA-Z\d]+$/g)?.[0] === preparedValue) 
  )
    ? Promise.resolve()
    : Promise.reject('Only letters and digits are allowed');
};
