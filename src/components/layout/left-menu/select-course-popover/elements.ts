import List from 'antd/es/list';
import styled from 'styled-components';
import { Popover } from 'components/popover';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const CoursePopover = styled(Popover)`
  .ant-popover {
    width: 420px;
  }

  .ant-popover-inner {
    background: white;
    border-radius: 8px;
    box-shadow: -2px -2px 12px rgb(209 219 231 / 80%);
  }

  .ant-popover-inner-content {
    padding: 16px 24px;
  }
  
  .ant-input-affix-wrapper {
    margin: 16px 0 8px 0;
  }
  
  .ant-popover-placement-rightTop .ant-popover-arrow {
    top: 35px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      top: 27px;
    }
  }
`;

export const ListContainer = styled.div`
  height: calc(100vh - 184px);

  .ant-divider-horizontal.ant-divider-with-text-left {
    margin: 0;

    &::before {
      width: 0;
    }
  }

  .ant-divider-inner-text {
    padding: 0 16px 0 0;
  }

  .ant-list-split .ant-list-header {
    border: 0;
    padding-bottom: 0;
  }
  
  .ant-list-split .ant-list-item {
    border: 0;
  }

  .ant-list-item-meta-title {
    font-size: 20px;
    font-weight: 500;
    margin: 0;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      font-size: 16px;
    }
  }

  .ant-list-item-meta-content {
    align-self: center;
  }

  .ant-avatar > img {
    object-fit: contain;
  }
`;

interface IListItemMeta {
  $active?: boolean;
}

export const ListItemMeta = styled(List.Item.Meta)<IListItemMeta>`
  .ant-list-item-meta-title {
    color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      cursor: ${({ $active }) => $active ? 'normal' : 'pointer'};
    }

    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 12px;
    }
  }

  .ant-avatar {
    height: 56px;
    width: 56px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 42px;
      width: 42px;
    }
  }
`;

export const CourseAvatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 16px rgba(104, 113, 123, 0.07);
  margin-bottom: 16px;
  cursor: pointer;
  
  img {
    height: 64px;
    width: 64px;
    object-fit: contain;
    border-radius: 8px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    height: 64px;
    width: 64px;

    img {
      height: 48px;
      width: 48px;
    }
  }
`;

export const Arrow = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;  
  border-radius: 50%;
  right: -10px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 16px;
    height: 16px;
    right: -6px;
  }
`;
