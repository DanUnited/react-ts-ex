import React, { useMemo } from 'react';
import omit from 'lodash/omit';
import Column from 'antd/es/table/Column';

import { SeasonPricesTable } from './elements';
import { timePeriodsColumns } from './columns';
import { Panel } from 'components/layout/panel';
import { renderPeriodDayInput } from './renders';
import { renderColumns } from 'components/table/columns';
import { DEFAULT_OVERRIDE_DAYS } from 'modules/api-requests/rates/constants';

import type { FormInstance } from 'antd/es/form/Form';
import type { ISeasonForm } from 'modules/api-requests/rates/types';

interface ITableSeasonPrices {
  value?: ISeasonForm;
  fieldKey: number;
  form: FormInstance;
}

const scroll = {
  x: 800,
}

export const TableSeasonPrices = ({ value, fieldKey, form }: ITableSeasonPrices) => {
  const availableDays = form.getFieldValue('availableDays');

  const sortedTimePeriods = useMemo(() => value?.timePeriods ? [...value.timePeriods] : [], [value])

  return (
    <>
      <Panel title={`${value?.seasonName} season`}>
        <SeasonPricesTable
          sticky
          rowKey="id"
          scroll={scroll}
          pagination={false}
          dataSource={sortedTimePeriods?.filter(timePeriod => timePeriod.seasonId === value?.id)}
        >
          {renderColumns(timePeriodsColumns)}
          {Object.keys(omit(DEFAULT_OVERRIDE_DAYS, 'key'))
            .map(dayName => (
              <Column
                width={110}
                title={dayName}
                key={'overrideDays.' + dayName}
                dataIndex={['overrideDays', dayName]}
                shouldCellUpdate={() => false}
                render={renderPeriodDayInput([fieldKey, 'timePeriods'], dayName, 'Dollars', !availableDays[dayName])}
              />
            ))}
        </SeasonPricesTable>
      </Panel>
    </>
  );
};
