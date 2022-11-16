import React, { useRef } from 'react';
import moment, { Moment } from "moment";

import { DateFormat } from "utils/date";
import DatePicker from 'antd/es/date-picker';
import { INPUT_ALLOWED_KEYS } from 'utils/constants';

type DatePickerProps = React.ComponentProps<typeof DatePicker>

export const DateSelector = (props: DatePickerProps) => {
  const lastValue = useRef<Moment | null>(props.value || null);
  const onDataPickerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => {
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
      preventDefault();
      return;
    }

    const momentDate = moment(newValue, DateFormat);

    if (momentDate.isValid()) {
      if ((props?.disabledDate && !props.disabledDate(momentDate)) || !props?.disabledDate) {
        lastValue.current = momentDate;
      }
    }

    if (props.onKeyDown) {
      props.onKeyDown(e, preventDefault);
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen && lastValue && props.onChange) {
      props.onChange(lastValue.current, moment(lastValue.current).format(DateFormat));
    }

    if (props?.onOpenChange) {
      props?.onOpenChange(isOpen);
    }
  }

  const onChange = (v: Moment | null, dateString: string) => {
    lastValue.current = moment(dateString, DateFormat);

    if (props.onChange) {
      props.onChange(v, dateString);
    }
  }

  return (
    <DatePicker
      {...props}
      format={DateFormat}
      onChange={onChange}
      onKeyDown={onDataPickerKeyDown}
      onOpenChange={onOpenChange}
    />
  )
};
