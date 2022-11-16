import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

// components
import { DashboardPage } from 'pages/dashboard';
import { PermissionRoute } from './permission-route';
import { PathCreator, RoutePaths } from './constants';
import { GlobalLayout } from 'components/layout/global';
import { lazyWithRetry } from 'utils/lazy-with-reload';
import { SystemRolesEnum } from 'models/profile/types';
import { GlobalSuspense } from 'components/suspense/global-suspense';
// dynamic loading pages
const ApiStatus = lazyWithRetry(() => import('pages/api-status'));
const ProfilePage = lazyWithRetry(() => import('pages/auth/profile-page'));
const PresetsManagerPage = lazyWithRetry(() => import('pages/presets-manager'));
const CourseManagementPage = lazyWithRetry(() => import('pages/course-management'));
const CourseManagementCreationPage = lazyWithRetry(() => import('pages/course-management/course-form'));
const PricingManagementPage = lazyWithRetry(() => import('pages/pricing-management'));
const PricingManagementChildCreatePage = lazyWithRetry(
  () => import('pages/pricing-management/rate-manager-tab/rate-child')
);
const PricingManagementCreationPage = lazyWithRetry(
  () => import('pages/pricing-management/rate-manager-tab/rate-creation-form')
);
const ReservationsListPage = lazyWithRetry(() => import('pages/reservations-list'));
const UsersManagementPage = lazyWithRetry(() => import('pages/users-management'));
const TradeManagerPage = lazyWithRetry(() => import('pages/trade-manager'));
const UserForm = lazyWithRetry(() => import('pages/users-management/user-form'));
const CourseSettingsPage = lazyWithRetry(() => import('pages/course-settings'));
const TradeManagerSettingsPage = lazyWithRetry(() => import('pages/trade-manager/trade-manager-settings-page'));
const MemberBookingHistoryPage = lazyWithRetry(() => import('pages/member-booking-history'));
const TeeTimeManagerPage = lazyWithRetry(() => import('pages/tee-time-manager'));
const LoyaltyManagerPage = lazyWithRetry(() => import('pages/loyalty-manager'));
const CreatePromoCodePage = lazyWithRetry(
  () => import('pages/loyalty-manager/promo-code-manager-tab/promo-code-creation')
);
const StatisticsPage = lazyWithRetry(() => import('pages/statistics'));
const SurveyPage = lazyWithRetry(() => import('pages/survey'));

export const AdminRoutes = () => (
  <GlobalLayout>
    <Suspense fallback={<GlobalSuspense />}>
      <Switch>
        <PermissionRoute
          exact
          component={ApiStatus}
          permissions={[SystemRolesEnum.ADMIN]}
          path={PathCreator[RoutePaths.API_STATUS].path}
        />
        <PermissionRoute path={PathCreator[RoutePaths.AUTH_PROFILE].path} component={ProfilePage} exact />
        <PermissionRoute
          component={LoyaltyManagerPage}
          permissions={[SystemRolesEnum.MANAGER]}
          path={PathCreator[RoutePaths.LOYALTY_MANAGER].path}
          exact
        />
        <PermissionRoute
          component={CreatePromoCodePage}
          permissions={[SystemRolesEnum.MANAGER]}
          path={PathCreator[RoutePaths.LOYALTY_MANAGER_PROMO_CREATION].path}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.PRESETS_MANAGER].path}
          component={PresetsManagerPage}
          permissions={[SystemRolesEnum.MANAGER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.COURSE_MANAGEMENT].path}
          permissions={[SystemRolesEnum.ADMIN]}
          component={CourseManagementPage}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.COURSE_MANAGEMENT_CREATION].path}
          component={CourseManagementCreationPage}
          permissions={[SystemRolesEnum.ADMIN]}
          exact
        />
        <PermissionRoute
          component={CourseManagementCreationPage}
          path={PathCreator[RoutePaths.COURSE_MANAGEMENT_UPDATE].path}
          permissions={[SystemRolesEnum.ADMIN]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATE_CHILD].path}
          permissions={[SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER]}
          component={PricingManagementChildCreatePage}
          exact
        />
        <PermissionRoute
          component={PricingManagementCreationPage}
          path={PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATION].path}
          permissions={[SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER]}
          exact
        />
        <PermissionRoute
          component={PricingManagementPage}
          path={PathCreator[RoutePaths.PRICING_MANAGEMENT].path}
          permissions={[SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER]}
          exact
        />
        <PermissionRoute
          component={PricingManagementCreationPage}
          path={PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_COPY].path}
          permissions={[SystemRolesEnum.ADMIN]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_UPDATE].path}
          permissions={[SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER]}
          component={PricingManagementCreationPage}
          exact
        />
        <PermissionRoute path={PathCreator[RoutePaths.RESERVATIONS_LIST].path} component={ReservationsListPage} exact />
        <PermissionRoute
          path={PathCreator[RoutePaths.USERS_MANAGEMENT].path}
          component={UsersManagementPage}
          permissions={[SystemRolesEnum.ADMIN]}
          exact
        />
        <PermissionRoute
          component={UserForm}
          permissions={[SystemRolesEnum.ADMIN]}
          path={PathCreator[RoutePaths.USERS_MANAGEMENT_CREATION].path}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.USERS_MANAGEMENT_UPDATE].path}
          permissions={[SystemRolesEnum.ADMIN]}
          component={UserForm}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.TRADE_MANAGER].path}
          component={TradeManagerPage}
          permissions={[SystemRolesEnum.TRADER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.TRADE_MANAGER_SETTINGS].path}
          component={TradeManagerSettingsPage}
          permissions={[SystemRolesEnum.TRADER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.COURSE_SETTINGS].path}
          component={CourseSettingsPage}
          permissions={[SystemRolesEnum.MANAGER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.MEMBER_BOOKING_HISTORY].path}
          component={MemberBookingHistoryPage}
          permissions={[SystemRolesEnum.MANAGER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.TEE_TIME_MANAGER].path}
          component={TeeTimeManagerPage}
          permissions={[SystemRolesEnum.MANAGER, SystemRolesEnum.TRADER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.STATISTICS].path}
          component={StatisticsPage}
          permissions={[SystemRolesEnum.MANAGER]}
          exact
        />
        <PermissionRoute
          path={PathCreator[RoutePaths.SURVEY].path}
          component={SurveyPage}
          permissions={[SystemRolesEnum.MANAGER]}
          exact
        />
        <PermissionRoute path={PathCreator[RoutePaths.DASHBOARD].path} component={DashboardPage} />
      </Switch>
    </Suspense>
  </GlobalLayout>
);

export default AdminRoutes;
