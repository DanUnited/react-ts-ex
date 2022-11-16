import styled from 'styled-components';
import { Popover } from 'components/popover';
import { Panel } from 'components/layout/panel';
import { PrimaryButton } from 'components/layout/button';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

export const ProfilePanel = styled(Panel)`
  padding: 24px 0 16px 0;

  .panel-header {
    font-size: 16px;
    line-height: 24px;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 16px 0 16px 0;

    .panel-header {
      font-size: 14px;
      line-height: 24px;
    }
  }
`;

export const ProfileButton = styled(PrimaryButton)`
  &.ant-btn-primary,
  &.ant-btn-default {
    height: 40px;
    line-height: 24px;

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 32px;
      font-size: 14px;
    }
  }
`;

export const ProfileAvatar = styled.div`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  background-color: #C0D4E3;
  background-color: ${({ theme }) => theme.colors.grey};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    width: 48px;
    height: 48px;
  }
`;

export const ProfileName = styled.div`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  width: 270px;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 18px;
    line-height: 24px;
    width: 170px;
    height: 32px;
  }
`;

export const AvatarWithNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const ProfileInformationContainer = styled.div`
  font-size: 18px;
  font-weight: 500;

  .title {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  
  .description {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 8px 0;

    p {
      display: block;
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  svg {
    margin-right: 12px;
    filL: ${({ theme }) => theme.colors.primary};
  }
`;


export const PasswordPopover = styled(Popover)`
  .ant-popover {
    background: white;

    .ant-popover-inner {
      border-radius: 8px;
      box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

      .ant-popover-inner-content {
        font-size: 16px;
        padding: 16px;
        color: ${({ theme }) => theme.colors.darkGrey};

        ul {
          list-style: none;
          padding:0;
          margin: 0;

          li::before {
            display: inline-block;
            content: "";
            background: ${({ theme }) => theme.colors.primary};
            height: 8px;
            width: 8px;
            margin-inline-end: 12px;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
            top: -2px;
          }
        }
      }
    }
  }
`;
