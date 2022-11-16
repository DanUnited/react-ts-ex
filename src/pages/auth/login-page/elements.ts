import styled from 'styled-components';

export const LinkContainer = styled.div`
  text-align: right;
  margin-top: 8px;

  a {
    color: ${({ theme }) => theme.colors.primary}; 
    text-decoration: underline;
    &:hover {
      color: #40a9ff; 
    }
  }
`;
