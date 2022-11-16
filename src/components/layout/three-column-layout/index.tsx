import React from 'react';

import {
  StyledLayout,
  FirstColumnContainer,
  ThirdColumnContainer,
  SecondColumnContainer,
} from './elements';

interface IThreeColumnLayout {
  firstColumn: React.ReactNode;
  secondColumn: React.ReactNode;
  thirdColumn: React.ReactNode;
  fixedSecondColumn?: boolean;
}

export const ThreeColumnLayout = ({ firstColumn, secondColumn, thirdColumn, fixedSecondColumn }: IThreeColumnLayout) => (
  <StyledLayout>
    <FirstColumnContainer>
      {firstColumn}
    </FirstColumnContainer>

    <SecondColumnContainer $fixed={fixedSecondColumn}>
      {secondColumn}
    </SecondColumnContainer>

    <ThirdColumnContainer $fixed={!fixedSecondColumn}>
      {thirdColumn}
    </ThirdColumnContainer>
  </StyledLayout>
);
