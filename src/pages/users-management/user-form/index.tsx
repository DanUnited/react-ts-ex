import React, { useCallback, useEffect, useMemo } from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import omit from 'lodash/omit';
import Form from 'antd/es/form';
import Space from 'antd/es/space';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import { notification } from 'antd/es';
import { ConfigProvider } from 'antd/es';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { PhoneFormItem } from 'components/phone';
import { FormAlert } from 'components/form/alert';
import { UserFormSkeleton } from './user-form-skeleton';
import { getProfileName } from 'models/profile/selectors';
import { SecondaryButton } from 'components/layout/button';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { queryOptions } from 'modules/api-requests/constants';
import { useCourseList } from 'modules/api-requests/courses/queries';
import { dataToFormValues as toFormValues } from 'utils/form/data-to-form-values';
import { ButtonContainer, ColumnTitle, Container, PageUserLayout } from './elements';
import { getUserGroupName, UserGroupEnum } from 'modules/api-requests/users/constants';
import {
  createUserRequest,
  getUserByIdRequest,
  setUserGroupRequest,
  detachUserToCourseRequest,
  attachUserToCourseRequest,
} from 'modules/api-requests/users';

import type {
  IUserGroupType,
  ICreateUserRequest,
  ISetUserGroupRequest,
  IAttachUserToCourseRequest,
} from 'modules/api-requests/users/types';

const backActionURL = PathCreator[RoutePaths.USERS_MANAGEMENT].getUrl();

export const UserForm = (): React.ReactElement => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const profileName = useAppSelector(getProfileName);
  const { data: courses, isFetching: isCoursesLoading } = useCourseList();

  const { mutateAsync: createUser, isLoading, error } = useMutation({
    mutationFn: (data: ICreateUserRequest) => createUserRequest(data),
    onSuccess: () => {
      return Promise.resolve().finally(() => {
        dispatch(push(PathCreator[RoutePaths.USERS_MANAGEMENT].getUrl()));

        notification.success({
          message: 'User created successfully!',
          placement: 'topRight',
        });
      });
    },
    onError: function(error: string) {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const { mutate: updateUserGroup, isLoading: isGroupLoading, error: updateGroupError } = useMutation({
    mutationFn: (data: ISetUserGroupRequest) => setUserGroupRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['getCurrentUser', profileName]);

      return Promise.resolve().finally(() => {
        dispatch(push(PathCreator[RoutePaths.USERS_MANAGEMENT].getUrl()));

        notification.success({
          message: 'User updated successfully!',
          placement: 'topRight',
        });
      });
    },
    onError: function(error: string) {
      notification.error({
        message: error,
        placement: 'topRight',
      });
    },
  });

  const { mutate: attachUser, isLoading: isAttachingUser } = useMutation({
    mutationFn: (data: IAttachUserToCourseRequest) => attachUserToCourseRequest(data),
    onError: (error: string) => {
      notification.error({ message: error });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getCourses']);
    },
  });

  const { mutate: detachUser, isLoading: isDetachingUser } = useMutation({
    mutationFn: (data: IAttachUserToCourseRequest) => detachUserToCourseRequest(data),
    onError: (error: string) => {
      notification.error({ message: error });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getCourses']);
    },
  });

  const { data: currentUser, isFetching: isLoadingUser } = useQuery({
    queryKey: ['getUser', id],
    queryFn: () => getUserByIdRequest(id),
    enabled: Boolean(id),
    ...queryOptions
  });

  const onFormSubmit = useCallback(async (values: ICreateUserRequest & { groups: IUserGroupType[] }): Promise<void> => {
    await form.validateFields();
    const { courseIds } = values;
    const currentCourseIds = currentUser?.courses?.map(item => item.id) || [];

    if (id) {
      courseIds?.forEach((courseId) => {
        if (courseId && !currentCourseIds?.includes(courseId)) {
          attachUser({
            courseId,
            userSub: id,
          });
        }
      });

      currentCourseIds?.forEach(item => {
        if (!courseIds?.includes(item)) {
          detachUser({
            courseId: item,
            userSub: id,
          });
        }
      });

      updateUserGroup({ sub: id, groups: values.groups });
    } else {
      const { sub } = await createUser(omit(values, 'courseIds'));

      courseIds?.forEach((courseId) => {
        if (courseId && !currentCourseIds?.includes(courseId)) {
          attachUser({
            courseId,
            userSub: sub,
          });
        }
      });
    }
  }, [form, createUser, id, updateUserGroup, attachUser, currentUser, detachUser]);

  const onCancelHandler = useCallback(() => {
    dispatch(push(backActionURL));
  }, [dispatch]);

  const onUserFormSubmit = useCallback((): void => {
    form.submit();
  }, [form]);

  const pageTitle = useMemo(() => id ? 'Edit user' : 'New user', [id]);

  useEffect(() => {
    if (currentUser) {
      form.setFields(toFormValues({
        ...currentUser,
        courseIds: currentUser.courses.map(item => item.id),
      }));
    }
  }, [currentUser, form]);

  return (
    <PageUserLayout
      title={pageTitle}
      fullHeight
      returnSrc={backActionURL}
      actions={(
        <Space size={[16, 0]}>
          <ButtonContainer>
            <SecondaryButton onClick={onCancelHandler} size="large">Cancel</SecondaryButton>
            <Button
              size="large"
              type="primary"
              loading={isLoading || isGroupLoading || isAttachingUser || isDetachingUser}
              onClick={onUserFormSubmit}
            >
              Save
            </Button>
          </ButtonContainer>
        </Space>
      )}
      breadcrumbExtra={[
        { key: 'create_user', title: pageTitle, path: PathCreator[RoutePaths.USERS_MANAGEMENT] },
      ]}
    >
      {isLoadingUser || isCoursesLoading
        ? <UserFormSkeleton />
        : (
          <ConfigProvider componentSize="large">
            <Form form={form} layout="vertical" onFinish={onFormSubmit} size="large">
              <Container>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <ColumnTitle>Main info</ColumnTitle>

                    {error && <FormAlert message={error || updateGroupError} type="error" />}

                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item name="firstname" label="First name" rules={[
                          { required: true, message: 'Enter first name' },
                        ]}>
                          <Input placeholder="Enter first name" disabled={Boolean(id)} />
                        </Form.Item>
                        <Form.Item name="email" label="E-Mail" rules={[
                          { required: true, message: 'Enter E-Mail', type: 'email' },
                        ]}>
                          <Input placeholder="Enter e-mail" disabled={Boolean(id)} />
                        </Form.Item>

                        <Form.Item name="groups" label="Role" rules={[
                          { required: true, message: 'Choose user role' },
                        ]}>
                          <Select placeholder="Choose role" mode="multiple">
                            {Object.keys(UserGroupEnum).map((userGroup) =>
                              <Select.Option value={Object(UserGroupEnum)[userGroup]} key={userGroup}>
                                {getUserGroupName(userGroup as keyof typeof UserGroupEnum)}
                              </Select.Option>)
                            }
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="lastname" label="Last name" rules={[
                          { required: true, message: 'Enter last name' },
                        ]}>
                          <Input placeholder="Enter last name" disabled={Boolean(id)} />
                        </Form.Item>

                        <PhoneFormItem
                          country="us"
                          rules={[
                            { required: true, message: 'Enter phone' },
                          ]}
                          name="phoneNumber"
                          inputProps={{
                            disabled: Boolean(id),
                          }}
                        />

                        <Form.Item
                          name="password"
                          label="Password"
                          rules={!id
                            ? [{ required: true, message: 'Enter password' }]
                            : []
                          }>
                          <Input.Password placeholder="Password" disabled={Boolean(id)} autoComplete="no" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <ColumnTitle>Assign to courses</ColumnTitle>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item name="courseIds" label="Choose course">
                          <Select placeholder="Course" mode="multiple">
                            {Object.values(courses || [])?.map(item => (
                              <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Form>
          </ConfigProvider>
        )
      }
    </PageUserLayout>
  );
};

export default UserForm;
