import React, { useCallback, useEffect } from 'react';
import omit from 'lodash/omit';
import Form from 'antd/es/form';
import Table from 'antd/es/table';
import flatten from 'lodash/flatten';
import cloneDeep from 'lodash/cloneDeep';
import Column from 'antd/es/table/Column';

import { useAppDispatch } from 'utils/hooks';
import { rateCreatingActions } from 'models/rates';
import { InputNumberFormatter } from 'utils/numbers';
import { TableInputNumber } from 'components/table/table-input-number';
import { DEFAULT_OVERRIDE_DAYS } from 'modules/api-requests/rates/constants';

import type { FormInstance } from 'antd';
import type { ISeasonForm, WeekDayType, OverrideDaysType } from 'modules/api-requests/rates/types';

interface IGeneralPrices {
  form: FormInstance;
  visible?: boolean;
}

const scroll = {
  x: 700,
}

export const GeneralPrices = ({ visible, form }: IGeneralPrices) => {
  const dispatch = useAppDispatch();

  const onPriceChange = useCallback((day: WeekDayType) =>
    (value: string | number) => {
      const seasons = form.getFieldValue('seasons') as ISeasonForm[] ?? [];
      const seasonsCopy = cloneDeep(seasons);

      const fields = seasons.map((season, seasonIndex) => {
        seasonsCopy[seasonIndex].timePeriods = seasonsCopy[seasonIndex].timePeriods.map((period) => ({
          ...period,
          overrideDays: {
            ...period.overrideDays,
            [day]: value,
          }
        }))

        return season.timePeriods.map((period, periodIndex) => ({
          name: ['seasons', seasonIndex, 'timePeriods', periodIndex, 'overrideDays'],
          value: {
            ...period.overrideDays,
            [day]: value,
          },
        }))
      });

      dispatch(rateCreatingActions.setRateFormFields({ seasons: seasonsCopy }));

      form.setFields(flatten(fields));
    }, [form, dispatch]);

  const generalOverrideDays = useCallback(() => {
    const seasons = form.getFieldValue('seasons') as ISeasonForm[] ?? [];

    return flatten(seasons.map(season => season.timePeriods))
      .map(period => period.overrideDays || [])
      .reduce((overrideDaysPrevious, overrideDays) => {
        return cloneDeep(overrideDays);
      }, seasons[0]?.timePeriods[0]?.overrideDays) as OverrideDaysType;
  }, [form]);

  useEffect(() => {
    if (visible) {
      const values = generalOverrideDays();

      dispatch(rateCreatingActions.setRateFormFields({
        tempOverrideDays: [{ ...DEFAULT_OVERRIDE_DAYS, ...values }],
      }));
    }
  }, [visible, form, generalOverrideDays, dispatch]);

  const availableDays = form.getFieldValue('availableDays');

  if (!visible) return null;

  return (
    <Form.Item name="tempOverrideDays" valuePropName="dataSource">
      <Table
        sticky
        scroll={scroll}
        pagination={false}
        rowKey="key"
      >
        {Object.keys(omit(DEFAULT_OVERRIDE_DAYS, 'key'))
          .map(dayName => (
            <Column
              title={dayName}
              dataIndex={dayName}
              key={dayName}
              width={110}
              shouldCellUpdate={() => false}
              render={(_val, _row) => {
                return (
                  <Form.Item
                    shouldUpdate
                    name={['tempOverrideDays', 0, dayName]}
                  >
                    <TableInputNumber
                      min={0}
                      precision={2}
                      size="middle"
                      placeholder="Price"
                      formatter={InputNumberFormatter()}
                      onChange={onPriceChange(dayName as WeekDayType)}
                      disabled={!availableDays[dayName]}
                    />
                  </Form.Item>
                )
              }}
            />
          ))}
      </Table>
    </Form.Item>
  );
}
