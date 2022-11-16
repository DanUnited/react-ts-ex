import React from 'react';
import { PricesRadioGroup } from './elements';

import type { RadioChangeEvent } from 'antd/es';

interface IPricesModeSwitcher {
  value: number;
  onChange: (e: RadioChangeEvent) => void;
}

const options = [
  { label: 'Set price for specific time periods', value: 0 },
  { label: 'Set price for all time periods', value: 1 },
];

export const PricesModeSwitcher = ({ onChange, value }: IPricesModeSwitcher) => (
  <PricesRadioGroup
    size="large"
    options={options}
    onChange={onChange}
    value={value}
    optionType="button"
    buttonStyle="solid"
  />
);
