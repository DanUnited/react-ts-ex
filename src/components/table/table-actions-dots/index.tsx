import React from 'react';

import { ActionsDropdown, MenuButton } from './elements';
import { VDotsIcon } from 'components/icons/system/v-dots-icon';

import type { DropdownProps } from 'antd/lib/dropdown/dropdown';

export const TableActionsDots = (props: DropdownProps) => (
  <ActionsDropdown trigger={['click']} placement="bottomRight" {...props}>
    <MenuButton onClick={e => e.stopPropagation()} type="link">
      <VDotsIcon />
    </MenuButton>
  </ActionsDropdown>
);
