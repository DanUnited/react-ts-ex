import React from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import { matchPath, useLocation } from 'react-router-dom';

import { Home } from '../icons';
import { useAppSelector } from 'utils/hooks';
import { BreadcrumbContainer } from './elements';
import { getProfileCourse } from 'models/profile/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';

import {
  IMenuItemCollection,
  menuItemsCollectionOne,
  menuItemsCollectionTwo
} from 'components/layout/left-menu/constants';

const allMenuItems = menuItemsCollectionOne.concat(menuItemsCollectionTwo);

interface IBreadcrumbs {
  extraItems?: IMenuItemCollection[];
}

export const Breadcrumbs = ({ extraItems = [] }: IBreadcrumbs) => {
  const location = useLocation();
  const { pathname } = location;
  const course = useAppSelector(getProfileCourse);
  const foundMenuItem = allMenuItems.find(item => {
    if (!item.path || item.path === PathCreator[RoutePaths.DASHBOARD]) return false;

    return [item.path.path].concat((item.aliases || []).map(alias => alias.path)).some(path => matchPath(pathname, path));
  });

  return (
    <BreadcrumbContainer>
      <Breadcrumb>
        <Breadcrumb.Item key="home" href={PathCreator[RoutePaths.DASHBOARD].getUrl()}>
          <Home />
          <span>{course?.name || 'Home'}</span>
        </Breadcrumb.Item>

        {foundMenuItem && (
          <Breadcrumb.Item
            key={foundMenuItem.key}
            href={foundMenuItem.path?.getUrl() ?? '#'}
          >
            {foundMenuItem.icon}
            <span>{foundMenuItem.title}</span>
          </Breadcrumb.Item>
        )}

        {extraItems?.map((item, index, allItems) => (
          <Breadcrumb.Item
            key={item.key}
            href={index === allItems.length - 1 ? '#' : item.path?.getUrl() ?? '#'}
          >
            {item.icon}
            <span>{item.title}</span>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbContainer>
  );
};

