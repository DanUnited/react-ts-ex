import React, { useState } from 'react';
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
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { SeasonCard } from './season-card';
import { Loading } from 'components/loading';
import { useAppSelector } from 'utils/hooks';
import { Title, TitleContainer } from './elements';
import { Plus } from 'components/icons/system/plus';
import { DateFormat, ServerDateFormat } from 'utils/date';
import { getCurrentCourseId } from 'models/profile/selectors';
import { DateRangePicker } from 'components/date-range-picker';
import { useSeasonsList } from 'modules/api-requests/seasons/queries';
import { PrimaryButton, TransparentButton } from 'components/layout/button';
import { lettersAndDigitsValidator } from 'utils/validators/letters-and-digits-validator';
import { createSeasonRequest, removeSeasonRequest, editSeasonRequest } from 'modules/api-requests/seasons';

import type { Moment } from 'moment';
import type { ISeason } from 'modules/api-requests/seasons/types';

interface IFormValues {
  date: [Moment, Moment];
  seasonName: string;
}

export const SeasonsTab = (): React.ReactElement => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = useForm();
  const [modalForm] = useForm();
  const breakpoints = useBreakpoint();
  const currentCourseId = useAppSelector(getCurrentCourseId);

  const {
    data: seasonsData,
    refetch: refetchSeasons,
    isFetching,
  } = useSeasonsList(currentCourseId);

  const { mutate: createSeason, isLoading } = useMutation({
    mutationFn: (data: ISeason) => createSeasonRequest(currentCourseId, data),
    onSuccess: async () => {
      notification.success({
        message: 'Seasons created successfully!',
        placement: 'topRight',
      });
      await refetchSeasons();
    },
    onError: (error: string) => {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const { mutate: editSeason, isLoading: editLoading } = useMutation({
    mutationFn: (args: { seasonId: string; data: ISeason; courseId: string }) => {
      const { courseId, seasonId, data } = args;
      return editSeasonRequest(courseId, seasonId, data);
    },
    onSuccess: async () => {
      notification.success({
        message: 'Season edited successfully!',
        placement: 'topRight',
      });
      await refetchSeasons();
      setIsEditModalVisible(false);
    },
    onError: (error: string) => {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const { mutate: removeSeason, isLoading: isRemoving, variables: removeSeasonId } = useMutation({
    mutationFn: (seasonId: string) => removeSeasonRequest(currentCourseId, seasonId),
    onSuccess: async () => {
      notification.success({
        message: 'Season deleted successfully!',
        placement: 'topRight',
      });
      await refetchSeasons();
    },
    onError: () => {
      notification.error({
        message: 'Season cannot be deleted',
        description: 'Remove all rates and time periods based on this season before',
        placement: 'topRight',
      });
    },
  });

  const onAddSeasonClick = async (values: IFormValues): Promise<void> => {
    await createSeason({
      name: values.seasonName,
      startDate: moment(values.date[0]).format(ServerDateFormat),
      endDate: moment(values.date[1]).format(ServerDateFormat),
    });

    await form.resetFields();
  };

  const onModalOpen = (seasonName: string, startDate: string, endDate: string, id: string) => {
    setIsEditModalVisible(true);
    modalForm.setFields([
      {
        name: 'seasonName',
        value: seasonName,
      },
      {
        name: 'date',
        value: [moment(startDate), moment(endDate)],
      },
      {
        name: 'seasonId',
        value: id
      }
    ]);
  };

  const onModalSubmit = async () => {
    await modalForm.validateFields();
    const values = modalForm.getFieldsValue();
    await editSeason({
      seasonId: values.seasonId,
      courseId: currentCourseId,
      data: {
        startDate: moment(values.date[0]).format(ServerDateFormat),
        endDate: moment(values.date[1]).format(ServerDateFormat),
        name: values.seasonName,
      },
    });
    modalForm.resetFields();
  };

  const onModalCancel = () => {
    setIsEditModalVisible(false);
    modalForm.resetFields();
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xl={12} xs={24}>
        <TitleContainer>
          <Divider orientation="left">
            <Title>Create season</Title>
          </Divider>
        </TitleContainer>
        <Form layout="vertical" form={form} onFinish={onAddSeasonClick}>
          <Form.Item
            name="seasonName"
            rules={[
              {
                required: true,
                message: 'Field is required',
              },
              { validator: lettersAndDigitsValidator },
            ]}
          >
            <Input size="large" placeholder="Season name" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: 'Field is required',
              },
            ]}
          >
            <DateRangePicker size="middle" format={DateFormat} />
          </Form.Item>
          <PrimaryButton
            icon={<Plus />}
            htmlType="submit"
            disabled={!currentCourseId}
            loading={isFetching || isLoading}
            size={breakpoints.xxl ? 'small' : 'large'}
          >
            Add season
          </PrimaryButton>
        </Form>
      </Col>
      <Col xl={12} xs={24}>
        <TitleContainer>
          <Divider orientation="left">
            <Title>Season list</Title>
          </Divider>
        </TitleContainer>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            {seasonsData?.map(({ name, startDate, endDate, id }) => (
              <SeasonCard
                key={id}
                id={id}
                name={name}
                startDate={startDate}
                endDate={endDate}
                onRemove={removeSeason}
                loading={(removeSeasonId === id) && isRemoving}
                onEdit={onModalOpen}
              />
            ))}
          </>
        )}
        <Modal
          title="Edit Season"
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
          <Form id="modalForm" layout="vertical" form={modalForm} onFinish={onModalSubmit}>

            <Form.Item name="seasonId" noStyle>
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              name="seasonName"
              rules={[
                {
                  required: true,
                  message: 'Field is required',
                },
                { validator: lettersAndDigitsValidator },
              ]}
            >
              <Input size="large" placeholder="Season name" />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Field is required',
                },
              ]}
            >
              <DateRangePicker size="middle" format={DateFormat} />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};

export default SeasonsTab;
