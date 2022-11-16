import React from 'react';

import {
  PeriodBlock,
  PresetButton,
  PresetHeader,
  DuplicateLink,
  HeaderContainer,
  ButtonsContainer,
  PresetBlockContainer,
} from './elements';

import { PrimaryButton, DefaultButton } from 'components/layout/button';

interface IPresetBlock {
  name: string;
  period: string[];
}

export const PresetBlock = ({ name, period }: IPresetBlock): React.ReactElement => (
  <PresetBlockContainer>
    <HeaderContainer>
      <PresetHeader>{name}</PresetHeader>
      <DuplicateLink>Duplicate</DuplicateLink>
    </HeaderContainer>

    {period.map((time) => (
      <PeriodBlock key={time}>{time}</PeriodBlock>
    ))}

    <ButtonsContainer>
      <PresetButton>
        <PrimaryButton size="small">Edit period</PrimaryButton>
      </PresetButton>
      <PresetButton>
        <DefaultButton danger ghost size="small">Delete period</DefaultButton>
      </PresetButton>
    </ButtonsContainer>
  </PresetBlockContainer>
);
