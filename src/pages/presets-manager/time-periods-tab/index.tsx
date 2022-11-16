import React from 'react';

import { PresetBlock } from './preset-block';
import { presetCollection } from './constatnts';
import { FlexBlock } from 'components/layout/flex-block';
import { FullSpace } from 'components/layout/full-space';
import { Header2, Header4 } from 'components/layout/headers';

export const TimePeriodsTab = () => (
  <>
    <Header2>Time period presets</Header2>

    <Header4>List of presets</Header4>

    <FlexBlock>
      <FullSpace size={[20, 20]} wrap>
        {presetCollection.map(({ name, time }) => (
          <PresetBlock key={name} name={name} period={time} />
        ))}
      </FullSpace>
    </FlexBlock>
  </>
);

export default TimePeriodsTab;
