import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from 'antd/es/layout';
import Popover from 'antd/es/popover';
import { useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { matchPath, useHistory } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { useAppDispatch } from 'utils/hooks';
import { getProfileRoles } from 'models/profile/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { SelectCoursePopover } from './select-course-popover';
import { MainMenu, Avatar, InnerMenuItem } from './elements';
import { MemberIcon } from 'components/icons/user/member-icon';
import { BackToIcon } from 'components/icons/system/back-to-icon';
import { menuItemsCollectionOne, menuItemsCollectionTwo, menuItemProfile } from './constants';

import type { Dispatch } from '@reduxjs/toolkit';
import type { IMenuItemCollection } from './constants';
import type { AlignType } from 'rc-trigger/lib/interface';
import type { SystemRolesType } from 'models/profile/types';
import type { ItemType } from 'antd/es/menu/hooks/useItems';

interface IMenuItemsRenderer {
  menuItemsCollection: IMenuItemCollection[],
  dispatch: Dispatch;
  userPermissions?: SystemRolesType[],
  popoverAlign?: AlignType;
}

const { Sider } = Layout;

const allMenuItems = menuItemsCollectionOne.concat(menuItemsCollectionTwo, menuItemProfile);

const onMenuClick = (dispatch: Dispatch, href?: string) => () => {
  href && dispatch(push(href));
};

const menuItemsRenderer = (
  {
    dispatch,
    popoverAlign,
    userPermissions,
    menuItemsCollection,
  }: IMenuItemsRenderer): ItemType[] => {
  return menuItemsCollection
    .filter(({ permissions }) => userPermissions
      ?.some(requiredPermission =>
        permissions ? permissions.includes(requiredPermission) : true))
    .map((item) => {
      return {
        icon: (
          <Popover
            content={item.title}
            placement="right"
            align={popoverAlign}
            overlayClassName="menu-popover"
            destroyTooltipOnHide={true}
          >
              <span key={item.key}>
                {item.icon}
              </span>
          </Popover>
        ),
        onClick: onMenuClick(dispatch, item.path?.getUrl()),
        key: item.path?.path || item.key,
      } as ItemType;
    });
};

export const LeftMenu = () => {
  const { location } = useHistory();
  const { pathname } = location;
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const dispatch = useAppDispatch();
  const profileRoles = useSelector(getProfileRoles);
  const breakpoints = useBreakpoint();
  const menuWidth = useMemo(() => {
    if (breakpoints.xxl) return 80;
    if (breakpoints.xl) return 64;

    return 64;
  }, [breakpoints]);

  const popoverAlign = useMemo(() => {
    if (breakpoints.xxl) return { offset: [20, 0] };
    if (breakpoints.xl) return { offset: [12, 0] };

    return {
      offset: [12, 0],
    };
  }, [breakpoints]);

  const onProfileMenuClick = useCallback(({ key }) => {
    dispatch(push(key));
  }, [dispatch]);

  const foundMenuItem = allMenuItems.find(item => {
    if (!item.path) return false;

    return [item.path.path].concat((item.aliases || []).map(alias => alias.path)).some(path => matchPath(pathname, {
      path,
      strict: true,
      exact: true,
    }));
  });

  useEffect(() => {
    if (foundMenuItem && foundMenuItem.path?.path && foundMenuItem.path.path !== selectedKeys?.[0]) {
      setSelectedKeys([foundMenuItem.path?.path]);
    }
  }, [pathname, foundMenuItem, selectedKeys]);

  const menuItems: ItemType[] = useMemo(() => {
    return [
      ...menuItemsRenderer({
        dispatch,
        popoverAlign,
        userPermissions: profileRoles,
        menuItemsCollection: menuItemsCollectionOne,
      }),
      profileRoles?.length > 1 ? { type: 'divider' } : null,
      ...menuItemsRenderer({
        dispatch,
        popoverAlign,
        userPermissions: profileRoles,
        menuItemsCollection: menuItemsCollectionTwo,
      }),
      {
        children: [
          { label: <InnerMenuItem><MemberIcon /> Member profile</InnerMenuItem>, key: PathCreator[RoutePaths.AUTH_PROFILE].getUrl() },
          { label: <InnerMenuItem><BackToIcon /> Log out</InnerMenuItem>, key: PathCreator[RoutePaths.AUTH_LOGOUT].getUrl() },
        ],
        label: <Avatar />,
        className: 'avatar-item',
        onClick: onProfileMenuClick,
        key: 'profile_avatar',
      },
    ];
  }, [dispatch, onProfileMenuClick, popoverAlign, profileRoles]);

  return (
    <Sider width={menuWidth}>
      <SelectCoursePopover />

      <MainMenu
        mode="vertical"
        expandIcon={null}
        selectedKeys={selectedKeys}
        items={menuItems}
      />
    </Sider>
  );
};
