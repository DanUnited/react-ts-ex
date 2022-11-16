import React  from 'react';
import { push } from 'connected-react-router';

import { PathCreator, RoutePaths } from 'routing/constants';
import { GreyButton } from 'components/layout/button';
import { useAppDispatch } from 'utils/hooks';

import { HeaderButtonsContainer } from '../elements';

export const PresetsTabsButtons = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const onButtonClick = (link: string) => (): void => {
    link && dispatch(push(link))
  };

  return (
    <HeaderButtonsContainer>
      <GreyButton onClick={onButtonClick(PathCreator[RoutePaths.PRESETS_MANAGER].path)}>Time periods</GreyButton>
      <GreyButton onClick={onButtonClick(PathCreator[RoutePaths.PRESETS_MANAGER_YIELD].path)}>Yield presets</GreyButton>
      <GreyButton onClick={onButtonClick(PathCreator[RoutePaths.PRESETS_MANAGER_WEATHER].path)}>Weather presets</GreyButton>
    </HeaderButtonsContainer>
  )
};
