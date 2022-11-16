import styled from 'styled-components';

export const DiscountTypeContainer = styled.div`
  padding: 4px 8px;
  background: white;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  .ant-btn {
    margin-left: 8px;
    border-radius: 4px;
    padding: 2px 8px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkGrey};
    position: relative;
    top: -2px;

    &.ant-btn-primary {
      padding: 2px 8px;
      color: white;
    }
  } 
`;
