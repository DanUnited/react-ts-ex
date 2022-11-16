import React from 'react';

import { Vector } from 'components/icons';
import { ArrowsWrapper, StyledHeader, DateContainer, LeftArrow, RightArrow } from './elements';

import type { Moment } from 'moment';

interface IHeaderRender {
  nextMonth: () => void;
  previousMonth: () => void;
}

interface IHeaderRenderCallback {
  value: Moment;
}

export const CalendarHeader = ({ nextMonth, previousMonth }: IHeaderRender) => ({ value }: IHeaderRenderCallback) => {
  const month = value.format('MMMM');
  const year = value.year();

  return (
    <StyledHeader>
      <DateContainer>
        {month} {year}
      </DateContainer>

      <ArrowsWrapper>
        <LeftArrow onClick={previousMonth}>
          <Vector />
        </LeftArrow>
        <RightArrow onClick={nextMonth}>
          <Vector />
        </RightArrow>
      </ArrowsWrapper>
    </StyledHeader>
  );
};
