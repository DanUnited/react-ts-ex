import React, { useEffect, useState, useRef, useMemo } from 'react';
import moment from 'moment';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Spin from 'antd/es/spin';
import List from 'antd/es/list';
import Space from 'antd/es/space';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import Collapse from 'antd/es/collapse';
import mapValues from 'lodash/mapValues';
import { useForm } from 'antd/es/form/Form';
import DatePicker from 'antd/es/date-picker';
import notification from 'antd/es/notification';
import { useReactToPrint } from 'react-to-print';
import { useMutation, useQueryClient } from 'react-query';

import Chart from 'components/chart';
import { sortSurvey } from './helpers';
import { ChartUtils } from 'utils/chart';
import { toISOString } from 'utils/date';
import { DateTimeFormat } from 'utils/date';
import { useAppSelector } from 'utils/hooks';
import { SelectReportForm } from './elements';
import ChartSkeleton from 'components/chart/chart-skeleton';
import { getCurrentCourseId } from 'models/profile/selectors';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { useSurveyList } from 'modules/api-requests/survey/queries';
import ExceptionInline from 'components/exception/exception-inline';
import { getSurveyReportRequest } from "modules/api-requests/survey";
import { PageBody, ChartContainer, PrintContainer } from '../elements';

import type { ChartOptionsConfig } from 'utils/chart';
import type { ISurveyComment, ISurveyForm } from './types';
import type { IChartSerieOption, IChartSerieType, YAxisType } from 'models/chart';

const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const FormValidateMessages = {
  /* eslint-disable-next-line no-template-curly-in-string */
  required: '${label} is required',
};

const seriesOptionsCommon = {
  type: 'column' as IChartSerieType,
  yAxis: 0 as YAxisType,
};

export const SurveyReport = () => {
  const [form] = useForm();
  const queryClient = useQueryClient();
  const [subjectName, setSubjectName] = useState<string>();
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(null);
  const [surveyComments, setSurveyComments] = useState<ISurveyComment[]>([]);
  const surveyCommentsSorted = useMemo(() => surveyComments.sort(sortSurvey), [surveyComments]);
  const printContainer = useRef<HTMLDivElement | null>(null);
  const currentCourseId = useAppSelector(getCurrentCourseId);

  const {
    data: surveyReport,
    error: surveyError,
    mutate: getSurveyReport,
    isLoading: surveyLoading,
    reset: resetSurveyReport,
  } = useMutation({
    mutationKey: ['getSurveyReport', currentCourseId],
    mutationFn: (data: { reportId: string, fromDate: string, toDate: string }) =>
      getSurveyReportRequest({
        surveyId: data.reportId,
        courseId: currentCourseId,
        params: { fromDate: data.fromDate, toDate: data.toDate },
      }),
    onMutate: ({ reportId }) => {
      setSurveyId(reportId);
    },
    onError: (e) => {
      setSurveyComments([]);
      notification.error({ message: 'Cannot get list of reports', description: String(e) });
    },
    onSuccess: (data) => {
      const collection: ISurveyComment[] = [];

      if (data && data.results) {
        data.results.forEach(item => {
          if (item.comments) {
            collection.push({
              comments: item.comments,
              submittedAt: item.createdAt,
              userEmail: item.customerEmail ?? '',
              userName: item.customerName ?? '',
            })
          }
        })
      }

      setSurveyComments(collection);
    },
  });

  const { data: surveys, isFetching: isLoadingSurveys } = useSurveyList(currentCourseId, {
    onSettled: (data) => {
      queryClient.setQueryData(['getSurveyReport', currentCourseId], undefined);
      resetSurveyReport();

      if (!(data && data.length)) {
        setSurveyComments([]);

        form.setFields(dataToFormValues({
          subject: undefined,
          submittedDateRange: undefined,
        }))
      }
    },
  });

  const error = surveyError as Error;
  const questions = useMemo(() =>
      surveyId ? flatten(surveys?.find(i => i.id === surveyId)?.subjects.map(item => item.questions)) : [],
    [surveys, surveyId]);

  useEffect(() => {
    const surveyData = surveyReport ? surveyReport.results : [];
    const xAxisCategories: string[] = questions.map(item => item.text);
    const series: IChartSerieOption[] = []; // answer option count in each questionId, named by answer text

    if (surveyData.length > 0) {
      const allUserAnswers = flatten(surveyReport?.results.map(item => item.items)) ?? [];
      const answersGroupedByQuestion = mapValues(groupBy(allUserAnswers, item => item.questionId),
        (valueArray) => groupBy(valueArray, 'answerId'));

      surveyReport?.answerOptions.forEach(answerOption => {
        const answerData: number[] = [];

        Object.keys(answersGroupedByQuestion).forEach((questionId) => {
          answerData.push(answersGroupedByQuestion?.[questionId]?.[answerOption.id]?.length || 0);
        });

        series.push({
          ...seriesOptionsCommon,
          name: answerOption.text ?? '',
          data: answerData,
        })
      });
    }

    // configure chart options and update the chart
    const config: ChartOptionsConfig = {
      title: subjectName,
      yAxisNamePrimary: 'Number of responses',
      seriesOptions: series, // seriesOptionsUpdated
      xAxisOptions: xAxisCategories, // x-axis categories
    };

    const chartOptionsUpdated = ChartUtils.getChartOptions(config);
    setChartOptions(chartOptionsUpdated);
  }, [surveyReport, subjectName, questions, form]);

  const onFormSubmit = ({ subject: subjectId, submittedDateRange }: ISurveyForm) => {
    const [submittedDateStartUpdated, submittedDateEndUpdated] = submittedDateRange.map(
      (submittedDate) => toISOString(submittedDate.toDate()).split('T')[0],
    );

    if (surveys) {
      const subject = surveys.find((subject) => subject.id === subjectId);

      if (subject) {
        setSubjectName(subject.name);
      }
    }

    getSurveyReport({ reportId: subjectId, fromDate: submittedDateStartUpdated, toDate: submittedDateEndUpdated });
  };

  const onPrint = useReactToPrint({
    content: () => printContainer.current,
  });

  return (
    <PageBody>
      <Spin spinning={isLoadingSurveys} size="large" delay={500}>
        {!isLoadingSurveys && !surveyLoading && error && <ExceptionInline error={error} />}
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Row>
            <Col>
              <SelectReportForm
                form={form}
                size="large"
                layout="vertical"
                autoComplete="off"
                onFinish={onFormSubmit}
                name="SurveySearchForm"
                validateMessages={FormValidateMessages}
                initialValues={{ submittedDateRange: [] } as Partial<ISurveyForm>}
              >
                <Form.Item name="subject" label="Report" rules={[{ required: true }]}>
                  <Select allowClear={true} placeholder="Select" loading={isLoadingSurveys}>
                    {surveys && surveys.map((surveyEntity) => (
                      <Option key={surveyEntity.id} value={surveyEntity.id}>
                        {surveyEntity.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="submittedDateRange" label="Period" rules={[{ required: true }]}>
                  <RangePicker placeholder={['Start date', 'End date']} />
                </Form.Item>

                <Form.Item style={{ alignSelf: 'end' }}>
                  <Button type="primary" htmlType="submit">
                    View Report
                  </Button>
                </Form.Item>
              </SelectReportForm>
            </Col>
          </Row>

          <PrintContainer ref={printContainer}>
            <Row>
              <Col span={24}>
                {surveyLoading && <ChartSkeleton />}
                {!surveyLoading && chartOptions && (
                  <ChartContainer>
                    <div className="actions-bar">
                      {chartOptions?.series?.length !== 0 && (
                        <Button type="primary" onClick={onPrint}>
                          Export to PDF
                        </Button>
                      )}
                    </div>
                    <Chart options={chartOptions} />
                  </ChartContainer>
                )}
              </Col>
            </Row>

            {chartOptions?.series?.length !== 0 && (
              <Row>
                <Col span={24}>
                  {surveyLoading && <ChartSkeleton />}
                  {!surveyLoading && (
                    <Collapse defaultActiveKey={['1']} ghost={true}>
                      <Panel header={`Number of comments: ${surveyCommentsSorted.length}`} key="1">
                        <List
                          itemLayout="vertical"
                          size="default"
                          dataSource={surveyCommentsSorted}
                          renderItem={(item) => (
                            <List.Item key={`${item.submittedAt}-${item.userEmail}`}>
                              <List.Item.Meta
                                title={`${item.userName || 'Guest'} at ${moment.utc(item.submittedAt).format(DateTimeFormat)}`}
                                description={item.userEmail}
                              />
                              {item.comments}
                            </List.Item>
                          )}
                        />
                      </Panel>
                    </Collapse>
                  )}
                </Col>
              </Row>
            )}
          </PrintContainer>
        </Space>
      </Spin>
    </PageBody>
  );
};

export default SurveyReport;
