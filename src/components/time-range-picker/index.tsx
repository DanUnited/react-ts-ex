import React from 'react';

import TimePicker from 'antd/es/time-picker';
import { INPUT_ALLOWED_KEYS } from 'utils/constants';

type TimeRangePickerProps = React.ComponentProps<typeof TimePicker.RangePicker>

export const TimeRangePicker = (props: TimeRangePickerProps) => {
  const onTimeRangePickerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const digitsRegex = new RegExp(/\d/);
    if(!digitsRegex.test(key) && !e.ctrlKey && !INPUT_ALLOWED_KEYS.includes(key)) {
      e.preventDefault();
    }
  }

  return (
    <TimePicker.RangePicker {...props} onKeyDown={onTimeRangePickerKeyDown} />
  )
};
