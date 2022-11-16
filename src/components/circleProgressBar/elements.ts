import styled from 'styled-components';
import { EXTRA_LARGE_VIEWPORT } from 'modules/theme/config';

interface IValueBlock {
  size: 'large' | 'small';
  $width: number;
}

export const Wrapper = styled.div`
  position: relative;
  
  svg {
    transform: rotate(-90deg);
    box-shadow: 1px 1px 1px rgb(149 165 177 / 25%);
    border-radius: 50%;

    circle {
      transition: stroke-dashoffset 1s linear;
    }
  }
`;

export const ValueBlock = styled.div<IValueBlock>`
  position: absolute;
  height: 100%;
  width: ${(props) => props.$width}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  line-height: 1.75;
  font-size: ${(props) => props.size === 'large' ? '32px' : '14px'};

  &:after {
    display: block;
    content: attr(data-pct)"%";
  }

  @media (max-width: ${EXTRA_LARGE_VIEWPORT}px) {
    font-size: ${(props) => props.size === 'large' ? '24px' : '12px'};
  }
`;

