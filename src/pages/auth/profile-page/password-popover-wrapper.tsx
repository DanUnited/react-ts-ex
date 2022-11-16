import React from 'react';
import { PasswordPopover } from './elements';

import type { PopoverProps } from 'antd/es/popover';

export const PasswordPopoverWrapper = React.memo((props: PopoverProps) => (
  <PasswordPopover
    placement="left"
    content={(
      <ul>
        <li>8 symbols minimal length</li>
        <li>Numbers are required</li>
        <li>Uppercase & lowercase are required</li>
      </ul>
    )} {...props} />
));
