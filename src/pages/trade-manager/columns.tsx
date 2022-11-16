import React from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Switch from 'antd/es/switch';
import Text from 'antd/es/typography/Text';

import { Graph } from 'components/icons';
import { InputNumberFormatter } from 'utils/numbers';
import { GraphWrapper, MoneyContainer } from './elements';
import { DateContainer } from 'components/table/elements';
import { renderNumber, renderTime } from 'components/table/renders';
import { NumberInput } from 'components/number-input';

import type { ColumnProps } from 'antd/es/table';
import type { ITradeRoundException } from 'modules/api-requests/trade-rounds/types';

const TimeForm = ({ value }: { value?: string }) => <Text>{renderTime(value)}</Text>;

interface IInputPrice {
  value?: string;
  onChange?: () => void;
  isYield?: boolean;
}

export const InputPrice = ({ value, onChange, isYield }: IInputPrice) => (
  <MoneyContainer>
    <NumberInput
      formatter={InputNumberFormatter()}
      defaultValue={value}
      value={value}
      onChange={onChange}
      precision={2}
      placeholder="$"
    />
    <GraphWrapper $active={Boolean(isYield)}>
      <Graph />
    </GraphWrapper>
  </MoneyContainer>
);

export const tradeRoundsColumns: ColumnProps<ITradeRoundException & { startDate: string }>[] = [
  {
    title: 'Time',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 120,
    align: 'center',
    render: (value, row, index) => (
      <DateContainer>
        <Form.Item name={['items', index, 'id']} noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name={['items', index, 'yield']} noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name={['items', index, 'freeSlots']} noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name={['items', index, 'tradeRoundId']} noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name={['items', index, 'startTime']} noStyle>
          <TimeForm />
        </Form.Item>
      </DateContainer>
    ),
  },
  {
    title: 'Players',
    dataIndex: 'amountPlayers',
    key: 'amountPlayers',
    width: 100,
    render: renderNumber,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value, row, index) => (
      <Form.Item name={['items', index, 'price']}>
        <InputPrice isYield={row.yield} />
      </Form.Item>
    ),
  },
  {
    title: 'Trade',
    dataIndex: 'trade',
    key: 'trade',
    render: (value, row, index) => (
      <Form.Item name={['items', index, 'trade']} valuePropName="checked" shouldUpdate>
        <Switch />
      </Form.Item>
    ),
  },
];
