import React from 'react';
import moment from 'moment';
import Form from 'antd/es/form';

import { InputNumberFormatter } from 'utils/numbers';
import { TableInputNumber } from './table-input-number';
import { ServerTimeFormat, TimeFormat } from 'utils/date';

import type { Key } from 'react';
import type { ITimePeriod } from 'modules/api-requests/time-period/types';

export const renderTimePeriodDate = (_: void, { startTime, endTime }: ITimePeriod) => {
  return (
    <span>
      {moment(startTime, ServerTimeFormat).format(TimeFormat)} - {moment(endTime, ServerTimeFormat).format(TimeFormat)}
    </span>
  );
}

export const renderPeriodDayInput = (keyName: Key[], dayName: string, placeholder?: string, disabled?: boolean) =>
  (_val: string, _row: any, index: number) => (
    <Form.Item
      name={[...keyName, index, 'overrideDays', dayName]}
    >
      <TableInputNumber
        min={0}
        precision={2}
        disabled={disabled}
        placeholder={placeholder}
        formatter={InputNumberFormatter()}
      />
    </Form.Item>
  );
