import React, { useCallback, useState } from 'react';
import moment from 'moment';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import Divider from 'antd/es/divider';
import { useMutation } from 'react-query';
import { useForm } from 'antd/es/form/Form';
import notification from 'antd/es/notification';

import { useAppSelector } from 'utils/hooks';
import { sortTimePeriods } from 'utils/sort';
import { Plus } from 'components/icons/system/plus';
import { ServerTimeFormat, TimeFormat } from 'utils/date';
import { getConfirmAction } from 'components/modal/confirm';
import { Calendar } from 'components/icons/system/calendar';
import { TimeRangePicker } from 'components/time-range-picker';
import { getCurrentCourseId } from 'models/profile/selectors';
import { useSeasonsList } from 'modules/api-requests/seasons/queries';
import { PrimaryButton, TransparentButton } from 'components/layout/button';
import { useTimePeriodsList } from 'modules/api-requests/time-period/queries';
import { lettersAndDigitsValidator } from 'utils/validators/letters-and-digits-validator';
import { DividerContainer, ButtonsContainer, TimePeriodContainer, StyledSelect } from './elements';
import { TimePeriod } from 'pages/pricing-management/rate-manager-tab/rate-creation-form/rate-form-step-one/time-period-block/time-period';

import {
  editTimePeriodRequest,
  removeTimePeriodRequest,
  createTimerPeriodRequest,
} from 'modules/api-requests/time-period';

import type { Moment } from 'moment';
import type { IServerTimePeriod, ITimePeriod, ITimePeriodRequest } from 'modules/api-requests/time-period/types';

interface IFormValues {
  periodName: string;
  seasons: string[];
  timePeriodDate: Moment[];
}

export const TimePeriodsTab = (): React.ReactElement => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentPeriodId, setCurrentPeriodId] = useState('');
  const [form] = useForm();
  const [modalForm] = useForm();
  const currentCourseId = useAppSelector(getCurrentCourseId);

  const { data: seasons, isLoading } = useSeasonsList(currentCourseId);

  const { mutate: createTimerPeriod, isLoading: createLoading } = useMutation({
    mutationKey: ['createTimerPeriod', currentCourseId],
    mutationFn: (data: ITimePeriodRequest) => createTimerPeriodRequest(currentCourseId, data),
    onSuccess: async () => {
      notification.success({
        message: 'Time period created successfully!',
        placement: 'topRight',
      });

      form.resetFields();
      await refetchTimePeriods();
    },
    onError: (error: string) => {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const { mutate: editTimePeriod, isLoading: editLoading } = useMutation({
    mutationFn: (args: { timePeriodId: string; data: ITimePeriod; currentCourseId: string }) => {
      const { currentCourseId, timePeriodId, data } = args;

      return editTimePeriodRequest(currentCourseId, timePeriodId, data);
    },
    onSuccess: async () => {
      notification.success({
        message: 'Time period edited successfully!',
        placement: 'topRight',
      });

      modalForm.resetFields();
      await refetchTimePeriods();
      setIsEditModalVisible(false);
    },
    onError: (error: string) => {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const { data: timePeriods, refetch: refetchTimePeriods } = useTimePeriodsList(currentCourseId);

  const { mutate: removeTimePeriod, isLoading: isDeleting } = useMutation({
    mutationFn: (timePeriodId: string) => removeTimePeriodRequest(currentCourseId, timePeriodId),
    onSuccess: async () => {
      await refetchTimePeriods();
      notification.success({
        message: 'Time period removed successfully!',
        placement: 'topRight',
      });
    },
    onError: (error: string) => {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const onFormSubmit = useCallback(
    async (values: IFormValues) => {
      await form.validateFields();
      await createTimerPeriod({
        name: values.periodName,
        startTime: values.timePeriodDate[0].format(ServerTimeFormat),
        endTime: values.timePeriodDate[1].format(ServerTimeFormat),
        seasonIds: values.seasons,
      });
    },
    [createTimerPeriod, form],
  );

  const onModalSubmit = async () => {
    await modalForm.validateFields();
    const values = modalForm.getFieldsValue();

    await editTimePeriod({
      timePeriodId: currentPeriodId,
      currentCourseId,
      data: {
        name: values.periodName,
        seasonId: values.seasons?.join(''),
        courseId: currentCourseId,
        startTime: values.timePeriodDate[0].format(ServerTimeFormat),
        endTime: values.timePeriodDate[1].format(ServerTimeFormat),
      },
    });
  };

  const onModalCancel = () => {
    setIsEditModalVisible(false);
    modalForm.resetFields();
  };

  const onModalOpen = (timePeriod: IServerTimePeriod) => {
    setIsEditModalVisible(true);
    setCurrentPeriodId(timePeriod.id);
    modalForm.setFields([
      {
        name: 'periodName',
        value: timePeriod.name,
      },
      {
        name: 'seasons',
        value: [timePeriod.seasonId],
      },
      {
        name: 'timePeriodDate',
        value: [moment(timePeriod.startTime, TimeFormat), moment(timePeriod.endTime, TimeFormat)],
      },
    ]);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xl={12} xs={24}>
        <Form onFinish={onFormSubmit} form={form} layout="vertical" size="large">
          <DividerContainer>
            <Divider orientation="left">Create time period</Divider>
          </DividerContainer>
          <Row gutter={{ xxl: 16, sm: 8 }}>
            <Col span={12}>
              <Form.Item
                name="periodName"
                rules={[{ required: true, message: 'Enter name' }, { validator: lettersAndDigitsValidator }]}
              >
                <Input placeholder="Period name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="seasons" rules={[{ required: true, message: 'Enter name' }]}>
                <StyledSelect
                  dropdownStyle={{ borderRadius: '12px' }}
                  loading={isLoading}
                  size="large"
                  placeholder="Choose season"
                  tokenSeparators={['??']}
                  mode="multiple"
                >
                  {seasons?.map((season) => (
                    <StyledSelect.Option key={season.id} value={season.id}>
                      {season.name}
                    </StyledSelect.Option>
                  ))}
                </StyledSelect>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="timePeriodDate" rules={[{ required: true, message: 'Choose date' }]}>
                <TimeRangePicker size="middle" suffixIcon={<Calendar />} format={TimeFormat} />
              </Form.Item>
            </Col>
          </Row>
          <ButtonsContainer>
            <PrimaryButton
              icon={<Plus />}
              htmlType="submit"
              disabled={!currentCourseId}
              loading={createLoading || isDeleting}
            >
              Add period
            </PrimaryButton>
          </ButtonsContainer>
        </Form>
      </Col>

      <Col xl={12} xs={24}>
        <DividerContainer>
          <Divider orientation="left">Time periods list</Divider>
        </DividerContainer>

        {seasons?.map((season) => (
          <div key={season.id}>
            <DividerContainer>
              <Divider orientation="left">{season.name}</Divider>
            </DividerContainer>

            <>
              {timePeriods && timePeriods
                ?.filter((period) => period.seasonId === season.id)
                ?.sort(sortTimePeriods)
                ?.map((timePeriod) => {
                  const onTimePeriodRemove = () =>
                    getConfirmAction({
                      title: 'Do you want to delete this timer period?',
                      action: () => removeTimePeriod(timePeriod.id),
                      okText: 'Delete',
                    });
                  const onTimePeriodEdit = () => onModalOpen(timePeriod);

                  return (
                    <TimePeriodContainer key={timePeriod.id}>
                      <TimePeriod
                        value={timePeriod}
                        onCloseCallback={onTimePeriodRemove}
                        onEditCallback={onTimePeriodEdit}
                      />
                    </TimePeriodContainer>
                  );
                })}
            </>
          </div>
        ))}
        <Modal
          title="Edit Time Period"
          visible={isEditModalVisible}
          onOk={onModalSubmit}
          onCancel={onModalCancel}
          footer={[
            <TransparentButton key="back" onClick={onModalCancel}>
              Cancel
            </TransparentButton>,
            <PrimaryButton form="modalForm" htmlType="submit" type="primary" loading={editLoading}>
              Save
            </PrimaryButton>,
          ]}
        >
          <Form id="modalForm" form={modalForm} onFinish={onModalSubmit}>
            <Row gutter={{ xxl: 16, sm: 8 }}>
              <Col span={12}>
                <Form.Item name="periodName" rules={[{ required: true, message: 'Enter name' }]}>
                  <Input placeholder="Period name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="seasons" rules={[{ required: true, message: 'Enter name' }]}>
                  <StyledSelect
                    dropdownStyle={{ borderRadius: '12px' }}
                    loading={isLoading}
                    size="large"
                    placeholder="Choose season"
                    disabled
                  >
                    {seasons?.map((season) => (
                      <StyledSelect.Option key={season.id} value={season.id}>
                        {season.name}
                      </StyledSelect.Option>
                    ))}
                  </StyledSelect>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="timePeriodDate" rules={[{ required: true, message: 'Choose date' }]}>
                  <TimeRangePicker
                    size="middle"
                    suffixIcon={<Calendar />}
                    format={TimeFormat}
                    value={[moment(), moment()]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};

export default TimePeriodsTab;
