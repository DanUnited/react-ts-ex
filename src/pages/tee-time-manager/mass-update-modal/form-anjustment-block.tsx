import React, { useEffect } from 'react';
import Form from 'antd/es/form';
import Radio from 'antd/es/radio';
import InputNumber from 'antd/es/input-number';

import { MassUpdateEnum } from './index';
import { Header4 } from 'components/layout/headers';
import { HeaderContainer } from 'components/layout/headers/header-container';

import type { FormInstance } from 'antd/es/form/Form';

interface IFormAdjustmentsBlock {
  title: string;
  rateId: string;
  defaultValue?: number;
  visible?: boolean;
  form: FormInstance;
}

export const FormAdjustmentsBlock = ({ title, defaultValue, form, rateId, visible }: IFormAdjustmentsBlock) => {
  useEffect(() => {
    if (visible) {
      form.setFields([
        { name: ['massUpdate', rateId, 'mode'], value: MassUpdateEnum.SetPrice },
      ]);
    }
  }, [form, visible, rateId]);

  return (
    <>
      <HeaderContainer>
        <Header4>
          {title}
        </Header4>
      </HeaderContainer>

      <Form.Item name={['massUpdate', rateId, 'value']}>
        <InputNumber placeholder={defaultValue ? `$ ${defaultValue}` : '$'} min={0} />
      </Form.Item>

      <Form.Item name={['massUpdate', rateId, 'mode']}>
        <Radio.Group>
          <Radio value={MassUpdateEnum.Increase}>Increase</Radio>
          <Radio value={MassUpdateEnum.Decrease}>Decrease</Radio>
          <Radio value={MassUpdateEnum.SetPrice}>Set price</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
}
