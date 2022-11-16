import React from 'react';
import { TableInputNumber as StyledTableInput } from 'components/table/table-input-number';

import type { InputNumberProps } from 'antd/es/input-number';

export const TableInputNumber = (props: InputNumberProps) => {
  return <StyledTableInput {...props} value={props.disabled ? undefined : props.value} />
}
