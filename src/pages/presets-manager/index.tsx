import React, { useCallback } from 'react';
import Tabs from 'antd/es/tabs';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';

import { useAppDispatch } from 'utils/hooks';
import { PresetsManagerTabsEnum } from './constants';
import { lazyWithRetry } from 'utils/lazy-with-reload';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { GlobalSuspense } from 'components/suspense/global-suspense';

import type { LoadableComponent } from '@loadable/component';

const TimePeriodsTab = lazyWithRetry(() => import('pages/presets-manager/time-periods-tab'));
const YieldPresetsTab = lazyWithRetry(() => import('pages/presets-manager/yield-presets-tab'));
const WeatherPresetsTab = lazyWithRetry(() => import('pages/presets-manager/weather-presets-tab'));

const PresetsManagementPaths: Record<PresetsManagerTabsEnum, LoadableComponent<any>> = {
  [PresetsManagerTabsEnum.TIME_PERIODS]: TimePeriodsTab,
  [PresetsManagerTabsEnum.YIELD_PRESETS]: YieldPresetsTab,
  [PresetsManagerTabsEnum.WEATHER_PRESETS]: WeatherPresetsTab,
}

const { TabPane } = Tabs;

const getNameByTab = (tabName: PresetsManagerTabsEnum): string => {
  switch (tabName) {
    case PresetsManagerTabsEnum.TIME_PERIODS: return 'Time presets';
    case PresetsManagerTabsEnum.YIELD_PRESETS: return 'Yield presets';
    default: return 'Weather presets';
  }
}

const PresetsManager = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { tab: activeTab } = useParams<{ tab: keyof typeof PresetsManagementPaths }>();

  const getRenderComponent = useCallback((tabKey: keyof typeof PresetsManagementPaths) => {
    const TabComponent = activeTab === tabKey
      ? PresetsManagementPaths[tabKey]
      : () => null

    return (
      <React.Suspense fallback={<GlobalSuspense />}>
        <TabComponent />
      </React.Suspense>
    );
  }, [activeTab]);

  const onChangeTag = (key: string): void => {
    dispatch(push(PathCreator[RoutePaths.PRESETS_MANAGER].getUrl(key)));
  }

  return (
    <PageLayout
      title="Presets manager"
      fullHeight
      breadcrumbExtra={[{ path: PathCreator[RoutePaths.PRICING_MANAGEMENT], title: getNameByTab(activeTab), key: 'rates' }]}
    >
      <Tabs
        size="large"
        onChange={onChangeTag}
        defaultActiveKey={activeTab}
      >
        {/*<TabPane tab="Time periods" key={PresetsManagerTabsEnum.TIME_PERIODS}>*/}
        {/*  {getRenderComponent(PresetsManagerTabsEnum.TIME_PERIODS)}*/}
        {/*</TabPane>*/}

        <TabPane
          tab="Yield presets"
          key={PresetsManagerTabsEnum.YIELD_PRESETS}
        >
          {getRenderComponent(PresetsManagerTabsEnum.YIELD_PRESETS)}
        </TabPane>

        <TabPane tab="Weather presets" key={PresetsManagerTabsEnum.WEATHER_PRESETS}>
          {getRenderComponent(PresetsManagerTabsEnum.WEATHER_PRESETS)}
        </TabPane>
      </Tabs>
    </PageLayout>
  )
};

export default PresetsManager;
