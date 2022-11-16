import React from 'react';
import InputNumber from 'antd/es/input-number';

import { INPUT_ALLOWED_KEYS } from 'utils/constants';

type NumberInputProps = React.ComponentProps<typeof InputNumber>

export const NumberInput = React.forwardRef((props: NumberInputProps, ref: React.Ref<HTMLInputElement>) => {
  const onNumberInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    const digitsRegex = new RegExp(/\d|\./);
    if(!digitsRegex.test(key) && !e.ctrlKey && !INPUT_ALLOWED_KEYS.includes(key)) {
      e.preventDefault();
    }
  }

  return (
    <InputNumber {...props} onKeyDown={onNumberInputKeyDown} ref={ref} />
  )
});
