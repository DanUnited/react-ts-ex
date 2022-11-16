import React, { useCallback, useEffect, useState } from 'react';

import { FullPrices } from './full-prices';
import { useAppSelector } from 'utils/hooks';
import { Loading } from 'components/loading';
import { ContentContainer } from './elements';
import { RateFormContainer } from '../elements';
import { GeneralPrices } from './general-prices';
import { StepOneValues } from './step-one-values';
import { Header3 } from 'components/layout/headers';
import { rateFormSelector } from 'models/rates/selectors';
import { PricesModeSwitcher } from './prices-mode-switcher';
import { dataToFormValues } from 'utils/form/data-to-form-values';

import type { ValueOf } from 'routing/constants';
import type { RadioChangeEvent, FormInstance } from 'antd/es';

interface IRateFormStepTwo {
  visible?: boolean;
  form: FormInstance;
  isLoading?: boolean;
}

enum PricesModeEnum {
  SPECIFIC_TIME,
  ALL_TIME,
}

export const RateFormStepTwo = ({ visible, form, isLoading }: IRateFormStepTwo) => {
  const [pricesMode, setPricesMode] = useState<ValueOf<typeof PricesModeEnum>>(PricesModeEnum.SPECIFIC_TIME);
  const currentRateForm = useAppSelector(rateFormSelector);

  const onModeSwitcherChange = useCallback((e: RadioChangeEvent) => {
    setPricesMode(e.target.value);
  }, []);

  useEffect(() => {
    if (visible) {
      form.setFields(dataToFormValues(currentRateForm));
    }
  }, [currentRateForm, visible, form]);

  if (!visible) return null;

  return (
    <>
      <RateFormContainer>
        <ContentContainer>
          <Header3>Prices</Header3>

          <PricesModeSwitcher value={pricesMode} onChange={onModeSwitcherChange} />
          <StepOneValues />

          {isLoading
            ? <Loading />
            : (
              <>
                <FullPrices visible={pricesMode === PricesModeEnum.SPECIFIC_TIME} form={form} />
                <GeneralPrices visible={pricesMode === PricesModeEnum.ALL_TIME} form={form} />
              </>
            )
          }
        </ContentContainer>
      </RateFormContainer>
    </>
  )
};
