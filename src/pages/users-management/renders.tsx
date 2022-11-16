import { findKey } from 'lodash';
import { ActivityText } from './elements';
import { getUserGroupName, UserGroupEnum } from 'modules/api-requests/users/constants';

import type { IUser } from 'models/users/constants';
import type { IUserGroupType } from 'modules/api-requests/users/types';

export const renderUserActivityWrapper = (renderFunc: (value: any, row: IUser) => any) =>
  (value: string, user: IUser) =>
    <ActivityText $active={user.enabled}>
      {renderFunc(value, user)}
    </ActivityText>;

export const renderUserGroups = (values: IUserGroupType[] = []) => (
  <span>
    {values
      .map(group => {
        const userGroup = findKey(Object(UserGroupEnum), value => value === group) as keyof typeof UserGroupEnum;
        return getUserGroupName(userGroup);
      })
      .join(', ')
    }
  </span>
);
