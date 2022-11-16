import React from 'react';
import Form from 'antd/es/form';
import { TableInputNumber } from 'components/table/table-input-number';

import type { Key } from 'react';
import type { InputNumberProps } from 'antd/es/input-number';
import type { FormListFieldData } from 'antd/es/form/FormList';

export const renderPeriodDayInput = (field: FormListFieldData, path: Key, dayName: string, required: boolean, inputProps?: InputNumberProps) =>
  (_val: string, _row: any) => (
    <Form.Item
      name={[field.name, path, dayName]} 
      rules={[{ required, message: 'This field is required' }]}
    >
      <TableInputNumber precision={2} min={0}  {...inputProps} />
    </Form.Item>
  );
