import { SurveyTabsEnum } from 'pages/survey/constants';
import { CourseSettingsTabsEnum } from 'pages/course-settings/constants';
import { LoyaltyManagerTabsEnum } from 'pages/loyalty-manager/constants';
import { PresetsManagerTabsEnum } from 'pages/presets-manager/constants';
import { PriceManagementTabsEnum } from 'pages/pricing-management/constants';

import type { Key } from 'react';

export type ValueOf<T> = T[keyof T];
export type RoutePathsType = ValueOf<typeof RoutePaths>;
export type PathCreatorValue = {
  path: string;
  getUrl: (args?: any) => string;
};

export type PathCreatorType = Record<RoutePathsType, PathCreatorValue>;

export enum RoutePaths {
  AUTH_LOGIN = 'auth_login',
  AUTH_LOGOUT = 'auth_logout',
  AUTH_CHANGE_PASSWORD = 'auth_change_password',
  AUTH_RECOVERY_PASSWORD = 'auth_recovery_password',
  AUTH_PROFILE = 'auth_profile',
  DASHBOARD = 'dashboard',
  DASHBOARD_PROPERTY = 'dashboard_property',
  API_STATUS = 'api_status',
  USERS_MANAGEMENT = 'users_management',
  USERS_MANAGEMENT_CREATION = 'users_management_creation',
  USERS_MANAGEMENT_UPDATE = 'users_management_update',
  COURSE_MANAGEMENT = 'course_management',
  COURSE_MANAGEMENT_CREATION = 'course_management_creation',
  COURSE_MANAGEMENT_UPDATE = 'course_management_update',
  PRICING_MANAGEMENT = 'pricing_management',
  PRICING_MANAGEMENT_RATES_CREATION = 'pricing_management_rates_creation',
  PRICING_MANAGEMENT_RATES_UPDATE = 'pricing_management_rates_update',
  PRICING_MANAGEMENT_RATES_COPY = 'pricing_management_rates_copy',
  PRICING_MANAGEMENT_RATES_CREATE_CHILD = 'pricing_management_rates_creation_child',
  RESERVATIONS_LIST = 'reservations_list',
  PRESETS_MANAGER = 'presets_manager',
  PRESETS_MANAGER_YIELD = 'presets_manager_yield',
  PRESETS_MANAGER_WEATHER = 'presets_manager_weather',
  TRADE_MANAGER = 'trade_manager',
  COURSE_SETTINGS = 'course_settings',
  TRADE_MANAGER_SETTINGS = 'trade_manager_settings',
  MEMBER_BOOKING_HISTORY = 'course_management_booking_history',
  TEE_TIME_MANAGER = 'tee_time_manager',
  LOYALTY_MANAGER = 'loyalty_manager',
  LOYALTY_MANAGER_PROMO_CREATION = 'loyalty_manager_create_promo',
  STATISTICS = 'statistics',
  SURVEY = 'survey',
  SURVEY_REPORT = 'survey_report',
  SURVEY_SETTINGS = 'survey_settings',
}

export const PathCreator: PathCreatorType = {
  [RoutePaths.AUTH_LOGIN]: {
    path: '/login',
    getUrl: () => '/login',
  },
  [RoutePaths.AUTH_PROFILE]: {
    path: '/profile',
    getUrl: () => '/profile',
  },
  [RoutePaths.AUTH_LOGOUT]: {
    path: '/logout',
    getUrl: () => '/logout',
  },
  [RoutePaths.AUTH_CHANGE_PASSWORD]: {
    path: '/update-password',
    getUrl: () => '/update-password',
  },
  [RoutePaths.AUTH_RECOVERY_PASSWORD]: {
    path: '/forgot-password',
    getUrl: () => '/forgot-password',
  },
  [RoutePaths.DASHBOARD]: {
    path: '/',
    getUrl: () => '/',
  },
  [RoutePaths.DASHBOARD_PROPERTY]: {
    path: '/#',
    getUrl: () => '/#',
  },
  [RoutePaths.API_STATUS]: {
    path: '/api-status',
    getUrl: () => '/api-status',
  },
  [RoutePaths.USERS_MANAGEMENT]: {
    path: '/users',
    getUrl: () => '/users',
  },
  [RoutePaths.USERS_MANAGEMENT_CREATION]: {
    path: '/users/creation',
    getUrl: () => '/users/creation',
  },
  [RoutePaths.USERS_MANAGEMENT_UPDATE]: {
    path: '/users/update/:id',
    getUrl: (id: Key) => `/users/update/${id}`,
  },
  [RoutePaths.COURSE_MANAGEMENT]: {
    path: '/courses',
    getUrl: () => '/courses',
  },
  [RoutePaths.COURSE_MANAGEMENT_CREATION]: {
    path: '/course/create',
    getUrl: () => '/course/create',
  },
  [RoutePaths.COURSE_MANAGEMENT_UPDATE]: {
    path: '/course/update/:id',
    getUrl: () => '/course/update',
  },
  [RoutePaths.PRICING_MANAGEMENT]: {
    path: '/pricing/:tab(rates|yields|weather)+',
    getUrl: (tabName = PriceManagementTabsEnum.RATE) => `/pricing/${tabName}`,
  },
  [RoutePaths.PRICING_MANAGEMENT_RATES_CREATION]: {
    path: '/pricing/:tab(rates|yields|weather)+/:mode(create|update|copy)+',
    getUrl: () => '/pricing/rates/create',
  },
  [RoutePaths.PRICING_MANAGEMENT_RATES_UPDATE]: {
    path: '/pricing/:tab(rates|yields|weather)+/:mode(create|update|copy)+/:id',
    getUrl: (id: string) => `/pricing/rates/update/${id}`,
  },
  [RoutePaths.PRICING_MANAGEMENT_RATES_COPY]: {
    path: '/pricing/:tab(rates|yields|weather)+/:mode(create|update|copy)+/:id',
    getUrl: (id: string) => `/pricing/rates/copy/${id}`,
  },
  [RoutePaths.PRICING_MANAGEMENT_RATES_CREATE_CHILD]: {
    path: '/pricing/:tab(rates|yields|weather)+/create-child',
    getUrl: () => '/pricing/rates/create-child',
  },
  [RoutePaths.RESERVATIONS_LIST]: {
    path: '/reservations',
    getUrl: () => '/reservations',
  },
  [RoutePaths.PRESETS_MANAGER]: {
    path: '/presets-manager/:tab',
    getUrl: (tabName = PresetsManagerTabsEnum.YIELD_PRESETS) => `/presets-manager/${tabName}`,
  },
  [RoutePaths.PRESETS_MANAGER_YIELD]: {
    path: '/presets-manager/:tab',
    getUrl: () => `/presets-manager/${PresetsManagerTabsEnum.YIELD_PRESETS}`,
  },
  [RoutePaths.PRESETS_MANAGER_WEATHER]: {
    path: '/presets-manager/:tab',
    getUrl: () => `/presets-manager/${PresetsManagerTabsEnum.WEATHER_PRESETS}`,
  },
  [RoutePaths.LOYALTY_MANAGER]: {
    path: '/loyalty-manager/:tab',
    getUrl: (tab = LoyaltyManagerTabsEnum.PROMO_CODE_MANAGER) => `/loyalty-manager/${tab}`,
  },
  [RoutePaths.LOYALTY_MANAGER_PROMO_CREATION]: {
    path: `/loyalty-manager/${LoyaltyManagerTabsEnum.PROMO_CODE_MANAGER}/create`,
    getUrl: () => `/loyalty-manager/${LoyaltyManagerTabsEnum.PROMO_CODE_MANAGER}/create`,
  },
  [RoutePaths.TRADE_MANAGER]: {
    path: '/trade-manager',
    getUrl: () => '/trade-manager',
  },
  [RoutePaths.TRADE_MANAGER_SETTINGS]: {
    path: '/trade-manager/settings',
    getUrl: () => '/trade-manager/settings',
  },
  [RoutePaths.COURSE_SETTINGS]: {
    path: '/course-settings/:tab',
    getUrl: (tabName = CourseSettingsTabsEnum.CALENDAR) => `/course-settings/${tabName}`,
  },
  [RoutePaths.MEMBER_BOOKING_HISTORY]: {
    path: '/course-settings/booking-history/:id',
    getUrl: (id: string) => `/course-management/booking-history/${id}`,
  },
  [RoutePaths.TEE_TIME_MANAGER]: {
    path: '/tee-time-manager',
    getUrl: () => '/tee-time-manager',
  },
  [RoutePaths.STATISTICS]: {
    path: '/statistics',
    getUrl: () => '/statistics',
  },
  [RoutePaths.SURVEY]: {
    path: '/survey/:tab',
    getUrl: (tabName = SurveyTabsEnum.SURVEY_REPORT) => `/survey/${tabName}`,
  },
  [RoutePaths.SURVEY_REPORT]: {
    path: '/survey/:tab',
    getUrl: () => `/survey/${SurveyTabsEnum.SURVEY_REPORT}`,
  },
  [RoutePaths.SURVEY_SETTINGS]: {
    path: '/survey/:tab',
    getUrl: () => `/survey/${SurveyTabsEnum.SURVEY_SETTINGS}`,
  },
};

