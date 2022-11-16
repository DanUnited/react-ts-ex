import { ValidatorRule } from 'rc-field-form/lib/interface';

export const getRequiredListValidator = (message: string): ValidatorRule[] => [{
  validator: async (_, list?: Array<any>) => {
    if (!(list && list.length)) {
      return Promise.reject(message);
    }
  }
}];
