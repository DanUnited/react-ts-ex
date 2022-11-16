import React, { useCallback, useEffect, useMemo } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import omit from 'lodash/omit';
import Form from 'antd/es/form';
import Table from 'antd/es/table';
import Input from 'antd/es/input';
import { useMutation } from 'react-query';
import Column from 'antd/es/table/Column';
import { useForm } from 'antd/es/form/Form';
import notification from 'antd/es/notification';

import { DescriptionCol } from './elements';
import { DaysValidator } from './validators';
import { yieldsActions } from 'models/yields';
import { PrimaryButton } from 'components/layout/button';
import { getFilters } from 'models/table-meta/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { YieldManagerFilters } from './yield-manager-filters';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { TableInputNumber } from 'components/table/table-input-number';
import { ControlsContainer } from 'components/layout/controls-container';
import { DEFAULT_OVERRIDE_DAYS } from 'modules/api-requests/rates/constants';
import { yieldDateSelector, yieldsLoadingSelector } from 'models/yields/selectors';
import { saveYieldsRequest, updateYieldsRequest } from 'modules/api-requests/yields';
import { defaultDaysOut, defaultDaysOutYield, defaultWeekDaysYield } from 'modules/api-requests/yields/constants';

import type { IYield, IYieldsFilters, IWeekDay, IDayOut } from 'modules/api-requests/yields/types';

interface IWeekDayTable extends IWeekDay {
  columnKey?: number | null;
}

interface IDayOutTable extends IDayOut {
  columnKey?: number | null;
}

const scroll = { x: 600 };

export const YieldManagerTab = () => {
  const dispatch = useAppDispatch();
  const currentYieldData = useAppSelector(yieldDateSelector);
  const isLoading = useAppSelector(yieldsLoadingSelector);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const getFiltersSelector = useAppSelector(getFilters);

  const filters = useMemo(
    () => getFiltersSelector<IYieldsFilters>((PathCreator[RoutePaths.PRESETS_MANAGER_YIELD].path)),
    [getFiltersSelector],
  );

  const [form] = useForm();

  const yieldWeekDaysData = useMemo(
    () => filters.timePeriod
      ? defaultWeekDaysYield.map((weekDay, index) => {
        const yields = currentYieldData.weekDays[index] || weekDay;

        return { ...yields, columnKey: index };
      })
      : [],
    [currentYieldData, filters],
  );

  const yieldDaysOutData = useMemo(
    () => filters.timePeriod
      ? defaultDaysOutYield.map((daysOut, index) => {
        const yields = currentYieldData.daysOut[index] || daysOut;

        return { ...yields, columnKey: index };
      })
      : [],
    [currentYieldData, filters],
  );

  useEffect(() => {
    form.setFields(dataToFormValues({
      weekDays: yieldWeekDaysData,
      daysOut: yieldDaysOutData,
    }));
  }, [yieldWeekDaysData, yieldDaysOutData, form]);

  const onYieldsValuesChange = useCallback((_, allValues: { weekDays?: IWeekDayTable[], daysOut?: IDayOutTable[] }) => {
    type YieldItemMapper = <T extends IWeekDayTable | IDayOutTable>(item: T) => Omit<T, 'columnKey'>;

    const yieldItemMapper: YieldItemMapper = (item) => {
      delete item['columnKey'];
      return item;
    };

    if (allValues.weekDays) {
      const filteredYield = allValues.weekDays.map(yieldItemMapper);
      dispatch(yieldsActions.updateYieldValues({
        weekDays: filteredYield,
      }));
    }

    if (allValues.daysOut) {
      const filteredDaysOut = allValues.daysOut.map(yieldItemMapper);

      dispatch(yieldsActions.updateYieldValues({
        daysOut: filteredDaysOut,
      }));
    }
  }, [dispatch]);

  const { mutate: saveYields, isLoading: isSaving } = useMutation({
    mutationKey: ['saveYields', currentCourseId],
    mutationFn: (data: IYield) => saveYieldsRequest(currentCourseId, data),
    onSuccess: () => {
      notification.success({ message: 'Utilization values saved successfully!' });
    },
  });

  const { mutate: updateYields, isLoading: isUpdating } = useMutation({
    mutationKey: ['updateYields', currentCourseId, currentYieldData.id],
    mutationFn: (data: IYield) => {
      return currentYieldData.id
        ? updateYieldsRequest(currentCourseId, currentYieldData.id, data)
        : Promise.reject();
    },
    onSuccess: () => {
      notification.success({ message: 'Utilization values saved successfully!' });
    },
  });

  const onFormFinish = useCallback(() => {
    if (currentYieldData.id) {
      updateYields(currentYieldData);
    } else {
      saveYields(currentYieldData);
    }
  }, [currentYieldData, saveYields, updateYields]);

  const forceUpdateUtilizationFields = (path: Array<string | number>) => (value: string | number) => {
    dispatch(yieldsActions.setPathValues({ path: ['data', 'weekDays', ...path], value }));
    dispatch(yieldsActions.setPathValues({ path: ['data', 'daysOut', ...path], value }));
  };

  return (
    <Form
      form={form}
      onFinish={onFormFinish}
      onValuesChange={onYieldsValuesChange}
    >
      <ControlsContainer>
        <YieldManagerFilters form={form} />
      </ControlsContainer>

      <Row wrap={true} gutter={[24, 24]}>
        <Col flex={1}>
          <Table
            rowKey="columnKey"
            tableLayout="fixed"
            scroll={scroll}
            pagination={false}
            loading={isLoading}
            dataSource={yieldWeekDaysData}
          >
            <Table.Column
              title="Utilization %"
              dataIndex="utilization"
              align="center"
              width={180}
              render={(_val, _row, index) => {
                return (
                  <Row gutter={[8, 8]} justify="center">
                    <Col span={10}>
                      <Form.Item name={['weekDays', index, 'from']} shouldUpdate>
                        <TableInputNumber
                          min={0}
                          size="large"
                          max={100}
                          onChange={forceUpdateUtilizationFields([index, 'from'])}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2} flex="40px">-</Col>
                    <Col span={10}>
                      <Form.Item name={['weekDays', index, 'to']} shouldUpdate>
                        <TableInputNumber
                          min={0}
                          size="large"
                          max={100}
                          onChange={forceUpdateUtilizationFields([index, 'to'])}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              }}
            />
            {Object.keys(omit(DEFAULT_OVERRIDE_DAYS, 'key'))
              .map(dayName => (
                <Column
                  title={dayName}
                  dataIndex={dayName}
                  key={dayName}
                  align="center"
                  width={110}
                  render={(_val, _row, index) => {
                    return (
                      <Form.Item
                        name={['weekDays', index, 'ratios', dayName]}
                        shouldUpdate
                      >
                        <TableInputNumber
                          min={0}
                          size="large"
                          placeholder="%"
                        />
                      </Form.Item>
                    );
                  }}
                />
              ))}
          </Table>
          <Form.Item
            name="weekDays"
            rules={[{ validator: DaysValidator }]}>
            <Input type="hidden" />
          </Form.Item>

          <Table
            rowKey="columnKey"
            tableLayout="fixed"
            scroll={scroll}
            pagination={false}
            loading={isLoading}
            dataSource={yieldDaysOutData}
          >
            <Table.Column
              title="Utilization %"
              dataIndex="utilization"
              align="center"
              width={180}
              render={(_val, _row, index) => (
                <Row gutter={[8, 8]} justify="center">
                  <Col span={10}>
                    <Form.Item name={['daysOut', index, 'from']} shouldUpdate>
                      <TableInputNumber
                        min={0}
                        size="large"
                        max={100}
                        onChange={forceUpdateUtilizationFields([index, 'from'])}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} flex="40px">-</Col>
                  <Col span={10}>
                    <Form.Item name={['daysOut', index, 'to']} shouldUpdate>
                      <TableInputNumber
                        min={0}
                        size="large"
                        max={100}
                        onChange={forceUpdateUtilizationFields([index, 'to'])}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}
            />
            {Object.keys(omit(defaultDaysOut, 'key'))
              .map(dayOut => (
                <Column
                  title={dayOut}
                  dataIndex={dayOut}
                  key={dayOut}
                  align="center"
                  width={110}
                  render={(_val, _row, index) => {
                    return (
                      <Form.Item
                        name={['daysOut', index, 'ratios', dayOut]}
                        shouldUpdate
                      >
                        <TableInputNumber
                          min={0}
                          size="large"
                          placeholder="%"
                        />
                      </Form.Item>
                    );
                  }}
                />
              ))}
          </Table>
          <Form.Item
            name="daysOut"
            rules={[{ validator: DaysValidator }]}>
            <Input type="hidden" />
          </Form.Item>
        </Col>

        <DescriptionCol>
          <ControlsContainer>
            Enter percentages to either increase or decrease the price of a round. All amounts are calculated based on
            the original rate.
            A value of 125% will increase the round price by 25%. A 75% value will decrease the round rate by 25%.
          </ControlsContainer>

          <ControlsContainer>
            * Utilization will be calculated based on the tee time spacing you have chosen in the course settings.
          </ControlsContainer>

          <div style={{ flex: 1 }} />

          <PrimaryButton htmlType="submit" className="w-100" loading={isSaving || isUpdating}>
            Save changes
          </PrimaryButton>
        </DescriptionCol>
      </Row>
    </Form>
  );
};

export default YieldManagerTab;
