import Row from 'antd/es/row';
import Anchor from 'antd/es/anchor';
import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 0 -34px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.lightGrey};

  .date-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  h4 {
    display: inline-block;
  }
`;

export const ActionButtonRow = styled(Row)`
  svg {
    height: 16px;
    width: 16px;
  }
`;

export const StyledAnchor = styled(Anchor)`
  background: transparent;

  .ant-anchor {
    z-index: 12;
  }

  .ant-anchor-ink::before {
    width: 0;
  }
`;
