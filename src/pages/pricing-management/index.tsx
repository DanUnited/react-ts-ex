import React, { useCallback, useMemo } from 'react';
import Tabs from 'antd/es/tabs';
import Switch from 'antd/es/switch';
import Divider from 'antd/es/divider';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useMutation, useQueryClient } from 'react-query';

import { Header2 } from 'components/layout/headers';
import { Breadcrumbs } from 'components/breadcrumbs';
import { lazyWithRetry } from 'utils/lazy-with-reload';
import { HeaderContainer, PagePlate } from './elements';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { prepareCourseForUpdate } from 'models/courses/constants';
import { GlobalSuspense } from 'components/suspense/global-suspense';
import { updateCourseSettingsRequest } from 'modules/api-requests/courses';
import { PriceManagementTabsEnum, PriceManagementTabType } from './constants';

import {
  getProfileState,
  getProfileCourse,
  getCurrentCourseId,
  isCourseUseYieldSelector,
  courseWeatherActiveSelector,
} from 'models/profile/selectors';

import type { LoadableComponent } from '@loadable/component';
import type { ICourse } from 'modules/api-requests/courses/types';

const RateManagementTab = lazyWithRetry(() => import('pages/pricing-management/rate-manager-tab'));
const YieldManagementTab = lazyWithRetry(() => import('pages/pricing-management/yield-manager-tab'));

const PricingManagementPaths: Record<PriceManagementTabsEnum, LoadableComponent<any>> = {
  [PriceManagementTabsEnum.RATE]: RateManagementTab,
  [PriceManagementTabsEnum.YIELD]: YieldManagementTab,
  [PriceManagementTabsEnum.WEATHER]: YieldManagementTab,
};

const { TabPane } = Tabs;

const getNameByTab = (tabName: PriceManagementTabsEnum): string => {
  switch (tabName) {
    case PriceManagementTabsEnum.WEATHER:
      return 'Weather manager';
    case PriceManagementTabsEnum.YIELD:
      return 'Yield manager';
    default:
      return 'Rate manager';
  }
};

export const PricingManagementPage = () => {
  const { tab: activeTab } = useParams<{ tab: PriceManagementTabsEnum }>();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const currentCourse = useAppSelector(getProfileCourse);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const profile = useAppSelector(getProfileState);
  const profileCourse = useAppSelector(getProfileCourse);
  const yieldEnabled = useAppSelector(isCourseUseYieldSelector);
  const weatherEnabled = useAppSelector(courseWeatherActiveSelector);

  const onChangeTag = (key: PriceManagementTabType): void => {
    dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT].getUrl(key)));
  };

  const hasCourseRights = useMemo(() => {
    if (profileCourse && profile.sub) {
      return (profileCourse?.users?.map(item => item.id) || []).includes(profile.sub);
    }

    return false;
  }, [profile, profileCourse]);

  const { mutate: updateCourse, isLoading } = useMutation({
    mutationKey: ['updateCourse'],
    mutationFn: (data: { yieldActive?: boolean, weatherActive?: boolean }) => {
      if (currentCourseId) {
        return updateCourseSettingsRequest(currentCourseId, data as ICourse);
      }

      return Promise.reject();
    },
    onSuccess: () => queryClient.invalidateQueries('getCourses'),
  });

  const getRenderComponent = useCallback((tabKey: PriceManagementTabsEnum) => {
    const TabComponent = activeTab === tabKey
      ? PricingManagementPaths[tabKey]
      : () => null;

    return (
      <React.Suspense fallback={<GlobalSuspense />}>
        <TabComponent />
      </React.Suspense>
    );
  }, [activeTab]);

  const onCourseYieldChange = (checked: boolean) => {
    updateCourse(prepareCourseForUpdate({ ...currentCourse, yieldActive: checked } as ICourse));
  };

  const onCourseWeatherChange = (checked: boolean) => {
    updateCourse(prepareCourseForUpdate({ ...currentCourse, weatherActive: checked } as ICourse));
  };

  return (
    <>
      <HeaderContainer>
        <span>
          <Header2>Pricing Management</Header2>
          <Breadcrumbs
            extraItems={activeTab !== PriceManagementTabsEnum.RATE
              ? [{ path: PathCreator[RoutePaths.PRICING_MANAGEMENT], title: getNameByTab(activeTab), key: 'rates' }]
              : undefined}
          />
        </span>
        {/*{activeTab === PriceManagementTabsEnum.RATE && (*/}
        {/*  <PrimaryButton>Manage presets</PrimaryButton>*/}
        {/*)}*/}
      </HeaderContainer>
      <PagePlate>
        <Tabs
          size="large"
          onChange={onChangeTag}
          defaultActiveKey={activeTab}
        >
          <TabPane tab="Rate manager" key={PriceManagementTabsEnum.RATE}>
            {getRenderComponent(PriceManagementTabsEnum.RATE)}
          </TabPane>

          <TabPane
            tab={(
              <>
                Yield manager
                <Divider type="vertical" />
                <Switch
                  loading={isLoading}
                  checked={yieldEnabled}
                  onChange={onCourseYieldChange}
                  disabled={!hasCourseRights}
                />
              </>
            )}
            key={PriceManagementTabsEnum.YIELD}
          >
            {getRenderComponent(PriceManagementTabsEnum.YIELD)}
          </TabPane>

          <TabPane
            tab={(
              <>
                Weather manager
                <Divider type="vertical" />
                <Switch
                  loading={isLoading}
                  checked={weatherEnabled}
                  onChange={onCourseWeatherChange}
                  disabled={!hasCourseRights}
                />
              </>
            )}
            key={PriceManagementTabsEnum.WEATHER}
          >
            {getRenderComponent(PriceManagementTabsEnum.WEATHER)}
          </TabPane>
        </Tabs>
      </PagePlate>
    </>
  );
};

export default PricingManagementPage;
