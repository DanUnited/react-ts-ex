import React, { useState } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Tabs from 'antd/es/tabs';
import Form from 'antd/es/form';
import Divider from 'antd/es/divider';
import { useForm } from 'antd/es/form/Form';
import InputNumber from 'antd/es/input-number';
import notification from 'antd/es/notification';

import { TabContent } from './tab-content';
import { useAppSelector } from 'utils/hooks';
import { Loading } from 'components/loading';
import { InputNumberFormatter } from 'utils/numbers';
import { SystemRolesEnum } from 'models/profile/types';
import { PrimaryButton } from 'components/layout/button';
import { PageLayout } from 'components/layout/page-layout';
import { getProfileRoles } from 'models/profile/selectors';
import { getCurrentCourseId } from 'models/profile/selectors';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { DividerContainer } from 'pages/course-settings/taxes-tab/elements';

import {
  useCourseReports,
  useCourseReportSettings,
  useCourseReportSettingsMutation,
} from 'modules/api-requests/reports/queries';

import type { IReportSettings } from 'modules/api-requests/reports/types';

const getCourseSettingsLabel = (fieldName: keyof IReportSettings) => {
  switch (fieldName) {
    case 'goalFBRevenue':
      return 'Goal F&B Revenue';
    case 'goalMerchandiseRevenue':
      return 'Goal merchandise revenue';
    case 'goalGreenFeeRevenue':
      return 'Goal green fee revenue';
    case 'goalRangeRevenue':
      return 'Goal range revenue';
    case 'goalTournamentRevenue':
      return 'Goal tournament revenue';
    case 'goalTradeRoundRevenue':
      return 'Goal trade round revenue';

    default:
      return fieldName;
  }
};

const tradePacingSettings: Array<keyof IReportSettings> = ['goalTradeRoundRevenue'];
const generalReportSettings: Array<keyof IReportSettings> = ['goalFBRevenue', 'goalMerchandiseRevenue', 'goalGreenFeeRevenue', 'goalRangeRevenue', 'goalTournamentRevenue'];

export const Statistics = () => {
  const [formSettings] = useForm();
  const [currentTab, setCurrentTab] = useState<string | undefined>();
  const currentRoles = useAppSelector(getProfileRoles);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const { data: reportList, isFetching: reportsLoading } = useCourseReports(currentCourseId);
  const { data: reportSettings, isFetching: isReportSettingsLoading } = useCourseReportSettings({
    onSuccess: (data) => {
      formSettings.setFields(dataToFormValues(data));
    },
  });

  const { mutate: saveSettings, isLoading: isSaving } = useCourseReportSettingsMutation({
    onSuccess: () => {
      notification.success({ message: 'Report settings was saved!' });
    },
  });

  return (
    <Form layout="vertical" form={formSettings} onFinish={saveSettings}>
      <PageLayout
        fullHeight
        title="Statistics"
        actions={currentTab === 'settings'
          ? (
            <PrimaryButton
              htmlType="submit"
              disabled={!currentCourseId}
              loading={isReportSettingsLoading || isSaving}
            >
              Save Changes
            </PrimaryButton>
          )
          : null}
      >
        {reportsLoading || isReportSettingsLoading
          ? <Loading />
          : (
            <Tabs activeKey={currentTab} onChange={setCurrentTab}>
              {reportList && reportList.map(report => {
                if (
                  (report.name === 'Trade Sales' || report.name === 'Trade Pacing') &&
                  !currentRoles.includes(SystemRolesEnum.ADMIN)
                ) {
                  return null;
                } else {
                  if (!currentRoles.includes(SystemRolesEnum.MANAGER)) {
                    return null;
                  }

                  return (
                    <Tabs.TabPane
                      key={report.id}
                      id={report.id}
                      tab={report.name}
                      tabKey={report.id}
                      children={
                        <TabContent courseId={currentCourseId} reportId={report.id} />
                      }
                    />
                  );
                }
              })}

              {reportSettings && currentCourseId && currentRoles.includes(SystemRolesEnum.ADMIN)
                ? (
                  <Tabs.TabPane tab="Settings" key="settings">
                    <Row gutter={16}>
                      <Col span={12}>
                        <DividerContainer>
                          <Divider orientation="left">
                            General report settings
                          </Divider>

                          {Object
                            .keys(reportSettings)
                            .filter(item => generalReportSettings.includes(item as keyof IReportSettings))
                            .map((item) => (
                              <Col span={24} key={item}>
                                <Form.Item name={item} label={getCourseSettingsLabel(item as keyof IReportSettings)}>
                                  <InputNumber min={0} formatter={InputNumberFormatter()} />
                                </Form.Item>
                              </Col>
                            ))}
                        </DividerContainer>
                      </Col>

                      <Col span={12}>
                        <DividerContainer>
                          <Divider orientation="left">
                            Trade pacing settings
                          </Divider>

                          {Object
                            .keys(reportSettings)
                            .filter(item => tradePacingSettings.includes(item as keyof IReportSettings))
                            .map((item) => (
                              <Col span={24} key={item}>
                                <Form.Item name={item} label={getCourseSettingsLabel(item as keyof IReportSettings)}>
                                  <InputNumber min={0} formatter={InputNumberFormatter()} />
                                </Form.Item>
                              </Col>
                            ))}
                        </DividerContainer>
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                )
                : null
              }
            </Tabs>
          )
        }
      </PageLayout>
    </Form>
  );
};

export default Statistics;
