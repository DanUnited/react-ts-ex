import React, { useEffect } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import { useForm } from 'antd/es/form/Form';
import { push } from 'connected-react-router';
import InputNumber from 'antd/es/input-number';

import { rateCreatingActions } from 'models/rates';
import { Header3 } from 'components/layout/headers';
import { PrimaryButton } from 'components/layout/button';
import { PriceManagementTabsEnum } from '../../constants';
import { childRateSelector } from 'models/rates/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { useRateList } from 'modules/api-requests/rates/queries';
import { ArrowRight } from 'components/icons/system/arrow-right';
import { dataToFormValues } from 'utils/form/data-to-form-values';

import {
  Icon,
  ParentRate,
  FlexContainer,
  ButtonMargin,
  PageContainer,
  HeaderContainer,
  ChildRatePageLayout,
} from './elements';

import type { IChildRate } from 'modules/api-requests/rates/types';

const pageTitle = 'Create child rate';
const BACK_ACTION_URL = PathCreator[RoutePaths.PRICING_MANAGEMENT].getUrl(PriceManagementTabsEnum.RATE);

export const RateChild = () => {
  const dispatch = useAppDispatch();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const childRate = useAppSelector(childRateSelector);
  const [form] = useForm();

  const { isFetching, data: rateList } = useRateList(currentCourseId);

  const onFormSubmit = (values: IChildRate) => {
    dispatch(rateCreatingActions.setChildRate(values));
    dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_COPY].getUrl(values.rateId)));
  };

  const onCancel = () => {
    dispatch(push(BACK_ACTION_URL));
  }

  useEffect(() => {
    if (childRate) {
      form.setFields(dataToFormValues(childRate));
    }
  }, [childRate, form]);

  return (
    <Form
      form={form}
      size="large"
      layout="vertical"
      onFinish={onFormSubmit}
    >
      <ChildRatePageLayout
        title={pageTitle}
        returnSrc={BACK_ACTION_URL}
        bodiless
        actions={(
          <FlexContainer>
            <Button onClick={onCancel}>Cancel</Button>
            <ButtonMargin>
              <PrimaryButton htmlType="submit">
                Create child rate
                <Icon>
                  <ArrowRight />
                </Icon>
              </PrimaryButton>
            </ButtonMargin>
          </FlexContainer>
        )}
        breadcrumbExtra={[
          { key: 'create_user', title: pageTitle, path: PathCreator[RoutePaths.USERS_MANAGEMENT] },
        ]}
      >
        <PageContainer>
          <HeaderContainer>
            <Header3>Child rate settings</Header3>
          </HeaderContainer>
          <Row gutter={{ sm: 24 }}>
            <Col flex="404px">
              <ParentRate>
                <Form.Item
                  label="Parent rate"
                  name="rateId"
                  rules={[
                    { required: true, message: 'Parent rate is required' },
                  ]}
                >
                  <Select loading={isFetching} placeholder="Select rate">
                    {rateList?.map(rate => (
                      <Select.Option key={rate.id} value={rate.id}>{rate.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </ParentRate>

              <Form.Item
                name="name"
                label="Rate name"
                rules={[
                  { required: true, message: 'Enter rate name' },
                ]}
              >
                <Input placeholder="Rate name" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: 'Enter rate description' },
                ]}
              >
                <Input.TextArea autoSize={{ minRows: 6, maxRows: 6 }} placeholder="Rate description" />
              </Form.Item>
            </Col>

            <Col flex="404px">
              <Form.Item
                name="discountType"
                label="Type of value to change"
                rules={[
                  { required: true, message: 'Enter discount type' },
                ]}
              >
                <Select placeholder="Value type">
                  <Select.Option value="Percent">Percent</Select.Option>
                  <Select.Option value="Dollar">Dollars</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="discount"
                label="Price deviation"
                rules={[
                  { required: true, message: 'Enter price deviation amount' },
                ]}
              >
                <InputNumber placeholder="Enter price deviation" />
              </Form.Item>
            </Col>
          </Row>
        </PageContainer>
      </ChildRatePageLayout>
    </Form>
  );
};

export default RateChild;
