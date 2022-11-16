import React from 'react';

import {
  Law2,
  Golf,
  Home,
  Ticket,
  Monitor,
  Coupon2,
  Papers1,
  PriceTag,
  Customer,
  GolfField,
  TimeTable2,
  Statistics2,
  Mail,
} from 'components/icons';

import { MenuIcon as I } from './elements';
import { SystemRolesEnum } from 'models/profile/types';
import { PathCreator, RoutePaths } from 'routing/constants';

import type { PathCreatorValue } from 'routing/constants';
import type { SystemRolesType } from 'models/profile/types';

export interface IMenuItemCollection {
  title: string;
  key: string;
  icon?: React.ReactNode;
  path?: PathCreatorValue;
  permissions?: SystemRolesType[];
  aliases?: PathCreatorValue[];
}

export const menuItemsCollectionOne: IMenuItemCollection[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: (
      <I>
        <Home />
      </I>
    ),
    path: PathCreator[RoutePaths.DASHBOARD],
  },
  {
    key: 'api_status',
    title: 'API Status',
    icon: (
      <I>
        <Monitor />
      </I>
    ),
    path: PathCreator[RoutePaths.API_STATUS],
    permissions: [SystemRolesEnum.ADMIN],
  },
  {
    key: 'users',
    title: 'Users management',
    icon: (
      <I>
        <Customer />
      </I>
    ),
    path: PathCreator[RoutePaths.USERS_MANAGEMENT],
    permissions: [SystemRolesEnum.ADMIN],
    aliases: [PathCreator[RoutePaths.USERS_MANAGEMENT_UPDATE], PathCreator[RoutePaths.USERS_MANAGEMENT_CREATION]],
  },
  {
    key: 'course_management',
    title: 'Course management',
    icon: (
      <I>
        <Golf />
      </I>
    ),
    path: PathCreator[RoutePaths.COURSE_MANAGEMENT],
    permissions: [SystemRolesEnum.ADMIN],
    aliases: [PathCreator[RoutePaths.COURSE_MANAGEMENT_CREATION], PathCreator[RoutePaths.COURSE_MANAGEMENT_UPDATE]],
  },
];

export const menuItemsCollectionTwo = [
  {
    key: 'tee_time_manager',
    title: 'Tee time manager',
    icon: (
      <I>
        <TimeTable2 />
      </I>
    ),
    path: PathCreator[RoutePaths.TEE_TIME_MANAGER],
    permissions: [SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER],
  },
  {
    key: 'pricing_manager',
    title: 'Pricing manager',
    icon: (
      <I>
        <PriceTag />
      </I>
    ),
    path: PathCreator[RoutePaths.PRICING_MANAGEMENT],
    permissions: [SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER],
    aliases: [
      PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_UPDATE],
      PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATION],
      PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATE_CHILD],
    ],
  },
  {
    key: 'presets_manager',
    title: 'Presets manager',
    icon: (
      <I>
        <Papers1 />
      </I>
    ),
    path: PathCreator[RoutePaths.PRESETS_MANAGER],
    permissions: [SystemRolesEnum.MANAGER],
    aliases: [PathCreator[RoutePaths.PRESETS_MANAGER_YIELD], PathCreator[RoutePaths.PRESETS_MANAGER_WEATHER]],
  },
  {
    key: 'trade_manager',
    title: 'Trade manager',
    icon: (
      <I>
        <Law2 />
      </I>
    ),
    path: PathCreator[RoutePaths.TRADE_MANAGER],
    permissions: [SystemRolesEnum.TRADER],
    aliases: [PathCreator[RoutePaths.TRADE_MANAGER_SETTINGS]],
  },
  {
    key: 'ticket',
    title: 'List of reservations',
    icon: (
      <I>
        <Ticket />
      </I>
    ),
    path: PathCreator[RoutePaths.RESERVATIONS_LIST],
    permissions: [SystemRolesEnum.MANAGER],
  },
  {
    key: 'loyalty_manager',
    title: 'Loyalty Manager',
    icon: (
      <I>
        <Coupon2 />
      </I>
    ),
    path: PathCreator[RoutePaths.LOYALTY_MANAGER],
    permissions: [SystemRolesEnum.MANAGER],
    aliases: [PathCreator[RoutePaths.LOYALTY_MANAGER_PROMO_CREATION]],
  },
  {
    key: 'statistics',
    title: 'Statistics',
    icon: (
      <I>
        <GolfField />
      </I>
    ),
    path: PathCreator[RoutePaths.STATISTICS],
    permissions: [SystemRolesEnum.MANAGER, SystemRolesEnum.ADMIN],
  },
  {
    key: 'settings',
    title: 'Course settings',
    icon: (
      <I>
        <Statistics2 />
      </I>
    ),
    path: PathCreator[RoutePaths.COURSE_SETTINGS],
    permissions: [SystemRolesEnum.MANAGER],
  },
  {
    key: 'survey',
    title: 'Survey',
    icon: (
      <I>
        <Mail />
      </I>
    ),
    path: PathCreator[RoutePaths.SURVEY],
    permissions: [SystemRolesEnum.MANAGER],
  },
];

export const menuItemProfile = [
  {
    key: 'profile',
    title: 'Profile',
    path: PathCreator[RoutePaths.AUTH_PROFILE],
  }
]
