import React from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Checkbox from 'antd/es/checkbox';

import { PriceTable } from './price-table';
import { Calendar } from 'components/calendar';
import { TradeRoundHeader } from './trade-round-header';
import { DiscountPopupEditor } from './discount-popup-editor';

import type { FormInstance } from 'antd/es/form/Form';
import type { FormListFieldData } from 'antd/es/form/FormList';
import type { IServerRate } from 'modules/api-requests/rates/types';

interface ITimeSlotForm {
  field: FormListFieldData;
  form: FormInstance;
  isLoading?: boolean;
  onDelete?: () => void;
  rateList?: IServerRate[];
}

export const TimeSlotForm = ({ isLoading, field, form, onDelete, rateList }: ITimeSlotForm) => {
  const tradeModel = Form.useWatch(['tradeRounds', field.name, 'tradeModel'], form);
  const availableDays = Form.useWatch(['tradeRounds', field.name, 'availableDays'], form);

  return (
    <>
      <TradeRoundHeader form={form} field={field} onDelete={onDelete} isLoading={isLoading} />

      <Row gutter={[16, 0]}>
        <Col xs={8} xl={6}>
          <Form.Item name={[field.name, 'id']} noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name={[field.name, 'startTime']} noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name={[field.name, 'endTime']} noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name={[field.name, 'isActive']} noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name={[field.name, 'isDeleted']} noStyle>
            <Input type="hidden" />
          </Form.Item>

          <Form.Item
            name={[field.name, 'tradeModel']}
            label="Trade model"
            rules={[{ required: true, message: 'Enter trade model' }]}
          >
            <Select placeholder="Trade model">
              <Select.Option value="tradeRounds">Trade Rounds</Select.Option>
              <Select.Option value="popUp">Discounted pop-ups</Select.Option>
              <Select.Option value="both">Both</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={[field.name, 'rateId']}
            label="Assign trade rounds to rate"
            rules={[{ required: true, message: 'Enter assigned rate' }]}
          >
            <Select placeholder="Rates">
              {rateList?.map((rate) => (
                <Select.Option value={rate.id} key={rate.id}>
                  {rate.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name={[field.name, 'availableDays']} label="Trade round days">
            <Calendar />
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            name={[field.name, 'isSpare']}
          >
            <Checkbox>Spare Time Slot</Checkbox>
          </Form.Item>

          <Form.Item
            name={[field.name, 'popupMessage']}
            label="Discount popup message"
          >
            <DiscountPopupEditor className={`${field.key}`} />
          </Form.Item>
        </Col>

        <Col xs={16} xl={18}>
          <PriceTable
            label="Trade round discount amount"
            field={field}
            isTradeModelChosen={tradeModel === 'tradeRounds' || tradeModel === 'both'}
            currentTradeRoundDays={availableDays || {}}
            name="tradeRoundDiscounts"
            discountSwitcherName="tradeRoundDiscountType"
            hasDiscountSwitcher
          />

          <PriceTable
            discountType="Dollar"
            label="Trade round minimal price"
            field={field}
            isTradeModelChosen
            currentTradeRoundDays={availableDays || {}}
            name="minimalPrices"
          />

          <PriceTable
            label="Discounted pop-up discount amount"
            name="popupDiscounts"
            discountSwitcherName="popupDiscountType"
            field={field}
            currentTradeRoundDays={availableDays || {}}
            isTradeModelChosen={tradeModel === 'popUp' || tradeModel === 'both'}
            hasDiscountSwitcher
          />
        </Col>
      </Row>
    </>
  );
};
