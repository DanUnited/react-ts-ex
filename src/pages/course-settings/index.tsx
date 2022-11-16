import React, { useCallback, useState } from 'react';
import { useIsMutating } from 'react-query';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';

import { UITabs } from './elements';
import { CourseSettingsTabsEnum } from './constants';
import { lazyWithRetry } from 'utils/lazy-with-reload';
import { PrimaryButton } from 'components/layout/button';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { GlobalSuspense } from 'components/suspense/global-suspense';

import type { FormInstance } from 'antd/es/form/Form';
import type { LoadableComponent } from '@loadable/component';

const CalendarTab = lazyWithRetry(() => import('pages/course-settings/calendar-tab'));
const MembershipTab = lazyWithRetry(() => import('pages/course-settings/membership-list-tab'));
const SeasonsTab = lazyWithRetry(() => import('pages/course-settings/seasons-tab'));
const TimePeriodsTab = lazyWithRetry(() => import('pages/course-settings/time-periods-tab'));
const SettingsTab = lazyWithRetry(() => import('pages/course-settings/settings-tab'));
const TaxesTab = lazyWithRetry(() => import('pages/course-settings/taxes-tab'));

const { TabPane } = UITabs;

const CourseSettingPaths: Record<CourseSettingsTabsEnum, LoadableComponent<any>> = {
  [CourseSettingsTabsEnum.CALENDAR]: CalendarTab,
  [CourseSettingsTabsEnum.MEMBERSHIP]: MembershipTab,
  [CourseSettingsTabsEnum.SEASONS]: SeasonsTab,
  [CourseSettingsTabsEnum.TIME_PERIODS]: TimePeriodsTab,
  [CourseSettingsTabsEnum.SETTINGS]: SettingsTab,
  [CourseSettingsTabsEnum.TAXES]: TaxesTab,
};

const getNameByTab = (tabName: CourseSettingsTabsEnum): string => {
  switch (tabName) {
    case CourseSettingsTabsEnum.CALENDAR:
      return 'Calendar';
    case CourseSettingsTabsEnum.MEMBERSHIP:
      return 'Membership';
    case CourseSettingsTabsEnum.SEASONS:
      return 'Seasons';
    case CourseSettingsTabsEnum.TIME_PERIODS:
      return 'Time periods';
    case CourseSettingsTabsEnum.SETTINGS:
      return 'Settings';

    default:
      return 'Taxes';
  }
};

const CourseManagement = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const { tab: activeTab } = useParams<{ tab: keyof typeof CourseSettingPaths }>();
  const courseMutatingCounter = useIsMutating(['updateCourse']);
  const [formState, setFormState] = useState<FormInstance | null>(null);

  const getRenderComponent = useCallback((tabKey: keyof typeof CourseSettingPaths) => {
    const TabComponent = activeTab === tabKey
      ? CourseSettingPaths[tabKey]
      : () => null

    return (
      <React.Suspense fallback={<GlobalSuspense />}>
        <TabComponent setFormState={setFormState} loadingCallback={setLoading} />
      </React.Suspense>
    );
  }, [activeTab]);

  const onSave = async (): Promise<void> => {
    if (formState) {
      await formState.validateFields();
      formState.submit();
    }
  };

  const onChangeTab = (key: string): void => {
    dispatch(push(PathCreator[RoutePaths.COURSE_SETTINGS].getUrl(key)));
  };

  return (
    <>
      <PageLayout
        title="Course settings"
        breadcrumbExtra={[{ path: PathCreator[RoutePaths.COURSE_SETTINGS], title: getNameByTab(activeTab), key: 'course-settings' }]}
        actions={[CourseSettingsTabsEnum.SETTINGS, CourseSettingsTabsEnum.TAXES].includes(activeTab) && (
          <PrimaryButton
            onClick={onSave}
            htmlType="submit"
            disabled={!currentCourseId}
            loading={(courseMutatingCounter > 0) || loading}
          >
            Save Changes
          </PrimaryButton>
        )}
      >
        <UITabs
          size="large"
          destroyInactiveTabPane
          onChange={onChangeTab}
          defaultActiveKey={activeTab}
        >
          {Object.entries(CourseSettingPaths).map(([key]) => {
            const pathKey = key as CourseSettingsTabsEnum;

            return (
              <TabPane tab={getNameByTab(pathKey)} key={key}>
                {getRenderComponent(pathKey)}
              </TabPane>
            )
          })}
        </UITabs>
      </PageLayout>
    </>
  );
};

export default CourseManagement;
