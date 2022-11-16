import styled from 'styled-components';

interface IActivityText {
  $active: boolean;
}

export const ActivityText = styled.span<IActivityText>`
  color: ${({ theme, $active }) => $active ? theme.colors.text : '#AFB7BF'};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;
