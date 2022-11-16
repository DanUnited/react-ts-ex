import React, { useState } from 'react';
import Tabs from 'antd/es/tabs';
import { useIsMutating } from 'react-query';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';

import { useAppDispatch } from 'utils/hooks';
import { SurveyTabsEnum } from './constants';
import SurveyReport from './survey-report-tab';
import SurveySettings from './survey-settings-tab';
import { PrimaryButton } from 'components/layout/button';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';

import type { FormInstance } from 'antd/es/form/Form';

const { TabPane } = Tabs;

const getTabTitle = (tabName: SurveyTabsEnum): string => {
  switch (tabName) {
    case SurveyTabsEnum.SURVEY_REPORT:
      return 'Report';
    case SurveyTabsEnum.SURVEY_SETTINGS:
      return 'Settings';
    default:
      return 'Report';
  }
};

const Survey = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const fetchCount = useIsMutating();

  const { tab: activeTab } = useParams<{ tab: SurveyTabsEnum }>();
  const [surveySettingsForm, setSurveySettingsForm] = useState<FormInstance | null>(null);

  const onTabChange = (key: string): void => {
    dispatch(push(PathCreator[RoutePaths.SURVEY].getUrl(key)));
  };

  const onSurveySettingsFormSubmit = async (): Promise<void> => {
    if (!surveySettingsForm) {
      return;
    }

    await surveySettingsForm.validateFields();
    surveySettingsForm.submit();
  };

  return (
    <PageLayout
      title="Survey"
      fullHeight
      breadcrumbExtra={[{ key: 'survey', path: PathCreator[RoutePaths.SURVEY], title: getTabTitle(activeTab) }]}
      actions={
        [SurveyTabsEnum.SURVEY_SETTINGS].includes(activeTab)
          ? <PrimaryButton onClick={onSurveySettingsFormSubmit} htmlType="submit" loading={fetchCount > 0}>
            Save Changes
          </PrimaryButton>
          : null
      }
    >
      <Tabs size="large" onChange={onTabChange} defaultActiveKey={activeTab}>
        <TabPane tab="Report" key={SurveyTabsEnum.SURVEY_REPORT}>
          <SurveyReport />
        </TabPane>
        <TabPane tab="Settings" key={SurveyTabsEnum.SURVEY_SETTINGS}>
          <SurveySettings setForm={setSurveySettingsForm} />
        </TabPane>
      </Tabs>
    </PageLayout>
  );
};

export default Survey;
