import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';

import { UITabs } from 'components/tabs';
import { useAppDispatch } from 'utils/hooks';
import { LoyaltyManagerTabsEnum } from './constants';
import { lazyWithRetry } from 'utils/lazy-with-reload';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { GlobalSuspense } from 'components/suspense/global-suspense';

import type { LoadableComponent } from '@loadable/component';

const UpsellManagerTab = lazyWithRetry(() => import('pages/loyalty-manager/upsell-manager-tab'));
const PromoCodeManagerTab = lazyWithRetry(() => import('pages/loyalty-manager/promo-code-manager-tab'));

const LoyaltyManagementPaths: Record<LoyaltyManagerTabsEnum, LoadableComponent<any>> = {
  [LoyaltyManagerTabsEnum.PROMO_CODE_MANAGER]: PromoCodeManagerTab,
  [LoyaltyManagerTabsEnum.UPSELL_MANAGER]: UpsellManagerTab,
}

const { TabPane } = UITabs;

export const LoyaltyManager = () => {
  const dispatch = useAppDispatch();
  const { tab: activeTab } = useParams<{ tab: keyof typeof LoyaltyManagementPaths }>();

  const getRenderComponent = useCallback((tabKey: keyof typeof LoyaltyManagementPaths) => {
    const TabComponent = activeTab === tabKey
      ? LoyaltyManagementPaths[tabKey]
      : () => null

    return (
      <React.Suspense fallback={<GlobalSuspense />}>
        <TabComponent />
      </React.Suspense>
    );
  }, [activeTab]);

  const onChangeTag = (key: string): void => {
    dispatch(push(PathCreator[RoutePaths.LOYALTY_MANAGER].getUrl(key)));
  }

  return (
    <PageLayout
      title="Loyalty manager"
      fullHeight
    >
      <UITabs
        size="large"
        onChange={onChangeTag}
        defaultActiveKey={activeTab}
      >
        <TabPane
          tab="Promo code manager"
          key={LoyaltyManagerTabsEnum.PROMO_CODE_MANAGER}
        >
          {getRenderComponent(LoyaltyManagerTabsEnum.PROMO_CODE_MANAGER)}
        </TabPane>

        <TabPane
          tab="Upsell manager"
          key={LoyaltyManagerTabsEnum.UPSELL_MANAGER}
        >
          {getRenderComponent(LoyaltyManagerTabsEnum.UPSELL_MANAGER)}
        </TabPane>
      </UITabs>
    </PageLayout>
  )
};

export default LoyaltyManager;
