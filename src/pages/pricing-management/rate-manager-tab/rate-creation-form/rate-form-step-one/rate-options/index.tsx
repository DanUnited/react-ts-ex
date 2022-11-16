import React from 'react';
import Spin from 'antd/es/spin';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { useQuery } from 'react-query';
import Checkbox from 'antd/es/checkbox';

import { queryOptions } from 'modules/api-requests/constants';
import { getRateOptionsRequest } from 'modules/api-requests/rates';

import type { IRateOption } from 'modules/api-requests/rates/types';

interface IRateOptionsProps {
  value?: IRateOption[];
  onChange?: (values: IRateOption[]) => void;
}

export const RateOptions = ({ value = [], onChange }: IRateOptionsProps) => {
  const { data: rateOptions, isFetching: isRateOptionsLoading } = useQuery({
    queryKey: ['getRateOptions'],
    queryFn: () => getRateOptionsRequest(),
    initialData: [],
    ...queryOptions,
  });

  if (isRateOptionsLoading) {
    return <Spin size="large" />;
  }

  return <>
    {rateOptions?.map((option, index) => {
      const foundRate = value
        .filter(item => !!item)
        .find(item => item.id === (option || {})?.id);

      const onOptionCheck = () => {
        if (onChange) {
          return foundRate
            ? onChange(value?.filter(item => item.id !== foundRate.id))
            : onChange([...value, option]);
        }
      };

      return (
        <div key={index}>
          {foundRate && (
            <>
              <Form.Item name={['options', index, 'id']} noStyle><Input type="hidden" /></Form.Item>
              <Form.Item name={['options', index, 'name']} noStyle><Input type="hidden" /></Form.Item>
              <Form.Item name={['options', index, 'description']} noStyle><Input type="hidden" /></Form.Item>
            </>
          )}

          <Checkbox onChange={onOptionCheck} checked={!!foundRate}>{option.name}</Checkbox>
        </div>
      );
    })}
  </>;
};
