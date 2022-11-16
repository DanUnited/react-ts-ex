import React from 'react';
import Form from 'antd/es/form';
import Radio from 'antd/es/radio';
import Input from 'antd/es/input';
import DatePicker from 'antd/es/date-picker';

import { TimeFormat } from 'utils/date';
import { EventTypesEnum } from 'pages/course-settings/constants';
import { DatePickerWrapper, InputWrapper, Label } from './elements';

import type { FormInstance } from 'antd/es/form/Form';

const { RangePicker } = DatePicker;

interface IRadioButtonWithFields {
  name: string;
  form: FormInstance;
  eventType: EventTypesEnum;
}

export const RadioButtonWithFields = ({ name, eventType, form }: IRadioButtonWithFields): React.ReactElement => {
  const value = form.getFieldValue('type');
  const visible = eventType === value;

  return (
    <>
      <Radio value={eventType}>{name}</Radio>

      {visible && (
        <>
          {eventType === EventTypesEnum.CUSTOM
            ? (<>
              <Label>Custom text</Label>
              <InputWrapper>
                <Form.Item
                  name="description"
                  rules={[{ required: true, message: 'Fill in text' }]}
                >
                  <Input placeholder="Enter text" autoComplete="off" />
                </Form.Item>
              </InputWrapper>
            </>)
            : null}
          {![EventTypesEnum.FULL_DAY_TOURNAMENT, EventTypesEnum.CUSTOM].includes(eventType)
            ? (<>
              <Label>Closed time</Label>
              <DatePickerWrapper>
                <Form.Item
                  name="eventTime"
                  rules={[{ required: true, message: 'Select the time' }]}
                >
                  <RangePicker
                    picker="time"
                    size="small"
                    format={TimeFormat}
                  />
                </Form.Item>
              </DatePickerWrapper>
            </>)
            : null}

          {eventType !== EventTypesEnum.CUSTOM
            ? <>
              <Label>Notes</Label>
              <InputWrapper>
                <Form.Item
                  name="description"
                  rules={[{ required: true, message: 'Fill in note' }]}
                >
                  <Input placeholder="Enter note" autoComplete="off" />
                </Form.Item>
              </InputWrapper>
            </>
            : null}
        </>
      )}
    </>
  );
};
