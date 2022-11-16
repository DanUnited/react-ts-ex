import styled from 'styled-components';
import { Plate } from 'components/layout/plate';
import { EXTRA_LARGE_VIEWPORT, MEDIUM_VIEWPORT, MOBILE_VIEWPORT } from 'modules/theme/config';

interface IPlateFullHeight {
  extraPadding: string;
}

export const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h1 {
    margin: 0;
  }

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    flex-direction: column;
  }
`;

export const HeaderActionsBlock = styled(HeaderBlock)`
  margin-bottom: 24px;

  @media (max-width: ${MOBILE_VIEWPORT}px){
    padding-bottom: 16px;
  }

  @media (max-width: ${MEDIUM_VIEWPORT}px){
    align-items: start;
  }
`;

export const ActionsBlock = styled.div`
  display: inline-flex;
`;

export const PlateFullHeight = styled(Plate)<IPlateFullHeight>`
  min-height: calc(100vh - 136px);
  height: auto;

  padding: ${props => props.extraPadding || '32'}px;

  .ant-anchor-wrapper {
    overflow: visible;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    padding: 16px 24px;
  }

  @media (max-width: ${MOBILE_VIEWPORT}px){
    border-radius: 0;
    margin: -24px;
  }
`;

export const ArrowContainer = styled.div`
  display: inline-block;
  margin-right: 16px;
  svg {
    vertical-align: middle;
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    margin-right: 8px;

    svg {
      height: 16px;
      width: 16px;
    }
  }
`;

export const TitleActionsContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.grey};
  margin-left: 16px;
  padding-left: 16px;
`;
