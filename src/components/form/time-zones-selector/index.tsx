import React from 'react';
import Select from 'antd/es/select';
import { renderTimeZones } from './render-time-zones';

import type { SelectProps } from 'antd/es/select';

export const TimeZonesSelector = (props: SelectProps<string>) => (
  <Select
    showSearch
    children={renderTimeZones()}
    placeholder="Select time zone"
    {...props}
  />
);
