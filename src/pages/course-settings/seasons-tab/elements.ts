import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ theme }) => theme.colors.black}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  
  .ant-divider-horizontal.ant-divider-with-text-left::before {
    display: none;
  }
  
  .ant-divider-inner-text {
    padding-left: 0;
  }
`;
