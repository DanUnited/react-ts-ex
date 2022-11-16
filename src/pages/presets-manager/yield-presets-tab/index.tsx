import React, { useMemo } from 'react';

import { getColumnsWidth } from 'utils/table';
import { yieldsWeatherColumns } from './columns';
import { Header3 } from 'components/layout/headers';
import { renderColumns } from 'components/table/columns';
import { PrimaryButton, TransparentButton } from 'components/layout/button';

import {
  LeftSide,
  Container,
  RightSide,
  PresetTab,
  StyledTable,
  ButtonSpace,
} from '../elements';

const Yield = (): React.ReactElement => {
  const scroll = useMemo(() => ({
    scrollToFirstRowOnChange: false,
    x: yieldsWeatherColumns.reduce(getColumnsWidth, 0),
  }), []);

  return (
    <Container>
      <LeftSide>
        <Header3>Presets list</Header3>
        <PresetTab>Preset for summer high utilization</PresetTab>
        <PresetTab>Preset for summer high utilization</PresetTab>
        <PresetTab>Preset for summer high utilization</PresetTab>
        <PresetTab>Preset for summer high utilization</PresetTab>
        <PresetTab>Preset for summer high utilization</PresetTab>
      </LeftSide>
      <RightSide>
        <div>
          <Header3>Preset preview</Header3>

          <StyledTable
            sticky
            rowKey="id"
            dataSource={[]}
            scroll={scroll}
            pagination={false}
            tableLayout="fixed"
          >
            {renderColumns(yieldsWeatherColumns)}
          </StyledTable>
        </div>

        <ButtonSpace size={[8, 16]}>
          <TransparentButton type="link" block>Duplicate</TransparentButton>
          <PrimaryButton danger block>Delete</PrimaryButton>
          <PrimaryButton block>Save changes</PrimaryButton>
        </ButtonSpace>
      </RightSide>
    </Container>
  )
};

export default Yield;
