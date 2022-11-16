import Badge from 'antd/es/badge';
import styled from 'styled-components';
import { Header4 } from 'components/layout/headers';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

import type { BadgeProps } from 'antd/es';

export const CourseBlockContainer = styled.div`
  display: inline-flex;
  min-width: 400px;
  flex: 1 0 20%;
  padding: 16px;
  border-radius: 16px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  margin: 0 16px 16px 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    min-width: 234px;
    border-radius: 12px;
  }
`;

export const ContentBlock = styled.div`
  display: inline-flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  svg {
    margin-right: 8px;
  }
`;

export const BlockTitle = styled(Header4)`
  margin: 0 8px 0 16px;
  flex: 1 0 200px;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    flex: 1 0 134px;
  }
`;

export const ImageContainer = styled.div`
  width: 64px;
  height: 64px;
  background-color: white;
  border-radius: 16px;
  padding: 4px;
  line-height: 54px;

  img {
    width: 100%;
    height: 56px;
    object-fit: contain;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    border-radius: 6px;
    width: 40px;
    height: 40px;

    img {
      vertical-align: baseline;
      height: 32px;
    }
  }
`;

interface IActiveBadge extends BadgeProps {
  $active?: boolean;
}

export const ActiveBadge = styled(Badge)<IActiveBadge>`
  .ant-badge-dot {
    width: 12px;
    height: 12px;
    bottom: -6px;
    top: auto;
    right: 6px;
    background-color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.mediumDarkGrey};

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      width: 8px;
      height: 8px;
      bottom: -2px;
    }
  }
`;

export const EditBlock = styled.div`
  margin-right: 8px;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;
