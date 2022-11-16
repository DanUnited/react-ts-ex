import styled from 'styled-components';

import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';
import { HeaderContainer } from 'components/layout/headers/header-container';

export const StyledHeaderContainer = styled(HeaderContainer)`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const ToggleWrapper = styled.div`
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid ${({ theme }) => theme.colors.grey};
  
  .ant-row.ant-form-item {
    margin-bottom: 0;
  }
`;

export const UploadTitle = styled.div`
  font-size: 16px;
  line-height: 1.4;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 8px;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;

  .image-container {
    height: 128px;
    width: 128px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 12px;
  }
`;

export const UploadArea = styled.div`
  margin-left: 16px;
`;
