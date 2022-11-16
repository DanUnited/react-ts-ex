import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const Container = styled.div`
  display: flex;
`;

export const MemberInfo = styled.div`
   width: 384px;
   height: 400px;
   padding: 32px;
   border-radius: 24px;
   background-color: ${({ theme }) => theme.colors.white};
   box-shadow: 0 8px 16px rgba(104, 113, 123, 0.07);

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    border-radius: 16px;
  }
`;

export const ButtonMargin = styled.div`
  margin: 24px 0 16px 0;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const UserInfo = styled.div`
  margin-top: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoName = styled.span`
  margin-left: 12px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-feature-settings: 'pnum' on, 'lnum' on;
`;

export const PersonalWrapper = styled.div`
   display: flex;
   align-items: center;
`;

export const Avatar = styled.div`
  border-radius: 50%;
  height: 64px;
  width: 64px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const Name = styled.div`
  margin-left: 16px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

export const MainBlock = styled.div`
  border-radius: 24px;
  height: 828px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-left: 24px;
  width: 100%;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    border-radius: 16px;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  padding: 32px 0 24px 40px;
`;

export const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
`;
