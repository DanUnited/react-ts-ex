import React, { useCallback, useMemo } from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { isObject } from 'lodash';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { push } from 'connected-react-router';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { authActions } from 'models/auth';
import { LinkContainer } from './elements';
import { useAppDispatch } from 'utils/hooks';
import { AuthWrapper } from '../auth-wrapper';
import { FormAlert } from 'components/form/alert';
import { setAuthCookies } from '../set-auth-cookies';
import { loginRequest } from 'modules/api-requests/auth';
import { PathCreator, RoutePaths } from 'routing/constants';
import { AuthTitle, AuthPlate, WGMLogo, SubmitButton } from '../elements';
import { ILoginChallengeNameEnum } from 'modules/api-requests/auth/types';

import { UserIcon } from 'components/icons/inputs/user-icon';
import { LockIcon } from 'components/icons/inputs/lock-icon';

import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ILoginRequest } from 'modules/api-requests/auth/types';
import type { ILoginUpdatePasswordError, ILoginResponse } from 'modules/api-requests/auth/types';

const normalizeField = (value: string) => value.trim();

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const breakpoints = useBreakpoint();
  const formSize: SizeType = useMemo(() => breakpoints.xxl ? 'large' : 'middle', [breakpoints.xxl]);

  const {
    isLoading,
    mutateAsync,
    error: loginError,
  } = useMutation<ILoginResponse | ILoginUpdatePasswordError, string, ILoginRequest>(loginRequest, {
    onSuccess: (loginResponse) => {
      if ((loginResponse as ILoginUpdatePasswordError).ChallengeName === ILoginChallengeNameEnum.NEW_PASSWORD_REQUIRED) {
        dispatch(authActions.setFields({
          requiredAttributes: (loginResponse as ILoginUpdatePasswordError).RequiredAttriutes,
        }));

        dispatch(push(PathCreator[RoutePaths.AUTH_CHANGE_PASSWORD].getUrl()));
      } else {
        setAuthCookies(loginResponse as ILoginResponse);
        dispatch(push(PathCreator[RoutePaths.DASHBOARD].getUrl()));
      }
    },
  });

  const onFormSubmit = useCallback(async (formValues: ILoginRequest) => {
    dispatch(authActions.setFields({
      username: formValues.username,
    }));

    await mutateAsync(formValues);
  }, [mutateAsync, dispatch]);

  return (
    <AuthWrapper>
      <AuthPlate>
        <WGMLogo />

        <AuthTitle>Administration login</AuthTitle>

        {loginError && (
          <FormAlert
            type="error"
            message={isObject(loginError) ? (loginError as ILoginUpdatePasswordError).message : loginError}
          />
        )}

        <Form layout="vertical" size={formSize} onFinish={onFormSubmit}>
          <Form.Item
            name="username"
            normalize={normalizeField}
            rules={[
              { required: true, message: 'Enter E-Mail' },
            ]}
          >
            <Input placeholder="E-Mail" prefix={<UserIcon />} size={formSize} />
          </Form.Item>

          <Form.Item
            name="password"
            normalize={normalizeField}
            rules={[
              { required: true, message: 'Enter password' },
            ]}
          >
            <Input.Password placeholder="Password" prefix={<LockIcon />} autoComplete="on" />
          </Form.Item>

          <SubmitButton size={formSize} loading={isLoading} htmlType="submit">Log In</SubmitButton>

          <LinkContainer>
            <Link to={PathCreator[RoutePaths.AUTH_RECOVERY_PASSWORD].getUrl()}>Forgot password?</Link>
          </LinkContainer>
        </Form>
      </AuthPlate>
    </AuthWrapper>
  );
};

export default LoginPage;
