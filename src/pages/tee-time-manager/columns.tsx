import Form from 'antd/es/form';
import React from 'react';
import isNil from 'lodash/isNil';
import Input from 'antd/es/input';
import Switch from 'antd/es/switch';
import memoize from 'lodash/memoize';

import { renderPlayersCount } from './renders';
import { renderTime } from 'components/table/renders';
import { NumberInput } from 'components/number-input';
import { InputNumberFormatter, InputNumberParser } from 'utils/numbers';

import type { ColumnProps } from 'antd/es/table';
import type { IServerRate } from 'modules/api-requests/rates/types';
import type { ITeeTime } from 'modules/api-requests/tee-time/types';

type GetTeeTimeColumnsType = (rateNames?: IServerRate[]) => ColumnProps<ITeeTime>[];

export const getTeeTimeColumns: GetTeeTimeColumnsType = memoize((rateList: IServerRate[] = []) => [
  {
    title: 'Players',
    dataIndex: 'freeSlots',
    key: 'freeSlots',
    width: 100,
    render: renderPlayersCount,
    fixed: 'left',
  },
  {
    title: 'Time',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 120,
    align: 'center',
    render: renderTime,
  },
  ...rateList.map((rate) => ({
    title: rate.name,
    dataIndex: ['rates', rate.id, 'price'],
    key: 'rates',
    width: 200,
    shouldCellUpdate: () => false,
    render: (_value: string, _row: ITeeTime, index: number) => (
      <>
        <Form.Item name={['items', index, 'id']} trigger="onBlur" noStyle><Input type="hidden" /></Form.Item>
        <Form.Item name={['items', index, 'draft']} trigger="onBlur" noStyle><Input type="hidden" /></Form.Item>
        <Form.Item name={['items', index, 'date']} trigger="onBlur" noStyle><Input type="hidden" /></Form.Item>
        <Form.Item name={['items', index, 'startTime']} trigger="onBlur" noStyle><Input type="hidden" /></Form.Item>
        <Form.Item name={['items', index, 'basePrice']} trigger="onBlur" noStyle><Input type="hidden" /></Form.Item>

        <Form.Item
          shouldUpdate={(prevValue, currentValue) => {
            return (Boolean(currentValue.items?.[index]?.individual?.yieldActive) !== Boolean(prevValue.items?.[index]?.individual?.yieldActive)) ||
              (currentValue.items?.[index]?.rates?.[rate.id]?.price !== prevValue.items?.[index]?.rates?.[rate.id]?.price)
          }}
          noStyle
        >
          {(formInstance) => {
            const rateId = formInstance.getFieldValue(['items', index, 'rates', rate.id, 'id']);
            const isDisabled = Boolean(formInstance.getFieldValue(['items', index, 'yieldActive'])) ||
              isNil(_row.rates[rateId]?.basePrice);

            return (
              <>
                <Form.Item name={['items', index, 'rates', rate.id, 'id']} trigger="onBlur" noStyle>
                  <Input type="hidden" />
                </Form.Item>

                <Form.Item name={['items', index, 'rates', rate.id, 'price']}>
                  <NumberInput
                    formatter={InputNumberFormatter()}
                    parser={InputNumberParser()}
                    disabled={isDisabled}
                    precision={2}
                    placeholder="$"
                    min={0}
                  />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>
      </>
    ),
  })),
  {
    title: 'Yield',
    dataIndex: 'yieldActive',
    key: 'yieldActive',
    align: 'center',
    width: 100,
    shouldCellUpdate: () => false,
    render: (value, row, index) => (
      <Form.Item
        name={['items', index, 'individual', 'yieldActive']}
        valuePropName="checked"
        shouldUpdate>
        <Switch />
      </Form.Item>
    ),
  },
  {
    title: 'Displayed',
    dataIndex: 'displayed',
    key: 'displayed',
    align: 'left',
    width: 'auto',
    shouldCellUpdate: () => false,
    render: (value: boolean, row: ITeeTime, index: number) => (
      <Form.Item
        name={['items', index, 'individual', 'displayed']}
        valuePropName="checked"
        shouldUpdate
      >
        <Switch />
      </Form.Item>
    ),
  }
]);
