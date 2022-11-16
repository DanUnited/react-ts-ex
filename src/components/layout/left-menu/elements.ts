import styled from 'styled-components';
import Menu from 'antd/es/menu';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const MenuIcon = styled.div.attrs({ className: 'icon-container' })`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  
  svg {
    fill: ${({ theme }) => theme.colors.darkGrey};
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
`;

export const MainMenu = styled(Menu)`
  border-radius: 8px;
  min-height: calc(100vh - 150px);
  position: relative;

  &.ant-menu-root.ant-menu-vertical {
    border-radius: 16px;
  }
  
  &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected div {
    background-color: rgba(56, 165, 255, 0.2);
    border-radius: 12px;
    
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  &.ant-menu-vertical {
    padding:  48px 20px 64px 20px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      padding:  24px 12px 64px 12px;
    }
  }

  &.ant-menu-vertical > .ant-menu-item {
    width: 40px;
    height: 40px;
    
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  
  &.ant-menu > .ant-menu-item-divider {
    margin: 16px 0;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow {
    display: none;
  }

  .avatar-item {
    position: absolute;
    bottom: 20px;

    > .ant-menu-submenu-title {
      height: 40px;
    }
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  cursor: pointer;
`;

export const InnerMenuItem = styled.span`
  padding: 0 8px;

  svg {
    height: 12px;
    fill: ${({ theme }) => theme.colors.primary};
  }
`;
