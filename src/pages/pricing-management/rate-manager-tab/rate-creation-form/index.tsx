import React, { useCallback, useEffect, useState } from 'react';
import Form from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import { useMutation, useQueryClient } from 'react-query';

import { useAppSelector } from 'utils/hooks';
import { useAppDispatch } from 'utils/hooks';
import { ActionsSpace, Button } from './elements';
import { RateFormStepTwo } from './rate-form-step-two';
import { RateFormStepOne } from './rate-form-step-one';
import { RateTableAdaptor } from './rate-table-adaptor';
import { PriceManagementTabsEnum } from '../../constants';
import { SecondaryButton } from 'components/layout/button';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { getCurrentCourseId } from 'models/profile/selectors';
import { ArrowRight } from 'components/icons/system/arrow-right';
import { useRateList } from 'modules/api-requests/rates/queries';
import { dataToFormValues } from 'utils/form/data-to-form-values';
import { initialRateState, rateCreatingActions } from 'models/rates';
import { useSeasonsList } from 'modules/api-requests/seasons/queries';
import { useTimePeriodsList } from 'modules/api-requests/time-period/queries';
import { createRateRequest, updateRateRequest } from 'modules/api-requests/rates';

import {
  rateFormSelector,
  childRateSelector,
  rateEntitySelector,
  ratePostChangesSelector,
} from 'models/rates/selectors';

import type { IServerRate, IRateTableForm } from 'modules/api-requests/rates/types';

const FIRST_STEP = 1;
const MAX_STEP_COUNT = 2;

const getActionRateTitle = (mode: string, isChildRate?: boolean) => {
  if (isChildRate) return 'Create child rate';

  switch (mode) {
    case 'update':
      return 'Update rate';
    case 'copy':
      return 'Copy rate';
    default:
      return 'Create rate';
  }
};

export const RateCreationForm = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const childRate = useAppSelector(childRateSelector);
  const currentRateForm = useAppSelector(rateFormSelector);
  const currentRateEntity = useAppSelector(rateEntitySelector);
  const ratePostChanges = useAppSelector(ratePostChangesSelector);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [currentStep, setCurrentStep] = useState<number>(FIRST_STEP);
  const { id, mode } = useParams<{ id: string, mode: string }>();
  const existRatesList = queryClient.getQueryData<IServerRate[]>(['getRatesList', currentCourseId]);

  const returnSrc = childRate
    ? PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATE_CHILD].getUrl()
    : PathCreator[RoutePaths.PRICING_MANAGEMENT].getUrl(PriceManagementTabsEnum.RATE);

  const { mutate: createRate, isLoading: createLoading } = useMutation({
    mutationKey: ['createRate', currentCourseId],
    mutationFn: (data: IRateTableForm) => {
      if (data.seasons) {
        return createRateRequest(currentCourseId, RateTableAdaptor.toServerRate({
          ...data,
          courseId: currentCourseId,
          seasons: data.seasons,
        }));
      }

      return Promise.reject();
    },
    onSuccess: () => {
      notification.success({ message: 'Rate was successfully created!' });
      dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT].getUrl(PriceManagementTabsEnum.RATE)));
    },
    onError: function(error) {
      notification.error({
        message: String(error),
        placement: 'topRight',
      });
    },
  });

  const { mutate: updateRate, isLoading: updateLoading } = useMutation({
    mutationKey: ['updateRate', currentCourseId, id],
    mutationFn: (data: IRateTableForm) => {
      if (data.seasons) {
        return updateRateRequest(currentCourseId, id, RateTableAdaptor.toServerRate({
          ...data,
          courseId: currentCourseId,
          seasons: data.seasons,
        }));
      }

      return Promise.reject();
    },
    onSuccess: () => {
      notification.success({ message: 'Rate was successfully updated!' });
      dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT].getUrl(PriceManagementTabsEnum.RATE)));
    },
    onError: function(error) {
      notification.error({
        message: String(error),
        placement: 'topRight',
      });
    },
  });

  const { data: seasonsData, isLoading: seasonLoading } = useSeasonsList(currentCourseId);

  const { data: timePeriods, isLoading: periodLoading } = useTimePeriodsList(currentCourseId);

  const { data: ratesList } = useRateList(currentCourseId, {
    select: (data) => data.data,
    enabled: Boolean(currentCourseId) && Boolean(id) && !existRatesList,
    onError: (error) => {
      notification.error({
        placement: 'topRight',
        description: String(error),
        message: 'Can\'t get the rate. Try one more time later.',
      });

      dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT].getUrl(PriceManagementTabsEnum.RATE)));
    },
  });

  useEffect(() => {
    if (ratesList) {
      const actualRateEntity = ratesList.find(rate => rate.id === id);

      if (actualRateEntity) {
        ratePostChanges.availableDays
          ? dispatch(rateCreatingActions.setRate({ ...actualRateEntity, availableDays: ratePostChanges.availableDays }))
          : dispatch(rateCreatingActions.setRate(actualRateEntity));
      }
    }
  }, [ratesList, dispatch, id, ratePostChanges]);

  useEffect(() => {
    return () => {
      dispatch(rateCreatingActions.resetRateState());
      dispatch(rateCreatingActions.resetChildRate());
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentRateEntity && seasonsData && timePeriods) {
      const rateEntity = mode === 'copy'
        ? {
          ...currentRateEntity,
          id: undefined,
          name: childRate ? childRate.name : `Copy ${currentRateEntity.name}`,
          description: childRate ? childRate.description : currentRateEntity.description,
        }
        : currentRateEntity;

      dispatch(rateCreatingActions.setRateFormFields(RateTableAdaptor.toRateTableForm(rateEntity, seasonsData, timePeriods, childRate)));
    }
  }, [currentRateEntity, form, seasonsData, timePeriods, dispatch, mode, childRate]);

  useEffect(() => {
    if (currentRateForm) {
      form.setFields(dataToFormValues(currentRateForm));
    }
  }, [currentRateForm, form]);

  const onContinueAction = useCallback(async () => {
    await form.validateFields();

    if (currentStep === MAX_STEP_COUNT) {
      form.submit();
    }

    setCurrentStep((step) => step < MAX_STEP_COUNT ? step + 1 : MAX_STEP_COUNT);
  }, [form, currentStep]);

  const onPreviousAction = useCallback(() => {
    if (currentStep === FIRST_STEP) {
      dispatch(push(returnSrc));
    }

    setCurrentStep((step) => step > FIRST_STEP ? step - 1 : FIRST_STEP);
  }, [currentStep, dispatch, returnSrc]);

  const continueButtonTitle = currentStep < MAX_STEP_COUNT
    ? 'Continue'
    : getActionRateTitle(mode, Boolean(childRate));

  const previousButtonTitle = currentStep > FIRST_STEP ? 'Previous step' : 'Cancel';

  const onFinish = useCallback(formValues => {
    if (currentStep === MAX_STEP_COUNT) {
      mode === 'update' ? updateRate(formValues) : createRate(formValues);
    }
  }, [createRate, currentStep, updateRate, mode]);

  const onFormValuesChange = useCallback((changedValue: Partial<IRateTableForm>, formValues: IRateTableForm) => {
    if (changedValue.availableDays) {
      dispatch(rateCreatingActions.setRateFormFields({
        ...formValues,
        seasons: formValues.seasons?.map(season => ({
          ...season,
          timePeriods: season.timePeriods.map(period => ({
            ...period,
            overrideDays: period.overrideDays,
          })),
        })),
      }));
    } else {
      dispatch(rateCreatingActions.setRateFormFields({ ...formValues }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (ratePostChanges.availableDays) {
      setCurrentStep(MAX_STEP_COUNT);
    }
  }, [ratePostChanges]);

  return (
    <Form
      preserve
      form={form}
      size="large"
      onFinish={onFinish}
      onValuesChange={onFormValuesChange}
      initialValues={initialRateState.form}
    >
      <PageLayout
        title={getActionRateTitle(mode, Boolean(childRate))}
        returnSrc={returnSrc}
        actions={(
          <ActionsSpace size={[16, 0]}>
            <SecondaryButton
              size="large"
              onClick={onPreviousAction}
            >
              {previousButtonTitle}
            </SecondaryButton>
            <Button
              onClick={onContinueAction}
              loading={createLoading || updateLoading}
            >
              {continueButtonTitle} <ArrowRight />
            </Button>
          </ActionsSpace>
        )}
        bodiless
        breadcrumbExtra={[
          {
            key: 'create_rate',
            title: getActionRateTitle(mode, Boolean(childRate)),
          },
          ...[mode === 'update' ? {
              key: 'update_rate_by_id',
              title: ratesList?.find(rate => rate.id === id)?.name || '',
            }
            : [{ key: 'null' }] as any],
        ]}
      >
        <RateFormStepOne
          form={form}
          seasons={seasonsData}
          timePeriods={timePeriods}
          visible={currentStep === FIRST_STEP}
          isLoading={seasonLoading || periodLoading}
        />
        <RateFormStepTwo
          form={form}
          visible={currentStep === MAX_STEP_COUNT}
          isLoading={seasonLoading || periodLoading}
        />
      </PageLayout>
    </Form>
  );
};

export default RateCreationForm;
