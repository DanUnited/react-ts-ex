import React from 'react';
import moment from 'moment';
import Switch from 'antd/es/switch';
import Checkbox from 'antd/es/checkbox';

import { Money } from 'components/money';
import { formatNumber } from 'utils/numbers';
import { DateContainer, StyledInput, UtilizationColumn, SmallInput } from './elements';
import { DateFormat, DateTimeFormat, ServerDateFormat, ServerTimeFormat, TimeFormat } from 'utils/date';

export const renderDummy = () => <span>–</span>;

export const renderValue = (value: string | number) => (
  <span title={`${value}`}>{value}</span>
);

export const renderPaymentType = (name: string | number) => {
  const stringName = String(name);

  switch (stringName) {
    case '1':
      return 'Online';
    default:
      return stringName;
  }
};

export const renderText = (name: string) => (name ? renderValue(name) : renderDummy());

export const renderDate = (inputFormat = ServerDateFormat, outputFormat = DateFormat) =>
  (date: string | null) => {
    return date
      ? <DateContainer>{moment(date, inputFormat).format(outputFormat)}</DateContainer>
      : renderDummy();
  };

export const renderTime = (time?: string | null) => time
  ? <DateContainer>{moment(time, ServerTimeFormat).format(TimeFormat)}</DateContainer>
  : renderDummy();

export const renderDateTime = (date: string | null) => date
  ? <DateContainer>{moment.utc(date).format(DateTimeFormat)}</DateContainer>
  : renderDummy();

export const getNumber = (value?: number | string) => {
  const parts = (value || 0).toString().split('.');
  return parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (parts[1] ? '.' + parts[1] : '');
};

export const renderNumber = (value?: number | string) => renderValue(getNumber(value));

export const renderMoney = (value: number) => <Money key={value} value={formatNumber(value)} />;

export const renderBoolean = (value: boolean | null) => renderValue(Boolean(value) ? 'Yes' : 'No');

export const renderPresetsInput = (value: number | string): React.ReactElement =>
  <StyledInput size="large" max={100} placeholder="%" defaultValue={value} />;

export const renderRangedInput = (value: number[]): React.ReactElement => (
  <UtilizationColumn>
    <SmallInput size="middle" defaultValue={value[0]} />
    -
    <SmallInput size="middle" defaultValue={value[1]} />
  </UtilizationColumn>
);

export const renderToggle = (value: boolean): React.ReactElement => (
  <Switch defaultChecked={value} />
);

export const renderCheckbox = (): React.ReactElement => (
  <Checkbox />
);

export const invertValue = (renderFunc: (value: boolean, row: any, index: number) => any) =>
  (_value: boolean, entity: any, _index: number) =>
    <>{renderFunc(!_value, entity, _index)}</>;
