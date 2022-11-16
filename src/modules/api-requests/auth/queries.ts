import { useQuery } from 'react-query';
import { push } from 'connected-react-router';

import { getCurrentUserRequest } from './index';
import { profileActions } from 'models/profile';

import { getProfileName } from 'models/profile/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';

import type { UseQueryOptions } from 'react-query';
import type { IGetCurrentUserResponse } from './types';

export function useCurrentProfile(
  options?: UseQueryOptions<IGetCurrentUserResponse, string, IGetCurrentUserResponse>,
) {
  const dispatch = useAppDispatch();
  const profileName = useAppSelector(getProfileName);

  return useQuery(
    {
      queryKey: ['getCurrentUser', profileName],
      queryFn: getCurrentUserRequest,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !profileName,
      retry: false,
      ...options,
      onSuccess: (data) => {
        dispatch(profileActions.setFields(data));
        if (options && options.onSuccess) {
          options.onSuccess(data);
        }
      },
      onError: (error) => {
        dispatch(push(PathCreator[RoutePaths.AUTH_LOGOUT].getUrl()));

        if (options && options.onError) {
          options.onError(error as any);
        }
      },
    });
}
