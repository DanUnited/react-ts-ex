import styled from 'styled-components';

export const BreadcrumbContainer = styled.div`
  .ant-breadcrumb > span:last-child a,
  .ant-breadcrumb a {
    color: ${({ theme }) => theme.colors.darkGrey};
    white-space: nowrap;
  }

  a {
    text-decoration: none;
  }

  .icon-container {
    height: auto;
    width: auto;
    border-radius: 0;
  }

  .ant-breadcrumb-link svg {
    position: relative;
    top: 1px;
    margin-right: 6px;
    fill: ${({ theme }) => theme.colors.darkGrey};
    height: 12px;
    width: 12px;
  }
`;
