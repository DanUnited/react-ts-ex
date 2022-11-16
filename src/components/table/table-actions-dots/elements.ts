import Button from 'antd/es/button';
import styled from 'styled-components';
import Dropdown from 'antd/es/dropdown';

export const MenuButton = styled(Button)`
  padding: 0;

  svg {
    height: 18px;
    vertical-align: middle;
  }
`;

export const ActionsDropdown = styled(Dropdown)`
  .ant-dropdown {
    padding: 18px;
    
    .ant-dropdown-menu-item {
      font-size: 16px;
    }
  }
`;
