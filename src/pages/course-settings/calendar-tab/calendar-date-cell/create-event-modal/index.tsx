import React, { useState, useCallback } from 'react';
import Form from 'antd/es/form';
import Radio from 'antd/es/radio';
import Space from 'antd/es/space';
import { useForm } from 'antd/es/form/Form';
import notification from 'antd/es/notification';
import { useMutation, useQueryClient } from 'react-query';

import {
  Title,
  WideButton,
  RadioWrapper,
  NarrowButton,
  EventContainer,
  CalendarCellDay,
  ButtonsContainer,
} from './elements';

import { Popover } from 'components/popover';
import { useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { ServerDateFormat, ServerTimeFormat } from 'utils/date';
import { createCalendarEvent } from 'modules/api-requests/events';
import { RadioButtonWithFields } from './radio-button-with-fields';
import { PrimaryButton, GreyButton } from 'components/layout/button';
import { EventTypesEnum, getCalendarEventName } from 'pages/course-settings/constants'

import type { Moment } from 'moment/moment';
import type { ICalendarEvent } from 'modules/api-requests/events/types';

interface IEvent {
  date: Moment;
  isDisabled?: boolean;
}

interface ICalendarEventForm {
  type: EventTypesEnum;
  description?: string;
  eventTime?: [Moment, Moment];
}

export const CreateEventModal = ({ date, isDisabled }: IEvent): React.ReactElement => {
  const [form] = useForm();
  const [isOpen, setOpen] = useState(false);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const queryClient = useQueryClient();

  const onHandleVisibleChange = useCallback((visible: boolean) => {
    if (!isDisabled) {
      setOpen(visible);
    }
  }, [isDisabled]);

  const onCancel = useCallback((): void => {
    onHandleVisibleChange(false);
  }, [onHandleVisibleChange]);

  const { mutateAsync: createEvent, isLoading } = useMutation({
    mutationKey: ['createCalendarEvent', currentCourseId],
    mutationFn: (calendarEvent: ICalendarEvent) => createCalendarEvent(currentCourseId, calendarEvent),
    onSuccess: () => {
      queryClient.invalidateQueries(['getCalendarEvents']);
    }
  });

  const onSubmit = useCallback((formValues: ICalendarEventForm) => {
    const { eventTime, type, description } = formValues;
    const startTime = eventTime ? eventTime[0].format(ServerTimeFormat) : undefined;
    const endTime = eventTime ? eventTime[1].format(ServerTimeFormat) : undefined;

    if (currentCourseId) {
      createEvent({
        date: date.format(ServerDateFormat),
        type,
        description,
        courseId: currentCourseId,
        isClosed: false,
        startTime,
        endTime,
      })
        .then(() => {
          onCancel();
        });
    } else {
      notification.error({ message: 'Can\'t get current course information' });
    }
  }, [onCancel, createEvent, currentCourseId, date]);

  return (
    <Popover
      visible={isOpen}
      onVisibleChange={onHandleVisibleChange}
      className="popover-event-container"
      placement="rightBottom"
      trigger="click"
      content={
        <EventContainer>
          <Form
            form={form}
            onFinish={onSubmit}
            initialValues={{ name: EventTypesEnum.CLOSED }}
          >
            <Title>Create new event</Title>
            <Form.Item name="type">
              <Radio.Group>
                <Space direction="vertical" size={[0, 8]}>
                  <RadioButtonWithFields
                    form={form}
                    eventType={EventTypesEnum.CLOSED}
                    name={getCalendarEventName(EventTypesEnum.CLOSED)}
                  />
                  <RadioButtonWithFields
                    form={form}
                    eventType={EventTypesEnum.TOURNAMENT}
                    name={getCalendarEventName(EventTypesEnum.TOURNAMENT)}
                  />
                  <RadioButtonWithFields
                    form={form}
                    eventType={EventTypesEnum.GREENS_AERIFICATION}
                    name={getCalendarEventName(EventTypesEnum.GREENS_AERIFICATION)}
                  />
                  <RadioButtonWithFields
                    form={form}
                    eventType={EventTypesEnum.OVERSEEDING_GREENS}
                    name={getCalendarEventName(EventTypesEnum.OVERSEEDING_GREENS)}
                  />
                  <RadioButtonWithFields
                    form={form}
                    eventType={EventTypesEnum.FULL_DAY_TOURNAMENT}
                    name={getCalendarEventName(EventTypesEnum.FULL_DAY_TOURNAMENT)}
                  />
                  <RadioButtonWithFields
                    form={form}
                    eventType={EventTypesEnum.CUSTOM}
                    name={getCalendarEventName(EventTypesEnum.CUSTOM)}
                  />
                </Space>

                <RadioWrapper>
                  <Space direction="vertical" size={[0, 8]}>
                    <Space direction="vertical" size={[0, 8]}>
                      <Radio value={EventTypesEnum.CART_PATH}>{getCalendarEventName(EventTypesEnum.CART_PATH)}</Radio>
                      <Radio value={EventTypesEnum.HOLIDAY}>{getCalendarEventName(EventTypesEnum.HOLIDAY)}</Radio>
                      <Radio value={EventTypesEnum.BLOCK_TRADE_ROUNDS}>{getCalendarEventName(EventTypesEnum.BLOCK_TRADE_ROUNDS)}</Radio>
                      <Radio value={EventTypesEnum.OVERRIDE_NATIONAL_HOLIDAY}>{getCalendarEventName(EventTypesEnum.OVERRIDE_NATIONAL_HOLIDAY)}</Radio>
                    </Space>
                  </Space>
                </RadioWrapper>
              </Radio.Group>
            </Form.Item>

            <ButtonsContainer>
              <NarrowButton>
                <GreyButton block size="small" onClick={onCancel}>Cancel</GreyButton>
              </NarrowButton>
              <WideButton>
                <PrimaryButton block size="small" htmlType="submit" loading={isLoading}>Create event</PrimaryButton>
              </WideButton>
            </ButtonsContainer>
          </Form>
        </EventContainer>
      }>
      <CalendarCellDay>
        {date.date()}
      </CalendarCellDay>
    </Popover>
  )
};
