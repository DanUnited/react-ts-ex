import React, { useCallback, useEffect } from 'react';
import Dropdown from 'antd/es/dropdown';
import { push } from 'connected-react-router';
import notification from 'antd/es/notification';
import { useMutation, useQueryClient } from 'react-query';

import {
  Icon,
  DeleteIcon,
  HeaderMargin,
  StyledButton,
  DropdownButton,
  ActionContainer,
  RateBlockContainer,
} from '../elements';

import { RateBlock } from './rate-block';
import { Loading } from 'components/loading';
import { rateCreatingActions } from 'models/rates';
import { Plus } from 'components/icons/system/plus';
import { Delete } from 'components/icons/system/delete';
import { FlexBlock } from 'components/layout/flex-block';
import { PrimaryButton } from 'components/layout/button';
import { getConfirmAction } from 'components/modal/confirm';
import { useCollection } from 'utils/hooks/use-collection';
import { PathCreator, RoutePaths } from 'routing/constants';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { EmptyBlock } from 'pages/course-management/elements';
import { removeRatesRequest } from 'modules/api-requests/rates';
import { useRateList } from 'modules/api-requests/rates/queries';

export const RateManagerTab = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [selectedRates, setSelectedRates, setSelectedRatesCollection] = useCollection();

  const { isFetching, data } = useRateList(currentCourseId, {
    keepPreviousData: true,
    select: (data) => data.data,
  });

  const { mutate: removeRates } = useMutation({
    mutationKey: ['removeRates', currentCourseId, selectedRates],
    mutationFn: () => removeRatesRequest(currentCourseId, { ids: selectedRates }),
    onSuccess() {
      notification.success({
        message: 'Rates deleted successfully!',
        placement: 'topRight',
      });

      setSelectedRatesCollection([]);
      queryClient.invalidateQueries(['getRatesList', currentCourseId]);
    },
    onError(error) {
      notification.error({ message: String(error) });
    },
  });

  const onRemoveRateClick = () => {
    getConfirmAction({
      title: 'Are you sure you want to delete these rates?',
      action: removeRates,
      okText: 'Delete',
      cancelText: 'Cancel',
    });
  };

  const onCreateClick = useCallback(() => {
    dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATION].getUrl()));
  }, [dispatch]);

  const onCreateChildClick = useCallback(() => {
    dispatch(push(PathCreator[RoutePaths.PRICING_MANAGEMENT_RATES_CREATE_CHILD].getUrl()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(rateCreatingActions.resetChildRate());
    dispatch(rateCreatingActions.setRatePostChanges({ availableDays: undefined }));
  }, [dispatch]);

  return (
    <>
      <FlexBlock>
        <HeaderMargin>
          List of rates
        </HeaderMargin>

        <ActionContainer>
          {selectedRates.length > 0 && (
            <PrimaryButton
              ghost
              danger
              size="small"
              icon={
                <DeleteIcon>
                  <Delete />
                </DeleteIcon>
              }
              onClick={onRemoveRateClick}>
              Delete selected
            </PrimaryButton>
          )}
          <StyledButton>
            <Dropdown.Button
              overlay={(
                <DropdownButton onClick={onCreateChildClick}>
                  Create child rate
                </DropdownButton>
              )}
              size="small"
              onClick={onCreateClick}>
              <Icon><Plus /></Icon> New rate
            </Dropdown.Button>
          </StyledButton>
        </ActionContainer>
      </FlexBlock>

      {isFetching ? <Loading /> : (
        <RateBlockContainer>
          {data?.map((item) => (
            <RateBlock
              value={item}
              key={item.id}
              selected={selectedRates.includes(item.id)}
              onSelectedChange={setSelectedRates}
            />
          ))}
          <EmptyBlock />
          <EmptyBlock />
          <EmptyBlock />
        </RateBlockContainer>
      )}
    </>
  );
};

export default RateManagerTab;
