import React from 'react';

import { Header3 } from 'components/layout/headers';
import { renderColumns } from 'components/table/columns';
import { TablesWrapper, TableWrapper, TableTitle } from './elements';
import { PrimaryButton, TransparentButton } from 'components/layout/button';
import { weatherColumns, temperatureColumns, humidityColumns } from './columns';
import { TemperatureFixture, HumidityFixture, WeatherFixture } from './constants';
import { PresetTab, LeftSide, RightSide, Container, StyledTable, ButtonSpace } from '../elements';

const WeatherPresetsTab = (): React.ReactElement => {
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

        <TablesWrapper>
          <TableWrapper>
            <TableTitle>Temperature</TableTitle>
            <StyledTable
              dataSource={TemperatureFixture}
              pagination={false}
              rowKey="id"
            >
              {renderColumns(temperatureColumns)}
            </StyledTable>
          </TableWrapper>

          <TableWrapper>
            <TableTitle>Humidity</TableTitle>
            <StyledTable
              dataSource={HumidityFixture}
              pagination={false}
              rowKey="id"
            >
              {renderColumns(humidityColumns)}
            </StyledTable>
          </TableWrapper>

          <TableWrapper>
            <TableTitle>Weather</TableTitle>
            <StyledTable
              dataSource={WeatherFixture}
              pagination={false}
              rowKey="type"
            >
              {renderColumns(weatherColumns)}
            </StyledTable>
          </TableWrapper>
        </TablesWrapper>

        <ButtonSpace>
          <TransparentButton type="link" block>Duplicate</TransparentButton>
          <PrimaryButton danger block>Delete</PrimaryButton>
          <PrimaryButton block>Save changes</PrimaryButton>
        </ButtonSpace>
      </RightSide>
    </Container>
  )
};

export default WeatherPresetsTab;
