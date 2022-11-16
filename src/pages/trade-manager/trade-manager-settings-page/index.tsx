import React, { useCallback, useState } from 'react';
import moment from 'moment';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import TimePicker from 'antd/es/time-picker';
import { push } from 'connected-react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Loading } from 'components/loading';
import notification from 'antd/es/notification';
import { Panel } from 'components/layout/panel';
import { Plate } from 'components/layout/plate';
import { TimeSlotForm } from './time-slot-form';
import { Plus } from 'components/icons/system/plus';
import { NumberInput } from 'components/number-input';
import { ServerTimeFormat, TimeFormat } from 'utils/date';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { getConfirmAction } from 'components/modal/confirm';
import { Calendar } from 'components/icons/system/calendar';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { queryOptions } from 'modules/api-requests/constants';
import { ArrowRight } from 'components/icons/system/arrow-right';
import { useRateList } from 'modules/api-requests/rates/queries';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { PrimaryButton, SecondaryButton } from 'components/layout/button';
import { getLimitValueValidator, tradeRoundValidatorRules } from './validators';
import { DeleteModalIcon, TradeSettingsContainer, TradeSettingsFormBody } from './element';
import { ActionsSpace, Button } from 'pages/pricing-management/rate-manager-tab/rate-creation-form/elements';

import {
  getTradeRoundRequest,
  updateTradeRoundsRequest,
  createTradeRoundsRequest,
  deleteTradeRoundsRequest,
} from 'modules/api-requests/trade-rounds';

import {
  useCourseTradeSettings,
  useChangeCourseTradeSettings,
} from 'modules/api-requests/trade-rounds/queries';

import {
  getTradeModel,
  defaultTradeRound,
  convertToTradeModel,
  defaultTradeFormRound,
} from './helpers';

import type { Moment } from 'moment';
import type { RangeValue } from 'rc-picker/lib/interface';
import type { FormListFieldData } from 'antd/es/form/FormList';
import type { IMetaResponse } from 'modules/api-requests/types';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { ICourseTradeSettings } from 'modules/api-requests/trade-rounds/types';
import type { ITradeRound, ITradeRoundForm } from 'modules/api-requests/trade-rounds/types';

interface ITradeManagerForm extends ICourseTradeSettings {
  tradeRounds: Array<ITradeRoundForm>;
}

const BACK_ACTION_URL = PathCreator[RoutePaths.TRADE_MANAGER].getUrl();

export const TradeManagerSettingsPage = () => {
  const dispatch = useAppDispatch();
  const [tradeRoundForm] = useForm();
  const queryClient = useQueryClient();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [rangeTime, setRangeTime] = useState<RangeValue<Moment>>();

  const onCancelClick = useCallback(() => {
    dispatch(push(BACK_ACTION_URL));
  }, [dispatch]);

  const {
    isFetching: isTradeRoundFetching,
  } = useQuery<IMetaResponse<ITradeRound[]>, string, ITradeRoundForm[]>({
    queryKey: ['getTradeRounds', currentCourseId],
    queryFn: () => getTradeRoundRequest(currentCourseId),
    enabled: Boolean(currentCourseId),
    initialData: () => ({ data: [defaultTradeRound], meta: {} }),
    select: (tradeRounds): ITradeRoundForm[] => {
      return tradeRounds.data.map((item): ITradeRoundForm => ({
        ...item,
        tradeModel: getTradeModel(item.tradeModel),
      }));
    },
    onSuccess: tradeRounds => {
      tradeRounds.length
        ? tradeRoundForm.setFields(dataToFormValues({ tradeRounds }))
        : tradeRoundForm.setFields([{ name: 'tradeRounds', value: [] }]);

      tradeRoundForm.setFields([{ name: 'tradeRounds', errors: undefined }]);
    },
    ...queryOptions,
  });

  const { mutateAsync: createTradeRound, isLoading: isCreateTradeRoundLoading } = useMutation({
    mutationKey: ['createTradeRound', currentCourseId],
    mutationFn: (data: ITradeRound) => createTradeRoundsRequest(currentCourseId, data),
  });

  const { mutateAsync: updateTradeRound, isLoading: isUpdateTradeRoundsUpdating } = useMutation({
    mutationFn: (args: { data: ITradeRound, courseId: string }) => updateTradeRoundsRequest(args),
  });

  const { mutateAsync: deleteTradeRound, isLoading: isDeletingTradeRoundsUpdating } = useMutation({
    mutationFn: (args: { tradeRoundId: string, courseId: string }) => deleteTradeRoundsRequest(args),
    onSuccess: () => {
      queryClient.invalidateQueries(['getTradeRounds', currentCourseId]);
    },
  });

  useCourseTradeSettings(currentCourseId, {
    onSuccess: (courseTradeSettings) => {
      tradeRoundForm.setFields(dataToFormValues(courseTradeSettings));
    },
  });

  const { data: rateList, isLoading: ratesLoading } = useRateList(currentCourseId);

  const {
    mutateAsync: updateCourseTradeSettings,
    isLoading: isCourseTradeSettingsLoading,
  } = useChangeCourseTradeSettings(currentCourseId);

  const onRangePickerChange = (values: RangeValue<Moment>) => setRangeTime(values);

  const onSaveClick = () => tradeRoundForm.submit();

  const onTradeRoundFinish = async (formValues: ITradeManagerForm) => {
    const tradeRounds = formValues.tradeRounds?.map(tradeRound => ({
      ...tradeRound,
      startTime: moment(tradeRound.startTime, TimeFormat).format(ServerTimeFormat),
      endTime: moment(tradeRound.endTime, TimeFormat).format(ServerTimeFormat),
      tradeModel: convertToTradeModel(tradeRound.tradeModel),
    })) || [];

    const existTradeRounds = tradeRounds.filter(item => Boolean(item.id));
    const nonExistTradeRounds = tradeRounds.filter(item => !Boolean(item.id));

    const { tradeMonthLimit, tradeDayLimit, tradeWeekLimit } = formValues;

    await updateCourseTradeSettings({ tradeMonthLimit, tradeDayLimit, tradeWeekLimit })
      .then(() => notification.success({ message: 'Trade rounds limits were updated successfully' }))
      .catch((reason) => notification.error({
        message: 'Can\'t save course trade rounds limits',
        description: String(reason),
      }));

    await Promise
      .all(nonExistTradeRounds
        .map(async tradeRound => createTradeRound(tradeRound)))
      .then(() => nonExistTradeRounds.length && notification.success({ message: 'New trade rounds were updated successfully' }))
      .catch((reason) => notification.error({ message: 'Can\'t save new trade rounds', description: String(reason) }));

    await Promise
      .all(existTradeRounds
        .map(async tradeRound => {
          return tradeRound.id
            ? updateTradeRound({
              data: tradeRound,
              courseId: currentCourseId,
            })
            : Promise.resolve();
        }))
      .then(() => existTradeRounds.length && notification.success({ message: 'Trade rounds was updated successfully' }))
      .then(() => queryClient.invalidateQueries(['getTradeRounds', currentCourseId]))
      .catch((reason) => notification.error({ message: 'Can\'t save trade rounds', description: String(reason) }));
  };

  const onTradeRoundDelete = (field: FormListFieldData, removeFn: (index: number | number[]) => void) => () => {
    const pickedTradeRound: ITradeRoundForm = tradeRoundForm.getFieldValue(['tradeRounds', field.name]);

    if (pickedTradeRound) {
      getConfirmAction({
        title: 'Are you sure you want to delete this trade round?',
        okText: 'Delete',
        icon: <DeleteModalIcon />,
        action: () => {
          pickedTradeRound.id
            ? deleteTradeRound({
              courseId: currentCourseId,
              tradeRoundId: pickedTradeRound.id,
            })
              .then(() => notification.success({ message: 'Trade round was deleted successfully' }))
              .catch(() => notification.error({ message: 'Cannot delete trade round' }))
            : removeFn(field.name);
        },
      });
    }
  };

  const onSubmitFailed = (errorInfo: ValidateErrorEntity) => {
    const { errorFields } = errorInfo;

    if (errorFields.some(error => error.name.some(name => name === 'monthLimit' || name === 'weekLimit' || name === 'dayLimit'))) {
      notification.error({
        message: 'Wrong field value!',
        placement: 'topRight',
      });
    }
  };

  const isLoading = isCreateTradeRoundLoading || isUpdateTradeRoundsUpdating || isDeletingTradeRoundsUpdating || isCourseTradeSettingsLoading || ratesLoading;

  return (
    <PageLayout
      title="Trade settings"
      returnSrc={BACK_ACTION_URL}
      actions={(
        <ActionsSpace size={[16, 0]}>
          <SecondaryButton onClick={onCancelClick} size="large">Cancel</SecondaryButton>
          <Button
            size="large"
            onClick={onSaveClick}
            loading={isLoading}
          >
            Save changes<ArrowRight />
          </Button>
        </ActionsSpace>
      )}
      bodiless
      breadcrumbExtra={[
        { key: 'trade_settings', title: 'Trade settings', path: PathCreator[RoutePaths.TRADE_MANAGER_SETTINGS] },
      ]}
    >
      <Plate>
        <Form
          size="large"
          layout="vertical"
          form={tradeRoundForm}
          onFinish={onTradeRoundFinish}
          onFinishFailed={onSubmitFailed}
          scrollToFirstError={{ behavior: 'smooth', block: 'start', inline: 'start' }}
        >
          {isTradeRoundFetching
            ? <Loading />
            : (
              <TradeSettingsFormBody>
                <Panel title="Trade round limits">
                  <Row gutter={[16, 0]} justify="start">
                    <Col span={8}>
                      <Form.Item
                        name="tradeMonthLimit"
                        label="Limit of players in a month"
                        rules={[getLimitValueValidator]}
                        dependencies={['tradeWeekLimit', 'tradeDayLimit']}
                      >
                        <NumberInput size="large" min={0} placeholder="Empty = unlimited" />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name="tradeWeekLimit"
                        label="Limit of players in a week"
                        rules={[getLimitValueValidator]}
                        dependencies={['tradeMonthLimit', 'tradeDayLimit']}
                      >
                        <NumberInput size="large" min={0} placeholder="Empty = unlimited" />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name="tradeDayLimit"
                        label="Limit of players in a day"
                        rules={[getLimitValueValidator]}
                        dependencies={['tradeMonthLimit', 'tradeWeekLimit']}
                      >
                        <NumberInput size="large" min={0} placeholder="Empty = unlimited" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Panel>

                <Form.List name="tradeRounds" rules={tradeRoundValidatorRules}>
                  {(fields, { add, remove }, { errors }) => (
                    <div>
                      <Form.ErrorList errors={errors} className="trade-rounds-errors" />

                      {fields.map((field) => (
                        <TradeSettingsContainer key={field.key}>
                          <TimeSlotForm
                            field={field}
                            rateList={rateList}
                            form={tradeRoundForm}
                            onDelete={onTradeRoundDelete(field, remove)}
                          />
                        </TradeSettingsContainer>
                      ))}

                      <Row gutter={[16, 0]} justify="end">
                        <Col span={24}>
                          <Panel title="Add Trade round within Time interval">
                            <Row gutter={[16, 0]} justify="start">
                              <Col span={12}>
                                <TimePicker.RangePicker
                                  size="large"
                                  value={rangeTime}
                                  format={TimeFormat}
                                  suffixIcon={<Calendar />}
                                  onChange={onRangePickerChange}
                                />
                              </Col>

                              <Col>
                                <PrimaryButton
                                  size="middle"
                                  icon={<Plus />}
                                  onClick={() => {
                                    if (rangeTime) {
                                      add({
                                        ...defaultTradeFormRound,
                                        startTime: rangeTime[0]?.format(ServerTimeFormat),
                                        endTime: rangeTime[1]?.format(ServerTimeFormat),
                                      });
                                    }

                                    setRangeTime(undefined);
                                  }}
                                  disabled={!Boolean(rangeTime)}
                                >
                                  Add slot
                                </PrimaryButton>
                              </Col>
                            </Row>
                          </Panel>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Form.List>
              </TradeSettingsFormBody>
            )}
        </Form>
      </Plate>
    </PageLayout>
  );
};

export default TradeManagerSettingsPage;
