import React from 'react';
import Menu from 'antd/es/menu';
import { push } from 'connected-react-router';

import { colorPalette } from 'modules/theme/colorPalettes';
import { PathCreator, RoutePaths } from 'routing/constants';
import { getConfirmAction } from 'components/modal/confirm';
import { ModalTitle, ModalContent } from 'components/modal/elements';
import { TableActionsDots } from 'components/table/table-actions-dots';
import { deleteUserAction, setUserActivityAction } from 'models/users';

import { Pencil, Trash } from 'components/icons';
import { Delete } from 'components/icons/system/delete';
import { LockIcon } from 'components/icons/inputs/lock-icon';

import type { IUser } from 'models/users/constants';
import type { AppDispatch } from 'modules/store/types';

export const TableActions = (dispatch: AppDispatch) => ({ sub, email, enabled: active, firstname, lastname }: IUser) => {
  const handleUserDisable = (userId: string, email: string) => () => {
    if (userId !== undefined) {
      getConfirmAction(
        {
          icon: <LockIcon fill="red" />,
          action: () => dispatch(setUserActivityAction({ sub, active: false })),
          okText: 'Disable',
          cancelText: 'Cancel',
          title: <ModalTitle>Do you want to disable user access for</ModalTitle>,
          content: <ModalContent>{email}?</ModalContent>,
        });
    }
  };

  const handleUserActivate = (userId: string, email: string) => () => {
    if (userId !== undefined) {
      getConfirmAction({
        icon: <LockIcon />,
        action: () => dispatch(setUserActivityAction({ sub, active: true })),
        okText: 'Activate',
        cancelText: 'Cancel',
        title: <ModalTitle>Do you want to activate user access for</ModalTitle>,
        content: <ModalContent>{email}?</ModalContent>,
      });
    }
  };

  const handleUserDelete = (userId: string, username: string) => () => {
    if (userId !== undefined) {
      getConfirmAction({
        icon: <Trash />,
        action: () => dispatch(deleteUserAction({ sub })),
        okText: 'Delete',
        cancelText: 'Cancel',
        content: <ModalContent>{username}?</ModalContent>,
        title: <ModalTitle>Do you want to delete user</ModalTitle>,
        okButtonProps: {
          danger: true,
        },
      });
    }
  };

  const handleUserEdit = () => {
    dispatch(push(PathCreator[RoutePaths.USERS_MANAGEMENT_UPDATE].getUrl(sub)));
  };

  const handleUserActivation = Boolean(active)
    ? handleUserDisable(sub, email)
    : handleUserActivate(sub, email);

  const menu = (
    <Menu items={[
      { label: <span><Pencil fill={colorPalette.primary} /> Edit user</span>, key: 'edit', onClick: handleUserEdit },
      { label: <span><LockIcon fill="red" /> {Boolean(active) ? 'Block user' : 'Activate user'}</span>, key: 'activate', onClick: handleUserActivation },
      { label: <span><Delete fill="red" /> Delete user</span>, key: 'delete', onClick: handleUserDelete(sub, `${firstname} ${lastname}`) },
    ]} />
  );

  return <TableActionsDots overlay={menu} />;
};
