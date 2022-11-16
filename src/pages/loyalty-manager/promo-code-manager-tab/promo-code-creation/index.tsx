import React, { useCallback, useState } from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Space from 'antd/es/space';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';
import { useMutation } from 'react-query';
import { useForm } from 'antd/es/form/Form';
import DatePicker from 'antd/es/date-picker';
import { push } from 'connected-react-router';
import TextArea from 'antd/es/input/TextArea';
import InputNumber from 'antd/es/input-number';
import notification from 'antd/es/notification';

import { Calendar } from 'components/calendar';
import { CouponValidator } from 'utils/validators';
import { GreyButton } from 'components/layout/button';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { ArrowRight } from 'components/icons/system/arrow-right';
import { PromoCodeInput, PromoCodeLayout, PromoHeader } from './elements';
import { createCourseCouponsRequest } from 'modules/api-requests/coupons';
import { DateFormat, ServerDateFormat, ServerTimeFormat, TimeFormat } from 'utils/date';

import type { Moment } from 'moment/moment';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { ICoupon, ICreateCouponsRequest } from 'modules/api-requests/coupons/types';

const backURL = PathCreator[RoutePaths.LOYALTY_MANAGER].getUrl();

interface ICouponForm extends Omit<ICoupon, 'id'> {
  time: [Moment, Moment];
  date: [Moment, Moment];
}

const initialCouponForm: Partial<ICouponForm> = {
  perPlayer: false,
  allowMultipleUsage: false,
  allowTradeRound: true,
  isActive: true,
  isPromo: false,
  numOfCoupons: 1,
};

export const PromoCodeCreation = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [autoCode, setAutoCode] = useState(false);

  const { mutate: createCoupon, isLoading: isCreating } = useMutation({
    mutationKey: ['createCoupon'],
    mutationFn: (data: ICreateCouponsRequest) => createCourseCouponsRequest(data),
    onSuccess: () => {
      notification.success({ message: 'Coupon created successfully!' });
      dispatch(push(PathCreator[RoutePaths.LOYALTY_MANAGER].getUrl()));
    },
  });

  const handleFormFinish = useCallback(({ time, date, code, ...couponForm }: ICouponForm) => {
    createCoupon({
      courseId: currentCourseId,
      data: {
        ...couponForm,
        code: code ? code.toUpperCase() : undefined,
        startTime: Boolean(time) ? time[0].format(ServerTimeFormat) : undefined,
        endTime: Boolean(time) ? time[1].format(ServerTimeFormat) : undefined,
        startDate: Boolean(date) ? date[0].format(ServerDateFormat) : undefined,
        endDate: Boolean(date) ? date[1].format(ServerDateFormat) : undefined,
      }
    });
  }, [createCoupon, currentCourseId]);

  const handleCancelForm = useCallback(() => {
    dispatch(push(PathCreator[RoutePaths.LOYALTY_MANAGER].getUrl()));
  }, [dispatch]);

  const onCreatePromoClick = () => {
    form.validateFields()
      .then(() => form.submit())
      .catch(() => Promise.reject('Validation failed'));
  };

  const onGeneratePromoCodeChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;

    if (checked) {
      form.setFieldsValue({ code: undefined });
    }

    setAutoCode(checked);
  };

  return (
    <>
      <PromoCodeLayout
        returnSrc={backURL}
        title="Loyalty manager"
        fullHeight
        actions={(
          <Space size={16}>
            <GreyButton size="large" onClick={handleCancelForm}>Cancel</GreyButton>
            <Button size="large" type="primary" loading={isCreating}>
              <Space size={8} align="center" onClick={onCreatePromoClick}>
                Create promo code <ArrowRight />
              </Space>
            </Button>
          </Space>
        )}
        breadcrumbExtra={[
          {
            key: 'loyalty_manager',
            title: 'Create promo code',
            path: PathCreator[RoutePaths.LOYALTY_MANAGER_PROMO_CREATION]
          }
        ]}
      >
        <PromoHeader>Enter promo code settings</PromoHeader>

        <Form
          size="large"
          form={form}
          layout="vertical"
          onFinish={handleFormFinish}
          initialValues={initialCouponForm}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Promo code"
                validateTrigger="onBlur"
                rules={[
                  { validator: CouponValidator },
                  { len: 6, message: 'Length should be 6 symbols' },
                ]}
                extra={(
                  <Checkbox
                    checked={autoCode}
                    style={{ marginTop: 4 }}
                    onChange={onGeneratePromoCodeChange}
                  >
                    Auto generate promo code
                  </Checkbox>
                )}
              >
                <PromoCodeInput placeholder="Enter promo code" disabled={autoCode} />
              </Form.Item>

              <Form.Item
                name="discountAmount"
                label="Discount amount"
                rules={[{ required: true, message: 'Discount amount is required' }]}
              >
                <InputNumber placeholder="Enter discount amount" size="large" min={0} />
              </Form.Item>

              <Form.Item
                name="discountType"
                label="Discount type"
                rules={[{ required: true, message: 'Select discount type' }]}
              >
                <Select placeholder="Discount type">
                  <Select.Option value="Percent">
                    Percent
                  </Select.Option>
                  <Select.Option value="Dollar">
                    Dollars
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="maxUsage" label="Maximum usage">
                <InputNumber placeholder="Enter maximum usage amount" size="large" min={0} />
              </Form.Item>

              <Form.Item name="numOfCoupons" label="Number of coupons">
                <InputNumber
                  min={1}
                  max={25}
                  size="large"
                  placeholder="Enter number of coupons to generate automatically"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="availableDays"
                label="Day usage"
                rules={[{ required: true, message: 'Usage days are required' }]}
              >
                <Calendar size="large" />
              </Form.Item>

              <Form.Item name="time" label="Time usage">
                <DatePicker.RangePicker picker="time" format={TimeFormat} />
              </Form.Item>

              <Form.Item name="date" label="Date usage">
                <DatePicker.RangePicker className="w-100" format={DateFormat} />
              </Form.Item>

              <Form.Item name="perPlayer" valuePropName="checked">
                <Checkbox>Discount per player</Checkbox>
              </Form.Item>

              <Form.Item name="allowMultipleUsage" valuePropName="checked">
                <Checkbox>Allow multiple usage for one player</Checkbox>
              </Form.Item>

              <Form.Item name="allowTradeRound" valuePropName="checked">
                <Checkbox>Allow trade round usage</Checkbox>
              </Form.Item>

              <Form.Item name="isPromo" valuePropName="checked">
                <Checkbox>Promo item</Checkbox>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea placeholder="Enter notes" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </PromoCodeLayout>
    </>
  );
};

export default PromoCodeCreation;
