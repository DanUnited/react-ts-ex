import Col from 'antd/es/col';
import omit from 'lodash/omit';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Space from 'antd/es/space';
import Switch from 'antd/es/switch';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import { useForm } from 'antd/es/form/Form';
import momentTimezone from 'moment-timezone';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import ConfigProvider from 'antd/es/config-provider';
import { useHistory, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import { Trash } from 'components/icons';
import { useAppDispatch } from 'utils/hooks';
import { PhoneFormItem } from 'components/phone';
import { NumberInput } from 'components/number-input';
import { ModalTitle } from 'components/modal/elements';
import { COURSE_INPUT_MAX_LENGTH } from 'utils/constants';
import { PageLayout } from 'components/layout/page-layout';
import { getConfirmAction } from 'components/modal/confirm';
import { PathCreator, RoutePaths } from 'routing/constants';
import { Header3, Header4 } from 'components/layout/headers';
import { useCourse } from 'modules/api-requests/courses/queries';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { getUserManagersRequest } from 'modules/api-requests/users';
import { zipcodeValidator } from 'utils/validators/zipcode-validator';
import { TimeZonesSelector } from 'components/form/time-zones-selector';
import { TrashModalIcon, RoundRow, FeeControlsRadio } from './elements';
import { SecondaryButton, DefaultButton } from 'components/layout/button';
import { emailListValidator } from 'utils/validators/email-list-validator';
import { HeaderContainer } from 'components/layout/headers/header-container';
import { lettersAndDigitsValidator, alphaNumExtendedValidator } from 'utils/validators/letters-and-digits-validator';

import {
  MainInfoSkeleton,
  AssignToUserSkeleton,
  HolesSettingsSkeleton,
  MonetizationModelSkeleton,
} from '../course-form-skeleton';

import {
  createCourseRequest,
  deleteCourseRequest,
  updateCourseRequest,
} from 'modules/api-requests/courses';

import type { ICourse } from 'modules/api-requests/courses/types';

const backActionURL = PathCreator[RoutePaths.COURSE_MANAGEMENT].getUrl();

const defaultCourseFields = {
  isActive: true,
  timeZone: momentTimezone.tz.guess(),
  transactionFeePerPlayer: false,
  transactionFeeTradePerPlayer: false,
};

const feeControlsOptions = [
    {
      label: 'Per player',
      value: true,
    },
    {
      label: 'Per booking',
      value: false,
    },
  ]
;

interface IUrlParams {
  id: string;
}

interface ICourseForm extends Omit<ICourse, 'users'> {
  users: string[];
}

export const CourseForm = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [toggle, setToggle] = useState(true);
  const { location } = useHistory();
  const { id } = useParams<IUrlParams>();

  const isUpdatePage = location.pathname.startsWith('/course/update');

  const { data, isFetching: isCourseFetching } = useCourse(id, {
    enabled: isUpdatePage,
  });

  const { data: managersList, isFetching: isUsersFetching } = useQuery({
    queryFn: getUserManagersRequest,
    queryKey: ['getUserManagers'],
  });

  useEffect(() => {
    if (isUpdatePage && data) {
      form.setFields(dataToFormValues({
        ...omit(data, 'id'),
        users: data?.users?.map(item => item.id),
      }));

      setToggle(data?.isActive);
    }
  }, [data, form, isUpdatePage]);

  const { mutate: createCourse, isLoading: isCreatingCourse } = useMutation(
    {
      mutationFn: (data: ICourse) => createCourseRequest(data),
      onSuccess: () => {
        return Promise
          .resolve(queryClient.refetchQueries(['getCourses']))
          .finally(() => {
            notification.success({
              message: 'Course created successfully!',
              placement: 'topRight',
            });

            dispatch(push(backActionURL));
          });
      },
      onError: function(error) {
        notification.error({
          message: String(error),
          placement: 'topRight',
        });
      },
    });

  const { mutate: updateCourse, isLoading: isUpdatingCourse } = useMutation({
    mutationFn: (data: ICourse) => updateCourseRequest(id, data),
    onSuccess: () => {
      return Promise
        .resolve(queryClient.refetchQueries(['getCourses']))
        .finally(() => {
          notification.success({
            message: 'Course updated successfully!',
            placement: 'topRight',
          });

          dispatch(push(backActionURL));
        });
    },
    onError: function(error) {
      notification.error({
        message: String(error),
        placement: 'topRight',
      });
    },
  });

  const { mutate: deleteCourse } = useMutation({
    mutationFn: () => deleteCourseRequest(id),
    onSuccess: () => {
      return Promise
        .resolve(queryClient.refetchQueries(['getCourses']))
        .finally(() => {
          notification.success({
            message: 'Course deleted successfully',
            placement: 'topRight',
          });

          dispatch(push(backActionURL));
        });
    },
    onError: function(error) {
      notification.error({
        message: String(error),
        placement: 'topRight',
      });
    },
  });

  const onFormSubmit = useCallback(async (values: ICourseForm) => {
    await form.validateFields();
    const _values = { ...values, isActive: toggle, users: values.users?.map(item => ({ id: item })) } as ICourse;
    isUpdatePage ? updateCourse(_values) : createCourse(_values);
  }, [toggle, isUpdatePage, form, createCourse, updateCourse]);

  const onCreateClick = useCallback(() => {
    form.submit();
  }, [form]);

  const onCancelClick = useCallback(() => {
    dispatch(push(backActionURL));
  }, [dispatch]);

  const onDeleteCourseAction = () => {
    getConfirmAction(
      {
        action: () => deleteCourse(),
        icon: <TrashModalIcon />,
        okText: 'Delete',
        cancelText: 'Cancel',
        title: <ModalTitle>Are you sure, you want to delete this course?</ModalTitle>,
      });
  };

  const toggleHandler = (): void => {
    setToggle(!toggle);
  };

  const courseName = data?.name || '';

  return (
    <PageLayout
      title={isUpdatePage ? courseName : 'New course'}
      titleAction={
        isUpdatePage && (
          <Switch checked={toggle} onChange={toggleHandler} />
        )
      }
      returnSrc={backActionURL}
      actions={(
        <Space size={[16, 0]}>
          {isUpdatePage && (
            <>
              <DefaultButton
                size="large"
                icon={<Trash fill="#FF6960" />}
                onClick={onDeleteCourseAction}
                danger
              >
                Delete course
              </DefaultButton>
            </>
          )}
          <SecondaryButton
            size="large"
            onClick={onCancelClick}
          >
            Cancel
          </SecondaryButton>
          <Button
            type="primary"
            size="large"
            onClick={onCreateClick}
            loading={isUpdatingCourse || isCreatingCourse}
          >
            {isUpdatePage ? 'Save changes' : 'Create course'}
          </Button>
        </Space>
      )}
      fullHeight
      breadcrumbExtra={[
        {
          key: 'create_user',
          title: isUpdatePage ? courseName : 'New course',
          path: PathCreator[RoutePaths.COURSE_MANAGEMENT_CREATION],
        },
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFormSubmit}
        size="large"
        initialValues={defaultCourseFields}
      >
        <Row gutter={[24, 24]}>
          <Col xl={12} xs={24}>
            <HeaderContainer>
              <Header3>Main info</Header3>
            </HeaderContainer>

            {(!isCourseFetching && !isUsersFetching) ?
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="id" noStyle>
                    <Input type="hidden" />
                  </Form.Item>

                  <Form.Item name="isActive" noStyle>
                    <Input type="hidden" />
                  </Form.Item>

                  <Form.Item name="name" label="Course name" rules={[
                    { required: true, message: 'Course name is required' },
                    { validator: lettersAndDigitsValidator },
                  ]}>
                    <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Enter course name" />
                  </Form.Item>
                  <Form.Item name="city" label="City" rules={[
                    { required: true, message: 'City name is required' },
                    { validator: alphaNumExtendedValidator },
                  ]}>
                    <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Enter city name" />
                  </Form.Item>

                  <Form.Item name="zip" label="ZIP" rules={[
                    { required: true, message: 'Enter zip code' },
                    { validator: zipcodeValidator },
                  ]}>
                    <Input placeholder="Enter zip code" />
                  </Form.Item>

                  <Form.Item
                    name="confirmationEmails"
                    label="Confirmation emails"
                    rules={[{
                      required: true,
                      message: 'Confirmation email is required',
                    }, { validator: emailListValidator }]}
                  >
                    <Input placeholder="Enter a list of letters separated by commas" />
                  </Form.Item>

                  <Form.Item name="timeZone" label="Time zone" rules={[
                    { required: true, message: 'Time zone is required' },
                  ]}>
                    <TimeZonesSelector />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="address" label="Address" rules={[
                    { required: true, message: 'Course address is required' },
                    { validator: alphaNumExtendedValidator },
                  ]}>
                    <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Enter course address" />
                  </Form.Item>

                  <Form.Item name="state" label="State" rules={[
                    { required: true, message: 'State is required' },
                    { validator: lettersAndDigitsValidator },
                  ]}>
                    <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Select state" />
                  </Form.Item>

                  <ConfigProvider componentSize="large">
                    <PhoneFormItem country="us" name="contactPhone" required={true} />
                  </ConfigProvider>

                  <Form.Item
                    name="website"
                    label="Website URL"
                    rules={[
                      {
                        type: 'url',
                        message: 'Please enter a valid URL',
                      },
                    ]}
                  >
                    <Input placeholder="Enter URL" />
                  </Form.Item>

                  <Form.Item
                    name="subdomain"
                    label="Sub-domain name"
                    rules={[
                      {
                        type: 'url',
                        message: 'Please enter a valid URL',
                      },
                    ]}
                  >
                    <Input placeholder="Enter course sub-domain" />
                  </Form.Item>
                </Col>
              </Row> : <MainInfoSkeleton />}

            <HeaderContainer>
              <Header3>Monetization model</Header3>
            </HeaderContainer>

            {(!isCourseFetching && !isUsersFetching)
              ? <>
                <RoundRow><Col><Header4>Regular rounds</Header4></Col><Col /></RoundRow>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="transactionFee" label="Transaction fee">
                      <NumberInput min={0} placeholder="Enter transaction fee" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="transactionFeePerPlayer" label="Transaction fee type">
                      <FeeControlsRadio
                        options={feeControlsOptions}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <RoundRow><Col><Header4>Trade rounds</Header4></Col><Col /></RoundRow>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="transactionFeeTrade" label="Transaction fee">
                      <NumberInput min={0} placeholder="Enter transaction fee" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="transactionFeeTradePerPlayer" label="Transaction fee type">
                      <FeeControlsRadio
                        options={feeControlsOptions}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
              : <MonetizationModelSkeleton />}
          </Col>
          <Col xl={12} xs={24}>
            <HeaderContainer>
              <Header3>9/18 Holes settings</Header3>
            </HeaderContainer>

            {(!isCourseFetching && !isUsersFetching) ?
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    name="holes"
                    label="Number of holes"
                    rules={[
                      { required: true, message: 'Enter count of holes' },
                    ]}
                  >
                    <FeeControlsRadio
                      options={[
                        {
                          label: '9 holes',
                          value: 9,
                        },
                        {
                          label: '18 holes',
                          value: 18,
                        },
                      ]}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="nineHolesDuration"
                    label="9 holes round duration"
                    rules={[
                      { required: true, message: 'Enter round duration' },
                    ]}
                  >
                    <Select
                      options={Array(21)
                        .fill(0)
                        .map((item, index) => ({
                          label: String(index * 9),
                          value: index * 9,
                        }))}
                      placeholder="Select time duration"
                    />
                  </Form.Item>
                </Col>
              </Row> : <HolesSettingsSkeleton />}

            <HeaderContainer>
              <Header3>Assign to user</Header3>
            </HeaderContainer>

            {!isCourseFetching && !isUsersFetching
              ? <Form.Item name="users" label="User">
                <Select placeholder="Select a user" mode="multiple">
                  {managersList?.map(user => (
                    <Select.Option key={user.sub} value={user.sub}>
                      {`${user.firstname} ${user.lastname}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              : <AssignToUserSkeleton />}
          </Col>
        </Row>
      </Form>
    </PageLayout>
  );
};

export default CourseForm;
