import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import Form from 'antd/es/form';
import isNil from 'lodash/isNil';
import Switch from 'antd/es/switch';
import { push } from 'connected-react-router';
import { useMutation, useQueryClient } from 'react-query';

import { Calendar } from 'components/calendar';
import { Pencil, Copy } from 'components/icons';
import { rateCreatingActions } from 'models/rates';
import { asyncDebounce } from 'utils/async-debounce';
import { ModalTitle } from 'components/modal/elements';
import { getConfirmAction } from 'components/modal/confirm';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { updateRateRequest } from 'modules/api-requests/rates';
import {
  Icon,
  FlexContainer,
  HeaderContainer,
  RateBlockHeader,
  RateDescription,
  RateBlockContainer,
} from './elements';

import type { IServerRate, IAvailableDays } from 'modules/api-requests/rates/types';

interface IRateBlock {
  value: IServerRate;
  selected?: boolean;
  onSelectedChange?: (value: string) => void;
}

const dayCanBeSwitched = (rate: IServerRate, day: keyof IAvailableDays, allValues: IAvailableDays) => {
  let canSwitched = true;

  rate.prices.forEach((price) => {
    if (isNil(price.pricesWeekDay[day]) && allValues[day]) {
      canSwitched = false;
    }
  });

  return canSwitched;
};

export const RateBlock = ({ selected, onSelectedChange, value }: IRateBlock) => {
  const dispatch = useAppDispatch();
  const { name, description, id, availableDays, isActive } = value;
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const queryClient = useQueryClient();
  const [internalDays, setInternalDays] = useState(availableDays);

  const { mutate: updateRate, isLoading } = useMutation({
    mutationKey: ['updateRate', currentCourseId, id],
    mutationFn: asyncDebounce((data: Partial<IServerRate>) => updateRateRequest(currentCourseId, id, data), 1000),
    onSuccess: () => {
      queryClient.invalidateQueries(['getCourseRates', currentCourseId]);
    },
  });

  const onHeaderClick = () => {
    onSelectedChange && onSelectedChange(id);
  };

  const onEditClick = () => {
    dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_UPDATE].getUrl(id)));
  };

  const onActiveSwitchChange = (isActiveValue: boolean) => {
    updateRate({ ...value, isActive: isActiveValue });
  };

  const onCopyRateClick = () => {
    dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_COPY].getUrl(id)));
  };

  const onCalendarChange = (allValues: IAvailableDays, changedValue: keyof IAvailableDays) => {
    if (dayCanBeSwitched(value, changedValue, allValues)) {
      setInternalDays(allValues);
      updateRate({ ...value, availableDays: allValues });
    } else {
      getConfirmAction(
        {
          action: () => {
            dispatch(rateCreatingActions.setRatePostChanges({
              availableDays: allValues,
            }));

            onEditClick();
          },
          icon: null,
          okText: 'Edit rate',
          cancelText: 'Cancel',
          title: <ModalTitle>Day "{changedValue}" doesn't contain price in this rate. Do you want open edit rate page?</ModalTitle>,
        });
    }
  };

  useEffect(() => {
    setInternalDays(value?.availableDays);
  }, [value?.availableDays]);

  return (
    <RateBlockContainer className={cs({ active: selected, animated: isLoading })}>
      <div>
        <HeaderContainer>
          <FlexContainer>
            <RateBlockHeader $isActive={selected} onClick={onHeaderClick}>{name}</RateBlockHeader>
            <Icon onClick={onEditClick}>
              <Pencil />
            </Icon>
          </FlexContainer>
          <FlexContainer style={{ alignSelf: 'end' }}>
            <Icon onClick={onCopyRateClick}>
              <Copy />
            </Icon>
            <Switch
              loading={isLoading}
              disabled={isLoading}
              defaultChecked={isActive}
              onChange={onActiveSwitchChange}
            />
          </FlexContainer>
        </HeaderContainer>

        <RateDescription>{description}</RateDescription>
      </div>

      <HeaderContainer style={{ alignItems: 'start' }}>
        <Form>
          <Calendar value={internalDays} onChange={onCalendarChange} />
        </Form>
      </HeaderContainer>
    </RateBlockContainer>
  );
};
