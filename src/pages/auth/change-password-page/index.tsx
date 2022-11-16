import React, { useCallback, useEffect, useMemo } from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { useMutation } from 'react-query';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { PhoneInput } from 'components/phone';
import { AuthWrapper } from '../auth-wrapper';
import { FormAlert } from 'components/form/alert';
import { setAuthCookies } from '../set-auth-cookies';
import { getAuthState } from 'models/auth/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { isChangePasswordSuccess, updatePasswordRequest } from 'modules/api-requests/auth';
import { AuthTitle, WGMLogo, AuthPlate, AuthDescriptionText, SubmitButton } from '../elements';

import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type {
  IUpdatePasswordRequest,
  IUpdatePasswordResponse,
  ILoginUpdatePasswordError
} from 'modules/api-requests/auth/types';

export const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  const breakpoints = useBreakpoint();
  const authState = useAppSelector(getAuthState);
  const formSize: SizeType = useMemo(() => breakpoints.xxl ? 'large' : 'middle', [breakpoints.xxl]);

  const {
    mutateAsync,
    isLoading,
    error,
  } = useMutation<IUpdatePasswordResponse | ILoginUpdatePasswordError, string, IUpdatePasswordRequest>(updatePasswordRequest, {
    onSuccess: (response) => {
      if (isChangePasswordSuccess(response)) {
        notification.success({
          message: 'Your password is changed successfully!',
          placement: 'topRight',
        });

        setAuthCookies(response.AuthenticationResult);
        dispatch(push(PathCreator[RoutePaths.DASHBOARD].getUrl()));
      }
    },
  });

  const onFormSubmit = useCallback(async (values) => {
    await mutateAsync(values);
  }, [mutateAsync]);

  useEffect(() => {
    if (!authState.username) {
      dispatch(push(PathCreator[RoutePaths.AUTH_LOGIN].getUrl()));
    }
  }, [authState.username, dispatch]);

  const isRequiredField = (fieldName: string) => authState?.requiredAttributes?.includes(fieldName);

  return (
    <AuthWrapper>
      <AuthPlate>
        <a href={PathCreator[RoutePaths.AUTH_LOGIN].getUrl()}>
          <WGMLogo />
        </a>

        <AuthTitle>Welcome to <br /> Golf Geek Software <br />Booking Engine</AuthTitle>

        <AuthDescriptionText>Enter new password to continue</AuthDescriptionText>

        {error && <FormAlert message={error} type="error" />}

        <Form layout="vertical" size={formSize} onFinish={onFormSubmit} initialValues={authState}>
          <Form.Item name="username" noStyle>
            <Input type="hidden" />
          </Form.Item>

          <Form.Item name="password" rules={[
            { required: true, message: 'Enter current password' }
          ]}>
            <Input.Password placeholder="Current password" />
          </Form.Item>

          {isRequiredField('NEW_PASSWORD') && (
            <Form.Item name="NEW_PASSWORD" rules={[
              { required: true, message: 'Enter new password' }
            ]}>
              <Input.Password placeholder="New password" />
            </Form.Item>
          )}

          {isRequiredField('userAttributes.given_name') && (
            <Form.Item name="userAttributes.given_name" rules={[
              { required: true, message: 'Enter First name' }
            ]}>
              <Input placeholder="First name" />
            </Form.Item>
          )}

          {isRequiredField('userAttributes.family_name') && (
            <Form.Item name="userAttributes.family_name" rules={[
              { required: true, message: 'Enter Last name' }
            ]}>
              <Input placeholder="Last name" />
            </Form.Item>
          )}

          {isRequiredField('userAttributes.phone_number') && (
            <Form.Item name="userAttributes.phone_number" rules={[
              { required: true, message: 'Enter phone number' }
            ]}>
              <PhoneInput country="us" size={formSize} />
            </Form.Item>
          )}

          <SubmitButton
            size={formSize}
            loading={isLoading}
            htmlType="submit"
          >
            Update password
          </SubmitButton>
        </Form>
      </AuthPlate>
    </AuthWrapper>
  );
};

export default ChangePasswordPage;
