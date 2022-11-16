import React from 'react';
import Switch from 'antd/es/switch';
import { Money } from 'components/money';
import { formatNumber } from 'utils/numbers';

export const renderDisabledToggle = (isActive: boolean) =>
  <Switch checked={isActive} disabled />

export const renderPercent = (value: number) => <Money key={value} value={formatNumber(value)} sign="%" />;
