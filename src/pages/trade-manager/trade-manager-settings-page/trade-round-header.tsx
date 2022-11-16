import React, { useMemo, useState } from 'react';
import moment from 'moment';
import Form from 'antd/es/form';
import TimePicker from 'antd/es/time-picker';

import { Edit } from 'components/icons/edit';
import { Header3 } from 'components/layout/headers';
import { FormText } from 'components/form/form-text';
import { Delete } from 'components/icons/system/delete';
import { ServerTimeFormat, TimeFormat } from 'utils/date';
import { ActionButton, TimeSlotHeaderContainer, TimeSlotSkeleton } from './element';

import type { Moment } from 'moment';
import type { FormInstance } from 'antd/es/form/Form';
import type { RangeValue } from 'rc-picker/lib/interface';
import type { FormListFieldData } from 'antd/es/form/FormList';

interface ITradeRoundHeader {
  field: FormListFieldData;
  form: FormInstance;
  isLoading?: boolean;
  onDelete?: () => void;
}

const onTransformValue = (value?: string) => moment(value, ServerTimeFormat).format(TimeFormat);

export const TradeRoundHeader = ({ isLoading, field, form, onDelete }: ITradeRoundHeader) => {
  const [isEdit, setIsEdit] = useState(false);

  const startTime = Form.useWatch(['tradeRounds', field.name, 'startTime'], form);
  const endTime = Form.useWatch(['tradeRounds', field.name, 'endTime'], form);

  const editTimeValue: RangeValue<Moment> = useMemo(() => {
    return [moment(startTime, TimeFormat), moment(endTime, TimeFormat)];
  }, [startTime, endTime]);

  const onEditTimeChange = (values: RangeValue<Moment>) => {
    form.setFields([
      {
        name: ['tradeRounds', field.name, 'startTime'],
        value: values && values[0] ? values[0].format(ServerTimeFormat) : undefined,
      },
      {
        name: ['tradeRounds', field.name, 'endTime'],
        value: values && values[1] ? values[1].format(ServerTimeFormat) : undefined,
      },
    ]);
  };

  return (
    <TimeSlotHeaderContainer>
      <Header3>Trade round from
        {isEdit
          ? <span>
            <TimePicker.RangePicker
              use12Hours
              size="large"
              allowClear={false}
              format={TimeFormat}
              value={editTimeValue}
              onChange={onEditTimeChange}
              onOpenChange={setIsEdit}
            />
          </span>
          : <>
            {isLoading
              ? <TimeSlotSkeleton />
              : (
                <Form.Item name={[field.name, 'startTime']} noStyle>
                  <FormText onTransformValue={onTransformValue} />
                </Form.Item>
              )}
            to
            {isLoading
              ? <TimeSlotSkeleton />
              : (
                <Form.Item name={[field.name, 'endTime']} noStyle>
                  <FormText onTransformValue={onTransformValue} />
                </Form.Item>
              )}
          </>
        }
      </Header3>
      <span>
        <ActionButton
          icon={<Edit />}
          onClick={() => setIsEdit(editing => !editing)}
        />

        <ActionButton
          icon={<Delete fill="red" />}
          onClick={onDelete}
        />
        </span>
    </TimeSlotHeaderContainer>
  );
};
