import React, { useCallback, useState } from 'react';
import moment from 'moment';
import Tabs from 'antd/es/tabs';
import Form from 'antd/es/form';
import Space from 'antd/es/space';
import { useForm } from 'antd/es/form/Form';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import { useMutation, useQuery } from 'react-query';

import { getColumnsWidth } from 'utils/table';
import { tradeRoundsColumns } from './columns';
import { WeatherCalendar } from './weather-calendar';
import { PrimaryButton } from 'components/layout/button';
import { renderColumns } from 'components/table/columns';
import { PageLayout } from 'components/layout/page-layout';
import { getConfirmAction } from 'components/modal/confirm';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { queryOptions } from 'modules/api-requests/constants';
import { StyledTable, Wrapper, ButtonsContainer } from './elements';
import { ServerDateFormat, ServerTimeFormat, TimeFormat } from 'utils/date';
import { Settings, CrossedEye, CircleCross, Vector2 } from 'components/icons';
import { getTradeRoundExceptionsRequest, updateTradeRoundExceptionsRequest } from 'modules/api-requests/trade-rounds';

import type { Key } from 'react';
import type { Moment } from 'moment';
import type { RowSelectionType, TableRowSelection } from 'antd/es/table/interface';

import type {
  ITradeRoundExceptionTimeSlot,
  ITradeRoundsExceptionChange,
} from 'modules/api-requests/trade-rounds/types';

const { TabPane } = Tabs;

const scroll = {
  scrollToFirstRowOnChange: false,
  x: tradeRoundsColumns.reduce(getColumnsWidth, 0),
};

export const TradeManagerPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [changedKeys, setChangedKeys] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<Moment | null | undefined>(moment(new Date()));
  const [form] = useForm();

  const onTradeSettingsClick = useCallback(() => {
    dispatch(push(PathCreator[RoutePaths.TRADE_MANAGER_SETTINGS].getUrl()));
  }, [dispatch]);

  const { data: tradeRoundsList, isFetching } = useQuery({
    queryKey: ['getTradeRoundExceptions', currentCourseId, currentDay],
    queryFn: () => {
      return currentDay
        ? getTradeRoundExceptionsRequest(currentCourseId, currentDay?.format(ServerDateFormat))
        : Promise.reject('No current day was chosen');
    },
    enabled: Boolean(currentCourseId) && Boolean(currentDay),
    onError: (error: string) => notification.error({ message: error }),
    onSuccess: items => {
      items.forEach((value, index) => {
        form.setFields([{ name: ['items', index], value }]);
      });

      setSelectedKeys([]);
      setChangedKeys([]);
    },
    ...queryOptions,
  });

  const { mutate: updateTradeRoundExceptions, isLoading } = useMutation({
    mutationKey: ['updateTradeRoundExceptions', currentCourseId],
    mutationFn: (data: ITradeRoundsExceptionChange[]) => {
      return currentDay
        ? updateTradeRoundExceptionsRequest(currentCourseId, data)
        : Promise.reject('No current day was chosen');
    },
    onError: (error: string) => notification.error({ message: error }),
    onSuccess: () => {
      setChangedKeys([]);
      notification.success({ message: 'All changes have been saved!' });
    },
  });

  const onWeatherCalendarChange = useCallback((value: string) => {
    if (changedKeys.length > 0) {
      getConfirmAction({
        title: 'Unsaved data will be lost. Change day?',
        action: () => setCurrentDay(moment(value)),
        okText: 'Confirm',
        cancelText: 'Cancel',
        width: 430,
      });
    } else {
      setCurrentDay(moment(value));
    }
  }, [changedKeys]);

  const onSaveChanges = (values: { items: ITradeRoundExceptionTimeSlot[] }) => {
    if (currentDay && tradeRoundsList?.length) {
      updateTradeRoundExceptions(values.items
        .filter((item, index) => changedKeys.includes(index))
        .map(item => ({
          ...item,
          startTime: moment(item.startTime, TimeFormat).format(ServerTimeFormat),
          endTime: moment(item.endTime, TimeFormat).format(ServerTimeFormat),
          courseId: currentCourseId,
          date: currentDay.format(ServerDateFormat),
        })));
    }
  };

  const onFormChangeValues = (value: { items: Record<number, ITradeRoundExceptionTimeSlot> }) => {
    const changedKey = Object.keys(value?.items ?? {});
    setChangedKeys(keys => [...keys, ...changedKey.map(item => Number(item))]);
  };

  const getRowClassName = (value: unknown, index: number) => {
    return changedKeys.includes(index) ? 'draft' : '';
  };

  const rowSelection: TableRowSelection<unknown> = {
    type: 'checkbox' as RowSelectionType,
    onChange: (selectedKeys: Key[]) => {
      setSelectedKeys(selectedKeys);
    },
    selectedRowKeys: selectedKeys,
  };

  const formTimeSlots = ((form.getFieldValue('items') || []) as ITradeRoundExceptionTimeSlot[]);
  const tradeSlotsFlag = Boolean(formTimeSlots.filter(item => selectedKeys.includes(item.id))?.find(item => item.trade));

  const tradeButtonText = tradeSlotsFlag
    ? 'Mark not to trade'
    : 'Mark to trade';

  const onMarkTradeClick = () => {
    selectedKeys.forEach(key => {
      const foundIndex = formTimeSlots.findIndex((value) => value.id === key);
      form.setFields([{
        name: ['items', foundIndex, 'trade'],
        value: !tradeSlotsFlag,
      }]);

      if (formTimeSlots[foundIndex]?.trade !== !tradeSlotsFlag) {
        setChangedKeys(keys => [...keys, foundIndex]);
      }
    });

    setSelectedKeys([]);
  };

  return (
    <PageLayout title="Trade manager" fullHeight actions={(
      <PrimaryButton icon={<Settings width={16} height={16} />} onClick={onTradeSettingsClick}>
        Trade settings
      </PrimaryButton>
    )}>
      <Wrapper>
        <Tabs defaultActiveKey="1" size="large" tabBarExtraContent={
          <ButtonsContainer>
            <Space size={12} wrap>
              <PrimaryButton
                size="small"
                onClick={onMarkTradeClick}
                disabled={selectedKeys.length <= 0}
                icon={tradeSlotsFlag ? <CircleCross /> : <Vector2 />}
              >
                {tradeButtonText}
              </PrimaryButton>

              <PrimaryButton size="small" icon={<CrossedEye />} disabled>
                Turn off display
              </PrimaryButton>

              <PrimaryButton size="small" onClick={form.submit} disabled={changedKeys.length <= 0} loading={isLoading}>
                Save changes
              </PrimaryButton>
            </Space>
          </ButtonsContainer>
        }>
          <TabPane tab="Trade rounds manager" key="1">
            <WeatherCalendar value={currentDay} onChange={onWeatherCalendarChange} />

            <Form form={form} onValuesChange={onFormChangeValues} onFinish={onSaveChanges}>
              <StyledTable
                sticky
                rowKey="id"
                scroll={scroll}
                pagination={false}
                tableLayout="fixed"
                loading={isFetching}
                dataSource={tradeRoundsList}
                rowSelection={rowSelection}
                rowClassName={getRowClassName}
              >
                {renderColumns(tradeRoundsColumns)}
              </StyledTable>
            </Form>
          </TabPane>
        </Tabs>
      </Wrapper>
    </PageLayout>
  );
};

export default TradeManagerPage;
