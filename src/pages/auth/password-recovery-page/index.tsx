import React, { useMemo } from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { useMutation } from 'react-query';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { AuthWrapper } from '../auth-wrapper';
import { FormAlert } from 'components/form/alert';
import { getAuthState } from 'models/auth/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { LockIcon } from 'components/icons/inputs/lock-icon';
import { UserIcon } from 'components/icons/inputs/user-icon';
import { confirmRecoveryPasswordRequest, recoveryPasswordRequest } from 'modules/api-requests/auth';
import { SubmitButton, AuthDescriptionText, AuthTitle, WGMLogo, AuthPlate } from 'pages/auth/elements';

import type {
  IRecoveryPasswordRequest,
  IRecoveryPasswordResponse,
  IConfirmRecoveryPasswordRequest,
  IConfirmRecoveryPasswordResponse,
} from 'modules/api-requests/auth/types';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

export const PasswordRecoveryPage = () => {
  const dispatch = useAppDispatch();
  const breakpoints = useBreakpoint();
  const authState = useAppSelector(getAuthState);
  const formSize: SizeType = useMemo(() => breakpoints.xxl ? 'large' : 'middle', [breakpoints.xxl]);

  const {
    data,
    mutateAsync: recoveryPassword,
    isLoading: isRecoveryPasswordLoading,
    error: recoveryPasswordError,
  } = useMutation<IRecoveryPasswordResponse, string, IRecoveryPasswordRequest>(recoveryPasswordRequest, {
    onError: (error: string) => {
      notification.error({
        message: error,
      })
    }
  });

  const {
    mutateAsync: confirmRecoveryPassword,
    error: confirmRecoveryPasswordError,
    isLoading: isConfirmRecoveryPasswordLoading,
  } = useMutation<IConfirmRecoveryPasswordResponse, string, IConfirmRecoveryPasswordRequest>(confirmRecoveryPasswordRequest, {
    onSuccess: () => {
      notification.success({
        message: 'Password reset done. Now you can login with your new password',
      });

      dispatch(push(PathCreator[RoutePaths.AUTH_LOGIN].getUrl()));
    },
    onError: (error: string) => {
      notification.error({
        message: error,
      })
    }
  });

  return (
    <AuthWrapper>
      <AuthPlate>
        <a href={PathCreator[RoutePaths.AUTH_LOGIN].getUrl()}>
          <WGMLogo />
        </a>

        <AuthTitle>Forgot password</AuthTitle>

        {recoveryPasswordError && <FormAlert message={recoveryPasswordError} type="error" />}
        {confirmRecoveryPasswordError && <FormAlert message={confirmRecoveryPasswordError} type="error" />}

        <AuthDescriptionText>{Boolean(data)
          ? 'We sent code to E-Mail: ' + data?.CodeDeliveryDetails?.Destination
          : 'Enter your e-mail to get password reset link'
        }
        </AuthDescriptionText>

        <Form
          layout="vertical"
          size={formSize}
          initialValues={authState}
          onFinish={Boolean(data) ? confirmRecoveryPassword : recoveryPassword}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Enter E-Mail' }
            ]}
            noStyle={Boolean(data)}
          >
            <Input
              placeholder="E-Mail"
              size={formSize}
              prefix={Boolean(data) ? null : <UserIcon />}
              type={Boolean(data) ? 'hidden' : 'email'}
            />
          </Form.Item>

          {Boolean(data) && (
            <>
              <Form.Item name="newPassword" rules={[
                { required: true, message: 'Enter new password' }
              ]}>
                <Input.Password placeholder="Password" prefix={<LockIcon />} />
              </Form.Item>

              <Form.Item name="code" rules={[
                { required: true, message: 'Enter code from E-Mail' }
              ]}>
                <Input placeholder="Code" size={formSize} />
              </Form.Item>
            </>
          )}

          <SubmitButton
            size={formSize}
            loading={isRecoveryPasswordLoading || isConfirmRecoveryPasswordLoading}
            htmlType="submit"
          >
            {Boolean(data) ? 'Update password' : 'Reset password'}
          </SubmitButton>
        </Form>
      </AuthPlate>
    </AuthWrapper>
  );
};

export default PasswordRecoveryPage;
