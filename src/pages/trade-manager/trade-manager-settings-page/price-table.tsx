import React, { useCallback, useState } from 'react';
import omit from 'lodash/omit';
import Form from 'antd/es/form';
import Table from 'antd/es/table';
import Column from 'antd/es/table/Column';

import { Panel } from 'components/layout/panel';
import { renderPeriodDayInput } from './renders';
import { DiscountTypeSwitcher } from './discount-type-switcher';
import { DEFAULT_OVERRIDE_DAYS } from 'modules/api-requests/rates/constants';

import type { Key } from 'react';
import type { FormListFieldData } from 'antd/es/form/FormList';
import type { WeekDayType } from 'modules/api-requests/rates/types';
import type { DiscountType } from 'modules/api-requests/time-slot/types';

interface IPriceTableProps {
  label: string;
  field: FormListFieldData;
  name: Key;
  isTradeModelChosen: boolean;
  currentTradeRoundDays: {
    [key: string]: boolean,
   };
  value?: Record<WeekDayType, number | undefined> & { key: string };
  hasDiscountSwitcher?: boolean;
  discountType?: DiscountType;
  discountSwitcherName?: string;
  disabled?: boolean;
}

const scroll = { x: 800 }

export const PriceTable = ({
  label,
  name,
  field,
  isTradeModelChosen,
  currentTradeRoundDays,
  disabled,
  hasDiscountSwitcher,
  discountType = 'Percent',
  discountSwitcherName = 'discountType',
}: IPriceTableProps) => {
  const [innerDiscountType, setDiscountType] = useState<DiscountType>(discountType);

  const onSetDiscountType = useCallback((val: DiscountType) => {
    setDiscountType(val);
  }, []);

  return (
    <Panel
      title={label}
      addonRight={
        hasDiscountSwitcher && (
          <Form.Item
            noStyle
            shouldUpdate
            name={disabled ? [field.name, name, 'discountType'] : [field.name, discountSwitcherName]}
          >
            <DiscountTypeSwitcher disabled={disabled} onChange={onSetDiscountType} />
          </Form.Item>
        )
      }
    >
      <Table
        sticky
        scroll={scroll}
        pagination={false}
        dataSource={[{ id: 'key' }]}
        rowKey="id"
      >
        {Object.keys(omit(DEFAULT_OVERRIDE_DAYS, 'key')).map(dayName => (
          <Column
            title={dayName}
            dataIndex={['overrideDays', dayName]}
            key={'overrideDays.' + dayName}
            width={110}
            render={renderPeriodDayInput(
              field,
              name,
              dayName,
              isTradeModelChosen && currentTradeRoundDays[dayName],
              {
                placeholder: innerDiscountType,
                disabled
              })}
          />
        ))}
      </Table>
    </Panel>
  )
};
