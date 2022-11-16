import React from 'react';
import { ValueBox, ValueSign } from './elements';

interface IMoney {
  value: number | string;
  sign?: string,
}

export const Money = ({ value, sign = '$' }: IMoney) => (
  <ValueBox>
    <ValueSign>{sign}</ValueSign>
    {value}
  </ValueBox>
);
