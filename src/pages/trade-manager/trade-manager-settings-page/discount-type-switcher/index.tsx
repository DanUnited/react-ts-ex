import React, { useEffect } from 'react';
import Button from 'antd/es/button';
import { DiscountTypeContainer } from './elements';

import type { DiscountType } from 'modules/api-requests/time-slot/types';

interface IDiscountTypeSwitcherProps {
  value?: DiscountType;
  disabled?: boolean;
  onChange?: (value: DiscountType) => void;
}

export const DiscountTypeSwitcher = ({ value, onChange, disabled }: IDiscountTypeSwitcherProps) => {
  const onDiscountClick = (value: DiscountType) => () => {
    if (onChange) {
      onChange(value);
    }
  }

  useEffect(() => {
    if (onChange && value) {
      onChange(value)
    }
  }, [value, onChange]);

  return (
    <DiscountTypeContainer>
      <span>Discount type</span>
      <Button
        size="small"
        disabled={disabled}
        onClick={onDiscountClick('Percent')}
        type={value === 'Percent' ? 'primary' : 'text'}
      >
        Percent
      </Button>

      <Button
        size="small"
        disabled={disabled}
        onClick={onDiscountClick('Dollar')}
        type={value === 'Dollar' ? 'primary' : 'text'}
      >
        Dollars
      </Button>
    </DiscountTypeContainer>
  )
}
