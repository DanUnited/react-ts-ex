import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import DatePicker from 'antd/es/date-picker';
import notification from 'antd/es/notification';
import useForm from 'antd/es/form/hooks/useForm';
import { useMutation, useQueryClient } from 'react-query';
import { dataToFormValues } from 'utils/form/data-to-form-values';

import { useAppSelector } from 'utils/hooks';
import { Popover } from 'components/popover';
import { ServerTimeFormat, TimeFormat } from 'utils/date';
import { getConfirmAction } from 'components/modal/confirm';
import { getCurrentCourseId } from 'models/profile/selectors';
import { GreyButton, PrimaryButton } from 'components/layout/button';
import { EventTypesEnum, getCalendarEventName } from '../../../constants';
import { deleteCalendarEvent, updateCalendarEvent } from 'modules/api-requests/events';

import {
  ButtonsContainer,
  CloseEvent,
  Container,
  DeleteLink,
  Event,
  Label,
  NarrowButton,
  StyledTooltip,
  Title,
  TitleContainer,
  WideButton,
} from './elements';

import type { Moment } from 'moment/moment';
import type { ButtonProps } from 'antd/es/button';
import type { ICalendarEvent, ICalendarEventResponse } from 'modules/api-requests/events/types';

interface IEventPreview {
  type: 'closed' | 'opened';
  event: ICalendarEventResponse;
  isDisabled?: boolean;
}

interface IEventPreviewForm {
  time: [Moment, Moment],
  description: string;
}

const cancelButtonProps: ButtonProps = { size: 'large' };
const okButtonProps: ButtonProps = { danger: true, size: 'large' };

export const ViewEventModal = ({ type, event, isDisabled }: IEventPreview): React.ReactElement => {
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  const onHandleVisibleChange = useCallback((visible: boolean) => {
    if (!isDisabled && event.type !== EventTypesEnum.NATIONAL_HOLIDAY) {
      setVisible(visible);
    }
  }, [isDisabled, event.type]);

  const close = useCallback((): void => {
    onHandleVisibleChange(false);
  }, [onHandleVisibleChange]);

  const { mutateAsync: updateCalendarEventFn, isLoading } = useMutation({
    mutationKey: ['updateCalendarEvent', currentCourseId],
    mutationFn: (data: ICalendarEvent) => updateCalendarEvent(currentCourseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['getCalendarEvents']);
    },
  });

  const { mutateAsync: deleteCalendarEventFn, isLoading: deleteLoading } = useMutation({
    mutationKey: ['deleteCalendarEvent', currentCourseId],
    mutationFn: (eventId: string) => deleteCalendarEvent(currentCourseId, eventId),
  });

  const isCustomEvent = event.type === EventTypesEnum.CUSTOM;

  const onSubmit = useCallback(({ description, time }: IEventPreviewForm): void => {
    updateCalendarEventFn({
      ...event,
      description,
      ...(isCustomEvent ? {} : {
        startTime: time[0].format(ServerTimeFormat),
        endTime: time[1].format(ServerTimeFormat),
      })
    })
      .then(() => notification.success({ message: 'Event was updated successfully!' }))
      .catch(() => notification.error({ message: 'Error occurred. Event wasn\'t updated!' }))
      .finally(() => close());
  }, [close, updateCalendarEventFn, event, isCustomEvent]);

  const onDelete = useCallback((): void => {
    getConfirmAction({
      title: 'Are you sure you want to delete this event?',
      action: () => {
        deleteCalendarEventFn(event.id)
          .then(() => {
            notification.success({ message: 'Calendar event was deleted successfully!' });
            return queryClient.invalidateQueries(['getCalendarEvents']);
          })
          .catch(error => notification.error({
            message: 'Event cannot be deleted!',
            description: String(error),
            placement: 'topRight'
          }))
          .finally(() => onHandleVisibleChange(false));
      },
      okText: 'Confirm',
      cancelText: 'Cancel',
      width: 648,
      okButtonProps: okButtonProps,
      cancelButtonProps: cancelButtonProps,
    });
  }, [deleteCalendarEventFn, event.id, queryClient, onHandleVisibleChange]);

  useEffect(() => {
    form.setFields(dataToFormValues({
      description: event.description,
      time: [moment(event.startTime, ServerTimeFormat), moment(event.endTime, ServerTimeFormat)],
    }));
  }, [event, form]);


  const PopoverContent = useMemo(() => {
    return type === 'opened'
      ? (
        <Container>
          <TitleContainer>
            <Title>Course closed</Title>
            <DeleteLink onClick={onDelete}>Delete event</DeleteLink>
          </TitleContainer>

          {![EventTypesEnum.FULL_DAY_TOURNAMENT, EventTypesEnum.CUSTOM].includes(event.type)
            ? (<>
              <Label>Closed time</Label>
              <Form.Item
                name="time"
                rules={[{ required: true, message: 'Choose date' }]}
              >
                <DatePicker.RangePicker
                  picker="time"
                  size="small"
                  format={TimeFormat}
                />
              </Form.Item>
            </>)
            : null}

          <Label>{isCustomEvent ? 'Text' : 'Notes'}</Label>
          <Form.Item
            name="description"
            rules={[{ required: true, message: `Fill in ${isCustomEvent ? 'text' : 'note'}` }]}
          >
            <Input placeholder={`Enter ${isCustomEvent ? 'text' : 'note'}`} autoComplete="off" />
          </Form.Item>

          <ButtonsContainer>
            <NarrowButton>
              <GreyButton onClick={close} block size="small">Cancel</GreyButton>
            </NarrowButton>
            <WideButton>
              <PrimaryButton htmlType="submit" block size="small" loading={isLoading}>Save changes</PrimaryButton>
            </WideButton>
          </ButtonsContainer>
        </Container>
      )
      : (
        <Container>
          <ButtonsContainer>
            <NarrowButton>
              <GreyButton onClick={close} block size="small">Cancel</GreyButton>
            </NarrowButton>
            <WideButton>
              <PrimaryButton
                block
                danger
                size="small"
                onClick={onDelete}
                loading={deleteLoading}
              >
                Delete event
              </PrimaryButton>
            </WideButton>
          </ButtonsContainer>
        </Container>
      )
  }, [close, isLoading, onDelete, type, deleteLoading, event.type, isCustomEvent]);

  return (
    <Form onFinish={onSubmit} form={form}>
      <Popover
        trigger="click"
        onVisibleChange={onHandleVisibleChange}
        className="popover-event-container"
        placement="rightBottom"
        visible={visible}
        content={PopoverContent}
      >
        <StyledTooltip
          placement="right"
          trigger={['click', 'hover']}
          overlay={getCalendarEventName(event.type)}
          overlayClassName={type === 'closed' ? 'close-event' : 'event'}
        >
          {type === 'closed'
            ? <CloseEvent />
            : <Event />}
        </StyledTooltip>
      </Popover>
    </Form>
  )
};
