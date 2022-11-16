import styled from 'styled-components';

export const Title = styled.div`
  ::before {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      line-height: 1;
      content: '*';
  }
`;

export const SkeletonWrapper = styled.div`
  margin-bottom: 16px;
`;
