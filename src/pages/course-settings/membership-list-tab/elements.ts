import styled from 'styled-components';

export const HistoryLink = styled.a`
  text-decoration: underline;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ theme }) => theme.colors.primary};
  
  &.disabled {
    pointer-events: none;
    color: ${({ theme }) => theme.colors.grey};
    text-decoration: none;
  }
`;
