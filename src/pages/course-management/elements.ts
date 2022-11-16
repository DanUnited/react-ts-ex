import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const CourseListContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: stretch;
  margin-top: 24px;
`;

export const EmptyBlock = styled.div`
  background: none;
  border: none;
  height: 0;
  flex: 1 0 20%;
  min-width: 400px;
  margin: 0 16px 16px 0;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    min-width: 320px;
  }
`;
