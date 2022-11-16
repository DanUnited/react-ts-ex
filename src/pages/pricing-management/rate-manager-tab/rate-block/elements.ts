import styled from 'styled-components';
import { Text } from 'components/layout/text';
import { Header4 } from 'components/layout/headers';
import { InlinePlate } from 'components/layout/plate';
import { EXTRA_LARGE_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

interface IActive {
  $isActive?: boolean;
}

export const RateBlockContainer = styled(InlinePlate)`
  min-width: 392px;
  flex: 1 0 20%;
  background-color: ${({ theme }) => theme.colors.light};
  border: 2px solid transparent;
  padding: 16px 24px 24px 24px;
  margin: 0 16px 16px 0;
  justify-content: space-between;

  &.active {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 12px;
    margin: 0 8px 8px 0;
    min-width: 320px;
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    min-width: 320px;
  }

  &.animated {
    background-size: 200%;
    animation: 1.5s linear infinite shine;
    background-image: linear-gradient(90deg,transparent 10%,white 30%,transparent 50%);
  }
`;

export const RateDescription = styled(Text)`
  word-wrap: break-word;

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: 14px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    margin: 0;
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    flex-direction: column;
    justify-content: start;
  }
`;

export const RateBlockHeader = styled(Header4)<IActive>`
  cursor: pointer;
  overflow: hidden;
  max-width: 160px;
  text-overflow: ellipsis;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.black};
  
  h4 {
    line-height: 32px;
    font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off;
    color: ${({ theme }) => theme.colors.red};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Icon = styled.div`
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    height: 16px;
    width: 16px;
    fill: ${({ theme }) => theme.colors.darkGrey};
    
    &:hover {
      fill: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
      height: 12px;
      width: 12px;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-self: start;
`;
