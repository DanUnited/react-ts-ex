import React, { Key, useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import isNil from 'lodash/isNil';
import Empty from 'antd/es/empty';
import { useForm } from 'antd/es/form/Form';
import notification from 'antd/es/notification';
import ConfigProvider from 'antd/es/config-provider';
import { useMutation, useQueryClient } from 'react-query';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { useAppSelector } from 'utils/hooks';
import { WideTable } from 'components/table';
import { getTeeTimeColumns } from './columns';
import { getColumnsWidth } from 'utils/table';
import { Header4 } from 'components/layout/headers';
import { CircleCross, Vector2 } from 'components/icons';
import { PrimaryButton } from 'components/layout/button';
import { DateSelector } from 'components/dateSelector';
import { DateFormat, ServerDateFormat } from 'utils/date';
import { PageLayout } from 'components/layout/page-layout';
import { getCurrentCourseId } from 'models/profile/selectors';
import { useRateList } from 'modules/api-requests/rates/queries';
import { MassUpdateEnum, MassUpdateModal } from './mass-update-modal';
import { updateTeeTimesRequest } from 'modules/api-requests/tee-time';
import { useTeeTimeList } from 'modules/api-requests/tee-time/queries';
import { ActionButtonRow, FiltersContainer, StyledAnchor } from './elements';

import type { Moment } from 'moment/moment';
import type { TableSticky } from 'rc-table/lib/interface';
import type { RowSelectionType, TableRowSelection } from 'antd/es/table/interface';
import type { ITableTeeTime, ITeeTime, IUpdateTeeTime } from 'modules/api-requests/tee-time/types';

const renderEmpty = () => <Empty description="No tee time" />;

export const TeeTimeManager = () => {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [isChangedKeys, setIsChangedKeys] = useState(false);
  const [showMassUpdate, setShowMassUpdate] = useState(false);
  const [currentDay, setCurrentDate] = useState<Moment | null | undefined>(moment(new Date()));
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const currentDate = moment(currentDay).format(ServerDateFormat);
  const queryClient = useQueryClient();
  const breakpoints = useBreakpoint();
  const [form] = useForm();

  const { data: teeTimes, isFetching: isFetchingTeeTimes } = useTeeTimeList(currentDate, currentCourseId, {
    onSuccess: data => {
      data.forEach((value, index) => {
        form.setFields([{ name: ['items', index], value }]);
      });

      setSelectedKeys([]);
      resetChangedKeys();
    },
  });

  const resetChangedKeys = useCallback(() => {
    setIsChangedKeys(false);
    form.setFields((teeTimes || []).map((_item, _index) => ({
      name: ['items', _index, 'draft'],
      value: false,
    })));
  }, [teeTimes, form]);

  const { data: ratesList, isFetching: ratesLoading } = useRateList(currentCourseId);

  const { mutate: saveTeeTimes, isLoading: isSavingTeeTimes } = useMutation({
    mutationKey: ['updateTeeTimes', currentCourseId],
    mutationFn: (requestData: IUpdateTeeTime[]) => updateTeeTimesRequest(currentCourseId, requestData),
    onError: (error: string) => notification.error({ message: error }),
    onSuccess: () => {
      resetChangedKeys();
      notification.success({ message: 'All changes have been saved!' });
      queryClient.invalidateQueries(['getTeeTimes', currentCourseId, currentDay]);
    },
  });

  const teeTimeColumns = useMemo(() => {
    return getTeeTimeColumns(ratesList);
  }, [ratesList]);

  const scroll = useMemo(() => ({
    scrollToFirstRowOnChange: false,
    x: teeTimeColumns.reduce(getColumnsWidth, 0),
  }), [teeTimeColumns]);

  const onDataPickerChange = (value: string | Moment | null) => {
    setCurrentDate(value ? moment(value) : undefined);
  };

  const rowSelection: TableRowSelection<unknown> = useMemo(() => {
    return {
      type: 'checkbox' as RowSelectionType,
      onChange: (selectedKeys: Key[]) => {
        setSelectedKeys(selectedKeys);
      },
      selectedRowKeys: selectedKeys,
    };
  }, [selectedKeys]);

  const selectedTeeTimes = useMemo(() => teeTimes?.filter(item => selectedKeys.includes(item.id)), [selectedKeys, teeTimes]);

  const onVisibleChange = (updatedVisible: boolean) => setShowMassUpdate(updatedVisible);

  const onMassUpdateClick = () => setShowMassUpdate(true);

  const onFormChangeValues = (value: { items: Record<number, ITeeTime> }) => {
    const changedKey = Object.keys(value?.items ?? {});

    setIsChangedKeys(true);

    form.setFields([{
      name: ['items', +changedKey[0], 'draft'],
      value: true,
    }]);
  };

  const onSaveChanges = (values: { items: ITableTeeTime[] }) => {
    const changedTimeSlots: IUpdateTeeTime[] = values.items
      .filter((item) => !!item.draft)
      .map(item => {
        const originalTeeTime = (teeTimes as ITableTeeTime[]).find(teeTime => teeTime.id === item.id);
        let itemForUpdate: IUpdateTeeTime;

        if (originalTeeTime) {
          const copyTeeTime = item;

          for (const [, rateValue] of Object.entries(item.rates)) {
            if (rateValue.id &&
              ((rateValue.price === rateValue.basePrice) ||
                (originalTeeTime?.rates?.[rateValue.id]?.basePrice === rateValue.price) ||
                (rateValue.price === null))) {
              copyTeeTime.rates[rateValue.id].price = undefined;
            }
          }

          itemForUpdate = {
            ...copyTeeTime,
            yieldActive: copyTeeTime.individual?.yieldActive,
            displayed: copyTeeTime.individual?.displayed,
            ratePrices: Object.values(copyTeeTime.rates)
              .filter(rate => rate.price !== undefined)
              .map(rate => ({ price: rate.price, rateId: rate.id })),
          };

          return itemForUpdate;
        }

        itemForUpdate = {
          ...item,
          yieldActive: item.individual?.yieldActive,
          displayed: item.individual?.displayed,
          ratePrices: Object.values(item.rates)
            .filter(rate => rate.price !== undefined)
            .map(rate => ({ price: rate.price, rateId: rate.id })),
        };

        return itemForUpdate;
      });

    if (currentDay) {
      saveTeeTimes(changedTimeSlots);
    }
  };

  const getRowClassName = useCallback((value: unknown, index: number) => {
    return form.getFieldValue(['items', index, 'draft']) ? 'draft' : '';
  }, [form]);

  const formTimeSlots = (form.getFieldValue(['items']) || []) as ITableTeeTime[];
  const yieldSlotsFlag = Boolean(formTimeSlots.filter(item => selectedKeys.includes(item.id))?.find(item => item.individual?.yieldActive));
  const displaySlotsFlag = Boolean(formTimeSlots.filter(item => selectedKeys.includes(item.id))?.find(item => item.individual?.displayed));

  const getSwitchClick = useCallback((fieldName: string, prevFlag: boolean) => () => {
    const timeSlots = (form.getFieldValue(['items']) || []) as ITableTeeTime[];

    selectedKeys.forEach(key => {
      const foundIndex = timeSlots.findIndex((value) => value.id === key);

      form.setFields([{
        name: ['items', foundIndex, 'individual', fieldName],
        value: !prevFlag,
      }]);

      if (timeSlots[foundIndex]?.[fieldName as keyof ITeeTime] !== !prevFlag) {
        setIsChangedKeys(true);
        form.setFields([{
          name: ['items', foundIndex, 'draft'],
          value: true,
        }]);
      }
    });

    setSelectedKeys([]);
  }, [selectedKeys, form]);

  const handleMassUpdate = useCallback(() => {
    const values = form.getFieldValue('massUpdate');
    const timeSlots = (form.getFieldValue(['items']) || []) as ITableTeeTime[];
    const returnPrice = (price: number) => price > 0 ? price : 0;

    for (const [rateId, _massUpdateValues] of Object.entries(values || {})) {
      const { value, mode } = _massUpdateValues as { value?: number; mode: MassUpdateEnum };

      if (value) {
        selectedKeys.forEach(key => {
          const rateIndex = String(rateId);
          const foundIndex = timeSlots.findIndex((value) => value.id === key);
          const prevPrice = timeSlots[foundIndex].rates[rateIndex].price;

          if (!isNil(prevPrice)) {
            form.setFields([{
              name: ['items', foundIndex, 'rates', rateIndex, 'price'],
              value: mode === MassUpdateEnum.SetPrice
                ? returnPrice(value)
                : mode === MassUpdateEnum.Increase
                  ? returnPrice(prevPrice + value)
                  : returnPrice(prevPrice - value),
            }]);
          }

          form.setFields([
            {
              name: ['massUpdate', rateIndex, 'value'],
              value: undefined,
            }, {
              name: ['massUpdate', rateIndex, 'mode'],
              value: MassUpdateEnum.SetPrice,
            },
          ]);

          setIsChangedKeys(true);
          form.setFields([{
            name: ['items', foundIndex, 'draft'],
            value: true,
          }]);
        });
      }
    }

    setSelectedKeys([]);
  }, [form, selectedKeys]);

  const handleCancelMassUpdate = useCallback(() => {
    const values = form.getFieldValue('massUpdate');
    for (const [rateName] of Object.entries(values || {})) {
      form.setFields([
        {
          name: ['massUpdate', rateName, 'value'],
          value: undefined,
        },
        {
          name: ['massUpdate', rateName, 'mode'],
          value: MassUpdateEnum.SetPrice,
        },
      ]);
    }
  }, [form]);

  const disabledDate = useCallback((date: Moment) => {
    return date < moment().subtract(1, 'days').endOf('day');
  }, []);

  const sticky: TableSticky = useMemo(() => {
    return {
      offsetHeader: breakpoints.xxl ? 68 : 52,
    }
  }, [breakpoints]);

  return (
    <>
      <PageLayout title="Tee time manager" fullHeight>
        <Form
          preserve
          form={form}
          onValuesChange={onFormChangeValues}
          onFinish={onSaveChanges}
        >
          <StyledAnchor>
            <FiltersContainer>
              <div className="date-filter">
                <Header4>Display tee times for:</Header4>
                <DateSelector
                  size="large"
                  value={currentDay}
                  format={DateFormat}
                  disabledDate={disabledDate}
                  onChange={onDataPickerChange}
                />
              </div>
              <ActionButtonRow gutter={[16, 8]}>
                <Col>
                  <PrimaryButton
                    onClick={getSwitchClick('yieldActive', yieldSlotsFlag)}
                    icon={yieldSlotsFlag ? <CircleCross /> : <Vector2 />}
                    disabled={selectedKeys.length < 1}
                  >
                    Turn {yieldSlotsFlag ? 'off' : 'on'} yield
                  </PrimaryButton>
                </Col>
                <Col>
                  <PrimaryButton
                    icon={displaySlotsFlag ? <CircleCross /> : <Vector2 />}
                    onClick={getSwitchClick('displayed', displaySlotsFlag)}
                    disabled={selectedKeys.length < 1}
                  >
                    Turn {displaySlotsFlag ? 'off' : 'on'} display
                  </PrimaryButton>
                </Col>

                <Col>
                  <PrimaryButton disabled={selectedKeys.length < 1} onClick={onMassUpdateClick}>
                    Mass update
                  </PrimaryButton>
                </Col>

                <Col>
                  <PrimaryButton
                    onClick={() => form.submit()}
                    loading={isSavingTeeTimes}
                    disabled={!isChangedKeys}
                  >
                    Save
                  </PrimaryButton>
                </Col>
              </ActionButtonRow>
            </FiltersContainer>
          </StyledAnchor>

          <MassUpdateModal
            form={form}
            teeTimes={selectedTeeTimes}
            visible={showMassUpdate}
            onVisibleChange={onVisibleChange}
            rateList={ratesList}
            onOk={handleMassUpdate}
            onCancel={handleCancelMassUpdate}
          />

          <div>
            <ConfigProvider renderEmpty={renderEmpty}>
              <WideTable
                rowKey="id"
                sticky={sticky}
                dataSource={teeTimes}
                pagination={false}
                rowSelection={rowSelection}
                tableLayout="fixed"
                columns={teeTimeColumns}
                rowClassName={getRowClassName}
                loading={isFetchingTeeTimes || ratesLoading}
                scroll={teeTimes?.length ? scroll : { x: 'max-content' }}
              />
            </ConfigProvider>
          </div>
        </Form>
      </PageLayout>
    </>
  );
};

export default TeeTimeManager;
