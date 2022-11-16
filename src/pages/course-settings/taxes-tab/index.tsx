import React, { useEffect, useMemo, useState } from 'react';
import get from 'lodash/get';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Table from 'antd/es/table';
import Input from 'antd/es/input';
import Radio from 'antd/es/radio';
import isEmpty from 'lodash/isEmpty';
import Divider from 'antd/es/divider';
import Checkbox from 'antd/es/checkbox';
import Text from 'antd/es/typography/Text';
import { useForm } from 'antd/es/form/Form';
import notification from 'antd/es/notification';
import { useMutation, useQueryClient } from 'react-query';

import { useAppSelector } from 'utils/hooks';
import { getColumnsWidth } from 'utils/table';
import { RenderEditableTitle } from './render';
import { FormText } from 'components/form/form-text';
import { NumberInput } from 'components/number-input';
import { renderColumns } from 'components/table/columns';
import { defaultTaxesList, defaultFeeList } from './constants';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { prepareCourseForUpdate } from 'models/courses/constants';
import { DividerContainer, FeesTable, StyledTable } from './elements';
import { InputNumberFormatter, InputNumberParser } from 'utils/numbers';
import { updateCourseSettingsRequest } from 'modules/api-requests/courses';
import { getCurrentCourseId, getProfileCourse } from 'models/profile/selectors';
import { useGetFeesQuery, useGetTaxesQuery, useSaveFeesMutation, useSaveTaxesMutation } from 'models/taxes';

import type { RadioChangeEvent } from 'antd/es';
import type { ColumnProps } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form/Form';
import type { FieldData } from 'rc-field-form/lib/interface';
import type { ICourse } from 'modules/api-requests/courses/types';
import type { IFee, ITax } from 'modules/api-requests/taxes/types';

interface IFeeFormRecord extends Omit<IFee, 'taxes'> {
  feeName: string;
  taxes: Record<string, boolean>;
}

interface ITaxesForm {
  taxes: ITax[];
  fees: IFeeFormRecord[];
}

interface ITaxesTab {
  setFormState: (form: FormInstance) => void;
  loadingCallback: (flag: boolean) => void;
}

const amountTypeOptions = [
    {
      label: 'Dollars',
      value: 'Dollar',
    },
    {
      label: 'Percent',
      value: 'Percent',
    },
  ]
;

export const TaxesTab = ({ setFormState, loadingCallback }: ITaxesTab): React.ReactElement => {
  const [form] = useForm();
  const queryClient = useQueryClient();
  const [saveFees] = useSaveFeesMutation();
  const [saveTaxes] = useSaveTaxesMutation();
  const currentCourse = useAppSelector(getProfileCourse);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const { data: feesData, isLoading: isFeesLoading } = useGetFeesQuery(currentCourseId);
  const { data: taxesData, isLoading: isTaxesLoading } = useGetTaxesQuery(currentCourseId);
  const [amountFeeModes, setAmountFeeModes] = useState<Record<string, string>>();
  const [apiCartFee, setApiCartFee] = useState<number | string | undefined>();

  const courseTaxes: ITax[] = useMemo(() =>
      isEmpty(taxesData)
        ? defaultTaxesList
        : taxesData as ITax[],
    [taxesData],
  );

  const { mutate: updateCourse } = useMutation({
    mutationKey: ['updateCourse'],
    mutationFn: (data: ICourse) => currentCourseId
      ? updateCourseSettingsRequest(currentCourseId, data)
      : Promise.reject(),
    onSuccess: () => {
      queryClient.invalidateQueries(['getCourses']);
    },
  });

  const courseTaxesColumns: ColumnProps<unknown>[] = useMemo(() => {
    return courseTaxes.map((tax, index) => {
      const isFieldOptional = tax.editable;

      return {
        title:
          <>
            <Form.Item name={['taxes', index, 'id']} noStyle>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item name={['taxes', index, 'name']} noStyle shouldUpdate>
              {isFieldOptional
                ? <RenderEditableTitle modalTitle="Rename tax" flexAlign="center" />
                : <FormText />}
            </Form.Item>
          </>,
        key: index,
        dataIndex: tax.name,
        width: 150,
        align: 'center',
        render: (): React.ReactElement => (
          <Form.Item
            shouldUpdate
            name={['taxes', index, 'amount']}
            rules={isFieldOptional ? [] : [{ required: true, message: 'Field is required' }]}
          >
            <NumberInput placeholder="Percent" min={0} precision={3} />
          </Form.Item>
        ),
      };
    });
  }, [courseTaxes]);

  const courseTaxesDataSource = useMemo(() => [
    courseTaxes.reduce((prevValue, currentValue) => ({
      ...prevValue,
      [currentValue.name]: currentValue.amount,
    }), { id: 'taxes' })], [courseTaxes]);

  const courseFees: IFee[] = useMemo(() => isEmpty(feesData) ? defaultFeeList : feesData as IFee[], [feesData]);

  useEffect(() => {
    courseFees.forEach((_fee, _feeIndex) => {
      courseTaxes.forEach((_tax, _taxIndex) => {
        const isDisabled = form.getFieldValue(['fees', _feeIndex, 'amountType']) === 'Percent';
        const isChecked = form.getFieldValue(['fees', _feeIndex, 'taxes', _tax.id]);

        if (isChecked && isDisabled) {
          form.setFields([{
            name: ['fees', _feeIndex, 'taxes', _tax.id],
            value: false,
          }]);
        }
      });
    });
  }, [courseTaxes, form, amountFeeModes, courseFees]);

  const courseFeesColumns: ColumnProps<any>[] = useMemo(() => {
    const feesColumns: ColumnProps<IFee>[] = [
      {
        title: 'Type',
        key: 'feeName',
        dataIndex: 'feeName',
        width: 150,
        render: (value = '', row, index): React.ReactElement => {
          return <>
            <Form.Item name={['fees', index, 'id']} noStyle>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item name={['fees', index, 'feeName']} noStyle>
              {row.editable
                ? <RenderEditableTitle modalTitle="Rename fee" />
                : <FormText />}
            </Form.Item>
          </>;
        },
      },
      {
        title: 'Amount',
        key: 'amount',
        dataIndex: 'amount',
        width: 150,
        render: (value, row, index): React.ReactElement => {
          const isFeeOptional = String(get(row, 'name')).toLowerCase().indexOf('optional') >= 0;

          if (row.name === 'Green Fee') {
            return <></>;
          }

          return (
            <Form.Item
              noStyle
              dependencies={[['fees', index, 'amountType']]}
            >
              {({ getFieldValue }) => {
                const amountType = getFieldValue(['fees', index, 'amountType']);
                const placeholder = amountType === 'Dollar' ? 'Dollars' : 'Percents';
                const inputSign = amountType === 'Dollar' ? '$' : '%';

                return <Form.Item
                  name={['fees', index, 'amount']}
                  rules={isFeeOptional ? [] : [{ required: true, message: 'Field is required' }]}
                >
                  <NumberInput
                    min={0}
                    placeholder={placeholder}
                    parser={InputNumberParser(inputSign)}
                    formatter={InputNumberFormatter(inputSign)}
                  />
                </Form.Item>;
              }}
            </Form.Item>
          );
        },
      },
    ];

    const feesColumnsWithTax: ColumnProps<unknown>[] = courseTaxes.map((tax, index) => ({
      title: (
        <Form.Item name={['taxes', index, 'name']} noStyle shouldUpdate>
          <FormText />
        </Form.Item>
      ),
      key: index,
      dataIndex: tax.name,
      width: 100,
      align: 'center',
      render: (value, row, index): React.ReactElement => (
        <Form.Item
          noStyle
          dependencies={[['fees', index, 'amountType']]}
        >
          {({ getFieldValue }) => {
            const isDisabled = getFieldValue(['fees', index, 'amountType']) === 'Percent';

            return (
              <Form.Item
                noStyle
                shouldUpdate
                valuePropName="checked"
                name={['fees', index, 'taxes', tax.id]}
              >
                <Checkbox disabled={isDisabled} />
              </Form.Item>
            );
          }}

        </Form.Item>
      ),
    }));

    const discountTypeColumn: ColumnProps<IFee> = {
      title: 'Type',
      key: 'amountType',
      align: 'center',
      dataIndex: 'amountType',
      render: (value, row, index): React.ReactElement => {
        const onChange = (index: number) => (e: RadioChangeEvent) => {
          setAmountFeeModes(prev => ({
            ...prev,
            [index]: e.target.value,
          }));
        };

        return (
          <Form.Item
            name={['fees', index, 'amountType']}
          >
            <Radio.Group
              onChange={onChange(index)}
              disabled={!Boolean(row.editable)}
              optionType="button"
              buttonStyle="solid"
              options={amountTypeOptions}
            />
          </Form.Item>
        );
      },
    };

    return [...feesColumns, ...feesColumnsWithTax, discountTypeColumn];
  }, [courseTaxes]);

  const courseFeesDataSource = useMemo(() => {
    return courseFees.map(fee => ({
      ...fee,
      id: fee.id,
      feeName: fee.name,
      amount: fee.amount,
      amountType: fee.amountType,
    }));
  }, [courseFees]);

  useEffect(() => {
    form.setFields(dataToFormValues({
      taxes: courseTaxes,
    }));
  }, [courseTaxes, form]);

  useEffect(() => {
    if (courseTaxes?.length) {
      const fields: FieldData[] = [];

      courseFees.forEach((fee, index) => {
        fields.push(...[
          { name: ['fees', index, 'id'], value: fee.id },
          { name: ['fees', index, 'amount'], value: fee.amount },
          { name: ['fees', index, 'feeName'], value: fee.name },
          { name: ['fees', index, 'amountType'], value: fee.amountType },
          ...courseTaxes.map(tax => ({
            name: ['fees', index, 'taxes', tax.id],
            value: fee.taxes.map(tax => tax.id).includes(tax.id),
          })),
        ]);
      });

      form.setFields(fields);
    }
  }, [courseFees, courseTaxes, form, feesData]);

  useEffect(() => {
    setFormState(form);
  }, [form, setFormState]);

  useEffect(() => {
    setApiCartFee(currentCourse?.subtractFromPrice);
  }, [currentCourse?.subtractFromPrice]);

  const onFormFinish = ({ taxes, fees }: ITaxesForm) => {
    loadingCallback(true);

    Promise.all([
        saveTaxes({
          courseId: currentCourseId,
          data: taxes,
        })
          .unwrap()
          .then(() => {
            notification.success({ message: 'Taxes saved successfully' });
          })
          .catch(() => {
            notification.error({ message: 'Save taxes error! Try to save later.' });
          }),
        saveFees({
          courseId: currentCourseId,
          data: fees.map(formFee => {
            const normalizedTaxes: Array<{ id: string }> = [];
            for (const [taxId, taxChecked] of Object.entries(formFee.taxes)) {
              if (taxChecked) {
                normalizedTaxes.push({ id: taxId });
              }
            }

            return {
              ...formFee,
              name: formFee.feeName,
              taxes: normalizedTaxes,
            } as IFee;
          }),
        })
          .unwrap()
          .then(() => {
            notification.success({ message: 'Fees saved successfully' });
          })
          .catch(() => {
            notification.error({ message: 'Save fees error! Try to save later.' });
          }),
          updateCourse(prepareCourseForUpdate({ ...currentCourse, subtractFromPrice: apiCartFee as number } as ICourse)),
      ])
      .finally(() => {
        loadingCallback(false);
      });
  };

  const feesScroll = useMemo(() => ({
    scrollToFirstRowOnChange: false,
    x: courseFeesColumns.reduce(getColumnsWidth, 0),
  }), [courseFeesColumns]);

  return (
    <Form
      form={form}
      name="taxes"
      onFinish={onFormFinish}
    >
      <Row>
        <Col flex="930px">
          <DividerContainer>
            <Divider orientation="left">Taxes amount</Divider>
          </DividerContainer>

          <StyledTable
            sticky
            rowKey="id"
            tableLayout="fixed"
            loading={isTaxesLoading}
            dataSource={courseTaxesDataSource}
            pagination={false}
          >
            {renderColumns(courseTaxesColumns)}
          </StyledTable>

          <DividerContainer>
            <Divider orientation="left">Course fees</Divider>
          </DividerContainer>

          <FeesTable
            sticky
            rowKey="id"
            tableLayout="fixed"
            pagination={false}
            scroll={feesScroll}
            loading={isFeesLoading}
            dataSource={courseFeesDataSource}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text>API Cart Fee:</Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <NumberInput
                    min={0}
                    precision={2}
                    placeholder="$ 0.00"
                    value={apiCartFee}
                    onChange={setApiCartFee}
                    parser={InputNumberParser('$')}
                    formatter={InputNumberFormatter('$')}
                  />
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          >
            {renderColumns(courseFeesColumns)}
          </FeesTable>
        </Col>
      </Row>
    </Form>
  );
};

export default TaxesTab;
