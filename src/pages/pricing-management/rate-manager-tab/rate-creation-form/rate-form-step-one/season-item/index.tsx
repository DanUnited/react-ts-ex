import React from 'react';
import moment from 'moment';

import { weekFormat } from 'utils/date';
import { TimeTable2, Vector2 } from 'components/icons';
import { CardWrapper, DateContainer, Date, Name, CheckContainer } from './elements';

import type { ISeasonResponse } from 'modules/api-requests/seasons/types';

interface ISeasonItemProps {
  value: ISeasonResponse;
  active?: boolean;
  onClick?: (id: string) => void;
}

export const SeasonItem = ({ onClick, active, value }: ISeasonItemProps) => {
  const { id, name, startDate, endDate } = value;

  const onClickHandler = (): void => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <CardWrapper onClick={onClickHandler} data-value={id} $selected={active}>
      <div>
        <Name $selected={active}>{name}</Name>
        <DateContainer $selected={active}>
          <TimeTable2 width={16} height={16} />
          <Date $selected={active}>{moment(startDate).format(weekFormat)} - {moment(endDate).format(weekFormat)}</Date>
        </DateContainer>
      </div>

      {active && (
        <CheckContainer>
          <Vector2 />
        </CheckContainer>
      )}
    </CardWrapper>
  )
};
