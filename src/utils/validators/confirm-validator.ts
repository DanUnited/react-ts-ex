import type { RuleRender, FormInstance } from 'rc-field-form/lib/interface';

export const confirmValidator = (field: string, errorText?: string): RuleRender => ({ getFieldValue }: FormInstance) => ({
  validateTrigger: 'onBlur',
  validator(rule: any, value: string) {
    if (value !== getFieldValue(field)) {
      return Promise.reject(errorText || `The confirmation ${field} does not match`);
    }

    return Promise.resolve();
  },
});
