import styled from 'styled-components';

interface IStyledSkeleton {
  $width: string | number;
  $height:  string | number;
}

export const StyledSkeleton = styled.div<IStyledSkeleton>`
    @keyframes shine {
    from {
        background-position-x: 200%;
    }  
    to {
          background-position-x: 0;
          }
    }

    display: inline-block;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.04);
    background-image: linear-gradient(90deg, transparent 10%, white 30%, transparent 50%);
    background-size: 200%;
    animation-name: shine; 
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    vertical-align: middle;

    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
`;
