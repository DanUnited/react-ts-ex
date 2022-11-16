import React, { useEffect } from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Switch from 'antd/es/switch';
import ReactQuill from 'react-quill';
import Checkbox from 'antd/es/checkbox';
import { useForm } from 'antd/es/form/Form';
import momentTimezone from 'moment-timezone';
import notification from 'antd/es/notification';
import { useMutation, useQueryClient } from 'react-query';

import { useAppSelector } from 'utils/hooks';
import { PhoneFormItem } from 'components/phone';
import { Header3 } from 'components/layout/headers';
import { NumberInput } from 'components/number-input';
import { COURSE_INPUT_MAX_LENGTH } from 'utils/constants';
import { getProfileCourse } from 'models/profile/selectors';
import { ImageCropper } from 'components/form/image-cropper';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { prepareCourseForUpdate } from 'models/courses/constants';
import { zipcodeValidator } from 'utils/validators/zipcode-validator';
import { TimeZonesSelector } from 'components/form/time-zones-selector';
import { updateCourseSettingsRequest } from 'modules/api-requests/courses';
import { emailListValidator } from 'utils/validators/email-list-validator';
import { HeaderContainer } from 'components/layout/headers/header-container';
import { StyledHeaderContainer, ToggleWrapper, UploadWrapper, UploadTitle, UploadArea } from './elements';
import { alphaNumExtendedValidator, lettersAndDigitsValidator } from 'utils/validators/letters-and-digits-validator';

import 'react-quill/dist/quill.snow.css';
import 'react-image-crop/dist/ReactCrop.css';

import type { FormInstance } from 'antd/es/form/Form';
import type { ICourse } from 'modules/api-requests/courses/types';

const { TextArea } = Input;

interface ISettingsTab {
  setFormState: (form: FormInstance) => void;
}

const initialValues = {
  timeZone: momentTimezone.tz.guess(),
};

export const SettingsTab = ({ setFormState }: ISettingsTab): React.ReactElement => {
  const [form] = useForm();
  const currentCourse = useAppSelector(getProfileCourse);
  const queryClient = useQueryClient();

  const { mutate: updateCourse } = useMutation(['updateCourse'], (data: ICourse) => {
    if (currentCourse?.id) {
      return updateCourseSettingsRequest(currentCourse?.id, data);
    }

    return Promise.reject();
  }, {
    onSuccess: () => {
      void queryClient.invalidateQueries('getCourses');
      notification.success({ message: 'The course settings have been updated!' });
    },
    onError: error => {
      notification.error({
        message: 'An error has occurred, please try again later.',
        description: String(error),
      });
    },
  });

  const onFormSubmit = (formValues: ICourse) => {
    if (formValues.logoUrl !== null && (formValues.logoUrl || '').indexOf('base64') < 0) {
      formValues.logoUrl = undefined;
    }

    if (formValues.imageUrl !== null && (formValues.imageUrl || '').indexOf('base64') < 0) {
      formValues.imageUrl = undefined;
    }

    updateCourse(prepareCourseForUpdate({ ...currentCourse, ...formValues }));
  };

  useEffect(() => {
    setFormState(form);
  }, [form, setFormState]);

  useEffect(() => {
    if (currentCourse) {
      form.resetFields();
      form.setFields(dataToFormValues(currentCourse));
    }
  }, [currentCourse, form]);

  return (
    <Form
      form={form}
      size="large"
      layout="vertical"
      onFinish={onFormSubmit}
      initialValues={initialValues}
    >
      <Row gutter={[24, 24]}>
        <Col xl={12} xs={24}>
          <HeaderContainer>
            <Header3>Course settings</Header3>
          </HeaderContainer>

          <Form.Item noStyle name="taxesAndFeesPerPlayer"><Input type="hidden" /></Form.Item>
          <Form.Item noStyle name="yieldActive"><Input type="hidden" /></Form.Item>
          <Form.Item noStyle name="weatherActive"><Input type="hidden" /></Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Course name"
                rules={[{
                  required: true,
                  message: 'Course name is required',
                }, { validator: lettersAndDigitsValidator }]}
              >
                <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Enter course name" />
              </Form.Item>

              <Form.Item name="city" label="City" rules={[{
                required: true,
                message: 'City name is required',
              }, { validator: alphaNumExtendedValidator }]}>
                <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Enter city name" />
              </Form.Item>

              <Form.Item name="zip" label="Zip"
                         rules={[{ required: true, message: 'Zip code is required' }, { validator: zipcodeValidator }]}>
                <Input placeholder="Enter zip code" />
              </Form.Item>

              <Form.Item
                name="confirmationEmails"
                label="Confirmation emails"
                rules={[{
                  required: true,
                  message: 'Confirmation email is required',
                }, { validator: emailListValidator }]}
              >
                <Input placeholder="Enter a list of letters separated by commas" />
              </Form.Item>

              <Form.Item name="timeZone" label="Time zone">
                <TimeZonesSelector />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="address"
                label="Course address"
                rules={[{
                  required: true,
                  message: 'Course address is required',
                }, { validator: alphaNumExtendedValidator }]}
              >
                <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Enter course address" />
              </Form.Item>

              <Form.Item name="state" label="State" rules={[{
                required: true,
                message: 'State is required',
              }, { validator: lettersAndDigitsValidator }]}>
                <Input maxLength={COURSE_INPUT_MAX_LENGTH} placeholder="Select state" />
              </Form.Item>

              <PhoneFormItem country="us" name="contactPhone" required={true} />

              <Form.Item
                name="website"
                label="Website URL"
                rules={[
                  {
                    type: 'url',
                    message: 'Please enter a valid URL',
                  },
                ]}
              >
                <Input placeholder="Enter URL" />
              </Form.Item>
            </Col>
          </Row>

          <HeaderContainer>
            <Header3>Booking engine messages</Header3>
          </HeaderContainer>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="purchaseConfirmationMsg" label="Purchase confirmation message">
                <TextArea placeholder="Enter message" autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>

              <Form.Item name="bookingUnavailableMsg" label="Emergency message (if booking unavialable)">
                <TextArea placeholder="Enter message" autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="welcomeMsg" label="Welcome message (optional)">
                <TextArea placeholder="Enter message" autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>

              <Form.Item name="bookingCancellationMsg" label="Booking cancellation message">
                <TextArea placeholder="Enter message" autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>
            </Col>
          </Row>

          <HeaderContainer>
            <Header3>Terms policy</Header3>
          </HeaderContainer>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="policy">
                <ReactQuill theme="snow" />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xl={12} xs={24}>
          <HeaderContainer>
            <Header3>Course pictures</Header3>
          </HeaderContainer>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <UploadWrapper>
                <div className="image-container">
                  <Form.Item name="logoUrl">
                    <ImageCropper
                      minHeight={128}
                      minWidth={128}
                      maxHeight={128}
                      maxWidth={128}
                      aspect={1}
                    />
                  </Form.Item>
                </div>

                <UploadArea>
                  <UploadTitle>Course logo (128*128px size minimum)</UploadTitle>
                </UploadArea>
              </UploadWrapper>
            </Col>

            <Col span={12}>
              <UploadWrapper>
                <div className="image-container">
                  <Form.Item name="imageUrl">
                    <ImageCropper
                      minHeight={764}
                      minWidth={436}
                      maxHeight={764}
                      maxWidth={436}
                      aspect={0.57}
                    />
                  </Form.Item>
                </div>

                <UploadArea>
                  <UploadTitle>Course image (436*764px size minimum)</UploadTitle>
                </UploadArea>
              </UploadWrapper>
            </Col>
          </Row>

          <HeaderContainer>
            <Header3>E-Mail confirmations</Header3>
          </HeaderContainer>

          <Form.Item>
            <Checkbox defaultChecked>Check to receive a email confirmation for booked tee times</Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox>Check to receive a email confirmation for booked TRADE tee times</Checkbox>
          </Form.Item>

          <HeaderContainer>
            <Header3>Cart options</Header3>
          </HeaderContainer>

          <Form.Item>
            <Checkbox defaultChecked>Cart Fees Included with Round</Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox>Cart Fees Included with Trade Round</Checkbox>
          </Form.Item>

          <StyledHeaderContainer>
            <Header3>Round prices to .99</Header3>
            <ToggleWrapper>
              <Form.Item valuePropName="checked" name="roundPrices">
                <Switch />
              </Form.Item>
            </ToggleWrapper>
          </StyledHeaderContainer>

          <StyledHeaderContainer>
            <Header3>Best price indicator</Header3>
            <ToggleWrapper>
              <Form.Item valuePropName="checked" name="bestPriceActive">
                <Switch />
              </Form.Item>
            </ToggleWrapper>
          </StyledHeaderContainer>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="lastRoundDiscount"
                label="Amount of discount for last place at tee time"
              >
                <NumberInput placeholder="Enter discount amount" min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="lastRoundDiscountType"
                label="Discount type"
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
            </Col>
          </Row>

          <StyledHeaderContainer>
            <Header3>Public information</Header3>
            <ToggleWrapper>
              <Form.Item valuePropName="checked" name="isPublicInfoEnabled">
                <Switch />
              </Form.Item>
            </ToggleWrapper>
          </StyledHeaderContainer>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="publicInfo">
                <ReactQuill theme="snow" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default SettingsTab;
