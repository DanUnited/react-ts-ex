import styled from 'styled-components';
import { PageLayout } from 'components/layout/page-layout';

export const ColumnTitle = styled.div`
  padding: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 16px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageUserLayout = styled(PageLayout)`
  max-width: 930px;
`;

export const ButtonContainer = styled.div`
  .ant-btn {
    min-width: 116px;
    margin-left: 24px;
  }
`;

export const SpinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
