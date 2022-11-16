import React, { useEffect, useState } from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Spin from 'antd/es/spin';
import Input from 'antd/es/input';
import Space from 'antd/es/space';
import Button from 'antd/es/button';
import Switch from 'antd/es/switch';
import Select from 'antd/es/select';
import Skeleton from 'antd/es/skeleton';
import { useForm } from 'antd/es/form/Form';
import { useQueryClient } from 'react-query';
import notification from 'antd/es/notification';

import { Header5 } from 'components/layout/headers';
import { Plus } from 'components/icons/system/plus';
import { Delete } from 'components/icons/system/delete';
import { dataToFormValues } from 'utils/form/data-to-form-values';

import {
  useSurveyList,
  useCreateSurveyMutation,
  useUpdateSurveyMutation,
  useUpdateStatusSurveyMutation,
} from 'modules/api-requests/survey/queries';
import { useAppSelector } from 'utils/hooks';
import { getRequiredListValidator } from './validators';
import { PageBody, ButtonsContainer } from '../elements';
import { getCurrentCourseId } from 'models/profile/selectors';
import ExceptionInline from 'components/exception/exception-inline';

import type { FormInstance } from 'antd/es/form/Form';
import type { IApiError } from 'modules/api-requests/types';
import type { ISurvey } from 'modules/api-requests/survey/types';

interface ISurveySettings {
  setForm: (form: FormInstance) => void;
}

const { Option } = Select;

const emptySurvey: Partial<ISurvey> = {
  name: undefined,
  isActive: false,
  subjects: [],
}

export const SurveySettings = ({ setForm }: ISurveySettings) => {
  const [form] = useForm();
  const queryClient = useQueryClient();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [cacheSurveys, setCacheSurveys] = useState<ISurvey[]>([]);

  const { isFetching: isLoadingSurveys, error } = useSurveyList(currentCourseId, {
    onSettled: (data, error) => {
      form.setFields(dataToFormValues(emptySurvey));
      if (data && !error) {
        setCacheSurveys(data);
      }
    },
  });

  const { mutate: updateSurvey } = useUpdateSurveyMutation(currentCourseId, {
    onSuccess: () => {
      queryClient.invalidateQueries(['updateSurvey', currentCourseId]);
      notification.success({ message: 'Survey was updated successfully' });
    },
    onError: (error) => notification.error({ message: 'Cannot update survey', description: String(error) }),
  });

  const { mutate: createSurvey } = useCreateSurveyMutation(currentCourseId, {
    onSuccess: () => {
      form.setFields(dataToFormValues(emptySurvey));
      queryClient.invalidateQueries(['createSurvey', currentCourseId]);
      notification.success({ message: 'Survey was created successfully' });
    },
    onError: (error) => notification.error({ message: 'Cannot create survey', description: String(error) }),
  });

  const { mutate: updateStatusSurvey, isLoading: isStatusLoading } = useUpdateStatusSurveyMutation(currentCourseId, {
    onSuccess: (data, variables) => {
      const { surveyId, isActive } = variables;

      if (surveyId && isActive !== undefined) {
        setCacheSurveys(curSurveys => curSurveys.map(i => i.id === surveyId ? { ...i, isActive } : i));
      }

      notification.success({ message: 'Survey status was updated successfully' });
    },
    onError: (error) => notification.error({ message: 'Cannot update survey status', description: String(error) }),
  });

  // update form instance with form changes
  useEffect(() => {
    setForm(form);
  }, [form, setForm]);

  const onFormSubmit = async (formValues: any) => {
    if (formValues.surveyId) {
      updateSurvey({ surveyId: formValues.surveyId, data: formValues });
    } else {
      createSurvey(formValues);
    }
  };

  return (
    <PageBody>
      <Spin spinning={isLoadingSurveys} size="large" delay={500}>
        {error && <ExceptionInline error={{ message: error } as IApiError} />}

        <Form
          form={form}
          name="SurveySettings"
          size="large"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            surveyId: null,
            ...emptySurvey
          }}
          onFinish={onFormSubmit}
          onValuesChange={({ surveyId }) => {
            if (surveyId) {
              const foundSurvey = cacheSurveys?.find(s => s.id === surveyId);
              if (foundSurvey) {
                form.setFields(dataToFormValues(foundSurvey));
              }
            }

            if (surveyId === null) {
              form.setFields(dataToFormValues(emptySurvey));
            }
          }}
        >
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item name="id" noStyle><Input type="hidden" /></Form.Item>

              <Form.Item name="surveyId" label="Select report">
                <Select placeholder="Select" loading={isLoadingSurveys} style={{ minWidth: 140 }}>
                  <Option value={null}>Create new survey</Option>
                  {cacheSurveys && cacheSurveys.map((surveyEntity) => (
                    <Option key={surveyEntity.id} value={surveyEntity.id}>
                      {surveyEntity.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {cacheSurveys && !isLoadingSurveys ? (
            <>
              <Row gutter={[16, 16]}>
                <Col>
                  <Form.Item
                    name="name"
                    label="Survey name"
                    rules={[{ whitespace: true, required: true, message: 'Name cannot be empty' }]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    noStyle
                    dependencies={['surveyId']}
                  >
                    {({ getFieldValue }) => {
                      const surveyId = getFieldValue('surveyId');
                      const onStatusChange = (checked: boolean) => {
                        updateStatusSurvey({ surveyId, isActive: checked });
                      }

                      return (
                        <Form.Item
                          name="isActive"
                          valuePropName="checked"
                          label="Is survey active"
                        >
                          <Switch
                            size="default"
                            disabled={!surveyId}
                            loading={isStatusLoading}
                            onChange={onStatusChange} />
                        </Form.Item>)
                    }}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item>
                    <Header5>Subjects</Header5>
                  </Form.Item>

                  <Form.List name="subjects" rules={getRequiredListValidator('At least one subject is required')}>
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field) => (
                          <Space direction="vertical" key={field.key} size={8}>
                            <div className="subject-name-container">
                              <Form.Item
                                name={[field.key, 'name']}
                                label="Subject name"
                                style={{ width: 'calc(100% - 32px)' }}
                                rules={[{ whitespace: true, required: true, message: 'Name cannot be empty' }]}
                              >
                                <Input placeholder="name" />
                              </Form.Item>
                              <Button type="link" onClick={() => remove(field.name)} icon={<Delete />} />
                            </div>

                            <Form.Item
                              name={[field.key, 'description']}
                              label="Subject description"
                              rules={[{ whitespace: true, message: 'Description cannot be empty' }]}
                            >
                              <Input placeholder="description" />
                            </Form.Item>

                            <Form.Item>Questions:</Form.Item>

                            <Form.List
                              name={[field.key, 'questions']}
                              rules={getRequiredListValidator('At least one question is required')}
                            >
                              {(fields, { add, remove }, { errors }) => (
                                <>
                                  {fields.map((field) => (
                                    <Form.Item key={field.key}>
                                      <Form.Item
                                        name={[field.name, 'text']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                          {
                                            required: true,
                                            whitespace: true,
                                            message: 'Please input a question or delete it',
                                          },
                                        ]}
                                        noStyle
                                      >
                                        <Input placeholder="Question" style={{ width: '85%' }} />
                                      </Form.Item>

                                      <Button type="link" onClick={() => remove(field.name)} icon={<Delete />} />
                                    </Form.Item>
                                  ))}

                                  <Form.Item>
                                    <ButtonsContainer>
                                      <Button
                                        type="primary"
                                        icon={<Plus />}
                                        onClick={() => add()}
                                        style={{ width: '85%' }}
                                      >
                                        Add question
                                      </Button>
                                    </ButtonsContainer>
                                    <Form.ErrorList errors={errors} />
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                          </Space>
                        ))}

                        <Form.ErrorList errors={errors} />

                        <Form.Item style={{ marginTop: 16 }}>
                          <Button type="primary" onClick={() => add()}>Add subject</Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </>
          ) : <Skeleton active={true} />}
        </Form>
      </Spin>
    </PageBody>
  );
};

export default SurveySettings;
