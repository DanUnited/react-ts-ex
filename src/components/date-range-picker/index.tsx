import React from 'react';

import DatePicker from 'antd/es/date-picker';
import { INPUT_ALLOWED_KEYS } from 'utils/constants';

type DateRangePickerProps = React.ComponentProps<typeof DatePicker.RangePicker>

export const DateRangePicker = (props: DateRangePickerProps) => {
  const onDateRangePickerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const key = e.key;
    const caretPosition = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;
    const charsRegex = new RegExp(/\d|-/);
    let newValue = value.replace(value.substring(caretPosition, selectionEnd), '');
    newValue = newValue.substring(0, caretPosition) + key + newValue.substring(caretPosition, value.length);
    if (
      (!charsRegex.test(key) ||
        newValue.length > 10 ||
        (caretPosition !== 2 && caretPosition !== 5 && key === '-') ||
        ((caretPosition === 2 || caretPosition === 5) && key !== '-')) &&
      !INPUT_ALLOWED_KEYS.includes(key)
    ) {
      e.preventDefault();
      return;
    }
  }

  return (
    <DatePicker.RangePicker {...props} onKeyDown={onDateRangePickerKeyDown} />
  )
};
