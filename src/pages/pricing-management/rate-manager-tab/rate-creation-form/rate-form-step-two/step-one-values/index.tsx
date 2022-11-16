import React from 'react';
import Form from 'antd/es/form';
import { Input } from 'antd/es';

export const StepOneValues = () => (
  <>
    <Form.Item name="name" noStyle><Input type="hidden" /> </Form.Item>
    <Form.Item name="description" noStyle><Input type="hidden" /> </Form.Item>
    <Form.Item name="options" noStyle><Input type="hidden" /> </Form.Item>
    <Form.Item name="holes" noStyle><Input type="hidden" /> </Form.Item>
    <Form.Item name="useTransactionFee" noStyle><Input type="hidden" /> </Form.Item>
    <Form.Item name={['availableDays', 'Monday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Tuesday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Wednesday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Thursday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Friday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Saturday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Sunday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name={['availableDays', 'Holiday']} noStyle><Input type="hidden" /></Form.Item>
    <Form.Item name="seasons" noStyle><Input type="hidden" /></Form.Item>
  </>
);
