import styled from 'styled-components';

export const DatePickerWrapper = styled.div`
  margin-bottom: 4px;
  margin-left: 36px;
`;

export const InputWrapper = styled.div`
  margin-left: 36px;
`;

export const Label = styled.div`
  margin-top: 8px;
  margin-left: 36px;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
  color: ${({ theme }) => theme.colors.darkGrey}
`;
