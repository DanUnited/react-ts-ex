import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Form from 'antd/es/form';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import omit from 'lodash/omit';
import Input from 'antd/es/input';
import { Helmet } from 'react-helmet';
import { notification } from 'antd/es';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { Golf } from 'components/icons';
import { PhoneInput } from 'components/phone';
import { profileActions } from 'models/profile';
import { Plate } from 'components/layout/plate';
import { FormAlert } from 'components/form/alert';
import { Header2 } from 'components/layout/headers';
import { getCourses } from 'models/courses/selectors';
import { FlexBoxLeft } from 'components/layout/flex-block';
import { PageLayout } from 'components/layout/page-layout';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { PasswordPopoverWrapper } from './password-popover-wrapper';
import { HeaderBlock } from 'components/layout/page-layout/elements';
import { confirmValidator } from 'utils/validators/confirm-validator';
import { ThreeColumnLayout } from 'components/layout/three-column-layout';
import { getProfileName, getProfileState } from 'models/profile/selectors';
import { CommentUserInfoIcon } from 'components/icons/user/comment-user-info-icon';
import { changePasswordRequest, updateProfileAttributesRequest } from 'modules/api-requests/auth';

import {
  ProfilePanel,
  ProfileButton,
  ProfileName,
  ProfileAvatar,
  AvatarWithNameContainer,
  ProfileInformationContainer,
} from './elements';

import type {
  IChangePasswordRequest,
  IChangePasswordResponse,
  IUpdateProfileAttributesRequest,
} from 'modules/api-requests/auth/types';
import type { Gutter } from 'antd/es/grid/row';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

interface IChangePasswordFields extends IChangePasswordRequest {
  'confirm-password': string;
}

const rowGutter: [Gutter, Gutter] = [{ xxl: 16, xl: 8 }, { xxl: 8, xl: 4 }];

export const ProfilePage = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const [changePasswordForm] = useForm();
  const breakpoints = useBreakpoint();
  const courses = useAppSelector(getCourses);
  const profileName = useSelector(getProfileName);
  const currentProfile = useSelector(getProfileState);
  const formSize: SizeType = useMemo(() => breakpoints.xxl ? 'large' : 'middle', [breakpoints.xxl]);
  const [visiblePasswordHint, setVisiblePasswordHint] = useState<Record<string, boolean>>({});

  const {
    mutate: mutateProfileAttributes,
    isLoading: isProfileAttributesLoading,
    error: profileAttributesError,
  } = useMutation('updateProfileAttributes', {
    mutationFn: updateProfileAttributesRequest,
    onSuccess: function(data) {
      dispatch(profileActions.setFields(data));

      notification.success({
        message: 'Your profile changed successfully!',
        placement: 'topRight',
      });
    },
    onError: function(error: string) {
      notification.error({
        message: 'Can\'t updated profile!',
        description: error,
        placement: 'topRight',
      });
    },
  });

  useEffect(() => {
    form.setFields(dataToFormValues(currentProfile));
  }, [currentProfile, form]);

  const {
    mutateAsync,
    isLoading,
    error,
  } = useMutation<IChangePasswordResponse, string, IChangePasswordRequest>('changeUserPassword', {
    mutationFn: changePasswordRequest,
    onSuccess: function() {
      notification.success({
        message: 'Your password changed successfully!',
        placement: 'topRight',
      });

      changePasswordForm.resetFields();
    },
  });

  const onChangeProfileSubmit = useCallback((formValues) => {
    mutateProfileAttributes(omit(formValues, 'email') as IUpdateProfileAttributesRequest);
  }, [mutateProfileAttributes]);

  const coursesData = useMemo(() =>
      Object
        .values(courses)
        .filter(item => item.users?.map(user => user.id)?.includes(String(currentProfile?.sub))),
    [courses, currentProfile?.sub],
  );

  const onChangePasswordSubmit = useCallback(async (formValues) => {
    await mutateAsync(omit<IChangePasswordFields>(formValues, ['confirm-password']) as IChangePasswordRequest);
  }, [mutateAsync]);

  const onPasswordFocus = (prefix: string) => () => setVisiblePasswordHint(currentState => ({
    ...currentState,
    [prefix]: true,
  }));

  const onPasswordBlur = (prefix: string) => () => setVisiblePasswordHint(currentState => ({
    ...currentState,
    [prefix]: false,
  }));

  return (
    <>
      <Helmet title="User profile" />

      <HeaderBlock>
        <FlexBoxLeft>
          <Header2>User profile</Header2>
        </FlexBoxLeft>
      </HeaderBlock>

      <ThreeColumnLayout
        firstColumn={(
          <Plate>
            <AvatarWithNameContainer>
              <ProfileAvatar />
              <ProfileName>{profileName}</ProfileName>
            </AvatarWithNameContainer>

            <ProfileInformationContainer>
              <span className="title">
                <CommentUserInfoIcon /> Roles
              </span>
              <div className="description">{currentProfile?.groups?.join(', ')}</div>

              <span className="title">
                <Golf /> Assigned courses
              </span>

              <div className="description">
                {coursesData
                  .map(course => <p key={course.id}>{course.name}</p>)}
              </div>
            </ProfileInformationContainer>
          </Plate>
        )}
        secondColumn={(
          <Plate>
            <PageLayout title="Profile info" bodiless>
              <Row gutter={rowGutter}>
                <Col xs={24} xl={12}>
                  <Form
                    form={form}
                    size={formSize}
                    initialValues={currentProfile}
                    onFinish={onChangeProfileSubmit}
                  >
                    <ProfilePanel title="Profile information">
                      {profileAttributesError && <FormAlert message={profileAttributesError} type="error" />}

                      <Form.Item name="firstname" rules={[
                        { required: true, message: 'Enter current password' },
                      ]}>
                        <Input placeholder="First name" />
                      </Form.Item>

                      <Form.Item name="lastname">
                        <Input placeholder="Last name" />
                      </Form.Item>

                      <Form.Item name="phoneNumber">
                        <PhoneInput country="us" size={formSize} />
                      </Form.Item>

                      <Form.Item name="buildingAddress">
                        <Input placeholder="Billing address" />
                      </Form.Item>

                      <Form.Item name="city">
                        <Input placeholder="City" />
                      </Form.Item>

                      <Row gutter={rowGutter}>
                        <Col span={8}>
                          <Form.Item name="state">
                            <Input placeholder="State" />
                          </Form.Item>
                        </Col>

                        <Col span={16}>
                          <Form.Item name="postalCode">
                            <Input placeholder="Postal code" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item name="email">
                        <Input placeholder="E-Mail" type="email" disabled />
                      </Form.Item>

                      <Form.Item>
                        <ProfileButton
                          className="w-100"
                          htmlType="submit"
                          loading={isProfileAttributesLoading}
                        >
                          Save changes
                        </ProfileButton>
                      </Form.Item>
                    </ProfilePanel>
                  </Form>
                </Col>
                <Col xs={24} xl={12}>
                  <Form size={formSize} onFinish={onChangePasswordSubmit} form={changePasswordForm}>
                    <ProfilePanel title="Change profile password">
                      {error && <FormAlert message={error} type="error" />}

                      <Form.Item name="oldPassword" rules={[
                        { required: true, message: 'Please enter the current password' },
                      ]}>
                        <Input.Password placeholder="Current password" />
                      </Form.Item>

                      <PasswordPopoverWrapper visible={visiblePasswordHint['newPassword']}>
                        <Form.Item name="newPassword" rules={[
                          { required: true, message: 'Please enter a new password' },
                        ]}>
                          <Input.Password
                            placeholder="New password"
                            onFocus={onPasswordFocus('newPassword')}
                            onBlur={onPasswordBlur('newPassword')}
                          />
                        </Form.Item>
                      </PasswordPopoverWrapper>

                      <PasswordPopoverWrapper visible={visiblePasswordHint['confirm-password']}>
                        <Form.Item name="confirm-password" rules={[
                          { required: true, message: 'Please repeat new password' },
                          confirmValidator('newPassword', 'Passwords must match'),
                        ]}
                        >
                          <Input.Password
                            placeholder="Confirm new password"
                            onFocus={onPasswordFocus('confirm-password')}
                            onBlur={onPasswordBlur('confirm-password')}
                          />
                        </Form.Item>
                      </PasswordPopoverWrapper>

                      <Form.Item>
                        <ProfileButton className="w-100" loading={isLoading} htmlType="submit">
                          Save changes
                        </ProfileButton>
                      </Form.Item>
                    </ProfilePanel>
                  </Form>
                </Col>
              </Row>
            </PageLayout>
          </Plate>
        )}
        thirdColumn={null}
      />
    </>
  );
};

export default ProfilePage;
