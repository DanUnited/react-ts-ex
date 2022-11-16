import type { RuleObject } from 'rc-field-form/lib/interface';

export const subdomainValidator = (rule: RuleObject, value: string) => {
  const charsRegex = new RegExp(/^([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$/);

  return charsRegex.test(value) ? Promise.resolve() : Promise.reject('Please enter a valid Sub-domain');
};
